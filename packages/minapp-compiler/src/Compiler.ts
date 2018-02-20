import * as webpack from 'webpack'
import * as path from 'path'
import * as fs from 'fs-extra'
import * as findup from 'mora-scripts/libs/fs/findup'
import * as isWin from 'mora-scripts/libs/sys/isWin'
import {webpackConfig} from './config/webpack.config'
const Server = require('webpack-dev-server')

const debug = require('debug')('minapp:compiler')

export interface CompilerOptions {
  watch?: boolean
  production?: boolean

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
   */
  publicPath?: string

  /**
   * 图片、视频、音频这些静态资源存放的目录，相对于 distDir（相对地址）
   *
   * 默认： `static`
   */
  staticDir: string

  server?: {
    /**
     * 服务器的根目录（绝对地址）
     *
     * 默认： `/path/to/distDir`
     */
    contentBase: string
    /**
     * 开发模式下用于 serve 静态图片的服务器，类似于 webpack 配置中的 devServer.host
     *
     * 默认：
     *  - window: `localhost`
     *  - others: `0.0.0.0`
     */
    host: string
    /**
     * 开发模式下用于 serve 静态图片的服务器端口号，类似于 webpack 配置中的 devServer.port
     *
     * 默认： `8080`
     */
    port: string

    /** 其它 webpack devServer 的配置 */
    [key: string]: any
  }
}

export class Compiler {
  production: boolean
  srcDir: string
  distDir: string
  modulesDir: string
  options: CompilerOptions

  constructor(srcDir: string, distDir: string, options: Partial<CompilerOptions> = {}) {
    this.production = !!options.production
    if (this.production) {
      process.env.NODE_ENV = 'production'
      process.env.BABEL_ENV = 'production'
    }

    debug('production: %j', this.production)
    this.srcDir = path.resolve(srcDir)
    this.distDir = path.resolve(distDir)

    try {
      this.modulesDir = path.resolve(findup.pkg(this.srcDir), '..', 'node_modules')
    } catch (e) {
      throw new Error(`当前项目中没有 package.json 文件，无法编译`)
    }

    this.options = this.init(options)
    debug('options: %j', this.options)
    this.build()
  }

  /** 初始化默认配置 */
  private init(options: Partial<CompilerOptions> = {}) {
    let {server, publicPath, staticDir = 'static', ...rest} = options
    let defaultServer = {
      hot: false,
      host: isWin ? 'localhost' : '0.0.0.0',
      port: '8080',
      contentBase: this.distDir
    }
    return {
      server: server ? {...defaultServer, ...server} : undefined,
      staticDir: path.join(this.distDir, staticDir),
      ...rest
    }
  }

  build() {
    fs.emptyDirSync(this.distDir)
    const wpOpts = webpackConfig(this)
    let wp = webpack(wpOpts)
    let callback = (err: any, stats: webpack.Stats) => {
      if (err) console.log(err.message, err.stack)
      else console.log(stats.toString(wpOpts.stats))
    }

    let {server: serverOpts, watch} = this.options
    let server: any | undefined

    if (serverOpts) {
      serverOpts.stats = wpOpts.stats
      debug('devServer: %j', serverOpts)
      server = new Server(wp, serverOpts)
      server.listen(serverOpts.port, serverOpts.host)
    } else if (watch) {
      wp.watch({}, callback)
    } else {
      wp.run(callback)
    }

    if (serverOpts || watch) {
      ['SIGINT', 'SIGTERM'].forEach((s: any) => process.on(s, () => {
        if (server) server.close(() => process.exit())
        else process.exit()
      }))
    }
  }
}

