/*
 * SmartMenus
 * http://www.smartmenus.org/
 * Copyright (c) since 2001 Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */

const COMPONENTS = [
  {
    label: 'Navbar',
    value: 'sm-navbar',
    description: 'The main navbar element. Usually a `<nav>` element.',
    variants: [
      {
        label: 'Sticky top',
        value: 'sm-navbar--sticky-top',
        description: 'Navbar with `position: sticky` applied that will stick to the top.',
        disallow: ['sm-navbar--fixed-top',
          'sm-navbar--fixed-bottom',
          'sm-navbar--sidebar-only']
      },
      {
        label: 'Sticky bottom',
        value: 'sm-navbar--sticky-bottom',
        description: 'Navbar with `position: sticky` applied that will stick to the bottom.',
        disallow: ['sm-navbar--fixed-top',
          'sm-navbar--fixed-bottom',
          'sm-navbar--sidebar-only']
      },
      {
        label: 'Fixed top',
        value: 'sm-navbar--fixed-top',
        description: 'Navbar with `position: fixed` applied that will stay fixed to the top.',
        disallow: [
          'sm-navbar--inline',
          'sm-navbar--sticky-top',
          'sm-navbar--sticky-bottom',
          'sm-navbar--fixed-bottom',
          'sm-navbar--sidebar-only'
        ]
      },
      {
        label: 'Fixed bottom',
        value: 'sm-navbar--fixed-bottom',
        description: 'Navbar with `position: fixed` applied that will stay fixed to the bottom.',
        disallow: [
          'sm-navbar--inline',
          'sm-navbar--sticky-top',
          'sm-navbar--sticky-bottom',
          'sm-navbar--fixed-top',
          'sm-navbar--sidebar-only'
        ],
        combineHint: ['sm-navbar--drop-reverse-y']
      },
      {
        label: 'Offcanvas left',
        value: 'sm-navbar--offcanvas-left',
        description: 'Navbar with offcanvas left content on small screen devices.',
        disallow: [
          'sm-navbar--offcanvas-right',
          'sm-navbar--offcanvas-top',
          'sm-navbar--offcanvas-bottom',
          'sm-navbar--sidebar-only'
        ],
        subs: ['sm-navbar--offcanvas-only']
      },
      {
        label: 'Offcanvas right',
        value: 'sm-navbar--offcanvas-right',
        description: 'Navbar with offcanvas right content on small screen devices.',
        disallow: [
          'sm-navbar--offcanvas-left',
          'sm-navbar--offcanvas-top',
          'sm-navbar--offcanvas-bottom',
          'sm-navbar--sidebar-only'
        ],
        subs: ['sm-navbar--offcanvas-only']
      },
      {
        label: 'Offcanvas top',
        value: 'sm-navbar--offcanvas-top',
        description: 'Navbar with offcanvas top content on small screen devices.',
        disallow: [
          'sm-navbar--offcanvas-left',
          'sm-navbar--offcanvas-right',
          'sm-navbar--offcanvas-bottom',
          'sm-navbar--sidebar-only',
          'sm-navbar--dropdowns-only'
        ],
        subs: ['sm-navbar--offcanvas-only']
      },
      {
        label: 'Offcanvas bottom',
        value: 'sm-navbar--offcanvas-bottom',
        description: 'Navbar with offcanvas bottom content on small screen devices.',
        disallow: [
          'sm-navbar--offcanvas-left',
          'sm-navbar--offcanvas-right',
          'sm-navbar--offcanvas-top',
          'sm-navbar--sidebar-only',
          'sm-navbar--dropdowns-only'
        ],
        subs: ['sm-navbar--offcanvas-only']
      },
      {
        label: 'Offcanvas only',
        value: 'sm-navbar--offcanvas-only',
        description: 'Navbar with offcanvas content on all screen sizes devices.',
        disallow: [
          'sm-navbar--inline',
          'sm-navbar--sidebar-left',
          'sm-navbar--sidebar-right',
          'sm-navbar--sidebar-centered',
          'sm-navbar--sidebar-only'
        ],
        combineHint: ['sm-navbar--vertical', 'sm-navbar--collapsible-only'],
        parents: [
          'sm-navbar--offcanvas-left',
          'sm-navbar--offcanvas-right',
          'sm-navbar--offcanvas-top',
          'sm-navbar--offcanvas-bottom'
        ]
      },
      {
        label: 'Sidebar left',
        value: 'sm-navbar--sidebar-left',
        description: 'Sidebar left navbar on large screen devices. You will probably need to apply respective side margin/padding to your page content to provide space for the sidebar.',
        disallow: ['sm-navbar--inline', 'sm-navbar--sidebar-right', 'sm-navbar--offcanvas-only'],
        combineHint: ['sm-navbar--vertical', 'sm-navbar--offcanvas-left', 'sm-navbar--collapsible-only'],
        subs: ['sm-navbar--sidebar-only', 'sm-navbar--sidebar-centered'],
        customProperties: [
          {
            label: '--sm-navbar-sidebar-width',
            type: 'string',
            value: '300px',
            description: 'Width of the sidebar.'
          }
        ]
      },
      {
        label: 'Sidebar right',
        value: 'sm-navbar--sidebar-right',
        description: 'Sidebar right navbar on large screen devices. You will probably need to apply respective side margin/padding to your page content to provide space for the sidebar.',
        disallow: ['sm-navbar--inline', 'sm-navbar--sidebar-left', 'sm-navbar--offcanvas-only'],
        combineHint: ['sm-navbar--vertical', 'sm-navbar--offcanvas-right', 'sm-navbar--collapsible-only'],
        subs: ['sm-navbar--sidebar-only', 'sm-navbar--sidebar-centered']
      },
      {
        label: 'Sidebar centered',
        value: 'sm-navbar--sidebar-centered',
        description: 'Sidebar navbar on a page with centered layout. You will probably need to apply respective side margin/padding to your page content to provide space for the sidebar.',
        disallow: ['sm-navbar--inline', 'sm-navbar--offcanvas-only'],
        parents: ['sm-navbar--sidebar-left', 'sm-navbar--sidebar-right']
      },
      {
        label: 'Sidebar only',
        value: 'sm-navbar--sidebar-only',
        description: 'Sidebar navbar on all screen sizes devices. You will probably need to apply respective side margin/padding to your page content to provide space for the sidebar.',
        disallow: [
          'sm-navbar--inline',
          'sm-navbar--fixed-top',
          'sm-navbar--fixed-bottom',
          'sm-navbar--sticky-top',
          'sm-navbar--sticky-bottom',
          'sm-navbar--offcanvas-left',
          'sm-navbar--offcanvas-right',
          'sm-navbar--offcanvas-top',
          'sm-navbar--offcanvas-bottom',
          'sm-navbar--offcanvas-only'
        ],
        combineHint: ['sm-navbar--vertical', 'sm-navbar--collapsible-only'],
        parents: ['sm-navbar--sidebar-left', 'sm-navbar--sidebar-right']
      },
      {
        label: 'Vertical',
        value: 'sm-navbar--vertical',
        description: 'Vertical navbar that will take the full width of its parent element.',
        disallow: ['sm-navbar--collapsible-only', 'sm-navbar--inline']
      },
      {
        label: 'Inline',
        value: 'sm-navbar--inline',
        description: 'Inline navbar that will be aligned according to the parent element\'s `text-align` style.',
        disallow: [
          'sm-navbar--vertical',
          'sm-navbar--fixed-top',
          'sm-navbar--fixed-bottom',
          'sm-navbar--offcanvas-only',
          'sm-navbar--sidebar-left',
          'sm-navbar--sidebar-right',
          'sm-navbar--sidebar-only',
          'sm-navbar--collapsible-only'
        ]
      },
      {
        label: 'Collapsible only',
        value: 'sm-navbar--collapsible-only',
        description: 'Use only collapsible mode on all screen sizes devices (by default you get dropdowns on large screen devices and collapsible on small screen devices).',
        disallow: [
          'sm-navbar--dropdowns-only',
          'sm-navbar--vertical',
          'sm-navbar--inline',
          'sm-navbar--drop-reverse-y',
          'sm-navbar--drop-reverse-x'
        ]
      },
      {
        label: 'Dropdowns only',
        value: 'sm-navbar--dropdowns-only',
        description: 'Use only dropdowns on all screen sizes devices (by default you get dropdowns on large screen devices and collapsible on small screen devices).',
        disallow: [
          'sm-navbar--offcanvas-top',
          'sm-navbar--offcanvas-bottom',
          'sm-navbar--collapsible-only'
        ]
      },
      {
        label: 'Drop reverse y',
        value: 'sm-navbar--drop-reverse-y',
        description: 'Make the subs drop up instead of drop down from their parent item.',
        disallow: ['sm-navbar--collapsible-only']
      },
      {
        label: 'Drop reverse x',
        value: 'sm-navbar--drop-reverse-x',
        description: 'Make the subs drop left instead of drop right from their parent item (and the opposite on right-to-left pages).',
        disallow: ['sm-navbar--collapsible-only']
      }
    ]
  },
  {
    label: 'Container',
    value: 'sm-container',
    description: 'Container element that can be used to constrain the width of the navbar content.'
  },
  {
    label: 'Toggler',
    value: 'sm-toggler',
    description: 'The `.sm-toggler` is used for toggling the visibility of a `.sm-collapse` or an `.sm-offcanvas` element inside the navbar. It must be a previous sibling to either of those elements.'
  },
  {
    label: 'Collapse',
    value: 'sm-collapse',
    description: 'The `.sm-collapse` container element can be used to toggle the visibility of the content inside it. It is normally used for the `.sm-nav` element but you can put any other content inside it. It requires a previous sibling `.sm-toggler` element in the source.'
  },
  {
    label: 'Offcanvas',
    value: 'sm-offcanvas',
    description: 'Any content you put inside an `.sm-offcanvas` container element will be displayed in a toggleable offcanvas. It is normally used for the `.sm-nav` element but you can put any other content inside it. It requires a previous sibling `.sm-toggler` element in the source,'
  },
  {
    label: 'Offcanvas Overlay',
    value: 'sm-offcanvas-overlay',
    description: 'An empty element that simply creates the translucent overlay beneath an offcanvas. Should be used only in combination with an `.sm-offcanvas` element.'
  },
  {
    label: 'Brand',
    value: 'sm-brand',
    description: 'Can be used to display a branding text or logo image. Usually a heading element (e.g. `<h1>`).'
  },
  {
    label: 'Nav',
    value: 'sm-nav',
    description: 'The `.sm-nav` element represents your navigation tree structure. Usually a `<ul>` element with unlimited levels of sub `<ul>` elements.',
    variants: [
      {
        label: 'Left',
        value: 'sm-nav--left',
        description: 'Left-aligned nav.',
        disallow: ['sm-nav--center', 'sm-nav--right', 'sm-nav--fill', 'sm-nav--justify']
      },
      {
        label: 'Center',
        value: 'sm-nav--center',
        description: 'Center-aligned nav.',
        disallow: ['sm-nav--left', 'sm-nav--right', 'sm-nav--fill', 'sm-nav--justify']
      },
      {
        label: 'Right',
        value: 'sm-nav--right',
        description: 'Right-aligned nav.',
        disallow: ['sm-nav--left', 'sm-nav--center', 'sm-nav--fill', 'sm-nav--justify']
      },
      {
        label: 'Fill',
        value: 'sm-nav--fill',
        description: 'Full-width nav with proportional-width items that fill all the space.',
        disallow: ['sm-nav--left', 'sm-nav--center', 'sm-nav--right', 'sm-nav--justify']
      },
      {
        label: 'Justify',
        value: 'sm-nav--justify',
        description: 'Full-width nav with equal-width items that fill all the space.',
        disallow: ['sm-nav--left', 'sm-nav--center', 'sm-nav--right', 'sm-nav--fill']
      }
    ]
  },
  {
    label: 'Nav Item',
    value: 'sm-nav-item',
    description: 'The container (wrapper) element of a `.sm-nav-link` element and its `.sm-sub` element (if it has a sub).'
  },
  {
    label: 'Nav Item Separator',
    value: 'sm-nav-item-separator',
    description: 'An empty element that creates a separator between two `.sm-nav-item` elements.'
  },
  {
    label: 'Nav Link',
    value: 'sm-nav-link',
    description: 'The link element of a `.sm-nav-item` element.',
    variants: [
      {
        label: 'Split',
        value: 'sm-nav-link--split',
        description: 'Split `.sm-nav-link` that has a separate `.sm-sub-toggler` button.'
      }
    ]
  },
  {
    label: 'Sub Toggler',
    value: 'sm-sub-toggler',
    description: 'Adding the `.sm-sub-toggler` class to any `.sm-nav-link` or `.sm-sub-link` element will make it display a sub indicator caret.'
  },
  {
    label: 'Sub',
    value: 'sm-sub',
    description: 'A sub element that is part of the navigation tree structure. Usually a `<ul>` element with unlimited levels of sub `<ul>` elements. It must be an adjacent element in the DOM to its related `.sm-nav-link`/`.sm-sub-link` element and usually both are direct children of their related `.sm-nav-item`/`.sm-sub-item` element.',
    variants: [
      {
        label: 'Mega',
        value: 'sm-sub--mega',
        description: `Mega subs will take the full width/height of the navbar based on its orientation.

You can include any HTML content in a mega sub.

Please note that the \`dropdownsKeepInViewport\` script option has no effect for mega subs.`
      }
    ]
  },
  {
    label: 'Sub Item',
    value: 'sm-sub-item',
    description: 'The container (wrapper) element of a `.sm-sub-link` element and its `.sm-sub` element (if it has a sub).'
  },
  {
    label: 'Sub Item Separator',
    value: 'sm-sub-item-separator',
    description: 'An empty element that creates a separator between two `.sm-sub-item` elements.'
  },
  {
    label: 'Sub Link',
    value: 'sm-sub-link',
    description: 'The link element of a `.sm-sub-item` element.',
    variants: [
      {
        label: 'Split',
        value: 'sm-sub-link--split',
        description: 'Split `.sm-sub-link` that has a separate `.sm-sub-toggler` button.'
      }
    ]
  }
]

export const LAYOUT_CUSTOM_PROPERTIES = [
  {
    label: '--sm-navbar-z-index',
    type: 'string',
    value: '9999',
    description: 'The navbar `z-index`.',
    appliesTo: ['sm-navbar']
  },
  {
    label: '--sm-navbar-sticky-top-offset',
    type: 'string',
    value: '0',
    description: 'Top offset of a sticky navbar.',
    appliesTo: ['sm-navbar--sticky-top']
  },
  {
    label: '--sm-navbar-sticky-bottom-offset',
    type: 'string',
    value: '0',
    description: 'Bottom offset of a sticky navbar.',
    appliesTo: ['sm-navbar--sticky-bottom']
  },
  {
    label: '--sm-navbar-sidebar-width',
    type: 'string',
    value: '300px',
    description: 'Width of the sidebar.',
    appliesTo: ['sm-navbar--sidebar-left', 'sm-navbar--sidebar-right']
  },
  {
    label: '--sm-navbar-sidebar-centered-layout-max-width',
    type: 'string',
    value: '1200px',
    description: 'Max-width of the centered layout of your page.',
    appliesTo: ['sm-navbar--sidebar-centered']
  },
  {
    label: '--sm-container-max-width',
    type: 'string',
    value: '960px',
    description: 'Max-width of the container element.',
    appliesTo: ['sm-container']
  },
  {
    label: '--sm-collapse-max-height',
    type: 'string',
    value: 'calc(100vh - 70px)',
    description: 'Maximum height of the collapse element. Applies to sticky or fixed navbars.',
    appliesTo: ['sm-collapse']
  },
  {
    label: '--sm-collapse-show-animation',
    type: 'string',
    value: 'sm-ani-collapse 0.25s ease-in',
    description: 'Collapse show animation (CSS `animation` shorthand property)',
    appliesTo: ['sm-collapse']
  },
  {
    label: '--sm-collapse-hide-animation',
    type: 'string',
    value: 'sm-ani-collapse 0.25s ease-in reverse',
    description: 'Collapse hide animation (CSS `animation` shorthand property)',
    appliesTo: ['sm-collapse']
  },
  {
    label: '--sm-offcanvas-width',
    type: 'string',
    value: '300px',
    description: 'Width of the offcanvas (for left and right offcanvas).',
    appliesTo: ['sm-navbar--offcanvas-left', 'sm-navbar--offcanvas-right']
  },
  {
    label: '--sm-offcanvas-overlay-bg',
    type: 'string',
    value: 'rgba(0, 0, 0, 0.3)',
    description: 'Background of the offcanvas overlay.',
    appliesTo: ['sm-navbar--offcanvas-left', 'sm-navbar--offcanvas-right', 'sm-navbar--offcanvas-top', 'sm-navbar--offcanvas-bottom']
  },
  {
    label: '--sm-sub-min-width',
    type: 'string',
    value: '12em',
    description: 'Sub minimum width',
    appliesTo: ['sm-sub']
  },
  {
    label: '--sm-sub-collapsible-show-animation',
    type: 'string',
    value: 'sm-ani-collapse 0.25s ease-in',
    description: 'Sub collapsible show animation (CSS `animation` shorthand property)',
    appliesTo: ['sm-sub']
  },
  {
    label: '--sm-sub-collapsible-hide-animation',
    type: 'string',
    value: 'sm-ani-collapse 0.25s ease-in reverse',
    description: 'Sub collapsible hide animation (CSS `animation` shorthand property)',
    appliesTo: ['sm-sub']
  },
  {
    label: '--sm-sub-dropdowns-show-animation',
    type: 'string',
    value: 'none',
    description: 'Sub dropdowns show animation (CSS `animation` shorthand property)',
    appliesTo: ['sm-sub']
  },
  {
    label: '--sm-sub-dropdowns-hide-animation',
    type: 'string',
    value: 'sm-ani-fade 0.25s ease-in reverse',
    description: 'Sub dropdowns hide animation (CSS `animation` shorthand property)',
    appliesTo: ['sm-sub']
  }
]

function getCustomProperties(filter) {
  return LAYOUT_CUSTOM_PROPERTIES.filter(customProperty => customProperty.appliesTo.includes(filter))
}

// Extend components with the related custom properties
for (const component of COMPONENTS) {
  component.customProperties = getCustomProperties(component.value)
  const { variants } = component
  if (variants) {
    for (const variant of variants) {
      variant.customProperties = getCustomProperties(variant.value)
    }
  }
}

export default COMPONENTS
