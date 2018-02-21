// 参考： parcel 会获取本地的 babelrc 文件，同时对其中的 presets 和 plugins 去重（避免 babel 重复处理）
// 要使用 transform-runtime 需要手动在项目中安装 babel-runtime 或 @babel/runtime
import {Compiler} from '../Compiler'
import * as fs from 'fs-extra'
import * as path from 'path'

const PREFIX = 'babel-' // v7.x 会改成 @babel/

const defaultPresets = [
  'env',
  'es2015',
  'es2016',
  'es2017',
  'latest',
  'stage-0',
  'stage-1',
]

const defaultPlugins: Array<string | any[]> = [
  'transform-decorators-legacy'
]

export function babel(loader: string, compiler: Compiler) {
  let plugins = [...defaultPlugins]
  let {babelRuntime: config} = compiler.options

  // 检查 babel-runtime 是否有安装在本地
  let moduleName = [`${PREFIX}runtime`].find(k => fs.existsSync(path.join(compiler.modulesDir, k)))
  if (moduleName && config !== false) {
    plugins.push(['transform-runtime', !config || config === true ? {moduleName, polyfill: false} : config])
  }

  return {
    loader,
    options: {
      presets: defaultPresets.map(p => require.resolve(`${PREFIX}preset-${p}`)),
      plugins: plugins.map(p => {
        let name = Array.isArray(p) ? p[0] : p
        let opts = Array.isArray(p) ? p[1] : {}
        return [require.resolve(`${PREFIX}plugin-${name}`), opts]
      })
    }
  }
}

