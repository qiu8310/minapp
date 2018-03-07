/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {ConditionalCacheableFile, readdir, readFile, stat} from './lib/'
import {JSON_REGEXP, Component} from './dev/'
import {map, series} from 'mora-common/util/async'
import {parseAttrs} from './parseAttrs'
import * as JSON5 from 'json5'
import * as path from 'path'

const JSON_CACHE: {[key: string]: ConditionalCacheableFile} = {}

export interface CustomOptions {
  filename: string
  resolves?: string[]
}

export {Component}

export async function getCustomComponents(co?: CustomOptions): Promise<Component[]> {
  if (!co) return []

  let f = getCachedJsonFile(co.filename)
  try {
    let data =  await f.getContent()
    let jsonfile = f.filename as string
    if (data && data.usingComponents) {
      return await map(Object.keys(data.usingComponents), async (name) => {
        let filepath = data.usingComponents[name]
        try {
          let comp = await parseComponentFile(filepath, jsonfile, co.resolves)
          comp.name = name
          return comp
        } catch (e) {
          return {name} as Component
        }
      }, 0)
    }
  } catch (e) {}

  return []
}

async function parseComponentFile(filepath: string, refFile: string, resolves: string[] | undefined): Promise<Component> {
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
    let f = getCachedJsonFile(found)
    let data = await f.getContent()
    if (data && data.minapp && data.minapp.component) {
      return data.minapp.component
    }
    // 实时解析
    let attrs = parseAttrs((await readFile(found)).toString())
    if (attrs.length) return {attrs} as any
  }
  return {} as any
}

function getCachedJsonFile(filename: string) {
  let dir = path.dirname(filename)
  let base = path.basename(filename, path.extname(filename))
  let cacheKey = path.join(dir, base)
  if (!JSON_CACHE[cacheKey]) {
    JSON_CACHE[cacheKey] = new ConditionalCacheableFile(() => getJsonFilePath(dir, base), (name, buf) => JSON5.parse(buf.toString()))
  }
  return JSON_CACHE[cacheKey]
}

/**
 * 根据目录中的某个文件来获取当前目录中同名的 json 文件
 *
 * @export
 * @param {string} filename 目录中的某个文件
 */
async function getJsonFilePath(dir: string, base: string) {
  base += '.'
  let names = await readdir(dir)
  let name = names.find(n => n.startsWith(base) && n.substr(base.length).indexOf('.') < 0 && JSON_REGEXP.test(n))
  return name ? path.join(dir, name) : undefined
}
