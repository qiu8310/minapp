// import * as path from 'path'
import {Loader} from './Loader'
import {replace} from '../util'
import * as tracker from 'debug'
const debug = tracker('minapp:wxml-loader')

const REQUIRE_REGEXP = /require\((['"])([^'"]*)\1\)/g

@Loader.decorate
export default class WxsLoader extends Loader {
  async run(content: string) {
    debug('FromFile: ' + this.fromFile)
    debug('ToFile: %o', this.toFile)

    let requires: string[] = []

    this.extract('.js', await replace(content, REQUIRE_REGEXP, async ([raw, quote, request]) => {
      if (this.isStaticFile(request)) {
        return JSON.stringify(await this.loadStaticFile(request))
      }

      // 将文件记录起来，触发 webpack 继续解析此文件
      let absFile = await this.resolve(request)
      requires.push(absFile) // 使用绝对路径，避免重复 resolve

      if (this.isFileInSrcDir(absFile)) {
        // 项目中的文件相互引用，路径不变
        return raw
      } else {
        // 项目中的文件引用项目外的文件，要修改文件的引用路径
        return this.toRequire(absFile, 'extract')
      }
    }, 0))

    return this.toRequire(requires, 'webpack')
  }
}
