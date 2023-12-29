<script setup>
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { useNavbarsStore } from '@/stores/navbars'
import AboutApp from '@/components/AboutApp.vue'
import ShowCode from '@/components/ShowCode.vue'

defineProps({
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

const $q = useQuasar()

const mainStore = useMainStore()
const navbarsStore = useNavbarsStore()
const { navbarClassIsSelectedForAny } = storeToRefs(navbarsStore)

function reset() {
  $q.dialog({
    title: 'Confirm',
    message: 'Really reset the configuration?',
    ok: 'Yes',
    cancel: true
  }).onOk(() => {
    mainStore.reset()
    navbarsStore.reset()
  })
}
</script>

<template>
  <q-page-sticky
    position="bottom"
    :offset="navbarClassIsSelectedForAny(['sm-navbar--fixed-bottom']) ? [25, 80] : [25, 25]"
    class="main-buttons"
  >
    <ShowCode
      :navbarContentHTML="navbarContentHTML"
      :navbarScriptOptions="navbarScriptOptions"
      :navbarCustomPropertiesCSS="navbarCustomPropertiesCSS"
    />
    <q-btn
      rounded
      flat
      color="negative"
      class="q-ml-md shadow-2 bg-white"
      label="Reset"
      title="Reset configuration"
      @click="reset"
    ></q-btn>
    <AboutApp />
  </q-page-sticky>
</template>

<style scoped>
.main-buttons {
  z-index: 10002;
}
</style>
