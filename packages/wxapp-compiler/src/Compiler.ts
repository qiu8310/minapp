import * as webpack from 'webpack'
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs-extra'
import {findup} from 'mora-scripts/libs/fs'
import {formatDate} from 'mora-scripts/libs/lang'
import {injectDataToCompiler} from './hack-webpack'
import {loader} from './loader'
import {babelrc} from './config/babelrc'

export interface CompilerOptions {
  watch?: boolean
}

export class Compiler {
  production: boolean
  srcDir: string
  distDir: string
  modulesDir: string
  entryName: string
  entryPath: string
  constructor(srcDir: string, distDir: string, public options: CompilerOptions = {}) {
    this.production = process.env.NODE_ENV === 'production'
    this.srcDir = path.resolve(srcDir)
    this.distDir = path.resolve(distDir)

    try {
      this.modulesDir = path.resolve(findup.pkg(this.srcDir), '..', 'node_modules')
    } catch (e) {
      throw new Error(`当前项目中没有 package.json 文件，无法编译`)
    }

    this.entryName = 'wxapp-entry' + formatDate('-mm-dd-') + Math.random().toString(16).substr(2, 6) + '.js'
    this.entryPath = path.join(os.tmpdir(), this.entryName)

    this.build()
  }

  build() {
    this.beforeBuild()
    fs.writeFileSync(this.entryPath, `require('${this.srcDir}/app.json')`)

    const options: webpack.Configuration = {
      target: 'web',
      // devtool: 'source-map', // TODO: 内部 loader 支持 sourceMap
      entry: this.entryPath,
      output: {
        path: this.distDir,
        filename: this.entryName
      },
      resolve: {
        extensions: ['.js', '.ts', '.json'],
        mainFields: ['main', 'module', 'browser'],
        modules: [this.srcDir, this.modulesDir],
      },
      module: {
        rules: [
          // JSON
          {test: /\.json$/, use: loader.json},

          // 脚本
          {test: /\.ts$/, include: this.srcDir, use: [loader.wxjs, loader.ts]},
          {test: /\.js$/, include: this.srcDir, use: [loader.wxjs, {loader: loader.babel, options: babelrc(this)}]},
          {test: /.js$/, exclude: this.srcDir, use: [loader.wxjs]},

          // 模板
          {test: /\.wxml$/, use: loader.wxml},

          // 样式
          {test: /\.s(c|a)ss$/, use: [loader.wxss, loader.sass]},
          {test: /\.less$/, use: [loader.wxss, loader.less]},
          {test: /\.(css|wxss)$/, use: loader.wxss},

          // 其它文件
          {test: /\.(gif|png|jpg|jpeg|svg|ico|woff|woff2|ttf|eot|otf)$/, use: loader.file}
        ]
      }
    }

    let wp = webpack(options)
    let {srcDir, distDir, modulesDir, entryName} = this
    injectDataToCompiler(wp, {srcDir, distDir, modulesDir, entryName})
    wp.run((err, stats) => {
      this.afterBuild()
      if (err) console.log(err.message, err.stack)
      else console.log(stats.toString({colors: true}))
    })
  }

  private beforeBuild() {
    if (this.production) process.env.BABEL_ENV = 'production'

    fs.emptyDirSync(this.distDir)
    if (!fs.existsSync(path.join(this.srcDir, 'app.json'))) {
      throw new Error(`${this.srcDir} 中没有 app.json 文件，无法编译`)
    }
  }

  private afterBuild() {
    fs.unlinkSync(this.entryPath)
    fs.unlinkSync(path.join(this.distDir, this.entryName))
  }
}

