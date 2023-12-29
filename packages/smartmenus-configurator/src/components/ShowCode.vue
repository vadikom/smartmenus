<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { useNavbarsStore } from '@/stores/navbars'
import Code from '@/components/Code.vue'
import CodeHeading from '@/components/CodeHeading.vue'

const props = defineProps({
  navbarContentHTML: {
    type: Object,
    required: true
  },
  navbarScriptOptions: {
    type: Object,
    required: true
  },
  navbarCustomPropertiesCSS: {
    type: Object,
    required: true
  }
})

const mainStore = useMainStore()
const { features } = storeToRefs(mainStore)
const navbarsStore = useNavbarsStore()
const { navbars, navbarClassIsSelected, navbarClassIsSelectedForAny } = storeToRefs(navbarsStore)

const codeVisible = ref(false)

// HTML code

const codeHTML = computed(() => {
  return (
    navbars.value
      .map((navbar) => {
        return `
        <!-- Navbar ${navbar.id} -->
        <nav id="navbar${navbar.id}" class="sm-navbar${
          navbar.navbarClasses.length ? ` ${navbar.navbarClasses.join(' ')}` : ''
        }">
          ${props.navbarContentHTML[navbar.id]}
        </nav>
      `
      })
      .join('') || '<!-- no navbars -->'
  )
})

// CSS code

const codeStylesheetName = computed(() => {
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

const codeNodeSASS = computed(() => {
  return `
    // smartmenus-custom.scss

    // any SASS variables here...
    ${
      props.navbarCustomPropertiesCSS.length > 0
        ? `
    // Tip:
    // ${
      props.navbarCustomPropertiesCSS.length === 1
        ? 'When you have a single navbar,'
        : 'For one of your navbars'
    } instead of CSS custom properties, you could use
    // their matching SASS variables - e.g. instead of having the following after the @import below:
    // #navbar1 {
    //   --sm-navbar-z-index: 1;
    // }
    // you could set the following SASS variable here before the @import:
    // $navbar-z-index: 1;
    `
        : ''
    }

    @import '../node_modules/smartmenus/src/css/${codeStylesheetName.value}.scss';
    
    ${
      props.navbarCustomPropertiesCSS.length === 0
        ? '// any customization styles here...'
        : props.navbarCustomPropertiesCSS.join('\n\n')
    }
  `
})

const codeNodeSASSImport = computed(() => {
  return `import './smartmenus-custom.scss';`
})

const codeNodeCSS = computed(() => {
  return `
    /* smartmenus-custom.css */

    @import url('../node_modules/smartmenus/dist/css/${codeStylesheetName.value}.css');
    
    ${
      props.navbarCustomPropertiesCSS.length === 0
        ? '/* any customization styles here... */'
        : props.navbarCustomPropertiesCSS.join('\n\n')
    }
  `
})

const codeNodeCSSImport = computed(() => {
  return `import './smartmenus-custom.css';`
})

const codeBrowserCSS = computed(() => {
  return `
    /* smartmenus-custom.css */

    ${
      props.navbarCustomPropertiesCSS.length === 0
        ? '/* any customization styles here... */'
        : props.navbarCustomPropertiesCSS.join('\n\n')
    }
  `
})

const codeBrowserCSSImport = computed(() => {
  return `
    ${'<'}link href="https://www.unpkg.com/smartmenus@^${__APP_VERSION__}/dist/css/${
    codeStylesheetName.value
  }.min.css" rel="stylesheet" />
    ${'<'}link href="smartmenus-custom.css" rel="stylesheet" />
  `
})

// JS code

const codeInitJS = computed(() => {
  return (
    navbars.value
      .map((navbar) => {
        const currentScriptOptions = props.navbarScriptOptions[navbar.id]
        const currentScriptOptionsString = JSON.stringify(currentScriptOptions)
        return `
        // Navbar ${navbar.id}
        const navbar${navbar.id} = new SmartMenus(document.querySelector('#navbar${navbar.id}')${
          Object.keys(currentScriptOptions).length > 0 ? `, ${currentScriptOptionsString}` : ''
        })
      `
      })
      .join('') || '// no navbars to init'
  )
})

const codeNodeJSInstall = 'npm install smartmenus'

const codeNodeJSInit = computed(() => {
  return `
    import SmartMenus from 'smartmenus'
    ${codeInitJS.value}
  `
})

const codeBrowserJSInclude = computed(() => {
  return `
    ${'<'}script src="https://www.unpkg.com/smartmenus@^${__APP_VERSION__}/dist/js/smartmenus.browser.min.js">${'</'}script>
    ${'<'}script src="smartmenus-init.js">${'</'}script>
  `
})

const codeBrowserJSInit = computed(() => {
  return `
    // smartmenus-init.js

    ${codeInitJS.value}
  `
})
</script>

<template>
  <q-fab
    v-model="codeVisible"
    label="View code"
    label-position="left"
    color="accent"
    text-color="dark"
    direction="up"
    icon="keyboard_arrow_up"
    padding="sm"
    label-class="text-bold text-uppercase"
  />
  <q-dialog
    v-model="codeVisible"
    class="code-popup"
    :class="{
      'has-fixed-bottom': navbarClassIsSelectedForAny(['sm-navbar--fixed-bottom'])
    }"
    full-width
    full-height
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div class="code-popup-content q-pa-md bg-white shadow-3">
      <CodeHeading level="2">HTML</CodeHeading>
      <Code :content="codeHTML" lang="html" maxHeight="450px" />
      <CodeHeading level="2">CSS</CodeHeading>
      <p>
        The configurator will automatically suggest the most appropriate SmartMenus stylesheet to
        use based on the selected features.
      </p>
      <CodeHeading level="3" subtitle="Webpack, Vite, etc.">Node</CodeHeading>
      <p>You can use either SASS or CSS.</p>
      <CodeHeading level="4">SASS</CodeHeading>
      <p>Create you own customization file:</p>
      <Code :content="codeNodeSASS" lang="scss" />
      <p>Import your customization file:</p>
      <Code :content="codeNodeSASSImport" lang="javascript" />
      <CodeHeading level="4">CSS</CodeHeading>
      <p>Create you own customization file:</p>
      <Code :content="codeNodeCSS" lang="css" />
      <p>Import your customization file:</p>
      <Code :content="codeNodeCSSImport" lang="javascript" />
      <CodeHeading level="3">Browser</CodeHeading>
      <p>Create you own customization file:</p>
      <Code :content="codeBrowserCSS" lang="css" />
      <p>Include the CSS files on your page:</p>
      <Code :content="codeBrowserCSSImport" lang="html" />
      <CodeHeading level="2">JS</CodeHeading>
      <CodeHeading level="3" subtitle="ESM">Node</CodeHeading>
      <CodeHeading level="4">Install</CodeHeading>
      <Code :content="codeNodeJSInstall" lang="bash" />
      <CodeHeading level="4">Init</CodeHeading>
      <Code :content="codeNodeJSInit" lang="javascript" />
      <CodeHeading level="3">Browser</CodeHeading>
      <p>Create you own init file:</p>
      <Code :content="codeBrowserJSInit" lang="javascript" />
      <p>Include the JS files on your page:</p>
      <Code :content="codeBrowserJSInclude" lang="html" />
    </div>
  </q-dialog>
</template>

<style>
/* This gets "teleported" by Quasar so it needs global CSS */
.code-popup {
  z-index: 10001 !important;
}
.code-popup .q-dialog__inner {
  padding: 20px;
}
.code-popup .code-popup-content {
  align-self: flex-start;
  max-height: calc(100vh - 103px) !important;
}
.code-popup.has-fixed-bottom .code-popup-content {
  max-height: calc(100vh - 160px) !important;
}
</style>
