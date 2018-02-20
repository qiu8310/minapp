import * as path from 'path'
import * as fs from 'fs'
import * as JSON5 from 'json5'
import {Loader} from './Loader'

import * as tracker from 'debug'
const debug = tracker('minapp:webpack:json-loader')

@Loader.decorate
export default class JsonLoader extends Loader {
  run(content: string) {
    let {srcDir} = this
    debug('FromFile: ' + this.fromFile)
    debug('ToFile: %o', this.toFile)
    // debug('FromContent: ' + content)

    let json = JSON5.parse(content)
    delete json.$schema // 删除 $schema 字段

    let requires: string[] = []

    // 根据 app.json 中的 pages 字段，查找其依赖的所有文件
    if (this.fromFile === this.entryFile) {
      let {pages = [], subPackages = []} = json

      pages.forEach((p: string) => {
        let parts = p.split('/')
        let prefix = parts.pop() + '.'
        let dir = path.join(srcDir, parts.join('/'))
        searchDir(requires, dir, prefix)
      })
      load(requires, srcDir, pages)
      subPackages.forEach((sp: {root: string, pages: string[]}) => {
        load(requires, path.join(srcDir, sp.root), sp.pages)
      })
      searchDir(requires, srcDir, 'app.', 'project.config.json')
    }

    // JSON5 的 stringify 生成的 json 不是标准的 json
    this.extract('.json', JSON.stringify(json, null, this.minimize ? 0 : 2))
    return this.toRequire(requires, 'webpack')
  }
}

function load(requires: string[], rootDir: string, pages: string[]) {
  pages.forEach((p: string) => {
    let parts = p.split('/')
    let prefix = parts.pop() + '.'
    let dir = path.join(rootDir, parts.join(path.sep))
    searchDir(requires, dir, prefix)
  })
}

function searchDir(requires: string[], dir: string, prefix: string, fullname?: string) {
  fs.readdirSync(dir)
    .filter(n => n.startsWith(prefix) || fullname && fullname === n)
    .forEach(n => requires.push(path.join(dir, n)))
}
