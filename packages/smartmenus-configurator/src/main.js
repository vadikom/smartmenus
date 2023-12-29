import '@/css/main.css'

import { watch, computed, createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Dialog } from 'quasar'
import quasarIconSet from 'quasar/icon-set/svg-material-icons'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(Quasar, {
  plugins: { Dialog }, // import Quasar plugins and add here
  iconSet: quasarIconSet
})

app.mount('#app')

watch(
  pinia.state,
  (state) => {
    for (const name of Object.keys(state)) {
      const storeStringified = JSON.stringify(state[name])
      localStorage.setItem(name, storeStringified)
    }
  },
  { deep: true }
)

// Import and use the appropriate SmartMenus stylesheet
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { useNavbarsStore } from '@/stores/navbars'

const mainStore = useMainStore()
const { features } = storeToRefs(mainStore)
const navbarsStore = useNavbarsStore()
const { navbars, navbarClassIsSelected } = storeToRefs(navbarsStore)

const stylesheetName = computed(() => {
  let name = 'smartmenus'
  if (features.value.includes('only-layout')) {
    name = `${name}-only-layout`
    // Check navbars and suggest only a certain theme if appropriate
  } else if (
    navbars.value.every((navbar) =>
      navbarClassIsSelected.value(navbar, ['sm-navbar--collapsible-only'])
    )
  ) {
    name = `${name}-only-layout-and-theme-collapsible`
  } else if (
    navbars.value.every((navbar) =>
      navbarClassIsSelected.value(navbar, ['sm-navbar--dropdowns-only'])
    )
  ) {
    name = `${name}-only-layout-and-theme-dropdowns`
  } else if (
    navbars.value.some((navbar) =>
      navbarClassIsSelected.value(navbar, [
        'sm-navbar--collapsible-only',
        'sm-navbar--dropdowns-only'
      ])
    )
  ) {
    name = `${name}-max`
  }
  if (features.value.includes('rtl')) {
    name = `${name}.rtl`
  }
  return name
})

// Import all stylesheets
import stylesheet from 'smartmenus/dist/css/smartmenus.css?raw'
import stylesheetMax from 'smartmenus/dist/css/smartmenus-max.css?raw'
import stylesheetOnlyLayout from 'smartmenus/dist/css/smartmenus-only-layout.css?raw'
import stylesheetOnlyLayoutAndThemeCollapsible from 'smartmenus/dist/css/smartmenus-only-layout-and-theme-collapsible.css?raw'
import stylesheetOnlyLayoutAndThemeDropdowns from 'smartmenus/dist/css/smartmenus-only-layout-and-theme-dropdowns.css?raw'
import stylesheetRtl from 'smartmenus/dist/css/smartmenus.rtl.css?raw'
import stylesheetRtlMax from 'smartmenus/dist/css/smartmenus-max.rtl.css?raw'
import stylesheetRtlOnlyLayout from 'smartmenus/dist/css/smartmenus-only-layout.rtl.css?raw'
import stylesheetRtlOnlyLayoutAndThemeCollapsible from 'smartmenus/dist/css/smartmenus-only-layout-and-theme-collapsible.rtl.css?raw'
import stylesheetRtlOnlyLayoutAndThemeDropdowns from 'smartmenus/dist/css/smartmenus-only-layout-and-theme-dropdowns.rtl.css?raw'

const importedStylesheets = {
  smartmenus: stylesheet,
  'smartmenus-max': stylesheetMax,
  'smartmenus-only-layout': stylesheetOnlyLayout,
  'smartmenus-only-layout-and-theme-collapsible': stylesheetOnlyLayoutAndThemeCollapsible,
  'smartmenus-only-layout-and-theme-dropdowns': stylesheetOnlyLayoutAndThemeDropdowns,
  'smartmenus.rtl': stylesheetRtl,
  'smartmenus-max.rtl': stylesheetRtlMax,
  'smartmenus-only-layout.rtl': stylesheetRtlOnlyLayout,
  'smartmenus-only-layout-and-theme-collapsible.rtl': stylesheetRtlOnlyLayoutAndThemeCollapsible,
  'smartmenus-only-layout-and-theme-dropdowns.rtl': stylesheetRtlOnlyLayoutAndThemeDropdowns
}

// Use the appropriate stylesheet
const styleElement = document.createElement('style')
styleElement.id = 'sm-styles'
document.head.appendChild(styleElement)
function setStylesheet() {
  styleElement.textContent = importedStylesheets[stylesheetName.value]
}
setStylesheet()
watch(stylesheetName, setStylesheet)
