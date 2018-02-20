import * as webpack from 'webpack'
import * as sources from 'webpack-sources'

const debug = require('debug')('minapp:webpack:ExtractMinappCode')

const EXTRACT_REGEXP = /__minapp_emit_start\(['"]([^)]+)['"]\);?([\s\S]*?);?__minapp_emit_end\(\)/g
const REPLACE_REGEXP = /__minapp_require/g

export class ExtractMinappCode {

  apply(compiler: webpack.Compiler) {
    compiler.plugin('emit', async (compilation: any, done) => {
      debug('emit start')

      let {filename} = (compiler.options.output || {}) as webpack.Output
      if (!filename) return

      let source: any = compilation.assets[filename]
      let content = source.source() as string

      content.replace(EXTRACT_REGEXP, (r, emitFile, emitContent) => {
        emitContent = emitContent.replace(REPLACE_REGEXP, 'require')
        debug('提取文件 %j', emitFile)
        debug(emitContent)
        compilation.assets[emitFile] = new sources.RawSource(emitContent)
        return ''
      })

      delete compilation.assets[filename]
      return done()
    })
  }
}

// function isCachedSource(source: any): source is sources.CachedSource {
//   return source.hasOwnProperty('_cachedMaps')
// }

// function isRawSource(source: any): source is sources.RawSource {
//   return !isCachedSource(source) && source.hasOwnProperty('_value')
// }
