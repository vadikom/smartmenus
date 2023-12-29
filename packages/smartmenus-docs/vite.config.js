import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import Markdown from 'vite-plugin-md'
import Prism from 'markdown-it-prism'
import 'prismjs/components/prism-scss'
import MarkdownItContainer from 'markdown-it-container'
import packageJson from './package.json'

export default defineConfig(() => {
  return {
    base: `/${packageJson.version}`,
    build: {
      target: browserslistToEsbuild()
    },
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/]
      }),
      Markdown({
        markdownItOptions: {
          html: true,
          linkify: true,
          typographer: true
        },
        markdownItSetup(md) {
          md.use(Prism, { highlightInlineCode: true }).use(MarkdownItContainer, 'note').use(MarkdownItContainer, 'tip')
        }
      }),
      ssr({
        prerender: {
          pageContextInit: {
            __APP_VERSION__: packageJson.version
          }
        }
      })
    ],
    resolve: {
      alias: {
        '#@': fileURLToPath(new URL('./renderer', import.meta.url))
      }
    },
    define:  {
      '__APP_VERSION__': `'${packageJson.version}'`
    }
  }
})
