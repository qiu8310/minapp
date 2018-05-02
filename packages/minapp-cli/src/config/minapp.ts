/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/
import * as path from 'path'
import * as JSON5 from 'json5'
import * as fs from 'fs-extra'

import {getJsonFilePath} from '../base/helper'

export namespace minapp {
  export interface Compiler {
    srcDir: string
    distDir: string

    /** url-loader limit, 单位：B */
    urlLoaderLimit: number

    /** 在 distDir 中存放 node_modules 中的文件的目录名称，默认是 `npm` */
    npmOutputFolder: string

    /** 静态资源文件的后缀列表，用于匹配项目中的静态资源，多个名字之间用 `|` 分隔 */
    staticFileExtensions: string

    /** 指定生成的静态资源的文件名的格式 */
    staticOutputName: string

    /** 指定存放生成的静态资源的文件的目录，默认是 `static`（相对于 distDir） */
    staticOutputFolder: string

    /**
     * 对 css 中的单位进行转化
     *
     * 比如，需要将 px 转化成 rpx，同时将 rpx 转化成 px，可以这样设置：
     *
     * ```
     * unitTransformer: {px: 'rpx', rpx: 'px'}
     * ```
     *
     * 如果需要将 1px 转化成 2rpx，可以这样设置：
     *
     * ```
     * unitTransformer: {px: '2rpx'}
     * ```
     */
    unitTransformer: {
      [unit: string]: string
    }

    /** 指定一个 json 文件的路径，此文件会转化成 sass，放在每个 sass 文件的开头 */
    json2sassPath?: string

    /** autoprefixer 的 browsers 配置，参考：https://github.com/ai/browserslist#queries */
    browsers: string[]

    /** webpack devServer 配置 */
    devServer: {[key: string]: any}
  }

  export interface Config {
    /** 要编译的组件的路径（指定了此选项表示当前是编译组件，而不是 project） */
    component?: string

    compiler: Compiler
  }
}

export function getMinappConfig(rootDir: string) {
  // @ts-ignore
  let minapp: minapp.Config = {}

  try {
    let file = getJsonFilePath(rootDir, 'minapp')

    if (file) {
      minapp = JSON5.parse(fs.readFileSync(file).toString())
    }
  } catch (e) {}

  minapp.compiler = Object.assign({
    srcDir: 'src',
    distDir: 'dist',
    urlLoaderLimit: 0,
    npmOutputFolder: 'npm',
    staticFileExtensions: 'gif|png|jpg|jpeg|svg|ico|woff|woff2|ttf|eot|otf|mp3|mp4',
    staticOutputName: '[name:0]-[hash:10].[ext]',
    staticOutputFolder: 'static',
    browsers: ['last 7 android version', 'last 5 chrome version', 'last 5 safari version'],
    unitTransformer: {},
    devServer: {},
  }, minapp.compiler || {})

  if (minapp.component) minapp.component = path.resolve(rootDir, minapp.component)
  if (minapp.compiler.json2sassPath) minapp.compiler.json2sassPath = path.resolve(rootDir, minapp.compiler.json2sassPath)
  minapp.compiler.srcDir = path.resolve(rootDir, minapp.compiler.srcDir)
  minapp.compiler.distDir = path.resolve(rootDir, minapp.compiler.distDir)

  return minapp
}

