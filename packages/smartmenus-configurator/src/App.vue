<script setup>
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useNavbarsStore } from '@/stores/navbars'
import GlobalOptions from '@/components/GlobalOptions.vue'
import NavbarConfigurator from '@/components/NavbarConfigurator.vue'
import MainControls from '@/components/MainControls.vue'
import { LAYOUT_CUSTOM_PROPERTIES } from 'smartmenus/src/js/definitions/components'

const navbarsStore = useNavbarsStore()
const { navbars, navbarClassIsSelected, navbarClassIsSelectedForAny, featureIsSelected } =
  storeToRefs(navbarsStore)

const navbarScriptOptions = computed(() => {
  const object = {}
  for (const navbar of navbars.value) {
    object[navbar.id] = {}
    for (const option of navbar.scriptOptions) {
      const key = Object.keys(option)[0]
      object[navbar.id][key] = option[key]
    }
  }
  return object
})

// Navbar HTML - generate HTML from the selected options for each navbar
const isOffcanvas = computed(() => {
  const object = {}
  for (const navbar of navbars.value) {
    object[navbar.id] = navbarClassIsSelected.value(navbar, [
      'sm-navbar--offcanvas-left',
      'sm-navbar--offcanvas-right',
      'sm-navbar--offcanvas-top',
      'sm-navbar--offcanvas-bottom'
    ])
  }
  return object
})
const needsToggler = computed(() => {
  const object = {}
  for (const navbar of navbars.value) {
    object[navbar.id] =
      isOffcanvas.value[navbar.id] ||
      !navbarClassIsSelected.value(navbar, ['sm-navbar--dropdowns-only', 'sm-navbar--sidebar-only'])
  }
  return object
})
const navbarContentHTML = computed(() => {
  const object = {}
  for (const navbar of navbars.value) {
    object[navbar.id] = `
      ${
        featureIsSelected.value(navbar, 'sm-container')
          ? `
      <div class="sm-container">
      `
          : ''
      }

      <h1 class="sm-brand"><a href="#">Navbar ${navbar.id}</a></h1>

      ${
        needsToggler.value[navbar.id]
          ? `
      <span class="sm-toggler-state" id="sm-toggler-state-${navbar.id}"></span>
      <div class="sm-toggler">
        <a class="sm-toggler-anchor sm-toggler-anchor--show" href="#sm-toggler-state-${
          navbar.id
        }" role="button" aria-label="Open main menu">
          <span class="sm-toggler-icon sm-toggler-icon--show"></span>
        </a>
        <a class="sm-toggler-anchor sm-toggler-anchor--hide" href="#" role="button" aria-label="Close main menu">
          <span class="sm-toggler-icon sm-toggler-icon--hide"></span>
        </a>
      </div>

      ${
        isOffcanvas.value[navbar.id]
          ? `
      <a class="sm-offcanvas-overlay" href="#" aria-hidden="true" tabindex="-1"></a>
      `
          : ''
      }
      <div class="sm-${isOffcanvas.value[navbar.id] ? 'offcanvas' : 'collapse'}">`
          : ''
      }

      ${
        isOffcanvas.value[navbar.id]
          ? `
      <!-- If you would like to include a brand and/or a close button in the offcanvas, you could use something like this: -->
      <div${
        !navbarClassIsSelected.value(navbar, ['sm-navbar--offcanvas-only'])
          ? ' class="sm-hide-large"'
          : ''
      } style="display: flex;align-items: center;justify-content: space-between;" aria-hidden="true">
        <h1 class="sm-brand"><a href="#" tabindex="-1">Navbar ${navbar.id}</a></h1>
        <div class="sm-toggler">
          <a class="sm-toggler-anchor sm-toggler-anchor--hide" href="#" role="button" tabindex="-1">
            <span class="sm-toggler-icon sm-toggler-icon--hide"></span>
          </a>
        </div>
      </div>
      `
          : ''
      }

      <ul class="sm-nav${navbar.navClasses.length > 0 ? ' ' + navbar.navClasses.join(' ') : ''}">
        <li class="sm-nav-item"><a class="sm-nav-link" href="#">Link</a></li>
        <li class="sm-nav-item"><a class="sm-nav-link" href="#">Link</a></li>
        <li class="sm-nav-item"><a class="sm-nav-link sm-sub-toggler" href="#">Sub</a>
          <ul class="sm-sub">
            <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
            <li class="sm-sub-item"><a class="sm-sub-link sm-sub-toggler" href="#">Sub</a>
              <ul class="sm-sub">
                <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
                <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
                <li class="sm-sub-item"><a class="sm-sub-link sm-sub-toggler" href="#">Sub</a>
                  <ul class="sm-sub">
                    <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
                    <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
                    <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
                  </ul>
                </li>
                <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
              </ul>
            </li>
            <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
            <li class="sm-sub-item-separator"></li>
            <li class="sm-sub-item"><a class="sm-sub-link sm-disabled" href="#">Disabled</a></li>
          </ul>
        </li>
        <li class="sm-nav-item"><a class="sm-nav-link" href="#">Link</a></li>
        <li class="sm-nav-item"><a class="sm-nav-link" href="#">Link</a></li>
        <li class="sm-nav-item"><a class="sm-nav-link sm-nav-link--split" href="#">Link</a><button class="sm-nav-link sm-nav-link--split sm-sub-toggler" aria-label="Toggle sub menu"></button>
          <ul class="sm-sub">
            <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
            <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
            <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
            <li class="sm-sub-item"><a class="sm-sub-link sm-sub-link--split" href="#">Link</a><button class="sm-sub-link sm-sub-link--split sm-sub-toggler" aria-label="Toggle sub menu"></button>
              <ul class="sm-sub">
                <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
                <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
                <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
                <li class="sm-sub-item"><a class="sm-sub-link sm-sub-link--split" href="#">Link</a><button class="sm-sub-link sm-sub-link--split sm-sub-toggler" aria-label="Toggle sub menu"></button>
                  <ul class="sm-sub">
                    <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
                    <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
                    <li class="sm-sub-item"><a class="sm-sub-link" href="#">Link</a></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="sm-nav-item"><a class="sm-nav-link" href="#">Link</a></li>
        <li class="sm-nav-item sm-nav-item--has-mega"><a class="sm-nav-link sm-sub-toggler" href="#">Mega</a>
          <div class="sm-sub sm-sub--mega">
            ${
              featureIsSelected.value(navbar, 'sm-container')
                ? `
            <div class="sm-container">
            `
                : ''
            }
            <div style="border: 1px dashed rgba(0, 0, 0, 0.2);padding: 1rem;">
              <p>Mega subs will take the full width/height of the navbar based on its orientation.</p>
              <p>You can include any HTML content in a mega sub.</p>
              <p>Please note that the <code>dropdownsKeepInViewport</code> option has no effect for mega subs.</p>
            </div>
            ${
              featureIsSelected.value(navbar, 'sm-container')
                ? `
            </div>
            `
                : ''
            }
          </div>
        </li>
        <li class="sm-nav-item-separator"></li>
        <li class="sm-nav-item"><a class="sm-nav-link sm-disabled" href="#">Disabled</a></li>
      </ul>

      ${
        needsToggler.value[navbar.id]
          ? `
      </div>
      `
          : ''
      }

      ${
        featureIsSelected.value(navbar, 'sm-container')
          ? `
      </div>
      `
          : ''
      }
      `
  }
  return object
})

// Navbar custom CSS - generate CSS from the selected custom properties for each navbar
const navbarCustomPropertiesCSS = computed(() => {
  return navbars.value.some((navbar) => navbar.customProperties.length > 0)
    ? navbars.value.map((navbar) => {
        const navbarCustomProperties = navbar.customProperties
        let code = navbar.customProperties.length > 0 ? `#navbar${navbar.id} {` : ''
        for (const object of navbarCustomProperties) {
          code = `${code}${Object.keys(object)[0]}: ${object[Object.keys(object)[0]]};
          `
        }
        code =
          navbar.customProperties.length > 0
            ? `${code}
        }`
            : ''
        return code
      })
    : []
})

// Get default/custom sidebar related properties
const sidebarPropNames = {
  width: '--sm-navbar-sidebar-width',
  centeredLayoutMaxWidth: '--sm-navbar-sidebar-centered-layout-max-width'
}
const sidebarProps = computed(() => {
  const props = {}
  for (const propName of Object.keys(sidebarPropNames)) {
    // Get default value
    props[propName] = LAYOUT_CUSTOM_PROPERTIES.find(
      (customProperty) => customProperty.label === sidebarPropNames[propName]
    ).value
    for (const navbar of navbars.value) {
      // Get custom value if defined
      const propCustomValue = navbar.customProperties.find(
        (customProperty) => Object.keys(customProperty)[0] === sidebarPropNames[propName]
      )
      if (propCustomValue) {
        props[propName] = propCustomValue[Object.keys(propCustomValue)[0]]
        break
      }
    }
  }
  return props
})
function setSidebarProps() {
  for (const propName of Object.keys(sidebarPropNames)) {
    document.documentElement.style.setProperty(
      sidebarPropNames[propName],
      sidebarProps.value[propName]
    )
  }
}
setSidebarProps()
watch(sidebarProps, setSidebarProps)

// Add the custom properties stylesheet to the document
let customPropertiesStyleElement = document.getElementById('sm-custom-properties')
if (!customPropertiesStyleElement) {
  customPropertiesStyleElement = document.createElement('style')
  customPropertiesStyleElement.id = 'sm-custom-properties'
  document.head.appendChild(customPropertiesStyleElement)
}
function setCustomPropertiesCSS() {
  customPropertiesStyleElement.textContent = navbarCustomPropertiesCSS.value.join('')
}
setCustomPropertiesCSS()
watch(navbarCustomPropertiesCSS, setCustomPropertiesCSS)
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container
      :class="{
        'has-sidebar-left': navbarClassIsSelectedForAny(['sm-navbar--sidebar-left']),
        'has-sidebar-right': navbarClassIsSelectedForAny(['sm-navbar--sidebar-right']),
        'has-sidebar-centered': navbarClassIsSelectedForAny(['sm-navbar--sidebar-centered']),
        'has-sidebar-only': navbarClassIsSelectedForAny(['sm-navbar--sidebar-only']),
        'has-fixed-top': navbarClassIsSelectedForAny(['sm-navbar--fixed-top']),
        'has-fixed-bottom': navbarClassIsSelectedForAny(['sm-navbar--fixed-bottom'])
      }"
    >
      <div class="container">
        <div class="row q-col-gutter-x-md justify-between items-center">
          <div class="col-auto">
            <!--<h1 class="text-h4 q-mt-none q-mb-lg">
              SmartMenus Configurator
            </h1>-->
          </div>
          <div class="col-auto">
            <GlobalOptions />
          </div>
        </div>
        <NavbarConfigurator
          v-for="navbar in navbars"
          :id="navbar.id"
          :navbarContentHTML="navbarContentHTML[navbar.id]"
          :navbarScriptOptions="navbarScriptOptions[navbar.id]"
          :key="navbar.key"
        />
        <q-btn
          unelevated
          round
          color="primary"
          icon="add"
          @click="navbarsStore.addNavbar()"
          title="Add a navbar"
        />
        <MainControls
          :navbarContentHTML="navbarContentHTML"
          :navbarScriptOptions="navbarScriptOptions"
          :navbarCustomPropertiesCSS="navbarCustomPropertiesCSS"
        />
      </div>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.q-page-container {
  margin-left: auto;
  margin-right: auto;
}
@media (min-width: 768px) {
  .has-sidebar-left {
    padding-left: var(--sm-navbar-sidebar-width);
  }
  .has-sidebar-right {
    padding-right: var(--sm-navbar-sidebar-width);
  }
  .has-sidebar-centered {
    max-width: var(--sm-navbar-sidebar-centered-layout-max-width);
  }
}
.has-sidebar-left.has-sidebar-only {
  padding-left: var(--sm-navbar-sidebar-width);
}
.has-sidebar-right.has-sidebar-only {
  padding-right: var(--sm-navbar-sidebar-width);
}
.has-sidebar-centered {
  max-width: var(--sm-navbar-sidebar-centered-layout-max-width);
}
.has-fixed-top {
  padding-top: 57px;
}
.has-fixed-bottom {
  padding-bottom: 57px;
}
.container {
  padding: 1rem;
}
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}
</style>
