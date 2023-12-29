<script setup>
import { computed } from 'vue'
import * as prettier from 'prettier'
import prettierParserHTML from 'prettier/parser-html.js'
import prettierParserEspree from 'prettier/parser-espree.js'
import prettierParserPostcss from 'prettier/parser-postcss.js'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-cshtml'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-css'
import 'prism-theme-github/themes/prism-theme-github-light.css'

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  lang: {
    type: String,
    required: true
  },
  maxHeight: {
    type: String,
    required: false
  }
})

function tidyCode(code, lang) {
  const parser = lang === 'javascript' ? 'espree' : lang
  return prettier.format(code, {
    parser: parser,
    plugins: [prettierParserHTML, prettierParserPostcss, prettierParserEspree],
    ...(lang === 'javascript'
      ? { printWidth: 80, semi: false, singleQuote: true, trailingComma: 'none' }
      : { printWidth: 160 })
  })
}

function highlightCode(code, lang) {
  return Prism.highlight(tidyCode(code, lang), Prism.languages[lang])
}

const contentHTML = computed(() => {
  return props.lang === 'bash' ? props.content : highlightCode(props.content, props.lang)
})
</script>

<template>
  <pre
    class="rounded-borders bg-grey-1"
    :class="`language-${lang}`"
    :style="{ 'max-height': maxHeight || 'none' }"
  ><code :class="`language-${lang}`" v-html="contentHTML"></code></pre>
</template>

<style scoped>
pre {
  margin: 8px 0 16px 0;
  padding: 1em;
}
code {
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace !important;
  font-size: 14px !important;
}
</style>
