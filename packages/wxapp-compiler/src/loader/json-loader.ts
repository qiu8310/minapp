import * as webpack from 'webpack'
import * as path from 'path'
import * as fs from 'fs'
import {getDataFromLoaderContext} from '../hack-webpack'

export default function(this: webpack.loader.LoaderContext, content: string, sourceMap?: string | Buffer) {
  let {srcDir} = getDataFromLoaderContext(this)

  let json = JSON.parse(content)
  delete json.$schema // 删除 $schema 字段

  let relativeFile = path.relative(srcDir, this.resourcePath)
  let dependencies: string[] = []

  // 根据 app.json 中的 pages 字段，查找其依赖的所有文件
  if (relativeFile === 'app.json') {
    json.pages.forEach((p: string) => {
      let parts = p.split('/')
      let prefix = parts.pop() + '.'
      let dir = path.join(srcDir, parts.join('/'))
      searchDir(dependencies, dir, prefix)
    })
    searchDir(dependencies, srcDir, 'app.', 'project.config.json')
  }

  this.emitFile(relativeFile, JSON.stringify(json, null, 2), null)
  return dependencies.map(d => `require("${d}");`).join('\n')
}

function searchDir(dependencies: string[], dir: string, prefix: string, fullname?: string) {
  fs.readdirSync(dir)
    .filter(n => n.startsWith(prefix) || fullname && fullname === n)
    .forEach(n => dependencies.push(path.join(dir, n)))
}
