<script setup>
defineProps({
  level: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: false
  }
})
</script>

<template>
  <component
    :is="`h${level}`"
    :class="{
      'q-mt-none q-mb-md rounded-borders q-py-xs q-px-sm text-h5 bg-primary text-white':
        level === '2',
      'q-mt-sm q-mb-sm text-h5': level === '3',
      'q-mt-sm q-mb-sm text-subtitle1': level === '4'
    }"
    :style="{ display: level === '2' ? 'inline-block' : 'block' }"
  >
    <slot />
    <span v-if="subtitle" class="q-ml-sm text-subtitle1 text-grey-6">{{ subtitle }}</span>
  </component>
</template>
