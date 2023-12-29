<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useNavbarsStore } from '@/stores/navbars'

const navbarsStore = useNavbarsStore()
const { navbarClassIsSelectedForAny } = storeToRefs(navbarsStore)

const aboutVisible = ref(false)

const appVersion = __APP_VERSION__
</script>

<template>
  <q-fab
    v-model="aboutVisible"
    color="white"
    text-color="dark"
    direction="up"
    icon="question_mark"
    padding="xs"
    class="q-ml-lg"
    title="About"
  />
  <q-dialog
    v-model="aboutVisible"
    class="about-popup"
    :class="{
      'has-fixed-bottom': navbarClassIsSelectedForAny(['sm-navbar--fixed-bottom'])
    }"
    transition-show="slide-down"
    transition-hide="slide-up"
  >
    <div class="about-popup-content q-pa-md bg-white shadow-3">
      <h2 class="q-mt-none q-mb-none text-h5 text-center">SmartMenus Configurator</h2>
      <p class="q-mt-xs text-body2 text-center text-grey-7">{{ appVersion }}</p>
      <p class="text-center">
        A tool that allows configuring and testing the basic features of a SmartMenus navbar.
      </p>
      <p class="text-center">
        <a href="https://configurator.smartmenus.org/">configurator.smartmenus.org</a> |
        <a href="https://www.smartmenus.org/">www.smartmenus.org</a>
      </p>
      <div class="q-pa-md bg-grey-2 rounded-borders">
        <h3 class="text-subtitle1 q-mt-none">Tips:</h3>
        <ul class="q-mb-none">
          <li>
            It is recommended to use this tool with a desktop browser which would allow you to
            simultaneously test your configuration on all screen sizes (e.g. via the Dev tools).
          </li>
          <li>
            Currently this tool does not support editing the theme - check the
            <a href="https://docs.smartmenus.org/#style-theme">theme</a> section in the docs for
            details and a list of all available theme variables.
          </li>
        </ul>
      </div>
    </div>
  </q-dialog>
</template>

<style>
/* This gets "teleported" by Quasar so it needs global CSS */
.about-popup {
  z-index: 10001 !important;
}
.about-popup .q-dialog__inner {
  padding: 20px;
}
.about-popup .about-popup-content {
  align-self: flex-start;
  max-height: calc(100vh - 103px) !important;
}
.about-popup.has-fixed-bottom .about-popup-content {
  max-height: calc(100vh - 160px) !important;
}
.about-popup a:hover,
.about-popup a:focus {
  opacity: 0.9;
}
</style>
