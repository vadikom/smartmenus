<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps({
  info: {
    type: String,
    required: false
  }
})

function parseMarkdown(str) {
  const md = new MarkdownIt()
  return md.render(str)
}

const infoHTML = computed(() => {
  return parseMarkdown(props.info)
})
</script>

<template>
  <q-btn v-if="info" flat dense round icon="info_outline" size="sm">
    <q-tooltip class="info-popup bg-black text-body2">
      <div v-html="infoHTML" />
    </q-tooltip>
  </q-btn>
</template>

<style scoped>
.q-btn {
  opacity: 0.4;
}
</style>

<style>
/* This gets "teleported" by Quasar so it needs global CSS */
.info-popup {
  z-index: 10003;
}
.info-popup :last-child {
  margin-bottom: 0;
}
</style>
