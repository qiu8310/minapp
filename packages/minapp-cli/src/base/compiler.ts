/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as webpack from 'webpack'
import * as Server from 'webpack-dev-server'
import * as fs from 'fs-extra'
import * as warn from 'mora-scripts/libs/sys/warn'
import {getComponentJson} from './helper'

const debug = require('debug')('minapp:cli:compiler')

export function compiler(watch: boolean, devServer?: Server.Configuration | null, opts: {empty?: boolean} = {}) {
  const wpConf = require('../config/webpack.config').default
  const env = require('../config/env').env

  fs.ensureDirSync(env.distDir)
  if (opts.empty) fs.emptyDirSync(env.distDir)

  // 组件
  if (env.minapp.component) {
    // 组件开发不需要服务器，只需要实时编译即可
    if (devServer) {
      devServer = null
      watch = true
    } else {
      let {jsonFile, json} = getComponentJson(env.minapp.component)
      if (!json.minapp || !json.minapp.component || Object.keys(json.minapp.component).length === 0) {
        warn(`No "minapp.component" filed in component json file ${jsonFile}`)
        warn('For a better develop experience, you should add description about you component in "minapp.component" field')
        warn('And you can try to use command "minapp component-attrs" to automate add component attrs description.')
      }
    }
  }

  let wp = webpack(wpConf)
  let callback = (err: any, stats: webpack.Stats) => {
    if (err) console.log(err.message, err.stack)
    else console.log(stats.toString(wpConf.stats))
  }

  let server: Server

  if (devServer) {
    let opts = {...wpConf.devServer, ...devServer}
    debug('devServer: %j', opts)
    server = new Server(wp, opts)
    server.listen(opts.port, opts.host)
  } else if (watch) {
    wp.watch({}, callback)
  } else {
    wp.run(callback)
  }

  if (devServer || watch) {
    ['SIGINT', 'SIGTERM'].forEach((s: any) => process.on(s, () => {
      if (server) server.close(() => process.exit())
      else process.exit()
    }))
  }
}

