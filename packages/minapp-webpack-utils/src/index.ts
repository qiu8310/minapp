import {resolve, join} from 'path'

let loaderDir = resolve(join(__dirname, 'loader'))

export const loader = {
  json: join(loaderDir, 'json-loader'),
  js: join(loaderDir, 'js-loader'),
  wxml: join(loaderDir, 'wxml-loader'),
  wxss: join(loaderDir, 'wxss-loader'),
}

export * from './plugin/ExtractMinappCode'

import {px2rpx} from './postcss/px2rpx'
export const postcss = {
  px2rpx
}
