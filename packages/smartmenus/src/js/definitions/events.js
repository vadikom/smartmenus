/*
 * SmartMenus
 * http://www.smartmenus.org/
 * Copyright (c) since 2001 Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */

const EVENTS = [
  {
    label: 'activate',
    detail: 'The nav link or sub link element that the event has been triggered for',
    cancellable: true,
    description: 'Fired when a link is activated, right before its sub is shown (if it has one). You can cancel the event by calling `e.preventDefault()` and the item\'s sub will not be shown.',
    appliesTo: ['sm-nav-link', 'sm-sub-link']
  },
  {
    label: 'beforefirstshow',
    detail: 'The nav or sub element that the event has been triggered for',
    cancellable: true,
    description: 'Fired only once right before the nav or a sub is shown for the first time. You could use it, for example, for some initialization tasks that need to be done just once. You can cancel the event by calling `e.preventDefault()` and the nav or sub will not be shown.',
    appliesTo: ['sm-nav', 'sm-sub']
  },
  {
    label: 'beforehide',
    detail: 'The nav or sub element that the event has been triggered for',
    cancellable: true,
    description: 'Fired before the nav or a sub is hidden. You can cancel the event by calling `e.preventDefault()` and the nav or sub will not be hidden.',
    appliesTo: ['sm-nav', 'sm-sub']
  },
  {
    label: 'beforeshow',
    detail: 'The nav or sub element that the event has been triggered for',
    cancellable: true,
    description: 'Fired before the nav or a sub is shown. You can cancel the event by calling `e.preventDefault()` and the nav or sub will not be shown.',
    appliesTo: ['sm-nav', 'sm-sub']
  },
  {
    label: 'blur',
    detail: 'The nav link or sub link element that the event has been triggered for',
    cancellable: false,
    description: 'Fired when a link loses focus.',
    appliesTo: ['sm-nav-link', 'sm-sub-link']
  },
  {
    label: 'click',
    detail: 'The nav link or sub link element that the event has been triggered for',
    cancellable: true,
    description: 'Fired when a link is clicked. You can cancel the event by calling `e.preventDefault()` and the link will not be selected and if there is a sub which should appear on click, it won\'t be shown, too.',
    appliesTo: ['sm-nav-link', 'sm-sub-link']
  },
  {
    label: 'focus',
    detail: 'The nav link or sub link element that the event has been triggered for',
    cancellable: false,
    description: 'Fired when a link is focused.',
    appliesTo: ['sm-nav-link', 'sm-sub-link']
  },
  {
    label: 'hide',
    detail: 'The nav or sub element that the event has been triggered for',
    cancellable: false,
    description: 'Fired right after the nav or a sub is hidden.',
    appliesTo: ['sm-nav', 'sm-sub']
  },
  {
    label: 'hideall',
    cancellable: false,
    description: 'Fired when the whole nav tree is reset (e.g. on document click, onmouseout, etc. depending on what hide triggers are configured for the script).'
  },
  {
    label: 'mouseenter',
    detail: 'The nav link or sub link element that the event has been triggered for',
    cancellable: false,
    description: 'Fired when a link is hovered.',
    appliesTo: ['sm-nav-link', 'sm-sub-link']
  },
  {
    label: 'mouseleave',
    detail: 'The nav link or sub link element that the event has been triggered for',
    cancellable: false,
    description: 'Fired when a link is hovered out.',
    appliesTo: ['sm-nav-link', 'sm-sub-link']
  },
  {
    label: 'select',
    detail: 'The nav link or sub link element that the event has been triggered for',
    cancellable: true,
    description: 'Fired when a link is selected, right before the browser loads it. You can cancel the event by calling `e.preventDefault()` and the link will not be loaded by the browser.',
    appliesTo: ['sm-nav-link', 'sm-sub-link']
  },
  {
    label: 'show',
    detail: 'The nav or sub element that the event has been triggered for',
    cancellable: false,
    description: 'Fired right after the nav or a sub is shown.',
    appliesTo: ['sm-nav', 'sm-sub']
  }
]

export default EVENTS
