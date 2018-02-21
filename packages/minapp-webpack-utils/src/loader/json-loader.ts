import * as path from 'path'
import * as fs from 'fs'
import * as JSON5 from 'json5'
import {Loader} from './Loader'
import {map} from '../util'

const debug = require('debug')('minapp:webpack:json-loader')

@Loader.decorate
export default class JsonLoader extends Loader {
  async run(content: string) {
    let {srcDir} = this
    debug('FromFile: ' + this.fromFile)
    debug('ToFile: %o', this.toFile)
    // debug('FromContent: ' + content)

    let json = JSON5.parse(content)
    delete json.$schema // 删除 $schema 字段

    let requires: string[] = []

    // 根据 app.json 中的 pages 字段，查找其依赖的所有文件
    if (this.fromFile === this.entryFile) {
      // let {pages = [], subPackages = []} = json

      // 获取所有 pages 的绝对路径
      let pages: string[] = (json.pages || []).map((p: string) => path.join(srcDir, p));
      (json.subPackages || []).forEach((sp: {root: string, pages: string[]}) => {
        pages.push(...(sp.pages || []).map(p => path.join(srcDir, sp.root, p)))
      })

      // 解析这些 pages 成对应的 js 文件，并查找同目录下的同名文件
      debug('pages: %j', pages)
      await map(pages, async (page) => {
        let main = await this.resolve(page)
        searchDir(requires, main)
      }, 0)

      // 搜索主目录下的同名文件
      searchDir(requires, this.fromFile, 'project.config.json')
    }

    // JSON5 的 stringify 生成的 json 不是标准的 json
    this.extract('.json', JSON.stringify(json, null, this.minimize ? 0 : 2))
    return this.toRequire(requires, 'webpack')
  }
}

function searchDir(requires: string[], file: string, fullname?: string) {
  let dir = path.dirname(file)
  let name = path.basename(file)
  let prefix = path.basename(file, path.extname(file))

  fs.readdirSync(dir)
    .filter(n => n !== name && n.startsWith(prefix + '.') || fullname && fullname === n)
    .forEach(n => requires.push(path.join(dir, n)))
}
