/*
 * SmartMenus
 * http://www.smartmenus.org/
 * Copyright (c) since 2001 Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */

const METHODS = [
  {
    label: 'destroy',
    type: 'static',
    description: 'Destroys all navbar instances and cleans up.',
    code: 'SmartMenus.destroy()'
  },
  {
    label: 'subHideAll',
    type: 'static',
    description: 'Hides (resets) all subs of all navbar instances.',
    code: 'SmartMenus.subHideAll()'
  },
  {
    label: 'blur',
    type: 'instance',
    description: 'Use the native JavaScript method for any `.sm-nav-link` or `.sm-sub-link` element if you need to. This will deactivate the item and hide any visible subs.',
    code: 'document.querySelector(\'#my-nav-link\').blur()'
  },
  {
    label: 'destroy',
    type: 'instance',
    description: 'Destroys the navbar instance and cleans up.',
    code: `const navbar1 = new SmartMenus(document.querySelector('#navbar1'))

navbar1.destroy()`
  },
  {
    label: 'disable',
    type: 'instance',
    description: 'Disables the script (all event handlers).',
    code: `const navbar1 = new SmartMenus(document.querySelector('#navbar1'))

navbar1.disable()`
  },
  {
    label: 'enable',
    type: 'instance',
    description: 'Enables the script (all event handlers) after it has been disabled.',
    code: `const navbar1 = new SmartMenus(document.querySelector('#navbar1'))

navbar1.enable()`
  },
  {
    label: 'focus',
    type: 'instance',
    description: 'Use the native JavaScript method for any `.sm-nav-link` or `.sm-sub-link` element if you need to. Note that you may need to call `linkActivate` first to make sure the sub containing the link is visible when you try to focus it.',
    code: 'document.querySelector(\'#my-nav-link\').focus()'
  },
  {
    label: 'linkActivate',
    type: 'instance',
    params: [
      {
        name: 'element',
        type: 'HTMLElement',
        description: 'Any link element which matches the "selectorLink" selector'
      },
      {
        name: 'hideSubs',
        type: 'string',
        lookup: ['none', 'same', 'deeper', 'self'],
        default: 'none',
        description: 'Hide any visible subs from the same or deeper levels or only the self sub (if it exists)'
      },
      {
        name: 'showSub',
        type: 'boolean',
        default: true,
        description: 'Should the link\'s sub be shown (if it exists)?'
      }
    ],
    description: 'Activates any `.sm-nav-link` or `.sm-sub-link` element. This will show its sub (if it has a sub). If you would like to also send keyboard focus to the link, you can additionally call its native `focus` method.',
    code: `const navbar1 = new SmartMenus(document.querySelector('#navbar1'))
const myNavLink = document.querySelector('#my-nav-link')

// Activate the link
navbar1.linkActivate(myNavLink)

// Focus the link
myNavLink.focus()`
  },
  {
    label: 'refresh',
    type: 'instance',
    description: 'Refreshes (re-initializes) the navbar after any DOM operations might have affected it - e.g. adding/removing items and subs, etc.',
    code: `const navbar1Elm = document.querySelector('#navbar1')
const navbar1 = new SmartMenus(navbar1Elm)

// Append a new nav item with a sub
navbar1Elm.querySelector('.sm-nav').insertAdjacentHTML('beforeend', \`
<li class="sm-nav-item">
  <a class="sm-nav-link sm-sub-toggler" href="#">New item</a>
  <ul class="sm-sub">
    <li class="sm-sub-item"><a class="sm-sub-link" href="#">New item</a></li>
    <li class="sm-sub-item"><a class="sm-sub-link" href="#">New item</a></li>
    <li class="sm-sub-item"><a class="sm-sub-link" href="#">New item</a></li>
  </ul>
</li>\`)

// Refresh the navbar after any DOM changes
navbar1.refresh()`
  },
  {
    label: 'subHideAll',
    type: 'instance',
    description: 'Hides (resets) all subs.',
    code: `const navbar1 = new SmartMenus(document.querySelector('#navbar1'))

navbar1.subHideAll()`
  }
]

export default METHODS
