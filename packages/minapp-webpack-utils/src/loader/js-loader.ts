/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

// import * as path from 'path'
import {Loader} from './Loader'
import * as JSON5 from 'json5'
import * as DotProp from 'mora-scripts/libs/lang/DotProp'
import {replace, readFile} from '../util'

const debug = require('debug')('minapp:webpack-utils:js-loader')

const REQUIRE_REGEXP = /require\((['"])([^'"]*)\1\)/g

@Loader.decorate
export default class WxsLoader extends Loader {
  async run(content: string) {
    debug('FromFile: ' + this.fromFile)
    debug('ToFile: %o', this.toFile)

    let requires: string[] = []

    let emitFile = this.emitFile.replace(/\.\w+$/, '.js')
    let emitContent = await replace(content, REQUIRE_REGEXP, async ([, , request]) => {
      if (this.isStaticFile(request)) {
        return JSON.stringify(await this.loadStaticFile(request))
      }

      // 将文件记录起来，触发 webpack 继续解析此文件
      let absFile = await this.resolve(request)

      // 如果是 require json 文件，解析 json 的内容
      if (this.isJsonFile(request)) {
        let [file, query] = absFile.split('?')
        let json = JSON5.parse((await readFile(file)).toString())
        return JSON.stringify(query ? DotProp.get(json, query) : json)
      }

      if (!this.isFileInSrcDir(absFile) && this.mode === 'component') {
        return `__minapp_require("${request}")`
      }
      requires.push(absFile) // 使用绝对路径，避免重复 resolve

      // 修改文件路径成相对引用的形式，同时去除文件后缀（可能是 .ts 的后缀）
      // 并使用 __minapp_require，而不是 require，避免被 webpack 解析
      return this.toRequire(absFile.replace(/\.\w+$/, ''), 'extract', '', '__minapp_require')
    }, 0)

    return [
      `__minapp__(${JSON.stringify(emitFile)}, function() { ${emitContent} });`,
      '__minapp_end__();',
      `${this.toRequire(requires, 'webpack')}`
    ].join('')
  }
}
