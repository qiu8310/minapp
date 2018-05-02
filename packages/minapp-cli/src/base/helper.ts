/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {execSync} from 'child_process'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as JSON5 from 'json5'
import * as clog from 'mora-scripts/libs/sys/clog'

import {JSON_REGEXP} from '@minapp/common/dist/dev/config'

export {JSON_REGEXP}

export function code(str: string) {
  return clog.format('%c' + str, 'yellow')
}

export function walkDirectory(dir: string, cb: (dir: string, name: string, file: string, stat: fs.Stats) => boolean | void | undefined) {
  fs.readdirSync(dir).forEach(name => {
    let file = path.join(dir, name)
    let stat = fs.statSync(file)

    if (false !== cb(dir, name, file, stat)) {
      if (stat.isDirectory()) {
        walkDirectory(file, cb)
      }
    }
  })
}

export function getGitUser() {
  let name = tryExecCmdSync('git config --get user.name', '').trim()
  let email = tryExecCmdSync('git config --get user.email', '').trim()
  if (email) email = `<${email}>`
  return `${name}${email}`
}

function tryExecCmdSync(cmd: string, fallback: string): string
function tryExecCmdSync(cmd: string, fallback?: string): undefined | string {
  try {
    return execSync(cmd).toString()
  } catch (e) {
    return fallback
  }
}

/**
 * 从指定的目录中获取指定名称的 json 文件的路径
 */
export function getJsonFilePath(fromDirectory: string, baseName: string) {
  let file = fs.readdirSync(fromDirectory).find(n => n.startsWith(baseName) && JSON_REGEXP.test(n) && n.replace(JSON_REGEXP, '') === baseName)
  return file ? path.join(fromDirectory, file) : undefined
}

/**
 * 获取文件不带路径和后缀的名称
 */
export function getFileBaseName(file: string) {
  return path.basename(file, path.extname(file))
}

export function getFilePath(fromDirectory: string, baseName: string, extensions: string[]) {
  let exts = extensions.map(e => e.toLowerCase())
  let file = fs.readdirSync(fromDirectory).find(n => n.startsWith(baseName) && exts.includes(n.substr(baseName.length + 1).toLowerCase()))
  return file ? path.join(fromDirectory, file) : undefined
}


export function getComponentJson(refFile: string) {
  let dir = path.dirname(refFile)
  let name = path.basename(refFile.replace(/\.\w+$/, ''))
  let foundjson = fs.readdirSync(dir).find(n => n.replace(JSON_REGEXP, '__') === name + '__')
  let foundjs = fs.readdirSync(dir).find(n => n === name + '.js' || n === name + '.ts')

  if (foundjson && foundjs) {
    let jsonFile = path.join(dir, foundjson)
    let jsFile = path.join(dir, foundjs)
    let content = fs.readFileSync(path.join(dir, foundjson)).toString()
    return {
      jsonFile, jsFile,
      jsContent: fs.readFileSync(jsFile).toString(),
      json: JSON5.parse(content)
    }
  }
  return {}
}
