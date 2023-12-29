/*
 * SmartMenus
 * http://www.smartmenus.org/
 * Copyright (c) since 2001 Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */

const DEFAULTS = {
  collapsibleActivateSelectedLinkOnInit: false,
  collapsibleBehaviorAccordion: false,
  collapsibleResetSubsOnClickOn: 'toggler',
  dropdownsShowTrigger: 'click',
  dropdownsShowTimeout: 250,
  dropdownsHideTrigger: 'click',
  dropdownsHideTimeout: 500,
  dropdownsDropReverseX: false,
  dropdownsDropReverseY: false,
  dropdownsNavSubOffsetX: 0,
  dropdownsNavSubOffsetY: 0,
  dropdownsSubSubOffsetX: 0,
  dropdownsSubSubOffsetY: 0,
  dropdownsKeepInViewport: true,
  markCurrentLinkAsSelectedOnInit: false,
  markCurrentLinkParentsAsSelected: false,
  resetTogglerOnLinkSelect: false,
  showSubOnSplitLinkSelect: false,
  classNavbarVertical: 'sm-navbar--vertical',
  classNavbarDropReverseY: 'sm-navbar--drop-reverse-y',
  classNavbarDropReverseX: 'sm-navbar--drop-reverse-x',
  classSubMega: 'sm-sub--mega',
  classLinkExpanded: 'sm-expanded',
  classLinkSelected: 'sm-selected',
  classLinkDisabled: 'sm-disabled',
  classLinkHasSub: 'sm-has-sub',
  classShow: 'sm-show',
  classShowing: 'sm-showing',
  classHiding: 'sm-hiding',
  selectorTogglerState: '.sm-toggler-state',
  selectorTogglerAnchorShow: '.sm-toggler-anchor--show',
  selectorTogglerAnchorHide: '.sm-toggler-anchor--hide',
  selectorCollapse: '.sm-collapse',
  selectorOffcanvas: '.sm-offcanvas',
  selectorOffcanvasOverlay: '.sm-offcanvas-overlay',
  selectorNav: '.sm-nav',
  selectorSub: '.sm-sub',
  selectorItem: '.sm-nav-item, .sm-sub-item',
  selectorLink: '.sm-nav-link, .sm-sub-link',
  selectorLinkSplit: '.sm-nav-link--split, .sm-sub-link--split'
}

export default DEFAULTS
