import * as webpack from 'webpack'
import * as path from 'path'
import * as url from 'url'
// import * as os from 'os'
import * as fs from 'fs-extra'
import {injectDataToCompiler} from './hack-webpack'
import {findup, trimPath, toFilePath, formatDate} from './util'
import {loader} from './plugin'
import {babelrc} from './config/babelrc'

const debug = require('debug')('minapp:Compiler')

export interface CompilerOptions {
  watch?: boolean
  /**
   * autoprefixer 的配置选项
   *
   * - false: 表示禁用
   * - true: 表示使用默认值
   * - 否则使用指定的配置
   */
  autoprefixer?: boolean | {[key: string]: any}

  /**
   * 插件 babel-plugin-transform-runtime 的配置选项，
   * 需要先在本地安装 babel-runtime
   *
   * - false: 表示禁用
   * - true: 表示使用默认值
   * - 否则使用指定的配置
   */
  babelRuntime?: boolean | {[key: string]: any}

  /**
   * 类似于 webpack 配置中的 output.publicPath
   *
   * 因为微信小程序的 wscss 中不支持本地图片引用，所以需要指定一个 publicPath 来生成服务端的链接
   *
   * 如果不指定，且在开发模式下，默认会使用内部启动的一个服务器的地址： http://localhost:8080/static/
   *
   * 开发环境此配置一般要和 staticDir 和 server.contentBase 结合起来考虑
   */
  publicPath: string

  /**
   * 图片、视频、音频这些静态资源存放的目录，相对于 distDir，默认为 static
   */
  staticDir: string

  server: {
    /**
     * 服务器的根目录，默认是 distDir
     */
    contentBase: string
    /**
     * 开发模式下用于 serve 静态图片的服务器，类似于 webpack 配置中的 devServer.host
     *
     * 默认：
     *  - 优先使用 publicPath 中指定的本地 host
     *  - 否则： localhost
     */
    host: string
    /**
     * 开发模式下用于 serve 静态图片的服务器端口号，类似于 webpack 配置中的 devServer.port
     *
     * 默认： 先判断 publicPath 中是否有端口，没有就用 `8080`
     */
    port: string
    /**
     * 类似于 webpack 配置中的 devServer.https
     *
     * 可以指定为 `true` 或者手动设置
     *
     * 如果没有设置，并且 publicPath 为 `https` 开头的话，也会开启
     *
     *  https: {
     *    key: fs.readFileSync("/path/to/server.key"),
     *    cert: fs.readFileSync("/path/to/server.crt"),
     *    ca: fs.readFileSync("/path/to/ca.pem"),
     *  }
     */
    https?: boolean | {
      key: Buffer
      cert: Buffer
      ca: Buffer
    }
  }
}

export class Compiler {
  production: boolean
  srcDir: string
  distDir: string

  modulesDir: string
  entryName: string
  // entryPath: string

  options: CompilerOptions

  constructor(srcDir: string, distDir: string, options: Partial<CompilerOptions> = {}) {
    this.production = process.env.NODE_ENV === 'production'
    debug('production: %o', this.production)
    this.srcDir = path.resolve(srcDir)
    this.distDir = path.resolve(distDir)

    try {
      this.modulesDir = path.resolve(findup.pkg(this.srcDir), '..', 'node_modules')
    } catch (e) {
      throw new Error(`当前项目中没有 package.json 文件，无法编译`)
    }

    this.entryName = 'minapp-entry' + formatDate('-yyyy-mm-dd-') + Math.random().toString(16).substr(2, 6) + '.js'
    // this.entryPath = path.join(os.tmpdir(), this.entryName)

    this.options = this.init(options)
    debug('options: %o', this.options)
    this.build()
  }

  get staticDir() {
    return this.options.staticDir as string
  }

  private init(options: Partial<CompilerOptions> = {}) {
    if (this.production) process.env.BABEL_ENV = 'production'
    if (!fs.existsSync(path.join(this.srcDir, 'app.json'))) {
      throw new Error(`${this.srcDir} 中没有 app.json 文件，无法编译`)
    }

    let {server, publicPath = 'http://localhost:8080/static/', staticDir = 'static', ...rest} = options
    let urlObj = url.parse(publicPath)
    let defaultServer = {host: 'localhost', port: '8080', https: false, contentBase: this.distDir}
    if (urlObj.host && /^((?:localhost)|(?:192|172|0)\.)/.test(urlObj.host)) {
      defaultServer.host = urlObj.host
      if (urlObj.protocol) defaultServer.https = urlObj.protocol === 'https:'
      if (urlObj.port) defaultServer.port = urlObj.port
    }
    fs.emptyDirSync(this.distDir)

    return {
      server: {...defaultServer, ...(server || {})},
      publicPath: trimPath(publicPath, 'rtrim') + '/', // 确保最后有个 /
      staticDir: path.join(this.distDir, toFilePath(staticDir, 'ltrim')),
      ...rest
    }
  }

  isStaticFile(filepath: string) {
    return /\.(gif|png|jpg|jpeg|svg|ico|woff|woff2|ttf|eot|otf)$/.test(filepath)
  }

  build() {
    // fs.writeFileSync(this.entryPath, `require('${this.srcDir}/app.json')`)

    const wpOpts: webpack.Configuration = {
      target: 'web',
      // devtool: 'source-map', // TODO: 内部 loader 支持 sourceMap
      entry: path.join(this.srcDir, 'app.json'),
      output: {
        path: this.distDir,
        filename: this.entryName
      },
      resolve: {
        extensions: ['.js', '.ts', '.json'],
        mainFields: ['main', 'module', 'browser'],
        modules: [this.srcDir, this.modulesDir],
      },
      stats: { // https://webpack.js.org/configuration/stats/#stats
        // ['all' as '']: false,
        modules: true,
        maxModules: 0,
        publicPath: true,
        performance: true,
        timings: true,
        version: true,
        errors: true,
        errorDetails: true,
        warnings: true,
        colors: true
      },
      module: {
        rules: [
          // JSON
          {test: /\.json$/, use: loader.json},

          // 脚本
          {test: /\.ts$/, include: this.srcDir, use: [loader.wxs, loader.ts]},
          {test: /\.js$/, include: this.srcDir, use: [loader.wxs, {loader: loader.babel, options: babelrc(this)}]},
          {test: /.js$/, exclude: this.srcDir, use: [loader.wxs]},

          // 模板
          {test: /\.wxml$/, use: loader.wxml},

          // 样式
          {test: /\.s(c|a)ss$/, use: [loader.wxss, loader.sass]},
          {test: /\.less$/, use: [loader.wxss, loader.less]},
          {test: /\.(css|wxss)$/, use: loader.wxss},

          // 其它文件：不存在；静态资源在对应的其它文件中可以通过 loader 的 loadStaticFile 来 load
          // {test: res => this.isStaticFile(res), use: loader.file}
        ]
      }
    }

    let wp = webpack(wpOpts)
    injectDataToCompiler(wp, this)
    let callback = (err: any, stats: webpack.Stats) => {
      this.dispose()

      if (err) console.log(err.message, err.stack)
      else console.log(stats.toString(wpOpts.stats))
    }

    if (this.options.watch) {
      wp.watch({}, callback)
    } else {
      wp.run(callback)
    }
  }

  dispose() {
    // let rm = (file: string) => fs.existsSync(file) && fs.unlinkSync(file)

    // if (!this.options.watch) rm(this.entryPath)
    // rm(path.join(this.distDir, this.entryName))
  }
}

