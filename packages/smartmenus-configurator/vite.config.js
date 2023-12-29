import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import packageJson from './package.json'

export default defineConfig(() => {
  return {
    base: `/${packageJson.version}`,
    build: {
      target: browserslistToEsbuild()
    },
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),

      quasar({
        sassVariables: 'src/css/quasar-variables.scss'
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define:  {
      '__APP_VERSION__': `'${packageJson.version}'`
    }
  }
})
