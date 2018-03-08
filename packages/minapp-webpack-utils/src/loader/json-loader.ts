/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as path from 'path'
import * as fs from 'fs'
import * as JSON5 from 'json5'
import {Loader} from './Loader'
import {map} from '../util'

const debug = require('debug')('minapp:webpack-utils:json-loader')

@Loader.decorate
export default class JsonLoader extends Loader {
  async run(content: string) {
    debug('FromFile: ' + this.fromFile)
    debug('ToFile: %o', this.toFile)
    // debug('FromContent: ' + content)

    let json = JSON5.parse(content)
    delete json.$schema // 删除 $schema 字段

    let requires: string[] = []
    let {mode} = this

    // 根据 app.json 中的 pages 字段，查找其依赖的所有文件
    if (this.fromFile === this.entryFile && mode === 'project') {
      // 获取所有 pages 的绝对路径
      if (json.pages) {
        json.pages = await this.resolvePages(json.pages, requires, this.distDir)
      }
      if (json.subPackages) {
        json.subPackages = await map(json.subPackages, async (sp: {root: string, pages: string[]}) => {
          let relativeDir = path.join(this.distDir, sp.root)
          let pages = sp.pages.map(p => path.posix.join(sp.root, p))
          return {root: sp.root, pages: await this.resolvePages(pages, requires, relativeDir)}
        }, 0)
      }

      // 搜索主目录下的同名文件
      searchDir(requires, this.fromFile, 'project.config.json')
    } else {
      if (this.fromFile === this.entryFile && mode === 'component') {
        searchDir(requires, this.entryFile)
      }

      // 加载页面中的组件或者组件中的组件
      let components: {[key: string]: string} = json.usingComponents || {}
      await map(Object.keys(components), async (k) => {
        let component = components[k]
        if (component[0] === '/') component = component.substr(1) // 组件可以使用绝对路径
        let main = await this.resolve(component)

        // component 模式下只有在 srcDir 中的组件才解析
        if (this.isFileInSrcDir(main) || mode !== 'component') {
          components[k] = this.getExtractRequirePath(main, '')
          searchDir(requires, main)
        }
      })
    }

    // JSON5 的 stringify 生成的 json 不是标准的 json
    if (Object.keys(json).length) {
      this.extract('.json', JSON.stringify(json, null, this.minimize ? 0 : 2))
    }
    return this.toRequire(requires, 'webpack')
  }

  async resolvePages(pages: string[], requires: string[], relativeDir: string) {
    return await map(pages, (p: string) => this.resolvePage(p, requires, relativeDir), 0)
  }

  async resolvePage(page: string, requires: string[], relativeDir: string) {
    let main = await this.resolve(page)
    searchDir(requires, main)
    return this.getEntryPage(main, relativeDir)
  }

  getEntryPage(absFile: string, relativeDir: string) {
    let entry = this.getExtractRequirePath(absFile, '', relativeDir)
    if (entry.startsWith('./')) entry = entry.substr(2)
    return entry
  }
}


function searchDir(requires: string[], file: string, fullname?: string) {
  let dir = path.dirname(file)
  let name = path.basename(file)
  let prefix = path.basename(file, path.extname(file))

  fs.readdirSync(dir)
    .filter(n => n !== name && (n.startsWith(prefix + '.') || fullname && fullname === n))
    .forEach(n => requires.push(path.join(dir, n)))
}
