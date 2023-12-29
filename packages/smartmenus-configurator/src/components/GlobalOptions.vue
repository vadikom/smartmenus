<script setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import ListToggles from '@/components/ListToggles.vue'

const mainStore = useMainStore()
const { features } = storeToRefs(mainStore)

const options = {
  features: [
    {
      label: 'Right-to-left',
      value: 'rtl',
      description: 'Use the right-to-left styles.'
    },
    {
      label: 'Only layout styles',
      value: 'only-layout',
      description: `Use only the minimal required layout styles and do not use the theme styles (which include typography, colors, etc.)  
This is useful if you would like to style the navbar components on your own but still support all possible layout options.`
    }
  ]
}
</script>

<template>
  <q-card flat class="q-mb-lg bg-grey-2 inline-block text-left">
    <q-card-section>
      <h2 class="text-h6 q-mt-none q-mb-sm">Global features</h2>
      <div class="row q-gutter-x-md">
        <ListToggles v-model="features" :toggles="options.features" :key="features.length" />
      </div>
    </q-card-section>
  </q-card>
</template>
