/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as webpack from 'webpack'
import * as sources from 'webpack-sources'
import {Env} from '../../config/env'

const debug = require('debug')('minapp:cli:ExtractMinappCode')
const EXTRACT_REGEXP = /\{([^\{]*)__minapp__\(['"]([^'"]+)['"]\s*,\s*function\s*\(\s*\)\s*\{([\s\S]*?)\}\)[,;]*__minapp_end__\(\)[,;]*/g
const REPLACE_REGEXP = /__minapp_require/g

export class ExtractMinappCode {
  constructor(public env: Env) {}
  /*
    ## 1. 如何提取出单个的文件到 assets 中 ？
      每个 chunk 中，对应了一批 modules，可以使用 chunk.mapModules 来遍历这些 modules
      而 compilation 中有个 rebuildModule 方法

      所以可以将一个个修改 chunk 中的 module，然后 rebuildModule

    ## 2. 指定要压缩的 assets 的解决方案 ？
      在 compliation 中的 createModuleAssets 时，会将 filename 写入 chunks[].files 中
      而 uglify 只会压缩 chunks[].files 中的文件

      所以只要将需要压缩的文件都写入 chunks[].files 中就可以触发 uglify 的压缩
      createModuleAssets 执行完后会调用 additional-chunk-assets 钩子，所以上它上面注入监听即可

    ## 3. 有个问题是抽取出的 emitContent 不支持 DefinePlugin 注入的环境变量？
  */
  apply(compiler: webpack.Compiler) {

    // compiler.plugin('compilation', (compilation: any) => {
    //   let emits: any = []

    //   // 先给 loader 提供一个注入内容的函数
    //   compilation.plugin('normal-module-loader', (loaderContenxt: any, mod: any) => {
    //     loaderContenxt[NS] = (emitFile: string, emitContent: string) => {
    //       if (!mod[NS]) mod[NS] = []
    //       mod[NS].push({emitFile, emitContent})
    //     }
    //   })

    //   // 读取 loader 注入在每个 module 中的内容，并删除对应的 module
    //   compilation.plugin('optimize-tree', (chunks: any[], modules: any[], callback: any) => {
    //     chunks.forEach((chunk, chunkIndex) => {
    //       let emitChunk = emits[chunkIndex] = []
    //       chunk.mapModules((mod: any) => {
    //         if (Array.isArray(mod[NS])) {
    //           // @ts-ignore
    //           mod[NS].forEach(({emitFile, emitContent}) => emitChunk.push({emitFile, emitContent}))
    //           chunk.removeModule(mod) // 删除这个模块
    //         }
    //       })
    //     })
    //     callback()
    //   })

    //   // 生成新文件
    //   compilation.plugin('additional-chunk-assets', (chunks: any[]) => {
    //     chunks.forEach((chunk, chunkIndex) => {
    //       if (!emits[chunkIndex] || !emits[chunkIndex].length) return
    //       let main = chunk.files.pop() // 删除 chunk 中的第一个文件，这个文件是 webpack 的入口文件，对小程序没意思（避免 uglify 对它压缩，节省性能）
    //       delete compilation.assets[main]

    //       // @ts-ignore
    //       emits[chunkIndex].forEach(({emitFile, emitContent}) => {
    //         if (chunk.files.indexOf(emitFile) >= 0) throw new Error(`生成的文件 ${emitFile} 重复了`)
    //         chunk.files.push(emitFile)
    //         compilation.assets[emitFile] = new sources.RawSource(emitContent)
    //       })
    //     })
    //   })
    // })

    compiler.hooks.emit.tap('ExtractMinappCode', (compilation: webpack.compilation.Compilation) => {
      debug('extract start')

      let filename = this.env.output
      // @ts-ignore
      let source: any = compilation.assets[filename]

      if (source) {
        let content = source.source() as string

        content.replace(EXTRACT_REGEXP, (r, prefix, emitFile, emitContent) => {
          emitContent = prefix.trim() + emitContent.replace(REPLACE_REGEXP, 'require')
          debug('extract %j', emitFile)
          debug(emitContent)
          compilation.assets[emitFile] = new sources.RawSource(emitContent)
          return ''
        })

        delete compilation.assets[filename]
      }
      debug('extract end')
    })
  }
}
