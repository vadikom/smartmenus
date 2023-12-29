<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SmartMenus from 'smartmenus'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  classes: {
    type: String,
    required: true
  },
  contentHTML: {
    type: String,
    required: true
  },
  scriptOptions: {
    type: Object,
    required: true
  }
})

const navbar = ref(null)

onMounted(() => {
  navbar.value = new SmartMenus(document.querySelector(`#navbar${props.id}`), props.scriptOptions)
})

onBeforeUnmount(() => {
  navbar.value.destroy()
})
</script>

<template>
  <nav :id="`navbar${id}`" :class="classes" v-html="contentHTML"></nav>
</template>
