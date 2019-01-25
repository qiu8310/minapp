/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as webpack from 'webpack'
import * as path from 'path'
import * as fs from 'fs-extra'
import {localConfig} from './local'
import {env} from './env'
import {JSON_REGEXP} from '../base/helper'
import {getLoader, ExtractMinappCode, WriteFile, RemoveLessCache} from '../webpack/'

const {mode, entry, rootDir, srcDir, distDir, modulesDir} = env

const sourceMap = false
const local = localConfig(env)

// #region 代码压缩
let minimizer: any[] = []
if (mode === 'production') {
  if (!env.pretty) {
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
    minimizer.push(new UglifyJsPlugin({cache: true, parallel: true, sourceMap, uglifyOptions: {mangle: {
      reserved: ['module', 'exports', 'global']
    }}}))
  }
}
// #endregion

// #region loaders
let loader = {
  ts: {loader: 'ts-loader', options: {}},
  babel: {loader: require.resolve('babel-loader'), options: {
    presets: [
      require.resolve('babel-preset-env'),
      require.resolve('babel-preset-stage-0'),
      require.resolve('babel-preset-stage-1'),
    ],
    plugins: [
      require.resolve('babel-plugin-transform-decorators-legacy')
    ]
  }},
  sass: {loader: 'sass-loader', options: {includePaths: [srcDir, modulesDir]}},
  less: {loader: 'less-loader', options: {paths: [srcDir, modulesDir]}},
  ...getLoader(env)
}

if (fs.existsSync(path.join(env.modulesDir, 'babel-runtime'))) {
  // @ts-ignore
  loader.babel.options.plugins.push([require.resolve('babel-plugin-transform-runtime'), {polyfill: false}])
}
loader = local.updateLoaders(loader)
// #endregion

// #region plugins
const plugins: any[] = [
  new webpack.LoaderOptionsPlugin({env}),
  new webpack.DefinePlugin({
    __ENV__: JSON.stringify(mode),
    __DEV__: mode === 'development',
    __PROD__: mode === 'production'
  }),
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new ExtractMinappCode(env),
  new RemoveLessCache(env)
]
if (env.hasServer) {
  plugins.push(new WriteFile(env))
}
// #endregion

// #region webpack
let wpConf: webpack.Configuration = {
  target: 'web',
  mode,
  devtool: ('' as any),
  context: rootDir,
  entry,

  output: {
    path: distDir,
    // 随机生成一个输出的文件即可（编译完后会被删除）
    filename: env.output,
    publicPath: env.publicPath,
  },
  resolve: {
    extensions: ['.js', '.ts'],
    // main 要放在前面， module 的代码含有 es6，除非给 node_modules 中的代码也加上 babel-loader
    mainFields: ['main'], // 'module', 'browser'
    modules: [srcDir, modulesDir]
  },
  optimization: {
    minimizer,
  },
  plugins,
  module: {
    rules: [
      // JSON
      {test: JSON_REGEXP, use: loader.json, type: 'javascript/auto'}, // https://stackoverflow.com/questions/49052935/override-built-in-json-loader-in-webpack-4

      // 脚本
      {test: /\.ts$/i, use: [loader.js, loader.ts]},
      {test: /\.js$/i, include: srcDir, use: [loader.js, loader.babel]},
      {test: /\.js$/i, exclude: srcDir, use: [loader.js]},

      {test: /\.wxs$/i, use: [loader.wxs, loader.babel]},

      // 模板
      {test: /\.wxml$/i, use: loader.wxml},
      {test: /\.axml$/i, use: loader.axml},
      {test: /\.(pug|wpug)$/i, use: [loader.wxml, loader.pug]},

      // 样式

      {test: /\.acss$/i, include: srcDir, use: [loader.acss, loader.postcss]},
      {test: /\.acss$/i, exclude: srcDir, use: [loader.acss]},

      {test: /\.s(c|a)ss$/i, use: [loader.wxss, loader.postcss, loader.sass, loader.json2sass]},
      {test: /\.less$/i, use: [loader.wxss, loader.postcss, loader.less]},
      {test: /\.(css|wxss)$/i, include: srcDir, use: [loader.wxss, loader.postcss]},
      {test: /\.(css|wxss)$/i, exclude: srcDir, use: [loader.wxss]},

    ]
  },
  stats: { // https://webpack.js.org/configuration/stats/#stats
    // @ts-ignore
    ['all' as '']: false,
    modules: true,
    maxModules: 6,
    publicPath: true,
    performance: true,
    timings: true,
    version: true,
    errors: true,
    errorDetails: true,
    warnings: true,
    colors: true
  },
  devServer: {
    contentBase: path.join(rootDir, 'public'),
    ...env.minapp.compiler.devServer
  }
}

// @ts-ignore disable system and amd module
// https://webpack.js.org/configuration/module/#rule-parser
// https://github.com/qiu8310/minapp/issues/87
wpConf.module.rules.push({parser: { system: false, amd: false }})

wpConf = local.webpack(wpConf, webpack)
// @ts-ignore
wpConf.devServer.stats = wpConf.stats
if (!wpConf.output || wpConf.output.filename !== env.output) throw new Error('webpack output.filename can not be changed')
if (!wpConf.entry || typeof wpConf.entry !== 'string') throw new Error('minapp webpack entry must be string, but got ' + JSON.stringify(wpConf.entry))
// #endregion


export default wpConf
