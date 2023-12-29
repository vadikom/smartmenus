/*
 * SmartMenus
 * http://www.smartmenus.org/
 * Copyright (c) since 2001 Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */

import Data from './utility/dom-data.js'
import Events from './utility/dom-events.js'
import Helpers from './utility/dom-helpers.js'
import Query from './utility/dom-query.js'
import MouseInputDetect from './utility/mouse-input-detect.js'
import DEFAULTS from './defaults.js'

const DATA_KEY = 'sm'
const DATA_SUFFIX = `-${DATA_KEY}`
const DATA_ATTRIBUTE_PREFIX = `data-${DATA_KEY}-`
const EVENTS_NS = `.${DATA_KEY}`
const API_EVENTS_SUFFIX = `-${DATA_KEY}`

const navbars = []

class SmartMenus {
  constructor(element, options) {
    this._navbar = element

    // Get any options defined as data- attributes
    const dataOptions = {}
    for (const key of Object.keys(DEFAULTS)) {
      let dataValue = this._navbar.dataset[`${DATA_KEY}${key.charAt(0).toUpperCase()}${key.slice(1)}`]
      if (dataValue !== undefined) {
        switch (typeof DEFAULTS[key]) {
          case 'number': {
            dataValue = Number.parseFloat(dataValue, 10)
            break
          }

          case 'boolean': {
            dataValue = dataValue === 'true'
            break
          }
        }

        dataOptions[key] = dataValue
      }
    }

    this._opts = { ...DEFAULTS, ...options, ...dataOptions }
    this._togglerState = null
    this._togglerAnchorShow = null
    this._togglerAnchorHide = null
    this._collapse = null
    this._offcanvas = null
    this._offcanvasOverlay = null
    this._nav = null
    this._navbarId = String(Date.now() + Math.random()).replace(/\D/g, '') // for internal use
    this._accessIdPrefix = `${DATA_KEY}-${this._navbarId}-`
    this._visibleSubs = [] // stores visible subs (might be in no particular order in collapsible non-accordion mode)
    this._dropdownsShowTimeout = 0
    this._dropdownsHideTimeout = 0
    this._clickActivated = false
    this._zIndexInc = 0
    this._idInc = 0
    this._disabled = false
    this._wasCollapsible = false

    // We'll access these for some tests at runtime so we'll cache them
    this._firstLink = null
    this._firstSub = null

    this._init()
  }

  // Getters
  static get DATA_KEY() {
    return DATA_KEY
  }

  static get Dom() {
    return { Data, Events, Helpers, Query }
  }

  static get MouseInputDetect() {
    return MouseInputDetect
  }

  static get navbars() {
    return navbars
  }

  // Public
  destroy(refresh) {
    this.subHideAll()

    if (this._nav) {
      this._destroySubs()
      this._destroyNav()
      this._nav = null
    }

    this._togglerState = null
    if (this._togglerAnchorShow) {
      Data.delete(this._togglerAnchorShow, `beforefirstshow-fired${DATA_SUFFIX}`)
      this._togglerAnchorShow = null
    }

    this._togglerAnchorHide = null
    this._collapse = null
    this._offcanvas = null
    this._offcanvasOverlay = null
    this._firstLink = null
    this._firstSub = null

    if (!refresh) {
      this._destroyNavbar()
      this._navbar = null
    }
  }

  disable() {
    if (!this._disabled) {
      this.subHideAll()
      this._disabled = true
    }
  }

  enable() {
    if (this._disabled) {
      this._disabled = false
    }
  }

  /**
   * Activate a menu link
   *
   * @param {HTMLElement} element                       Any element which matches the "selectorLink" selector
   * @param {('none'|'same'|'deeper'|'self')} hideSubs  Hide any visible subs from the same or deeper levels or only the self sub (if it exists)
   * @param {boolean} showSub                           Should the link's sub be shown (if it exists)?
   * @returns {void}
   */
  linkActivate(element, hideSubs = 'none', showSub = true) {
    const menu = element.closest(`${this._opts.selectorNav}, ${this._opts.selectorSub}`)
    const level = Data.get(menu, `level${DATA_SUFFIX}`)
    const sub = Data.get(element, `sub${DATA_SUFFIX}`)

    // If for some reason the containing menu is not visible (e.g. this is an API call to activate the link), show all parent menus first
    if (level > 1 && !this._subIsVisible(menu)) {
      const parents = Query.parentsUntil(menu, this._opts.selectorNav, this._opts.selectorSub).reverse()
      parents.push(menu)
      for (const menu of parents) {
        this.linkActivate(Data.get(menu, `parent-link${DATA_SUFFIX}`), this._isCollapsible() && !this._opts.collapsibleBehaviorAccordion ? 'none' : 'same')
      }
    }

    // Hide any visible subs
    switch (hideSubs) {
      case 'same': {
        this._subHideSubs(level - 1)
        break
      }

      case 'deeper': {
        this._subHideSubs(level)
        break
      }

      case 'self': {
        if (sub) {
          this._subHide(sub)
        }

        break
      }
    }

    if (Events.trigger(this._navbar, `activate${API_EVENTS_SUFFIX}`, element).defaultPrevented || !showSub) {
      return
    }

    // Show the sub menu if this link has one
    if (sub) {
      this._subShow(sub)
    }
  }

  refresh() {
    this.destroy(true)
    this._init(true)
  }

  subHideAll() {
    this._clearTimeout(this._dropdownsShowTimeout)
    this._clearTimeout(this._dropdownsHideTimeout)

    const visibleCount = this._visibleSubs.length

    if (visibleCount > 0) {
      for (const sub of [...this._visibleSubs].reverse()) {
        this._subHide(sub)
      }
    }

    this._visibleSubs = []
    this._clickActivated = false
    this._zIndexInc = 0

    if (visibleCount > 0) {
      Events.trigger(this._navbar, `hideall${API_EVENTS_SUFFIX}`)
    }
  }

  // Private
  _activateSelectedLink() {
    const selectedLink = Query.getAll(`.${this._opts.classLinkSelected}`, this._nav).pop()
    if (selectedLink) {
      this.linkActivate(selectedLink)
    }
  }

  _animate(element, classAnimate) {
    // Reflow to make sure the animation would be restarted
    void element.offsetWidth

    element.classList.add(classAnimate)
    const { animationDuration } = Helpers.getComputedStyle(element)
    if (!animationDuration || animationDuration.startsWith('0s')) {
      element.classList.remove(classAnimate)
      return
    }

    // Trigger animationend if animation needs to be stopped or just in case it isn't fired for some reason
    const endTimeout = Data.get(element, `animationend-timeout${DATA_SUFFIX}`)
    if (endTimeout) {
      window.clearTimeout(endTimeout)
      Data.get(element, `animationend-trigger${DATA_SUFFIX}`)()
    }

    const endTrigger = () => {
      Data.delete(element, `animationend-timeout${DATA_SUFFIX}`)
      Data.delete(element, `animationend-trigger${DATA_SUFFIX}`)
      if (element.classList.contains(classAnimate)) {
        Events.trigger(element, 'animationend')
      }
    }

    Data.set(element, `animationend-trigger${DATA_SUFFIX}`, endTrigger)
    Data.set(element, `animationend-timeout${DATA_SUFFIX}`, window.setTimeout(endTrigger, (Number.parseFloat(animationDuration) * 1000) + 1)
    )

    Events.on(element, `animationend${EVENTS_NS}`, event => {
      if (event.target === element) {
        Events.off(element, `animationend${EVENTS_NS}`)
        element.classList.remove(classAnimate)
      }
    })
  }

  _animateHide(element) {
    // This property is used for the expand/collapse animation
    element.style.setProperty(`--${DATA_KEY}-height`, `${Helpers.getHeight(element)}px`)
    element.classList.remove(this._opts.classShow)
    this._animate(element, this._opts.classHiding)
  }

  _animateShow(element) {
    // This property is used for the expand/collapse animation
    element.style.setProperty(`--${DATA_KEY}-height`, `${Helpers.getHeight(element)}px`)
    element.classList.add(this._opts.classShow)
    this._animate(element, this._opts.classShowing)
  }

  _clearTimeout(timeout) {
    if (timeout) {
      window.clearTimeout(timeout)
      timeout = 0
    }
  }

  _destroyLink(element) {
    if (element.classList.contains(this._opts.classLinkHasSub)) {
      if ((element.getAttribute('id') || '').startsWith(this._accessIdPrefix)) {
        element.removeAttribute('id')
      }

      element.classList.remove(this._opts.classLinkHasSub)
      Data.delete(element, `sub${DATA_SUFFIX}`)
      Data.delete(element, `toggler${DATA_SUFFIX}`)
      Data.delete(element, `link${DATA_SUFFIX}`)
      element.removeAttribute('role')
      element.removeAttribute('aria-controls')
      element.removeAttribute('aria-expanded')
    }

    if (this._opts.markCurrentLinkAsSelectedOnInit && element.classList.contains(this._opts.classLinkSelected)) {
      element.classList.remove(this._opts.classLinkSelected)
      element.removeAttribute('aria-current')
    }
  }

  _destroyNav() {
    Data.delete(this._nav, `level${DATA_SUFFIX}`)
    Events.off(this._nav, EVENTS_NS)
    Events.off(window.document, `${EVENTS_NS}-${this._navbarId}`)
    Events.off(window, `${EVENTS_NS}-${this._navbarId}`)
  }

  _destroyNavbar() {
    Data.delete(this._navbar, DATA_KEY)
    this._navbar.removeAttribute(`${DATA_ATTRIBUTE_PREFIX}id`)
    Events.off(this._navbar, EVENTS_NS)
    navbars.splice(navbars.indexOf(this), 1)
  }

  _destroySub(element) {
    const shownBefore = Data.get(element, `shown-before${DATA_SUFFIX}`)
    if (shownBefore) {
      this._subResetPosition(element)
    }

    if ((element.getAttribute('id') || '').startsWith(this._accessIdPrefix)) {
      element.removeAttribute('id')
    }

    Data.delete(element, `shown-before${DATA_SUFFIX}`)
    Data.delete(element, `parent-link${DATA_SUFFIX}`)
    Data.delete(element, `level${DATA_SUFFIX}`)
    Data.delete(element, `beforefirstshow-fired${DATA_SUFFIX}`)
    element.removeAttribute('aria-hidden')
    element.removeAttribute('aria-labelledby')
  }

  _destroySubs() {
    for (const sub of Query.getAll(this._opts.selectorSub, this._nav)) {
      this._destroySub(sub)
    }

    // Let's process the links separately from the subs (unline on init) since some link might possibly be disconnected
    // from the sub it had on init (e.g. its sub might have been removed in some DOM operation)
    for (const link of Query.getAll(this._opts.selectorLink, this._nav)) {
      this._destroyLink(link)
    }
  }

  _docClick(event) {
    // Hide on any click outside the nav
    const isCollapsible = this._isCollapsible()
    if (((!isCollapsible && this._opts.dropdownsHideTrigger === 'click') || (isCollapsible && this._opts.collapsibleResetSubsOnClickOn === 'page')) && (!event.target || !this._nav.contains(event.target))) {
      this.subHideAll()
    }
  }

  _docTouchEnd() {
    if (!this._lastTouch) {
      return
    }

    if ((this._lastTouch.x2 === undefined || this._lastTouch.x1 === this._lastTouch.x2) && (this._lastTouch.y2 === undefined || this._lastTouch.y1 === this._lastTouch.y2)) {
      this._clearTimeout(this._dropdownsHideTimeout)

      // Call with a delay to prevent triggering accidental unwanted click on some page element
      const { target } = this._lastTouch
      this._dropdownsHideTimeout = window.setTimeout(() => {
        this._docClick({ target })
      }, 350)
    }

    this._lastTouch = null
  }

  _docTouchMove(event) {
    if (!this._lastTouch) {
      return
    }

    const touchPoint = event.touches[0]
    this._lastTouch.x2 = touchPoint.pageX
    this._lastTouch.y2 = touchPoint.pageY
  }

  _docTouchStart(event) {
    const touchPoint = event.touches[0]
    this._lastTouch = { x1: touchPoint.pageX, y1: touchPoint.pageY, target: touchPoint.target }
  }

  _getRootZIndex() {
    const zIndex = Number.parseInt(Helpers.getComputedStyle(this._navbar).zIndex, 10)
    return Number.isNaN(zIndex) ? 1 : zIndex
  }

  _handleEvents() {
    return !this._disabled && this._isCSSOn()
  }

  _init(refresh) {
    if (this._navbar.classList.contains(this._opts.classNavbarDropReverseX)) {
      this._opts.dropdownsDropReverseX = true
    }

    if (this._navbar.classList.contains(this._opts.classNavbarDropReverseY)) {
      this._opts.dropdownsDropReverseY = true
    }

    this._togglerState = Query.get(this._opts.selectorTogglerState, this._navbar)
    this._togglerAnchorShow = Query.get(this._opts.selectorTogglerAnchorShow, this._navbar)
    this._togglerAnchorHide = Query.get(this._opts.selectorTogglerAnchorHide, this._navbar)
    this._collapse = Query.get(this._opts.selectorCollapse, this._navbar)
    this._offcanvas = Query.get(this._opts.selectorOffcanvas, this._navbar)
    this._offcanvasOverlay = Query.get(this._opts.selectorOffcanvasOverlay, this._navbar)
    this._nav = Query.get(this._opts.selectorNav, this._navbar)

    if (!refresh) {
      this._initNavbar()
    }

    if (this._nav) {
      this._initNav()
      this._initSubs()

      // Save initial state
      const isCollapsible = this._isCollapsible()
      this._wasCollapsible = isCollapsible

      if (this._opts.markCurrentLinkAsSelectedOnInit) {
        this._markCurrentLinkAsSelected()
      }

      if (this._opts.collapsibleActivateSelectedLinkOnInit && isCollapsible) {
        this._activateSelectedLink()
      }

      MouseInputDetect.enable(
        // On mouse input detected - check if we are not over some link by chance and call the mouseenter handler if yes
        event => {
          const { target } = event
          if (target?.closest) {
            navbars.some(object => {
              const link = target.closest(object._opts.selectorLink)
              if (link && object._navbar.contains(link)) {
                object._linkEnter(event, link)
                return true
              }

              return false
            })
          }
        }
      )
    }
  }

  _initNav() {
    Data.set(this._nav, `level${DATA_SUFFIX}`, 1)
    Events.on(this._nav, Events.getEventsNS({
      'mouseover focusin': this._navOver.bind(this),
      'mouseout focusout': this._navOut.bind(this),
      keydown: this._navKeyDown.bind(this)
    }, EVENTS_NS))

    Events.on(this._nav, Events.getEventsNS({
      mouseenter: this._linkEnter.bind(this),
      mouseleave: this._linkLeave.bind(this),
      mousedown: this._linkDown.bind(this),
      focus: this._linkFocus.bind(this),
      blur: this._linkBlur.bind(this),
      click: this._linkClick.bind(this)
    }, EVENTS_NS), this._opts.selectorLink)
  }

  _initNavbar() {
    navbars.push(this)
    Data.set(this._navbar, DATA_KEY, this)
    this._navbar.setAttribute(`${DATA_ATTRIBUTE_PREFIX}id`, this._navbarId)
    Events.on(this._navbar, `click${EVENTS_NS}`, this._opts.selectorTogglerAnchorShow, this._togglerAnchorShowClick.bind(this))
    Events.on(this._navbar, `click${EVENTS_NS}`, this._opts.selectorTogglerAnchorHide, this._togglerAnchorHideClick.bind(this))
    Events.on(this._navbar, `click${EVENTS_NS}`, this._opts.selectorOffcanvasOverlay, this._offcanvasOverlayClick.bind(this))
  }

  _initSub(element) {
    const parentLink = Query.get(this._opts.selectorLink, element.closest(this._opts.selectorItem))
    parentLink.classList.add(this._opts.classLinkHasSub)
    const parentLinkNextElement = parentLink.nextElementSibling
    const parentLinkToggler = parentLinkNextElement?.matches(this._opts.selectorLinkSplit) && parentLink.matches(this._opts.selectorLinkSplit) ? parentLinkNextElement : null
    if (parentLinkToggler) {
      Data.set(parentLink, `toggler${DATA_SUFFIX}`, parentLinkToggler)
      Data.set(parentLinkToggler, `link${DATA_SUFFIX}`, parentLink)
      parentLinkToggler.classList.add(this._opts.classLinkHasSub)
    }

    Data.set(parentLink, `sub${DATA_SUFFIX}`, element)
    Data.set(element, `parent-link${DATA_SUFFIX}`, parentLink)
    Data.set(element, `level${DATA_SUFFIX}`, Query.parentsUntil(element, this._opts.selectorNav, this._opts.selectorSub).length + 2)

    this._setTogglerSubARIA(parentLinkToggler || parentLink, element)
  }

  _initSubs() {
    // Hide subs on tap or click outside the nav
    if (this._opts.dropdownsHideTrigger === 'click' || this._opts.collapsibleResetSubsOnClickOn === 'page') {
      Events.on(window.document, Events.getEventsNS({
        touchstart: this._docTouchStart.bind(this),
        touchmove: this._docTouchMove.bind(this),
        touchend: this._docTouchEnd.bind(this),
        click: this._docClick.bind(this)
      }, `${EVENTS_NS}-${this._navbarId}`))
    }

    // Hide subs on resize
    Events.on(window, Events.getEventsNS({
      'resize orientationchange': this._winResize.bind(this)
    }, `${EVENTS_NS}-${this._navbarId}`))

    const subs = Query.getAll(this._opts.selectorSub, this._nav)
    for (const sub of subs) {
      this._initSub(sub)
    }

    // Cache these for faster access at runtime
    this._firstLink = Query.get(this._opts.selectorLink, this._nav)
    this._firstSub = subs[0]
  }

  _isCollapsible() {
    return this._isCSSOn() && this._firstSub && Helpers.getComputedStyle(this._firstSub).position === 'static'
  }

  _isCSSOn() {
    return this._firstLink && Helpers.getComputedStyle(this._firstLink).display !== 'inline'
  }

  _isTouchMode() {
    return !MouseInputDetect.supportMouseInput || this._isCollapsible()
  }

  _linkBlur(event, element) {
    if (!this._handleEvents()) {
      return
    }

    // If this is a split link toggler, trigger the handler for the actual link
    const link = Data.get(element, `link${DATA_SUFFIX}`)
    if (link) {
      this._linkBlur(event, link)
      return
    }

    Events.trigger(this._navbar, `blur${API_EVENTS_SUFFIX}`, element)
  }

  /* eslint-disable complexity */
  // Maybe refactor this to lower complexity?
  _linkClick(event, element) {
    if (!this._handleEvents()) {
      return
    }

    if (element.classList.contains(this._opts.classLinkDisabled)) {
      event.preventDefault()
      return false
    }

    // If this is a split link toggler, get the actual link
    let link = Data.get(element, `link${DATA_SUFFIX}`)
    const isTogglerClicked = Boolean(link)
    if (!isTogglerClicked) {
      link = element
    }

    if (Events.trigger(this._navbar, `click${API_EVENTS_SUFFIX}`, link).defaultPrevented) {
      event.preventDefault()
      return false
    }

    const linkToggler = Data.get(link, `toggler${DATA_SUFFIX}`)
    const sub = Data.get(link, `sub${DATA_SUFFIX}`)
    const subIsVisible = sub && this._subIsVisible(sub)
    const level = Data.get(sub, `level${DATA_SUFFIX}`) - 1
    const isCollapsible = this._isCollapsible()
    const selectLink = !sub || (linkToggler && !isTogglerClicked)

    if (selectLink && Events.trigger(this._navbar, `select${API_EVENTS_SUFFIX}`, link).defaultPrevented) {
      event.preventDefault()
      return false
    }

    if (sub && (!selectLink || this._opts.showSubOnSplitLinkSelect)) {
      this._clickActivated = this._clickActivated || Boolean(!isCollapsible && !subIsVisible && this._opts.dropdownsShowTrigger === 'click-then-mouseover' && level === 1)
    }

    // Activate link
    let hideSubs = 'none'
    if (subIsVisible && isCollapsible && !this._opts.collapsibleBehaviorAccordion && (!selectLink || !this._opts.showSubOnSplitLinkSelect)) {
      hideSubs = 'self'
    } else if (
      (sub
        && (
          (subIsVisible && (!isCollapsible || this._opts.collapsibleBehaviorAccordion) && (!selectLink || !this._opts.showSubOnSplitLinkSelect))
          || (!subIsVisible && (!isCollapsible || (this._opts.collapsibleBehaviorAccordion && (!selectLink || this._opts.showSubOnSplitLinkSelect))))
        )
      )
      || (!sub && !isCollapsible)
    ) {
      hideSubs = 'same'
    }

    const showSub = selectLink ? this._opts.showSubOnSplitLinkSelect : !subIsVisible
    this.linkActivate(link, hideSubs, showSub)

    // Select link
    if (selectLink) {
      if (this._opts.resetTogglerOnLinkSelect && this._togglerAnchorHide && Helpers.getComputedStyle(this._togglerAnchorHide).display !== 'none' && this._togglerAnchorHide.offsetWidth > 0) {
        this._togglerAnchorHide.click()
      }

      if (!isCollapsible && (!sub || subIsVisible || !this._opts.showSubOnSplitLinkSelect)) {
        this.subHideAll()
      }

      return true
    }

    // Toggle sub
    if (sub) {
      if (!isCollapsible && level === 1 && subIsVisible) {
        this.subHideAll()
      }

      event.preventDefault()
      return false
    }
  }
  /* eslint-enable complexity */

  _linkDown(event, element) {
    if (!this._handleEvents()) {
      return
    }

    // If this is a split link toggler, trigger the handler for the actual link
    const link = Data.get(element, `link${DATA_SUFFIX}`)
    if (link) {
      this._linkDown(event, link)
      return
    }

    Data.set(element, `mousedown${DATA_SUFFIX}`, true)
  }

  _linkEnter(event, element) {
    if (!this._handleEvents()) {
      return
    }

    // If this is a split link toggler, trigger the handler for the actual link
    const link = Data.get(element, `link${DATA_SUFFIX}`)
    if (link) {
      this._linkEnter(event, link)
      return
    }

    if (!this._isTouchMode() && (this._opts.dropdownsShowTrigger === 'mouseover' || (this._opts.dropdownsShowTrigger === 'click-then-mouseover' && this._clickActivated) || this._opts.dropdownsHideTrigger !== 'click')) {
      this._clearTimeout(this._dropdownsShowTimeout)

      const level = Data.get(element.closest(`${this._opts.selectorNav}, ${this._opts.selectorSub}`), `level${DATA_SUFFIX}`)
      const sub = Data.get(element, `sub${DATA_SUFFIX}`)
      const hideSubs = !sub || !this._subIsVisible(sub) ? 'same' : 'deeper'
      const showSub = this._opts.dropdownsShowTrigger === 'mouseover' || (this._opts.dropdownsShowTrigger === 'click-then-mouseover' && this._clickActivated)
      const timeout = this._opts.dropdownsShowTrigger === 'click-then-mouseover' && level === 1 ? 1 : this._opts.dropdownsShowTimeout
      this._dropdownsShowTimeout = window.setTimeout(() => {
        this.linkActivate(element, hideSubs, showSub)
      }, timeout)
    }

    Events.trigger(this._navbar, `mouseenter${API_EVENTS_SUFFIX}`, element)
  }

  _linkFocus(event, element) {
    if (!this._handleEvents()) {
      return
    }

    // If this is a split link toggler, trigger the handler for the actual link
    const link = Data.get(element, `link${DATA_SUFFIX}`)
    if (link) {
      this._linkFocus(event, link)
      return
    }

    // Neglect focus events that were triggered by mouse input
    if (!Data.get(element, `mousedown${DATA_SUFFIX}`)) {
      const sub = Data.get(element, `sub${DATA_SUFFIX}`)
      const hideSubs = this._isCollapsible() && !this._opts.collapsibleBehaviorAccordion ? 'none' : (!sub || !this._subIsVisible(sub) ? 'same' : 'deeper')
      const showSub = false
      this.linkActivate(element, hideSubs, showSub)
    }

    Events.trigger(this._navbar, `focus${API_EVENTS_SUFFIX}`, element)
  }

  _linkLeave(event, element) {
    if (!this._handleEvents()) {
      return
    }

    // If this is a split link toggler, trigger the handler for the actual link
    const link = Data.get(element, `link${DATA_SUFFIX}`)
    if (link) {
      this._linkLeave(event, link)
      return
    }

    if (!this._isTouchMode() && this._opts.dropdownsHideTrigger !== 'click') {
      element.blur()
      const linkToggler = Data.get(element, `toggler${DATA_SUFFIX}`)
      if (linkToggler) {
        linkToggler.blur()
      }

      this._clearTimeout(this._dropdownsShowTimeout)
    }

    Data.delete(element, `mousedown${DATA_SUFFIX}`)

    Events.trigger(this._navbar, `mouseleave${API_EVENTS_SUFFIX}`, element)
  }

  _navKeyDown(event) {
    if (!this._handleEvents()) {
      return
    }

    switch (event.keyCode) {
      // Esc
      case 27: {
        const { target } = event
        // If has own sub and it's visible, hide it
        if (target?.matches(this._opts.selectorLink)) {
          const link = Data.get(target, `link${DATA_SUFFIX}`) || target
          const linkToggler = Data.get(link, `toggler${DATA_SUFFIX}`)
          const element = linkToggler || link
          const sub = Data.get(link, `sub${DATA_SUFFIX}`)
          if (sub && this._subIsVisible(sub)) {
            this._linkClick(event, element)
            event.preventDefault()
            return
          }
        }

        // Hide closest sub
        const closestSub = target?.closest(`${this._opts.selectorSub}`)
        if (closestSub) {
          const parentLink = Data.get(closestSub, `parent-link${DATA_SUFFIX}`)
          const parentLinkToggler = Data.get(parentLink, `toggler${DATA_SUFFIX}`)
          const element = parentLinkToggler || parentLink
          this._linkClick(event, element)
          element.focus()
          event.preventDefault()
        }

        return
      }

      // Space
      case 32: {
        const { target } = event
        // Toggle link's sub
        if (target?.matches(this._opts.selectorLink)) {
          this._linkClick(event, target)
          event.preventDefault()
        }
      }
    }
  }

  _navOut(event) {
    if (!this._handleEvents() || this._isTouchMode() || event.target === this._nav) {
      return
    }

    this._clearTimeout(this._dropdownsHideTimeout)

    // On focusout if there is no related target (i.e. another page element that was focused) it means the page lost focus so do not hide the sub menus
    if (this._opts.dropdownsHideTrigger !== 'click' || (event.type !== 'mouseout' && event.relatedTarget && (!event.target || !this._nav.contains(event.target)))) {
      this._dropdownsHideTimeout = window.setTimeout(() => {
        this.subHideAll()
      }, this._opts.dropdownsHideTimeout)
    }
  }

  _navOver(event) {
    if (!this._handleEvents() || this._isTouchMode() || event.target === this._nav) {
      return
    }

    this._clearTimeout(this._dropdownsHideTimeout)
  }

  _offcanvasOverlayClick(event) {
    if (!this._handleEvents()) {
      return
    }

    if (this._togglerAnchorHide) {
      this._togglerAnchorHide.click()
    }

    event.preventDefault()
  }

  _markCurrentLinkAsSelected() {
    const reDefaultDocument = /(index|default)\.[^#/?]*/i
    const reHash = /#.*/
    const locHref = window.location.href.replace(reDefaultDocument, '')
    const locHrefNoHash = locHref.replace(reHash, '')
    for (const link of Query.getAll(this._opts.selectorLink, this._nav)) {
      // if this is a split link toggler, skip it
      if (Data.get(link, `link${DATA_SUFFIX}`)) {
        continue
      }

      const href = link.href.replace(reDefaultDocument, '')
      if (href === locHref || href === locHrefNoHash) {
        link.classList.add(this._opts.classLinkSelected)
        link.setAttribute('aria-current', 'page')
        const linkToggler = Data.get(link, `toggler${DATA_SUFFIX}`)
        if (linkToggler) {
          linkToggler.classList.add(this._opts.classLinkSelected)
        }

        if (this._opts.markCurrentLinkParentsAsSelected) {
          for (const sub of Query.parentsUntil(link, this._opts.selectorNav, this._opts.selectorSub)) {
            const parentLink = Data.get(sub, `parent-link${DATA_SUFFIX}`)
            parentLink.classList.add(this._opts.classLinkSelected)
            const parentLinkToggler = Data.get(parentLink, `toggler${DATA_SUFFIX}`)
            if (parentLinkToggler) {
              parentLinkToggler.classList.add(this._opts.classLinkSelected)
            }
          }
        }
      }
    }
  }

  _setTogglerSubARIA(togglerElement, subElement) {
    const togglerId = togglerElement.getAttribute('id') || this._accessIdPrefix + (++this._idInc)
    const subId = subElement.getAttribute('id') || this._accessIdPrefix + (++this._idInc)

    togglerElement.setAttribute('id', togglerId)
    togglerElement.setAttribute('role', 'button')
    togglerElement.setAttribute('aria-controls', subId)
    togglerElement.setAttribute('aria-expanded', 'false')

    subElement.setAttribute('id', subId)
    subElement.setAttribute('aria-hidden', 'true')
    subElement.setAttribute('aria-labelledby', togglerId)
  }

  _subHide(element) {
    if (!this._subIsVisible(element)) {
      return
    }

    if (Events.trigger(this._navbar, `beforehide${API_EVENTS_SUFFIX}`, element).defaultPrevented) {
      return
    }

    this._animateHide(element)
    const parentLink = Data.get(element, `parent-link${DATA_SUFFIX}`)
    parentLink.classList.remove(this._opts.classLinkExpanded)
    const parentLinkToggler = Data.get(parentLink, `toggler${DATA_SUFFIX}`)
    if (parentLinkToggler) {
      parentLinkToggler.classList.remove(this._opts.classLinkExpanded)
      parentLinkToggler.setAttribute('aria-expanded', 'false')
    } else {
      parentLink.setAttribute('aria-expanded', 'false')
    }

    element.setAttribute('aria-hidden', 'true')
    this._visibleSubs.splice(this._visibleSubs.indexOf(element), 1)
    Events.trigger(this._navbar, `hide${API_EVENTS_SUFFIX}`, element)
  }

  _subHideSubs(level) {
    for (let index = this._visibleSubs.length - 1; index >= level; index--) {
      this._subHide(this._visibleSubs[index])
    }
  }

  _subIsVisible(element) {
    return element.classList.contains(this._opts.classShow)
  }

  /* eslint-disable complexity */
  // Maybe refactor this to lower complexity?
  _subPosition(element) {
    const parentItem = element.closest(this._opts.selectorItem)
    const level = Data.get(element, `level${DATA_SUFFIX}`)
    const mega = element.classList.contains(this._opts.classSubMega)
    const vertical = this._navbar.classList.contains(this._opts.classNavbarVertical)
    const horizontalParent = level === 2 && !vertical
    const rtl = Helpers.getComputedStyle(this._navbar).direction === 'rtl'
    let rightToLeft = (rtl && !this._opts.dropdownsDropReverseX) || (!rtl && this._opts.dropdownsDropReverseX)
    if (parentItem.matches(`[${DATA_ATTRIBUTE_PREFIX}drop-reverse-x]`)) {
      rightToLeft = !rightToLeft
    }

    let downToUp = this._opts.dropdownsDropReverseY
    if (parentItem.matches(`[${DATA_ATTRIBUTE_PREFIX}drop-reverse-y]`)) {
      downToUp = !downToUp
    }

    const xProperty = rightToLeft ? 'right' : 'left'
    const xPropertyCapitalized = xProperty.charAt(0).toUpperCase() + xProperty.slice(1)
    const yProperty = downToUp ? 'bottom' : 'top'
    const yPropertyCapitalized = yProperty.charAt(0).toUpperCase() + yProperty.slice(1)
    const parentItemRect = parentItem.getBoundingClientRect()
    const parentItemRectX = parentItemRect[xProperty]
    const parentItemRectY = parentItemRect[yProperty]
    const parentItemWidth = Helpers.getWidth(parentItem)
    const parentItemHeight = Helpers.getHeight(parentItem)
    const subComputedStyle = Helpers.getComputedStyle(element)
    const subOffsetX = level === 2 ? this._opts.dropdownsNavSubOffsetX : this._opts.dropdownsSubSubOffsetX
    const subOffsetY = level === 2 && !vertical ? this._opts.dropdownsNavSubOffsetY : this._opts.dropdownsSubSubOffsetY - Number.parseFloat(subComputedStyle[`border${yPropertyCapitalized}Width`], 10) - Number.parseFloat(subComputedStyle[`padding${yPropertyCapitalized}`], 10)
    let x = 0
    let y = 0

    if (horizontalParent) {
      x = subOffsetX
      y = parentItemHeight + subOffsetY
    } else {
      x = parentItemWidth + subOffsetX
      y = subOffsetY
    }

    // Mega subs are not positioned against their parent item (as it has position: static) so compensate that
    if (mega) {
      // Find closest positioned parent (e.g. might be the navbar, offcanvas element)
      const positionedParent = Query.closest(element.parentElement, parent => Helpers.getComputedStyle(parent).position !== 'static')
      if (positionedParent) {
        const positionedParentRect = positionedParent.getBoundingClientRect()
        const positionedParentComputedStyle = Helpers.getComputedStyle(positionedParent)
        if (horizontalParent) {
          y += Math.abs(parentItemRectY - positionedParentRect[yProperty]) - Number.parseFloat(positionedParentComputedStyle[`border${yPropertyCapitalized}Width`], 10)
        } else {
          x += Math.abs(parentItemRectX - positionedParentRect[xProperty]) - Number.parseFloat(positionedParentComputedStyle[`border${xPropertyCapitalized}Width`], 10)
        }
      }
    }

    // Keep sub in viewport
    if (this._opts.dropdownsKeepInViewport && !mega) {
      const viewportWidth = Helpers.getViewportWidth()
      const viewportHeight = Helpers.getViewportHeight()
      const subWidth = Helpers.getWidth(element)
      const subHeight = Helpers.getHeight(element)
      const parentItemX = rightToLeft ? viewportWidth - parentItemRectX : parentItemRectX
      const parentItemY = downToUp ? viewportHeight - parentItemRectY : parentItemRectY
      if (subWidth < viewportWidth) {
        if (horizontalParent) {
          if (parentItemX + x + subWidth > viewportWidth) {
            // Align against the opposite edge of the viewport
            x = viewportWidth - subWidth - parentItemX
          } else if (parentItemX + x < 0) {
            // Align against the same edge of the viewport
            x = -parentItemX
          }
        } else if (parentItemX + x + subWidth > viewportWidth) {
          if (subOffsetX + subWidth <= parentItemX) {
            // Flip position if there is enough space on the other side of the parent item
            x = -subOffsetX - subWidth
          } else if (parentItemX > viewportWidth - parentItemX - parentItemWidth + 1) {
            // If there is no space for a flip, align it against the edge of the viewport where there is more space
            // 1px added for consistent results when the space difference is only due to rounding
            x = -parentItemX
          } else {
            x = viewportWidth - subWidth - parentItemX
          }
        }
      } else {
        // If the sub cannot fit inside the viewport, align it against the same edge of the viewport
        x = -parentItemX
      }

      if (!horizontalParent) {
        if (subHeight < viewportHeight) {
          if (parentItemY + y + subHeight > viewportHeight) {
            // Align against the opposite edge of the viewport
            y = viewportHeight - subHeight - parentItemY
          } else if (parentItemY + y < 0) {
            // Align against the same edge of the viewport
            y = -parentItemY
          }
        } else {
          // If the sub cannot fit inside the viewport, align it against the top edge of the viewport
          y = downToUp ? viewportHeight - subHeight - parentItemY : -parentItemY
        }
      }
    }

    const elementStyle = element.style
    elementStyle.zIndex = this._zIndexInc = (this._zIndexInc || this._getRootZIndex()) + 1
    if (mega) {
      if (horizontalParent) {
        elementStyle[yProperty] = y + 'px'
      } else {
        elementStyle[xProperty] = x + 'px'
      }
    } else {
      elementStyle[xProperty] = x + 'px'
      elementStyle[yProperty] = y + 'px'
    }
  }
  /* eslint-enable complexity */

  _subResetPosition(element) {
    const elementStyle = element.style
    elementStyle.zIndex = ''
    elementStyle.top = ''
    elementStyle.left = ''
    elementStyle.bottom = ''
    elementStyle.right = ''
  }

  _subShow(element) {
    if (this._subIsVisible(element)) {
      return
    }

    if (!Data.get(element, `beforefirstshow-fired${DATA_SUFFIX}`)) {
      Data.set(element, `beforefirstshow-fired${DATA_SUFFIX}`, true)
      if (Events.trigger(this._navbar, `beforefirstshow${API_EVENTS_SUFFIX}`, element).defaultPrevented) {
        return
      }
    }

    if (Events.trigger(this._navbar, `beforeshow${API_EVENTS_SUFFIX}`, element).defaultPrevented) {
      return
    }

    Data.set(element, `shown-before${DATA_SUFFIX}`, true)

    const parentLink = Data.get(element, `parent-link${DATA_SUFFIX}`)
    parentLink.classList.add(this._opts.classLinkExpanded)
    const parentLinkToggler = Data.get(parentLink, `toggler${DATA_SUFFIX}`)
    if (parentLinkToggler) {
      parentLinkToggler.classList.add(this._opts.classLinkExpanded)
    }

    const isCollapsible = this._isCollapsible()
    if (isCollapsible) {
      this._subResetPosition(element)
    } else {
      this._subPosition(element)
    }

    this._animateShow(element)
    // Accessibility
    if (parentLinkToggler) {
      parentLinkToggler.setAttribute('aria-expanded', 'true')
    } else {
      parentLink.setAttribute('aria-expanded', 'true')
    }

    element.setAttribute('aria-hidden', 'false')
    // Store sub menu in visible array
    this._visibleSubs.push(element)
    Events.trigger(this._navbar, `show${API_EVENTS_SUFFIX}`, element)
  }

  _togglerAnchorHideClick(event) {
    if (!this._handleEvents()) {
      return
    }

    if (Events.trigger(this._navbar, `beforehide${API_EVENTS_SUFFIX}`, this._collapse || this._offcanvas || null).defaultPrevented) {
      return
    }

    if (this._opts.collapsibleResetSubsOnClickOn === 'toggler') {
      this.subHideAll()
    }

    if (this._collapse) {
      this._animateHide(this._collapse)
    }

    if (this._offcanvas) {
      this._animateHide(this._offcanvas)
    }

    if (this._offcanvasOverlay) {
      this._animateHide(this._offcanvasOverlay)
    }

    if (this._togglerState) {
      this._togglerState.classList.remove(this._opts.classShow)
      // Just in case try to remove the hash too
      window.location.hash = window.location.hash.replace(new RegExp(`^#${this._togglerState.getAttribute('id')}$`), '')
    }

    if (this._togglerAnchorHide) {
      this._togglerAnchorShow.focus()
    }

    event.preventDefault()
    Events.trigger(this._navbar, `hide${API_EVENTS_SUFFIX}`, this._collapse || this._offcanvas || null)
  }

  _togglerAnchorShowClick(event, element) {
    if (!this._handleEvents()) {
      return
    }

    if (!Data.get(element, `beforefirstshow-fired${DATA_SUFFIX}`)) {
      Data.set(element, `beforefirstshow-fired${DATA_SUFFIX}`, true)
      if (Events.trigger(this._navbar, `beforefirstshow${API_EVENTS_SUFFIX}`, this._collapse || this._offcanvas || null).defaultPrevented) {
        return
      }
    }

    if (Events.trigger(this._navbar, `beforeshow${API_EVENTS_SUFFIX}`, this._collapse || this._offcanvas || null).defaultPrevented) {
      return
    }

    if (this._collapse) {
      this._animateShow(this._collapse)
    }

    if (this._offcanvas) {
      this._animateShow(this._offcanvas)
    }

    if (this._offcanvasOverlay) {
      this._animateShow(this._offcanvasOverlay)
    }

    if (this._togglerState) {
      this._togglerState.classList.add(this._opts.classShow)
    }

    if (this._togglerAnchorHide) {
      this._togglerAnchorHide.focus()
    }

    event.preventDefault()
    Events.trigger(this._navbar, `show${API_EVENTS_SUFFIX}`, this._collapse || this._offcanvas || null)
  }

  _winResize(event) {
    if (!this._handleEvents()) {
      return
    }

    // Hide subs on resize - on mobile do it only on orientation change
    if (!('onorientationchange' in window) || event.type === 'orientationchange') {
      const isCollapsible = this._isCollapsible()
      // If it was collapsible before resize and still is, don't do it
      if (!(this._wasCollapsible && isCollapsible)) {
        this.subHideAll()
      }

      this._wasCollapsible = isCollapsible
    }
  }

  // Static
  static destroy() {
    while (navbars.length > 0) {
      navbars[0].destroy()
    }

    MouseInputDetect.disable()
  }

  static subHideAll() {
    for (const navbar of navbars) {
      navbar.subHideAll()
    }
  }
}

export default SmartMenus
