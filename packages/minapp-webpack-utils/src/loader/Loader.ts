/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as webpack from 'webpack'
import * as path from 'path'
import {getProjectRoot, readFile, md5, toUrlPath, toRelative, STATIC_REGEXP, JSON_REGEXP} from '../util'

export abstract class Loader {
  static decorate(loaderConstructor: any) {
    return function(this: webpack.loader.LoaderContext, content: string, sourceMap?: string | Buffer) {
      let loader: Loader = new loaderConstructor(this)
      try {
        let prom = loader.run(content, sourceMap) as any
        if (prom && typeof prom.catch === 'function') {
          return prom.catch((e: any) => loader.emitError(e))
        } else {
          return prom
        }
      } catch (e) {
        loader.emitError(e)
        return ''
      }
    } as any
  }

  /**
   * package.json 文件所在的目录
   */
  projectDir: string
  /**
   * projectRoot 下的 node_modules 目录
   */
  modulesDir: string
  /**
   * 源代码所在的目录
   */
  srcDir: string
  /**
   * 编译后的代码所在的目录
   */
  distDir: string
  /**
   * 当前 loader 需要处理的文件
   */
  fromFile: string
  /**
   * 最后要输出的 entry 文件
   */
  outputEntryFile: string
  entryFile: string

  outputPublicPath: string

  private cacheEmitFile?: string

  constructor(public lc: webpack.loader.LoaderContext) {
    let options = lc._compiler.options

    let {entry, output = {}} = options

    if (typeof entry !== 'string' || /^app\.(cjson|json|jsonc)$/i.test(entry)) {
      throw new Error(`webpack 配置 options.entry 必须是小程序入口文件 app.json 的路径`)
    }

    this.entryFile = path.resolve(entry)
    this.srcDir = path.dirname(this.entryFile)

    if (!output.path) {
      throw new Error(`缺少 webpack 配置 options.output.path`)
    }

    if (output.filename === 'app.js') {
      throw new Error(`webpack 配置 options.output.filename 不能为 app.js，请使用一个随机的名称，因为每次编译后此文件完全没意义`)
    }

    this.outputPublicPath = output.publicPath || ''

    this.distDir = output.path
    this.fromFile = lc.resourcePath
    this.outputEntryFile = path.join(this.srcDir, output.filename as string)
    try {
      this.projectDir = getProjectRoot(entry)
      this.modulesDir = path.join(this.projectDir, 'node_modules')
    } catch (e) {
      throw new Error('项目目录下没有一个 package.json 文件，请使用 `npm init` 初始化一个项目')
    }
  }

  get emitFile() {
    this.cacheEmitFile = this.cacheEmitFile || this.getEmitFile(this.fromFile)
    return this.cacheEmitFile
  }
  get toFile() { return path.join(this.distDir, this.emitFile) }

  abstract run(content: string, sourceMap?: string | Buffer): string | Promise<string>

  /** 判断某个文件是否在 srcDir 中 */
  isFileInSrcDir(absFile: string) { return absFile.indexOf(this.srcDir) === 0 && this.modulesDir.indexOf(absFile) < 0 }

  /**
   * 根据文件当前的路径，获取到它编译后的相对 distDir 的路径
   */
  getEmitFile(absFile: string) {
    let {srcDir, modulesDir} = this

    // 注意1：node_modules 中可能有 link 文件夹
    // 注意2：可以引入 node_modules 中的子 node_modules 中的文件
    let inSrcDir = this.isFileInSrcDir(absFile)
    let inModulesDir = !inSrcDir && absFile.indexOf(modulesDir) === 0
    return inSrcDir ? path.relative(srcDir, absFile)
      : inModulesDir ? path.join('npm', path.relative(modulesDir, absFile))
      : path.join('npm', getProjectRelativePath(absFile))
  }

  private getStaticOptions() {
    let opts = (this.lc as any).minapp || {}

    return {
      test: STATIC_REGEXP,
      output: path.join(this.distDir, 'static'),
      filename: '[name:0]-[hash:10].[ext]',
      ...(opts.static || {})
    }
  }

  isJsonFile(request: string): boolean {
    return JSON_REGEXP.test(request.split(/[#\?]/).shift() as string)
  }

  isStaticFile(request: string): boolean {
    let {test} = this.getStaticOptions()
    if (typeof test === 'function') return test(request)
    return test.test(request.split(/[#\?]/).shift() as string)
  }
  async loadStaticFile(request: string): Promise<string> {
    let absFile = await this.resolve(request)
    this.lc.addDependency(absFile)

    // TODO: 这里需要一个处理静态资源路径的脚本
    let content = await readFile(absFile)
    let {output, filename} = this.getStaticOptions()

    let ext = path.extname(absFile)
    filename = filename.replace(/\[([\w]+)(?::(\d+))?\]/g, (raw: string, key: string, truncate: string) => {
      if (key === 'name') key = path.basename(absFile, ext)
      else if (key === 'ext') key = ext.replace(/^\./, '')
      else if (key === 'hash') key = md5(content)
      else return raw
      return !truncate ? key
        : truncate === '0' ? key.split(/[-_@]/).shift()
        : key.substr(0, parseInt(truncate, 10))
    })

    let file = path.relative(this.distDir, path.join(output, filename))
    this.emit(file, content)
    return this.outputPublicPath + file
  }

  shouleMakeRequire(request: string) {
    // 如果剩下的是个空字符串，去掉
    if (!request || typeof request !== 'string') return false

    // 如果是以 \w+: 或 // 开头的文件 ，则忽略，如 http://xxx.com/jq.js, //xxx.com/jq.js, javascript:; chrome-extension:
    if (/^(?:[\w\-]+:|\/\/)/.test(request)) return false

    return true
  }

  getExtractRequirePath(absFile: string) {
    let emitFile = this.getEmitFile(absFile)
    let file = path.relative(path.dirname(this.toFile), path.join(this.distDir, emitFile))
    return toUrlPath(toRelative(file))
  }
  getWebpackRequirePath(absFile: string) {
    return toUrlPath(absFile) // require 都要使用 / 路径
  }
  toRequire(absfiles: string | string[], type: 'webpack' | 'extract', semicolon = ';', requireKey = 'require'): string {

    let fn = type === 'webpack'
      ? this.getWebpackRequirePath
      : this.getExtractRequirePath
    return Array.isArray(absfiles)
      ? absfiles.map(f => this.toRequire(f, type)).join('\n')
      : `${requireKey}("${fn.call(this, absfiles)}")${semicolon}`
  }

  /**
   * 抽取出当前 loader 处理的文件来
   * @param {string} fileExt 文件后缀，需要带 .
   * @param {string} content 文件内容
   * @memberof Loader
   */
  extract(fileExt: string, content: string) {
    let file = fileExt ? this.emitFile.replace(/\.\w+$/, fileExt) : this.emitFile
    this.emit(file, content, null)
  }

  async resolve(request: string): Promise<string> {
    if (request[0] === '~') request = toUrlPath(this.modulesDir) + request.substr(1)
    return new Promise<string>((resolve, reject) => {
      this.lc.resolve(this.lc.context, request, (e, res) => e ? reject(e) : resolve(res))
    })
  }
  async tryResolve(request: string): Promise<string | undefined> {
    try {
      return this.resolve(request)
    } catch (e) {
      return
    }
  }

  /** Emit a file. This is webpack-specific. */
  emit(name: string, content: Buffer | string, sourceMap: any = null) {
    if (path.resolve(this.distDir, name).indexOf(this.distDir) !== 0) {
      this.emitWarning(`无法生成 ${this.distDir} 目录外的文件：${name}`)
    } else {
      this.lc.emitFile(name, content, sourceMap)
    }
  }

  // LoaderContext 中的属性

  /** Emit a error. */
  emitError(message: any) { this.lc.emitError(message) }
  /** Emit a earning. */
  emitWarning(message: any) { this.lc.emitWarning(message) }

  /**
   * Adds a file as dependency of the loader result in order to make them watchable.
   * For example, html-loader uses this technique as it finds src and src-set attributes.
   * Then, it sets the url's for those attributes as dependencies of the html file that is parsed.
   */
  addDependency(file: string) { this.lc.addDependency(file) }

  /** A boolean flag. It is set when in debug mode. */
  get debug() { return this.lc.debug }
  /** Should the result be minimized. */
  get minimize() { return this.lc.minimize }
}

/** 获取一个文件相对于它的项目根目录的路径 */
function getProjectRelativePath(file: string) {
  try {
    let root = getProjectRoot(file)
    return path.relative(path.dirname(root), file)
  } catch (e) {
    throw new Error(`文件 ${file} 不在任何项目下`)
  }
}
