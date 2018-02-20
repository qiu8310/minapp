import {resolve, join} from 'path'

let loaderDir = resolve(join(__dirname, 'loader'))

export const loader = {
  json: join(loaderDir, 'json-loader'),
  js: join(loaderDir, 'js-loader'),
  wxml: join(loaderDir, 'wxml-loader'),
  wxss: join(loaderDir, 'wxss-loader'),
}

import * as plugin from './plugin/'

export {plugin}
