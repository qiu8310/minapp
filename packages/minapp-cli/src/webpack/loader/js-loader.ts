/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

// import * as path from 'path'
import {Loader} from './Loader'
import * as JSON5 from 'json5'
import * as DotProp from 'mora-scripts/libs/lang/DotProp'
import {replace, readFile, replaceExt} from '../util'

const debug = require('debug')('minapp:cli:js-loader')

const REQUIRE_REGEXP = /require\((['"])([^'"]*)\1\)/g

@Loader.decorate
export default class JsLoader extends Loader {
  async run(content: string) {
    debug('FromFile: ' + this.fromFile)
    debug('ToFile: %o', this.toFile)

    this.lc.cacheable()

    let requires: string[] = []

    let emitFile = replaceExt(this.emitFile, '.js')
    let emitContent = await replace(content, REQUIRE_REGEXP, async ([raw, , request]) => {

      if (!this.shouleMakeResolveRequest(request)) return raw

      // 将文件记录起来，触发 webpack 继续解析此文件
      let absFile = await this.resolve(request)

      if (this.isStaticFile(absFile)) {
        let url = await this.loadStaticFile(absFile, request)
        if (!this.shouleMakeResolveRequest(url) || this.projectType === 'application') {
          return JSON.stringify(url)
        }
        return `__minapp_require("${url}")`
      }

      // 如果是 require json 文件，解析 json 的内容
      if (this.isJsonFile(request)) {
        let [file, query] = absFile.split('?')
        let json = JSON5.parse((await readFile(file)).toString())
        return JSON.stringify(query ? DotProp.get(json, query) : json)
      }

      if (!this.shouleMakeRequireFile(absFile)) {
        return `__minapp_require("${request}")`
      }
      requires.push(absFile) // 使用绝对路径，避免重复 resolve

      // 修改文件路径成相对引用的形式，同时去除文件后缀（可能是 .ts 的后缀）
      // 并使用 __minapp_require，而不是 require，避免被 webpack 解析
      return `__minapp_require("${this.getExtractRequirePath(absFile, '')}")`
    }, 0)

    return [
      `__minapp__(${JSON.stringify(emitFile)}, function() {\n${emitContent}\n});`,
      '__minapp_end__();',
      `${this.toRequire(requires)}`
    ].join('')
  }
}
