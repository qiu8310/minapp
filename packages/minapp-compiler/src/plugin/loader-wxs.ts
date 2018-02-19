// import * as path from 'path'
import {Loader, replace} from './inc/'

const REQUIRE_REGEXP = /require\((['"])([^'"]*)\1\)/g

@Loader.decorate
export default class WxsLoader extends Loader {
  async run(content: string) {
    let {fromFile} = this

    // 入口文件，不做任何处理
    // if (path.basename(fromFile) === entryName) return content

    let requires: string[] = []
    let emitFile = this.emitFile.replace(/\.\w+$/, '.js') // 转换成 js
    let emitContent = await replace(content, REQUIRE_REGEXP, async ([raw, quote, key]) => {
      let absFile = await this.tryResolve(key)

      if (!absFile) { // 有可能是注释中的 require，不做任何处理
        this.emitWarning(`解析不了 ${fromFile} 中引用的文件 ${key}`)
        return raw
      }

      if (this.isStaticFile(absFile)) {
        return JSON.stringify(await this.loadStaticFile(absFile))
      }

      // 将文件记录起来，触发 webpack 继续解析此文件
      requires.push(absFile) // 使用绝对路径，避免重复 resolve

      if (this.isFileInSrcDir(absFile)) {
        // 项目中的文件相互引用，路径不变
        return raw
      } else {
        // 项目中的文件引用项目外的文件，要修改文件的引用路径
        return this.toRequire(this.resolveEmitFile(this.getEmitFile(absFile)))
      }
    }, 0)

    this.emit(emitFile, emitContent)
    return this.toRequire(requires)
  }
}
