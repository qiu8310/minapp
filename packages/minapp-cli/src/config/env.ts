/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/
import * as findup from 'mora-scripts/libs/fs/findup'
import * as warn from 'mora-scripts/libs/sys/warn'
import * as path from 'path'
import {getFileBaseName, getJsonFilePath} from '../base/helper'
import {getMinappConfig} from './minapp'

const debug = require('debug')('minapp:cli:env')

export const env = getEnv()

export type mode = 'production' | 'development'
export type projectType = 'application' | 'component'
export type Env = typeof env

export function getEnv() {
  const mode: mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
  if (!process.env.NODE_ENV) process.env.NODE_ENV = mode


  let MINAPP: {[key: string]: string} = {}
  Object.keys(process.env).forEach(key => {
    if (key.startsWith('MINAPP_')) {
      MINAPP[key.substr(7)] = process.env[key] as string
    }
  })

  let pkgFile = findup.pkg()
  const rootDir = path.dirname(pkgFile)
  const pkg: {name: string, version: string, [key: string]: any} = require(pkgFile)
  const modulesDir = path.join(rootDir, 'node_modules')

  // minapp.json 配置文件
  const minapp = getMinappConfig(rootDir)

  if (minapp.compiler.devServer.port || minapp.compiler.devServer.host) {
    warn('compiler.devServer.port and compiler.devServer.host in minapp.json already deprecated.\n')
  }
  if (minapp.compiler.hasOwnProperty('px2rpx') || minapp.compiler.hasOwnProperty('rpx2px')) {
    warn('compiler.px2rpx and compiler.rpx2px in minapp.json already deprecated, please use compiler.unitTransformer replace.\n')
  }

  // srcDir / distDir, 优先取环境变量中的，然后再取配置文件中的
  const srcDir = MINAPP.SRC_DIR ? path.resolve(MINAPP.SRC_DIR) : minapp.compiler.srcDir
  const distDir = MINAPP.DIST_DIR ? path.resolve(MINAPP.DIST_DIR) : minapp.compiler.distDir

  // 项目类型
  const projectType: projectType = minapp.component ? 'component' : 'application'

  // webpack publicPath
  let publicPath = ''
  let hasServer = false

  if (projectType === 'application') {
    if (MINAPP.PUBLIC_PATH) {
      publicPath = MINAPP.PUBLIC_PATH
    } else if (MINAPP.HOST && MINAPP.PORT) {
      hasServer = true
      publicPath = `http${MINAPP.HTTPS ? 's' : ''}://${MINAPP.HOST}:${MINAPP.PORT}/`
    }
  }

  // 是否启用 sourceMap （不支持）
  // const sourceMap = !!MINAPP.SOURCE_MAP

  // 是否美化代码（即，不使用代码压缩工具）
  const pretty = !!MINAPP.PRETTY
  const useLocalAssetsFile = !!MINAPP.USE_LOCAL_ASSETS_FILE

  // 入口文件
  const entry = (minapp.component
    ? getJsonFilePath(path.dirname(minapp.component), getFileBaseName(minapp.component))
    : getJsonFilePath(srcDir, 'app')) as string

  // 出口文件
  const output = 'minapp-' + Math.random().toString(16).substr(2, 8) + '.js'

  let r = {
    projectType,
    hasServer,
    mode,
    pkg,
    minapp,
    srcDir,
    distDir,
    publicPath,
    entry,
    output,
    rootDir,
    modulesDir,
    // sourceMap,
    pretty,
    useLocalAssetsFile
  }
  debug(r)
  return r
}
