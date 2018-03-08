/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

const autoprefixer = require('autoprefixer')
import {postcss as minapp} from '@minapp/webpack-utils'

export function postcss(loader: string, opts: {px2rpx?: boolean, rpx2px?: boolean, browsers?: string[]} = {}) {
  let {px2rpx = true, rpx2px = true, browsers = ['last 7 android version', 'last 5 chrome version', 'last 5 safari version']} = opts

  let map: any = {}
  if (px2rpx) map.px = 'rpx'
  if (rpx2px) map.rpx = 'px'

  let plugins: any[] = []

  if (Object.keys(map).length) {
    plugins.push(minapp.px2rpx(map))
  }

  plugins.push(autoprefixer({
    // https://github.com/ai/browserslist#queries
    browsers,
    remove: false,
    add: true
  }))

  return {
    loader,
    options: {
      plugins
    }
  }
}
