import fs from 'fs'
import path from 'path'
import readPkgUp from 'read-pkg-up'
import del from 'rollup-plugin-delete'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import sass from 'sass'
import glob from 'glob'

const { packageJson: pkg } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd())
})

const watch = process.env.ROLLUP_WATCH

function getConfig(format, isFirstConfig) {
  format = format.split('-')
  const minify = format[1] === 'min'
  format = format[0]
  const fileName = format === 'cjs' ? pkg.main : format === 'es' ? pkg.module : pkg.browser
  const banner = `/*!
 * ${pkg.title || pkg.name} ${pkg.version} - ${new Date().toLocaleString('en-us', { day: 'numeric', month: 'short', year: 'numeric' })}
 * ${pkg.homepage}
 * Copyright (c) since 2001 ${pkg.author.name}, Vadikom Web Ltd. ${pkg.author.url}
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */`
  const config = {
    input: 'src/js/index.js',
    output: {
      banner: banner,
      format,
      file: !minify ? fileName : fileName.replace(path.extname(fileName), '.min' + path.extname(fileName)),
      name: format === 'umd' ? pkg.browserGlobal : null,
      exports: 'auto',
      sourcemap: minify
    },
    watch: {
      exclude: 'node_modules/**',
      chokidar: {
        usePolling: true,
        interval: 200
      }
    },
    external: [],
    plugins: [

      // For first config only

      // Empty dist before building
      isFirstConfig && !watch ? del({ targets: 'dist' }) : null,

      // Compile sass
      isFirstConfig && pkg.sass && pkg.style ?
        {
          name: 'sass-compile',
          generateBundle() {
            const inputDir = path.dirname(pkg.sass)
            const outputDir = path.dirname(pkg.style)
            if (!fs.existsSync(`${outputDir}/maps`)) {
              fs.mkdirSync(`${outputDir}/maps`, { recursive: true })
            }

            // Process all files to be compiled & copied to dist
            glob(`${inputDir}/*.scss`, (er, files) => {
              for (const fileName of files) {
                const fileNameBase = path.basename(fileName, path.extname(fileName))
                const fileOut = `${outputDir}/${fileNameBase}.css`
                const fileOutMin = `${outputDir}/${fileNameBase}.min.css`
                const compiled = sass.renderSync({ file: fileName, sourceMap: `maps/${fileNameBase}.css.map`, sourceMapContents: true })
                const compiledMin = sass.renderSync({ file: fileName, outputStyle: 'compressed', sourceMap: `maps/${fileNameBase}.min.css.map`, sourceMapContents: true })

                // Write CSS
                fs.writeFileSync(fileOut, `${banner}\n${compiled.css}`)
                console.log(`\x1b[1m\x1b[32m${fileOut}\x1b[0m`)
                fs.writeFileSync(fileOutMin, `${banner}\n${compiledMin.css}`)
                console.log(`\x1b[1m\x1b[32m${fileOutMin}\x1b[0m`)

                // Write maps
                // Use relative path for sources in the source maps (this is so ugly but I didn't find a documented way to do it automatically)
                const relPathToPackageSrc = '../../../src/'
                const reMatchAbsPath = new RegExp(`"file:\/.+?\/${pkg.name}\/src\/`, 'g')
                const replaceRelPath = `"${relPathToPackageSrc}`
                const compiledMap = String(compiled.map).replace(reMatchAbsPath, replaceRelPath)
                const compiledMinMap = String(compiledMin.map).replace(reMatchAbsPath, replaceRelPath)
                fs.writeFileSync(`${outputDir}/maps/${fileNameBase}.css.map`, compiledMap)
                fs.writeFileSync(`${outputDir}/maps/${fileNameBase}.min.css.map`, compiledMinMap)
              }
            })
          }
        } : null,

      // For all configs

      pkg.sass && pkg.style ?
        {
          name: 'sass-watch',
          buildStart() {
            const inputDir = path.dirname(pkg.sass)
            const include = [`${inputDir}/**`]
            for (const item of include) {
              const files = glob.sync(path.resolve(item))
              for (const fileName of files) {
                this.addWatchFile(fileName)
              }
            }
          }
        } : null,
      peerDepsExternal(),
      babel({
        presets: [
          '@babel/preset-env'
        ],
        plugins: [],
        babelHelpers: 'bundled',
        include: ['src/js/**'],
        extensions: ['.js']
      }),
      minify ? terser() : null
    ]
  }
  return config
}

const configs = ['cjs', 'cjs-min', 'es', 'es-min', 'umd', 'umd-min'].map((format, index) => getConfig(format, index === 0))

export default configs
