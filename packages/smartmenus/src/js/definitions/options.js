/*
 * SmartMenus
 * http://www.smartmenus.org/
 * Copyright (c) since 2001 Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */

import DEFAULTS from '../defaults.js'

const OPTIONS = [
  {
    label: 'collapsibleActivateSelectedLinkOnInit',
    description: 'On init activate the link that has the `classLinkSelected` class (this will show the sub that contains it).'
  },
  {
    label: 'collapsibleBehaviorAccordion',
    description: 'On sub expand reset any visible subs from deeper levels or other branches.'
  },
  {
    label: 'collapsibleResetSubsOnClickOn',
    lookup: ['none', 'toggler', 'page'],
    description: 'Reset the subs on click on...'
  },
  {
    label: 'dropdownsShowTrigger',
    lookup: ['click', 'mouseover', 'click-then-mouseover'],
    description: 'Dropdowns show trigger event.'
  },
  {
    label: 'dropdownsShowTimeout',
    description: 'Timeout before showing the subs (matters only when `dropdownsShowTrigger !== \'click\'`).'
  },
  {
    label: 'dropdownsHideTrigger',
    lookup: ['click', 'mouseout'],
    description: 'Dropdowns hide trigger event.'
  },
  {
    label: 'dropdownsHideTimeout',
    description: 'Timeout before hiding the subs (matters only when `dropdownsHideTrigger === \'mouseout\'`).'
  },
  {
    label: 'dropdownsDropReverseX',
    description: 'Right to left display of the subs (and the opposite on right-to-left pages).'
  },
  {
    label: 'dropdownsDropReverseY',
    description: 'Down to up display of the subs.'
  },
  {
    label: 'dropdownsNavSubOffsetX',
    description: 'Pixels offset from default position.'
  },
  {
    label: 'dropdownsNavSubOffsetY',
    description: 'Pixels offset from default position.'
  },
  {
    label: 'dropdownsSubSubOffsetX',
    description: 'Pixels offset from default position.'
  },
  {
    label: 'dropdownsSubSubOffsetY',
    description: 'Pixels offset from default position.'
  },
  {
    label: 'dropdownsKeepInViewport',
    description: 'Reposition the subs if needed to make sure they always appear inside the viewport.'
  },
  {
    label: 'markCurrentLinkAsSelectedOnInit',
    description: 'Automatically add the `classLinkSelected` class to the link element linking to the current URL.'
  },
  {
    label: 'markCurrentLinkParentsAsSelected',
    description: 'Add the `classLinkSelected` class also to the link elements of all ancestor items of the current one.'
  },
  {
    label: 'resetTogglerOnLinkSelect',
    description: 'Reset the toggler on link select which would hide the offcanvas/collapse.'
  },
  {
    label: 'showSubOnSplitLinkSelect',
    description: 'Applies to split links only (that have both a link element and sub toggler element). Useful for single page applications (SPA) that use pushState/hash changes for navigation instead of full page reloads.'
  },
  {
    label: 'classNavbarVertical',
    description: 'A class that signifies the navbar as vertical.'
  },
  {
    label: 'classNavbarDropReverseY',
    description: 'A class that signifies the subs as drop up instead of drop down from their parent link.'
  },
  {
    label: 'classNavbarDropReverseX',
    description: 'A class that signifies the subs as drop left instead of drop right from their parent link (and the opposite on right-to-left pages).'
  },
  {
    label: 'classSubMega',
    description: 'A class that signifies a sub as mega menu.'
  },
  {
    label: 'classLinkExpanded',
    description: 'A class that signifies a link as expanded. Set by the script when the sub of an item is expanded/shown. Applies to `selectorLink` elements.'
  },
  {
    label: 'classLinkSelected',
    description: 'A class that signifies a link as selected so it can be styled differently from the rest. It can be set either manually or the script can be configured to automatically set it to the link to the current loaded page URL via the `selectCurrentLink: true` option and also to the links of its ancestor items via the `selectCurrentLinkAncestors: true` option. Applies to `selectorLink` elements.'
  },
  {
    label: 'classLinkDisabled',
    description: 'A class that signifies a link as disabled. Clicks on disabled links are neglected by the script. Applies to `selectorLink` elements.'
  },
  {
    label: 'classLinkHasSub',
    description: 'A class that signifies a link as one that has a sub. This class is set by the script on init to the links of all items that have a sub. Applies to `selectorLink` elements.'
  },
  {
    label: 'classShow',
    description: 'A class that signifies an element is visible. Set by the script to elements that are made visible (e.g. could be a sub, an offcanvas, etc.).'
  },
  {
    label: 'classShowing',
    description: 'A class that signifies an element as being animated while showing (this class is set/unset by the script while any CSS animations are running when showing an element).'
  },
  {
    label: 'classHiding',
    description: 'A class that signifies an element as being animated while hiding (this class is set/unset by the script while any CSS animations are running when hiding an element).'
  },
  {
    label: 'selectorTogglerState',
    description: 'CSS selector that matches the toggler state element.'
  },
  {
    label: 'selectorTogglerAnchorShow',
    description: 'CSS selector that matches the toggler anchor show element.'
  },
  {
    label: 'selectorTogglerAnchorHide',
    description: 'CSS selector that matches the toggler anchor hide element.'
  },
  {
    label: 'selectorCollapse',
    description: 'CSS selector that matches the collapse element.'
  },
  {
    label: 'selectorOffcanvas',
    description: 'CSS selector that matches the offcanvas element.'
  },
  {
    label: 'selectorOffcanvasOverlay',
    description: 'CSS selector that matches the offcanvas overlay element.'
  },
  {
    label: 'selectorNav',
    description: 'CSS selector that matches the nav element.'
  },
  {
    label: 'selectorSub',
    description: 'CSS selector that matches the sub elements.'
  },
  {
    label: 'selectorItem',
    description: 'CSS selector that matches the item elements.'
  },
  {
    label: 'selectorLink',
    description: 'CSS selector that matches the link elements.'
  },
  {
    label: 'selectorLinkSplit',
    description: 'CSS selector that matches the link split elements.'
  }
]

// Extend options with default values
for (const option of OPTIONS) {
  const defaultValue = DEFAULTS[option.label]
  if (defaultValue !== undefined) {
    option.type = typeof defaultValue
    option.value = defaultValue
  }
}

export default OPTIONS
