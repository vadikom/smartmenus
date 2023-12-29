<script setup>
import MarkdownIt from 'markdown-it'
import Prism from 'markdown-it-prism'
import 'prismjs/components/prism-scss'
import MarkdownItContainer from 'markdown-it-container'

defineProps({
  source: {
    type: String,
    required: true
  }
})

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})
  .use(Prism, { highlightInlineCode: true })
  .use(MarkdownItContainer, 'note')
  .use(MarkdownItContainer, 'tip')
</script>

<template>
  <div class="md-doc" v-html="md.render(source)" />
</template>
