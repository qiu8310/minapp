/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as webpack from 'webpack'
import * as path from 'path'
import {Env, projectType} from '../../config/env'
import {getProjectRoot, readFile, md5, toUrlPath, toRelative, JSON_REGEXP, replaceExt, base64EncodeBuffer} from '../util'
const mime = require('mime')

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

  env: Env


  options: {[key: string]: any}

  /**
   * 入口文件（只会有一个）
   */
  entryFile: string

  /**
   * 项目类型，是 application 还是 component
   */
  projectType: projectType

  /**
   * package.json 文件所在的目录
   */
  projectDir: string
  /**
   * projectDir 下的 node_modules 目录
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
   * 即 webpack 的 publicPath 配置
   */
  outputPublicPath: string

  private cacheEmitFile?: string

  constructor(public lc: webpack.loader.LoaderContext) {
    let env = this.env = (lc as any).env as Env

    this.entryFile = path.resolve(env.entry)
    this.projectType = env.projectType
    this.srcDir = env.srcDir
    this.distDir = env.distDir
    this.modulesDir = env.modulesDir
    this.projectDir = env.rootDir
    this.outputPublicPath = env.publicPath
    this.fromFile = lc.resourcePath

    // loader-utils getOptions
    this.options = typeof lc.query === 'object' ? lc.query : {}
  }

  abstract run(content: string, sourceMap?: string | Buffer): string | Promise<string>

  /**
   * 要生成的文件，相对目录（相对于 distDir），如果需要使用绝对目录，请使用 toFile
   */
  get emitFile() {
    this.cacheEmitFile = this.cacheEmitFile || this.getEmitFile(this.fromFile)
    return this.cacheEmitFile
  }
  /**
   * 要生成的文件，绝对目录
   */
  get toFile() { return path.join(this.distDir, this.emitFile) }

  /** 判断某个文件是否在 srcDir 中 */
  isFileInSrcDir(absFile: string) { return absFile.indexOf(this.srcDir) === 0 && this.modulesDir.indexOf(absFile) < 0 }

  /**
   * 根据文件当前的路径，获取到它编译后的相对 distDir 的路径
   */
  private getEmitFile(absFile: string) {
    let {srcDir, modulesDir, env: {minapp}} = this
    let npmFolder = minapp.compiler.npmOutputFolder

    // 注意1：node_modules 中可能有 link 文件夹
    // 注意2：可以引入 node_modules 中的子 node_modules 中的文件
    let inSrcDir = this.isFileInSrcDir(absFile)
    let inModulesDir = !inSrcDir && absFile.indexOf(modulesDir) === 0
    return inSrcDir ? path.relative(srcDir, absFile)
      : inModulesDir ? path.join(npmFolder, path.relative(modulesDir, absFile))
      : path.join(npmFolder, getProjectRelativePath(absFile))
  }

  isJsonFile(request: string): boolean {
    return JSON_REGEXP.test(request.split(/[#\?]/)[0])
  }

  isStaticFile(request: string): boolean {
    let {staticFileExtensions} = this.env.minapp.compiler
    let ext = request.split(/[#\?]/)[0].split('.').pop() as string
    return staticFileExtensions.toLowerCase().split('|').includes(ext.toLowerCase())
  }

  /**
   * @param {string} absFile
   * @param {string} request
   * @param {boolean} [local] 不需要网络图片（如 app.json 中配置的 tabBar 图标）
   * @memberof Loader
   */
  async loadStaticFile(absFile: string, request: string, local?: boolean): Promise<string> {
    // let absFile = await this.resolve(request)
    this.lc.addDependency(absFile)

    // TODO: 这里需要一个处理静态资源路径的脚本
    let content = await readFile(absFile)

    if (this.projectType === 'component' || local) {
      this.emit(this.getEmitFile(absFile), content)
      return request // 无须更新文件引用
    }

    let {urlLoaderLimit, staticOutputName, staticOutputFolder} = this.env.minapp.compiler
    if (urlLoaderLimit > 0 && content.length < urlLoaderLimit) {
      return base64EncodeBuffer(content, mime.getType(absFile))
    }

    let ext = path.extname(absFile)
    staticOutputName = staticOutputName.replace(/\[([\w]+)(?::(\d+))?\]/g, (raw: string, key: string, truncate: string) => {
      if (key === 'name') key = path.basename(absFile, ext)
      else if (key === 'ext') key = ext.replace(/^\./, '')
      else if (key === 'hash') key = md5(content)
      else return raw
      return !truncate ? key
        : truncate === '0' ? key.split(/[-_@]/)[0]
        : key.substr(0, parseInt(truncate, 10))
    })

    let file = path.join(staticOutputFolder, staticOutputName)
    this.emit(file, content)
    let url = this.outputPublicPath + toUrlPath(file)

    if (this.env.mode === 'production' && !(/^(\w+?:)\/\//.test(url))) {
      this.emitWarning(new Error(`file ${this.fromFile} is using local resource! \nPlease use "minapp dev" or use "minapp build --publicPath http://your.static.server/"`))
    }

    return url
  }

  /**
   * 是否应该解析 request 资源
   */
  shouleMakeResolveRequest(request: string) {
    // 如果剩下的是个空字符串，去掉
    if (!request || typeof request !== 'string') return false

    // 如果是以 \w+: 或 // 开头的文件 ，则忽略，如 http://xxx.com/jq.js, //xxx.com/jq.js, javascript:; chrome-extension:
    if (/^(?:[\w\-]+:|\/\/)/.test(request)) return false

    return true
  }

  async resolve(request: string): Promise<string> {
    if (request[0] === '~') request = toUrlPath(this.modulesDir) + request.substr(1)
    return new Promise<string>((resolve, reject) => {
      this.lc.resolve(this.lc.context, request, (e, res) => {
        if (e) {
          // /a/b 解析 c.js 会解析不了，所以要再尝试下解析 ./c.js
          if (/^\w/.test(request)) {
            this.lc.resolve(this.lc.context, './' + request, (e1, res1) => e1 ? reject(e) : resolve(res1))
          } else {
            reject(e)
          }
        } else {
          resolve(res)
        }
      })
    })
  }
  async tryResolve(request: string): Promise<string | undefined> {
    try {
      return this.resolve(request)
    } catch (e) {
      return
    }
  }


  /**
   * 是否应该解析指定的文件
   *
   * 在组件开发中，无需解析 node_modules 中的文件
   */
  shouleMakeRequireFile(absFile: string) {
    return this.isFileInSrcDir(absFile) || this.projectType === 'application'
  }

  /**
   * 获取 emit 之后的文件的相对路径
   */
  getExtractRequirePath(absFile: string, fileExt?: string | null, relativeDir?: string) {
    let emitFile = this.getEmitFile(absFile)
    let file = path.relative(relativeDir || path.dirname(this.toFile), path.join(this.distDir, emitFile))
    if (fileExt != null) file = replaceExt(file, fileExt)
    return toUrlPath(toRelative(file))
  }

  toRequire(absfiles: string | string[], semicolon = ';', requireKey = 'require'): string {
    return Array.isArray(absfiles)
      ? absfiles.map(f => this.toRequire(f, semicolon, requireKey)).join('\n')
      : `${requireKey}("${toUrlPath(absfiles)}")${semicolon}`
  }

  /**
   * 抽取出当前 loader 处理的文件来
   * @param {string} fileExt 文件后缀，需要带 .
   * @param {string} content 文件内容
   * @memberof Loader
   */
  extract(fileExt: string, content: string) {
    this.emit(replaceExt(this.emitFile, fileExt), content, null)
  }

  /** Emit a file. This is webpack-specific. */
  emit(name: string, content: Buffer | string, sourceMap: any = null) {
    if (path.resolve(this.distDir, name).indexOf(this.distDir) !== 0) {
      this.emitWarning(`can not emit file ${name}, because it is outside distDir: ${this.distDir}`)
    } else {
      this.lc.emitFile(name, content, sourceMap)
    }
  }

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
  get minimize() { return this.env.mode === 'production' && !this.env.pretty }
}

/** 获取一个文件相对于它的项目根目录的路径 */
function getProjectRelativePath(file: string) {
  try {
    let root = getProjectRoot(file)
    return path.relative(path.dirname(root), file)
  } catch (e) {
    throw new Error(`file ${file} can not related to a project`)
  }
}
