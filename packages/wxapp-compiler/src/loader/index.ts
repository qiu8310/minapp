import * as fs from 'fs-extra'
import * as path from 'path'

export interface Loader {
  json: string
  wxml: string
  wxss: string
  wxjs: string
  file: string

  babel: string
  ts: string
  sass: string
  less: string
}

const loaderSuffix = '-loader.js'
export const loader: Loader = fs.readdirSync(__dirname).reduce((res, name) => {
  if (name.endsWith(loaderSuffix)) res[name.substr(0, name.length - loaderSuffix.length)] = path.resolve(__dirname, name)
  return res
}, {
  ts: require.resolve('awesome-typescript-loader'),
  babel: require.resolve('babel-loader'),
  sass: require.resolve('sass-loader'),
  less: require.resolve('less-loader'),
} as any)
