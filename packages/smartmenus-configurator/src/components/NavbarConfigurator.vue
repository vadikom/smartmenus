<script setup>
import { ref, computed, watch } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { useNavbarsStore } from '@/stores/navbars'
import Navbar from '@/components/Navbar.vue'
import ListToggles from '@/components/ListToggles.vue'
import COMPONENTS from 'smartmenus/src/js/definitions/components'
import { LAYOUT_CUSTOM_PROPERTIES } from 'smartmenus/src/js/definitions/components'
import OPTIONS from 'smartmenus/src/js/definitions/options'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  navbarContentHTML: {
    type: String,
    required: true
  },
  navbarScriptOptions: {
    type: Object,
    required: true
  }
})

const $q = useQuasar()

const mainStore = useMainStore()
const { features } = storeToRefs(mainStore)
const navbarsStore = useNavbarsStore()
const { getNavbarById, navbarClassIsSelected } = storeToRefs(navbarsStore)
const navbar = getNavbarById.value(props.id)

// Hide these script options in the configurator to avoid possible JS errors due to invalid values
const scriptOptionsFiltered = OPTIONS.filter((option) => !/^(class|selector)/.test(option.label))

const navbarFeatures = [COMPONENTS.find((component) => component.value === 'sm-container')]

const options = {
  navbarClasses: COMPONENTS.find((component) => component.value === 'sm-navbar').variants,
  navClasses: COMPONENTS.find((component) => component.value === 'sm-nav').variants,
  customProperties: LAYOUT_CUSTOM_PROPERTIES,
  scriptOptions: scriptOptionsFiltered,
  features: navbarFeatures
}

function removeNavbar(id) {
  $q.dialog({
    title: 'Confirm',
    message: 'Really remove this navbar?',
    ok: 'Yes',
    cancel: true
  }).onOk(() => {
    navbarsStore.removeNavbar(id)
  })
}

// Disable/Unselect all nav classes if needed
const disabledNavClasses = computed(() => {
  if (
    navbarClassIsSelected.value(navbar, [
      'sm-navbar--vertical',
      'sm-navbar--inline',
      'sm-navbar--offcanvas-only',
      'sm-navbar--sidebar-left',
      'sm-navbar--sidebar-right',
      'sm-navbar--sidebar-only',
      'sm-navbar--collapsible-only'
    ])
  ) {
    return options.navClasses.map((navClass) => navClass.value)
  }
  return []
})
watch(disabledNavClasses, () => {
  if (disabledNavClasses.value.length > 0) {
    navbar.navClasses = navbar.navClasses.filter(
      (navClass) => !disabledNavClasses.value.includes(navClass)
    )
  }
})

// Disable/Unselect custom properties if needed
const disabledCustomProperties = computed(() => {
  return options.customProperties
    .filter((customProperty) => {
      let value = customProperty.appliesTo.some(
        (appliesToClass) =>
          options.navbarClasses.some((navbarClass) => navbarClass.value === appliesToClass) ||
          options.navClasses.some((navClass) => navClass.value === appliesToClass) ||
          options.features.some((feature) => feature.value === appliesToClass)
      )
      if (value) {
        for (const collection of ['navbarClasses', 'navClasses', 'features']) {
          if (
            navbar[collection].some((collectionItem) =>
              customProperty.appliesTo.includes(collectionItem)
            )
          ) {
            value = false
            break
          }
        }
      }
      return value
    })
    .map((customProperty) => customProperty.label)
})
watch(disabledCustomProperties, () => {
  if (disabledCustomProperties.value.length > 0) {
    navbar.customProperties = navbar.customProperties.filter(
      (customProperty) => !disabledCustomProperties.value.includes(Object.keys(customProperty)[0])
    )
  }
})

const navbarKey = ref(1)
watch([navbar, features], () => {
  navbarKey.value++
})
</script>

<template>
  <Navbar
    :id="id"
    :classes="`sm-navbar${navbar.navbarClasses.length ? ` ${navbar.navbarClasses.join(' ')}` : ''}`"
    :contentHTML="navbarContentHTML"
    :scriptOptions="navbarScriptOptions"
    :key="navbarKey"
  />
  <q-card
    flat
    class="q-mb-lg bg-grey-2"
    :class="{
      'q-mt-lg': !navbarClassIsSelected(navbar, ['sm-navbar--fixed-top', 'sm-navbar--fixed-bottom'])
    }"
  >
    <q-card-section
      :class="{ 'q-pb-none': !navbar.collapse }"
      :title="navbar.collapse ? 'Expand' : 'Collapse'"
    >
      <div class="row">
        <q-btn
          round
          flat
          dense
          icon="close"
          title="Remove navbar"
          @click="removeNavbar(id)"
          class="q-mr-sm"
        />
        <h2 class="q-mt-none q-mb-none text-h5">
          Navbar {{ navbar.id }} <span class="text-h6">configuration</span>
        </h2>
        <div class="q-space" />
        <q-btn
          round
          flat
          dense
          :icon="!navbar.collapse ? 'expand_less' : 'expand_more'"
          @click="
            () => {
              navbar.collapse = !navbar.collapse
            }
          "
        />
      </div>
    </q-card-section>
    <q-card-section :class="{ hidden: navbar.collapse }">
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-12 col-sm-6 col-md-3">
          <q-card flat>
            <q-card-section>
              <h3 class="q-mt-none text-h6 q-mb-sm">Navbar variants</h3>
              <ListToggles v-model="navbar.navbarClasses" :toggles="options.navbarClasses" />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <q-card flat class="q-mb">
            <q-card-section>
              <h3 class="q-mt-none text-h6 q-mb-sm">Nav variants</h3>
              <ListToggles
                v-model="navbar.navClasses"
                :toggles="options.navClasses"
                :disable="disabledNavClasses"
              />
            </q-card-section>
          </q-card>
          <q-card flat class="q-mt-md">
            <q-card-section>
              <h3 class="q-mt-none text-h6 q-mb-sm">Generic features</h3>
              <ListToggles v-model="navbar.features" :toggles="options.features" />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-6">
          <q-card flat>
            <q-card-section>
              <h3 class="q-mt-none text-h6 q-mb-sm">Custom properties</h3>
              <p>Layout related custom properties (CSS/SASS variables).</p>
              <ListToggles
                v-model="navbar.customProperties"
                :toggles="options.customProperties"
                :disable="disabledCustomProperties"
                :withInput="true"
              />
            </q-card-section>
          </q-card>
          <q-card flat class="q-mt-md">
            <q-card-section>
              <h3 class="q-mt-none text-h6 q-mb-sm">Script options</h3>
              <ListToggles
                v-model="navbar.scriptOptions"
                :toggles="options.scriptOptions"
                :withInput="true"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.q-checkbox {
  display: flex;
}
.checkbox-selected :deep(.q-checkbox__bg) {
  border-color: white;
}
</style>
