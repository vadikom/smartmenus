<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Meta from '#@/components/Meta.vue'
import SmartMenus from 'smartmenus'
import COMPONENTS from 'smartmenus/src/js/definitions/components.js'
import OPTIONS from 'smartmenus/src/js/definitions/options.js'
import DATA_ATTRIBUTES from 'smartmenus/src/js/definitions/data-attributes.js'
import EVENTS from 'smartmenus/src/js/definitions/events.js'
import METHODS from 'smartmenus/src/js/definitions/methods.js'

function getMethodsByType(type) {
  return METHODS.filter((method) => method.type === type)
}

const tocComponents = []
for (const component of COMPONENTS) {
  tocComponents.push({
    title: component.label,
    link: `#style-layout-components-${component.value}`
  })
  const variants = component.variants
  if (variants && variants.length > 0) {
    const sub = []
    sub.push({ title: 'Default', link: `#style-layout-components-${component.value}` })
    for (const variant of variants) {
      sub.push({ title: variant.label, link: `#style-layout-components-${variant.value}` })
    }
    tocComponents[tocComponents.length - 1].sub = sub
  }
}
const tocOptions = OPTIONS.map((option) => {
  return { title: option.label, link: `#options-${option.label}` }
})
const tocDataAttributes = DATA_ATTRIBUTES.map((attr) => {
  return { title: attr.label, link: `#data-attributes-${attr.label}` }
})
tocDataAttributes.push({
  title: 'data-sm-[any-script-option]',
  link: `#data-attributes-data-sm-any-script-option`
})
const tocEvents = EVENTS.map((event) => {
  return { title: event.label, link: `#events-${event.label}` }
})
const tocMethodsStatic = getMethodsByType('static').map((method) => {
  return { title: method.label, link: `#methods-${method.type}-${method.label}` }
})
const tocMethodsInstance = getMethodsByType('instance').map((method) => {
  return { title: method.label, link: `#methods-${method.type}-${method.label}` }
})

const toc = [
  { separator: true, hideSmall: true },
  { title: 'Quick start', link: '#quick-start' },
  {
    title: 'Installation and setup',
    link: '#installation-and-setup',
    sub: [
      { title: 'Install', link: '#installation-and-setup-install' },
      { title: 'Basic setup', link: '#installation-and-setup-basic-setup' }
    ]
  },
  {
    title: 'Style',
    link: '#style',
    sub: [
      { title: 'Introduction', link: '#style-introduction' },
      {
        title: 'Layout',
        link: '#style-layout',
        sub: [
          { title: 'Responsiveness', link: '#style-layout-responsiveness' },
          { title: 'Components', link: '#style-layout-components', sub: tocComponents },
          { title: 'Utility classes', link: '#style-layout-utility-classes' },
          { title: 'Layout variables', link: '#style-layout-variables' }
        ]
      },
      {
        title: 'Theme',
        link: '#style-theme',
        sub: [
          { title: 'Collapsible and dropdowns', link: '#style-theme-collapsible-and-dropdowns' },
          { title: 'Theme variables', link: '#style-theme-variables' }
        ]
      },
      { title: 'Which stylesheet to use?', link: '#style-stylesheets' }
    ]
  },
  { title: 'Options', link: '#options', sub: tocOptions },
  { title: 'Data attributes', link: '#data-attributes', sub: tocDataAttributes },
  {
    title: 'API',
    link: '#api',
    sub: [
      { title: 'Events', link: '#api-events', sub: tocEvents },
      {
        title: 'Methods',
        link: '#api-methods',
        sub: [
          {
            title: 'Static',
            link: '#api-methods-static',
            sub: tocMethodsStatic
          },
          {
            title: 'Instance',
            link: '#api-methods-instance',
            sub: tocMethodsInstance
          }
        ]
      }
    ]
  },
  { separator: true }
]

function createNavTreeFromToc(list, level = 0) {
  const componentType = level === 0 ? 'nav' : 'sub'
  let html = `<ul class="sm-${componentType}">`
  for (const entry of list) {
    const hideSmallClass = entry.hideSmall ? ' sm-hide-small' : ''
    const hideLargeClass = entry.hideLarge ? ' sm-hide-large' : ''
    if (entry.separator) {
      html += `<li class="sm-${componentType}-item-separator${hideSmallClass}${hideLargeClass}"></li>`
      continue
    }
    const sub = entry.sub
    html += `<li class="sm-${componentType}-item${hideSmallClass}${hideLargeClass}">`
    if (entry.type === 'heading') {
      html += `<a class="sm-${componentType}-heading sm-${componentType}-link" href="${entry.link}">${entry.title}</a>`
    } else {
      html += `<a class="sm-${componentType}-link sm-${componentType}-link--split" href="${
        entry.link
      }">${entry.title}</a>${
        sub
          ? `<button class="sm-${componentType}-link sm-${componentType}-link--split sm-sub-toggler"></button>`
          : ''
      }`
    }
    if (sub && sub.length > 0) {
      html += createNavTreeFromToc(sub, level + 1)
    }
    html += '</li>'
  }
  html += '</ul>'
  return html
}

const navTreeHTML = createNavTreeFromToc(toc)

const navbar = ref(null)

onMounted(() => {
  navbar.value = new SmartMenus(document.querySelector('#navbar'), {
    collapsibleBehaviorAccordion: true,
    collapsibleResetSubsOnClickOn: 'none',
    resetTogglerOnLinkSelect: true,
    showSubOnSplitLinkSelect: true
  })
})

onBeforeUnmount(() => {
  navbar.value.destroy()
})
</script>

<template>
  <nav
    id="navbar"
    class="sm-navbar sm-navbar--sidebar-left sm-navbar--sidebar-centered sm-navbar--offcanvas-left sm-navbar--collapsible-only sm-navbar--fixed-top"
  >
    <h1 class="sm-brand">
      <a href="https://www.smartmenus.org/">SmartMenus</a>
      <a href="/"><span class="sm-brand-sub">//Docs</span></a>
    </h1>

    <span class="sm-toggler-state" id="sm-toggler-state-1"></span>
    <div class="sm-toggler">
      <a
        class="sm-toggler-anchor sm-toggler-anchor--show"
        href="#sm-toggler-state-1"
        role="button"
        aria-label="Open main menu"
      >
        <span class="sm-toggler-icon sm-toggler-icon--show"></span>
      </a>
      <a
        class="sm-toggler-anchor sm-toggler-anchor--hide"
        href="#"
        role="button"
        aria-label="Close main menu"
      >
        <span class="sm-toggler-icon sm-toggler-icon--hide"></span>
      </a>
    </div>

    <a class="sm-offcanvas-overlay" href="#" aria-hidden="true" tabindex="-1"></a>
    <div class="sm-offcanvas">
      <div v-html="navTreeHTML"></div>
      <Meta />
    </div>
  </nav>
</template>
