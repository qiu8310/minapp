/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {ConditionalCacheableFile, readdir, stat} from './lib/'
import {JSON_REGEXP, Component} from './dev/'
import {map, series} from 'mora-common/util/async'
import * as JSON5 from 'json5'
import * as path from 'path'

const JSON_CACHE: {[key: string]: ConditionalCacheableFile} = {}

export interface JsonConfig {
  /** 当前组件  */
  component?: Component
  /** 当前组件使用的其它组件 */
  usingComponents: Component[]
}

export interface CustomOptions {
  filename: string
  resolves?: string[]
}

export async function getJson(co: CustomOptions, founds: string[] = []): Promise<undefined | JsonConfig> {
  let dir = path.dirname(co.filename)
  let base = path.basename(co.filename, path.extname(co.filename))
  let cacheKey = path.join(dir, base)

  if (founds.indexOf(cacheKey) >= 0) return
  founds.push(cacheKey)

  let f = JSON_CACHE[cacheKey]
  if (!f) f = JSON_CACHE[cacheKey] = new ConditionalCacheableFile(() => getJsonFile(dir, base), (name, buf) => parseJson(name, buf, co.resolves, founds))
  try {
    return await f.getContent()
  } catch (e) {
    return
  }
}

/**
 * 根据目录中的某个文件来获取当前目录中同名的 json 文件
 *
 * @export
 * @param {string} filename 目录中的某个文件
 */
async function getJsonFile(dir: string, base: string) {
  base += '.'
  let names = await readdir(dir)
  let name = names.find(n => n.startsWith(base) && n.substr(base.length).indexOf('.') < 0 && JSON_REGEXP.test(n))
  return name ? path.join(dir, name) : undefined
}

/**
 * 根据 json 文件的 buffer 内容，解析出它的内容
 */
async function parseJson(jsonfile: string, jsonBuffer: Buffer, resolves: string[] | undefined, founds: string[]) {
  try {
    let meta: JsonConfig = {usingComponents: []}
    let data = JSON5.parse(jsonBuffer.toString())
    if (data.usingComponents) {
      await map(Object.keys(data.usingComponents), async (name) => {
        let filepath = data.usingComponents[name]
        let comp = await parseComponentFile(filepath, jsonfile, resolves, founds)
        comp.name = name
        meta.usingComponents.push(comp)
      }, 0)

    }
    if (data.minapp && data.minapp.component) {
      meta.component = data.minapp.component
    }
    return meta
  } catch (e) {
    return
  }
}

async function parseComponentFile(filepath: string, refFile: string, resolves: string[] | undefined, founds: string[]): Promise<Component> {
  if (filepath[0] === '~') filepath = filepath.substr(1)
  resolves = resolves || []
  let localResolves = filepath[0] !== '/' ? [path.dirname(refFile), ...resolves] : resolves

  let found: string | undefined
  await series(localResolves, async (root) => {
    if (found) return

    await series(['', '.js', '.ts'], async (ext) => {
      if (found) return
      let f = path.posix.join(root, filepath + ext)
      try {
        let stats = await stat(f)
        if (stats.isFile()) found = f
      } catch (e) {}
    })
  })

  if (found) {
    let meta = await getJson({filename: found, resolves}, founds)
    if (meta && meta.component) return meta.component
  }

  return {} as any
}
