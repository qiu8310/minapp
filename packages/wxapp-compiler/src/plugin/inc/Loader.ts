import * as webpack from 'webpack'
import {Compiler} from '../../Compiler'
import {getDataFromLoaderContext} from '../../hack-webpack'
import * as path from 'path'
import {findup} from 'mora-scripts/libs/fs/'
import {isWin} from 'mora-scripts/libs/sys/'

export abstract class Loader {
  static decorate(LoaderClass: any) {
    return function(this: webpack.loader.LoaderContext, content: string, sourceMap?: string | Buffer) {
      let loader: Loader = new LoaderClass(this)
      return loader.run(content, sourceMap)
    } as any
  }

  compiler: Compiler
  srcDir: string
  distDir: string

  fromFile: string

  constructor(public lc: webpack.loader.LoaderContext) {
    this.compiler = getDataFromLoaderContext(lc)
    this.srcDir = this.compiler.srcDir
    this.distDir = this.compiler.distDir

    this.fromFile = this.resourcePath
  }

  // entryFile 由于放在临时目录中，没有 emitFile，所以 emitFile 不能放到初始化函数中
  get emitFile() { return this.getEmitFile(this.fromFile) }
  get toFile() { return path.join(this.distDir, this.emitFile) }

  abstract run(content: string, sourceMap?: string | Buffer): string | Promise<string>

  /** 判断某个文件是否在 srcDir 中 */
  isFileInSrcDir(absFile: string) { return absFile.indexOf(this.srcDir) === 0 && this.compiler.modulesDir.indexOf(absFile) < 0 }

  /** 返回 emitFile，即相对于 distDir 的文件路径 */
  getEmitFile(absFile: string) {
    let {srcDir, modulesDir} = this.compiler

    // 注意1：node_modules 中可能有 link 文件夹
    // 注意2：可以引入 node_modules 中的子 node_modules 中的文件
    let inSrcDir = this.isFileInSrcDir(absFile)
    let inModulesDir = !inSrcDir && absFile.indexOf(modulesDir) === 0
    return inSrcDir ? path.relative(srcDir, absFile)
      : inModulesDir ? path.join('npm', path.relative(modulesDir, absFile))
      : path.join('npm', getProjectRelativePath(absFile))
  }

  /** 将当前文件引用的其它文件解析成可以直接使用的路径，如：直接用在新代码的 require() 中 */
  resolveEmitFile(emitFile: string) {
    let {distDir} = this
    return this.toRelative(path.relative(path.dirname(this.toFile), path.join(distDir, emitFile)))
  }

  /** 将文件转化成相对路径形式 */
  toRelative(file: string) {
    let noprefix = ['.', '/', '\\'].indexOf(file[0]) >= 0 || isWin && /^\w:[\\\/]/.test(file)
    return `${noprefix ? '' : '.' + path.sep}${file}`
  }

  /** 将文件或文件列表转化成 js 中的 require，这里的文件一般是解析后的绝对路径 */
  toRequire(files: string | string[]): string {
    return Array.isArray(files)
      ? files.map(f => this.toRequire(f)).join('\n')
      : `require("${this.toRelative(files)}");`
  }

  async resolve(request: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.lc.resolve(this.lc.context, request, (e, res) => e ? reject(e) : resolve(res))
    })
  }
  async tryResolve(request: string): Promise<string | undefined> {
    try { return await this.resolve(request) } catch (e) { return }
  }

  // LoaderContext 中的属性

  /** Emit a error. */
  emitError(message: any) { this.lc.emitError(formatMessage(message)) }
  /** Emit a earning. */
  emitWarning(message: any) { this.lc.emitWarning(formatMessage(message)) }

  /**
   * Adds a file as dependency of the loader result in order to make them watchable.
   * For example, html-loader uses this technique as it finds src and src-set attributes.
   * Then, it sets the url's for those attributes as dependencies of the html file that is parsed.
   */
  addDependency(file: string) { this.lc.addDependency(file) }
  /** Emit a file. This is webpack-specific. */
  emit(name: string, content: Buffer | string, sourceMap: any = null) { this.lc.emitFile(name, content, sourceMap)}
  /** The options passed to the Compiler. */
  get options() { return this.lc.options }
  /** A boolean flag. It is set when in debug mode. */
  get debug() { return this.lc.debug }
  /** Should the result be minimized. */
  get minimize() { return this.lc.minimize || this.compiler.production }
  /** The resource part of the request, including query. In the example: "/abc/resource.js?rrr" */
  get resource() { return this.lc.resource }
  /** The resource file. In the example: "/abc/resource.js" */
  get resourcePath() { return this.lc.resourcePath }

}

function formatMessage(message: any): string | Error {
  if (message instanceof Error) return message
  if (typeof message === 'string') return message
  return JSON.stringify(message)
}

/** 获取一个文件相对于它的项目根目录的路径 */
function getProjectRelativePath(file: string) {
  try {
    let root = path.dirname(findup.pkg(path.dirname(file)))
    return path.relative(path.dirname(root), file)
  } catch (e) {
    throw new Error(`文件 ${file} 不在任何项目下`)
  }
}
