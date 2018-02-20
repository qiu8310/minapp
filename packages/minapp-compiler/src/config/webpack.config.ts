import * as webpack from 'webpack'
import * as path from 'path'
import * as fs from 'fs-extra'
import * as formatDate from 'mora-scripts/libs/lang/formatDate'

import {babelrc} from './babelrc'
import {loader as custom, plugin as minapp} from '@minapp/webpack'
const loader = {
  ts: require.resolve('awesome-typescript-loader'),
  babel: require.resolve('babel-loader'),
  sass: require.resolve('sass-loader'),
  less: require.resolve('less-loader'),
  ...custom
}

import { Compiler } from '../Compiler'

export function webpackConfig(compiler: Compiler) {

  let {srcDir, modulesDir, distDir, options: {server}} = compiler

  let jsonFile = ['app.cjson', 'app.json'].find(c => fs.existsSync(path.join(srcDir, c)))
  if (!jsonFile) throw new Error(`${srcDir} 下面没有 app.cjson 或 app.json 文件，无法编译`)

  // 传给 loader 的选项
  let loaderOpts = {
    minimize: compiler.production,

    // 下面几个配置都是默认的配置，可以不传
    minappStatic: {
      /** 用于判断文件是不是静态文件 */
      test: /\.(gif|png|jpg|jpeg|svg|ico|woff|woff2|ttf|eot|otf|mp3|mp4)$/,
      /** 用于存放编译后的 静态文件的文件夹（相对于 distDir，默认为 static） */
      output: compiler.options.staticDir,
      /** 重命名编译后的静态文件 */
      filename: '[name:8]-[hash:10].[ext]'
    }
  }
  let plugins: any[] = [
    new webpack.LoaderOptionsPlugin(loaderOpts),
    new minapp.RemoveEntryFile(),
    new minapp.ExtractCode()
  ]

  const wpOpts: webpack.Configuration = {
    target: 'web',
    // devtool: 'source-map', // TODO: 内部 loader 支持 sourceMap
    entry: path.join(srcDir, jsonFile),
    output: {
      path: distDir,
      // 随机生成一个输出的文件即可（编译完后会被删除）
      filename: 'minapp-entry' + formatDate('-yyyy-mm-dd-') + Math.random().toString(16).substr(2, 6) + '.js',
      publicPath: !server ? '' : `http${server.https ? 's' : ''}://${server.host}:${server.port}/`
    },
    resolve: {
      extensions: ['.js', '.ts', '.json'],
      mainFields: ['main', 'module', 'browser'],
      modules: [srcDir, modulesDir],
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
        {test: /\.c?json$/, use: loader.json},

        // 脚本
        {test: /\.ts$/, include: srcDir, use: [loader.js, loader.ts]},
        {test: /\.js$/, include: srcDir, use: [loader.js, {loader: loader.babel, options: babelrc(compiler)}]},
        {test: /.js$/, exclude: srcDir, use: [loader.js]},

        // 模板
        {test: /\.wxml$/, use: loader.wxml},

        // 样式
        {test: /\.s(c|a)ss$/, use: [loader.wxss, loader.sass]},
        {test: /\.less$/, use: [loader.wxss, loader.less]},
        {test: /\.(css|wxss)$/, use: loader.wxss},

        // 其它文件：不存在；静态资源在对应的其它文件中可以通过 loader 的 loadStaticFile 来 load
      ]
    }
  }

  if (compiler.production) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: typeof wpOpts.devtool === 'string' && (wpOpts.devtool.indexOf('sourcemap') >= 0 || wpOpts.devtool.indexOf('source-map') >= 0)
    }))
  }

  return wpOpts
}
