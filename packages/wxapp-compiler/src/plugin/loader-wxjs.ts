import * as path from 'path'
import {Loader, replace} from './inc/'

const REQUIRE_REGEXP = /require\((['"])([^'"]*)\1\)/g

@Loader.decorate
export default class WxjsLoader extends Loader {
  async run(content: string) {
    let {fromFile, compiler: {entryName}} = this

    // 入口文件，不做任何处理
    if (path.basename(fromFile) === entryName) return content

    let requires: string[] = []
    let emitFile = this.emitFile.replace(/\.\w+$/, '.js') // 转换成 js
    let emitContent = await replace(content, REQUIRE_REGEXP, async ([raw, quote, key]) => {
      let absFile = await this.tryResolve(key)

      if (!absFile) {
        this.emitWarning(`解析不了 ${fromFile} 中引用的文件 ${key}`)
        return raw // 有可能是注释中的 require，不做任何处理
      }

      requires.push(absFile) // 使用绝对路径，避免重复 resolve

      if (this.isFileInSrcDir(absFile)) {
        return raw
      } else {
        return this.toRequire(this.resolveEmitFile(this.getEmitFile(absFile)))
      }
    }, 0)

    this.emit(emitFile, emitContent)
    return this.toRequire(requires)
  }
}
