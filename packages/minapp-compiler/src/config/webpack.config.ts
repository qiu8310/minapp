import * as webpack from 'webpack'
import * as path from 'path'
import * as fs from 'fs-extra'

import {babel} from './babel'
import {postcss} from './postcss'
import {loader as minappLoaders, ExtractMinappCode} from '@minapp/webpack-utils'
import {JSON_REGEXP} from '@minapp/webpack-utils/dist/util'

const loader = {
  ts: require.resolve('awesome-typescript-loader'),
  babel: require.resolve('babel-loader'),
  sass: require.resolve('sass-loader'),
  less: require.resolve('less-loader'),
  postcss: require.resolve('postcss-loader'),
  ...minappLoaders
}

import { Compiler } from '../Compiler'

export function webpackConfig(compiler: Compiler) {
  let {srcDir, modulesDir, distDir, options: {server, publicPath}} = compiler

  // 查找 srcDir 下的 app.json/app.cjson/app.jsonc 文件
  let appJson = fs.readdirSync(srcDir).find(n => JSON_REGEXP.test(n) && /^app\.\w+$/i.test(n))
  if (!appJson) throw new Error(`${srcDir} 下面没有 app.json 文件，无法编译`)

  let plugins: any[] = [
    // 传给所有 loader 的选项
    new webpack.LoaderOptionsPlugin({
      minimize: compiler.production,

      // 下面几个配置是传给 minapp loader 用的，都是默认的配置，可以不传
      minapp: {
        static: {
          /** 用于判断文件是不是静态文件 */
          test: /\.(?:gif|png|jpg|jpeg|svg|ico|woff|woff2|ttf|eot|otf|mp3|mp4)$/i,
          /** 用于存放编译后的 静态文件的文件夹（相对于 distDir，默认为 static） */
          output: compiler.options.staticDir,
          /** 重命名编译后的静态文件 */
          filename: '[name:0]-[hash:10].[ext]'
        }
      }
    }),

    // 抽取代码出来
    new ExtractMinappCode()
  ]

  if (server) {
    const WriteFile = require('write-file-webpack-plugin')
    // webpack 服务器默认不会将文件写在本地，需要此插件
    plugins.push(new WriteFile({test: /\.(json|js|wxml|wxss)$/i}))
  }

  if (compiler.production) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      // NOTICE: 一定不能去掉 module 和 exports，否则压缩后代码可能失效
      mangle: { except: ['module', 'exports'] },
      sourceMap: false // TODO: 内部 loader 支持 sourceMap
    }))
  }

  if (publicPath == null) {
    publicPath = !server ? '' : `http${server.https ? 's' : ''}://${server.host}:${server.port}/`
  }

  const wpOpts: webpack.Configuration = {
    target: 'node',
    // devtool: 'source-map', // TODO: 内部 loader 支持 sourceMap
    entry: path.join(srcDir, appJson),
    output: {
      path: distDir,
      // 随机生成一个输出的文件即可（编译完后会被删除）
      filename: 'minapp-' + Math.random().toString(16).substr(2, 8) + '.js',
      publicPath
    },
    resolve: {
      extensions: ['.js', '.ts'],
      mainFields: ['main', 'module', 'browser'],
      symlinks: true,
      modules: [srcDir, modulesDir, ...getExternalLinkModules(modulesDir)],
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
    plugins,
    module: {
      rules: [
        // JSON
        // {test: /\.(json|cjson|jsonc)$/i, use: loader.json},
        {test: JSON_REGEXP, use: loader.json},

        // 脚本
        {test: /\.ts$/i, include: srcDir, use: [loader.js, loader.ts]},
        {test: /\.js$/i, include: srcDir, use: [loader.js, babel(loader.babel, compiler)]},
        {test: /.js$/i, exclude: srcDir, use: [loader.js]},

        // 模板
        {test: /\.wxml$/i, use: loader.wxml},

        // 样式
        {test: /\.s(c|a)ss$/i, use: [loader.wxss, postcss(loader.postcss), loader.sass]},
        {test: /\.less$/i, use: [loader.wxss, postcss(loader.postcss), loader.less]},
        {test: /\.(css|wxss)$/i, use: loader.wxss},

        // 其它文件：不存在；静态资源在对应的其它文件中可以通过 loader 的 loadStaticFile 来 load
      ]
    }
  }

  return wpOpts
}

// node_modules 下可能会有 link 文件， webpack resolve 不了
// 需要把 link 项目的 node_modules 也加入 resolve 列表
function getExternalLinkModules(modulesDir: string) {
  let pkg = require(path.resolve(modulesDir, '..', 'package.json'))
  let modules: string[] = Object.keys(pkg.dependencies)
  let folders: string[] = []
  modules.forEach(m => {
    let folder = path.join(modulesDir, m)
    let stat = fs.lstatSync(folder)
    if (stat.isSymbolicLink()) {
      folders.push(path.resolve(folder, fs.readlinkSync(folder), 'node_modules'))
    }
  })
  return folders
}
