import * as fs from 'fs-extra'
import * as path from 'path'

export interface Loader {
  json: string
  wxml: string
  wxss: string
  wxs: string

  babel: string
  ts: string
  sass: string
  less: string
}

const files = fs.readdirSync(__dirname)
const suffix = /\.\w+$/

export const loader: Loader = reduce('loader-', {
  ts: require.resolve('awesome-typescript-loader'),
  babel: require.resolve('babel-loader'),
  sass: require.resolve('sass-loader'),
  less: require.resolve('less-loader'),
})

function reduce(prefix: string, initial: any = {}) {
  return files.reduce((res, name) => {
    if (name.startsWith(prefix)) {
      res[name.substr(prefix.length).replace(suffix, '')] = path.resolve(__dirname, name)
    }
    return res
  }, initial)
}
