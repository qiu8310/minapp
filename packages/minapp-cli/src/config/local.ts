/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as fs from 'fs-extra'
import * as path from 'path'
import * as webpack from 'webpack'
import {Env} from './env'

export interface ILocalConfig {
  webpack: (wpConf: webpack.Configuration, webpack: any) => webpack.Configuration
  updateLoaders: <T>(loaders: T) => T
}

export function localConfig(env: Env): ILocalConfig {
  let mod: any

  if (fs.existsSync(path.join(env.rootDir, 'webpack.minapp.js'))) {
    mod = require(path.join(env.rootDir, 'webpack.minapp.js')) as any
  } else if (fs.existsSync(path.join(env.rootDir, 'webpack.minapp.ts'))) {
    require('ts-node/register')
    mod = require(path.join(env.rootDir, 'webpack.minapp.ts')) as any
  }

  if (!mod) mod = {}

  if (!mod.webpack) {
    if (typeof mod === 'function') mod.webpack = mod
    else if (typeof mod.default === 'function') mod.webpack = mod.default
  }

  return {
    webpack: (wpConf: webpack.Configuration, wp: any) => {
      let temp: webpack.Configuration | undefined
      if (typeof mod.webpack === 'function') temp = mod.webpack(wpConf, wp, env)
      return temp || wpConf
    },
    updateLoaders: <T>(map: T) => {
      let temp: T | undefined
      if (typeof mod.updateLoaders === 'function') temp = mod.updateLoaders(map, env) as any
      return temp || map
    }
  }
}
