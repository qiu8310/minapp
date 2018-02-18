import * as fs from 'fs-extra'
import * as path from 'path'
import * as crypto from 'crypto'
import {promisify} from 'mora-common/util/promisify'

import * as findup from 'mora-scripts/libs/fs/findup'
import * as isWin from 'mora-scripts/libs/sys/isWin'
import * as formatDate from 'mora-scripts/libs/lang/formatDate'
export {findup, isWin, formatDate}

export {EOL} from 'os'
export {map, replace} from 'mora-common/util/async'

export function readFile(file: string) {
  return promisify<Buffer>(fs.readFile, fs)(file)
}

export function md5(str: string | Buffer) {
  let hash = crypto.createHash('md5')
  hash.update(str)
  return hash.digest('hex')
}

let trimRE = {
  /** 去除字段首尾的 / 或 \ 符号 */
  trim: /^(?:\\|\/)|(?:\\|\/)$/g,
  /** 去除字段开头的 / 或 \ 符号 */
  ltrim: /^(?:\\|\/)/,
  /** 去除字段结束的 / 或 \ 符号 */
  rtrim: /(?:\\|\/)$/
}
export declare type TrimType = keyof typeof trimRE
export function trimPath(somepath: string, trim: TrimType) {
  return somepath.replace(trimRE[trim], '')
}
export function toPath(sep: string, somepath: string, trim?: TrimType) {
  if (trim) somepath = trimPath(somepath, trim)
  return somepath.replace(/\\|\//g, sep)
}
export function toUrlPath(somepath: string, trim?: TrimType) {
  return toPath('/', somepath, trim)
}
export function toFilePath(somepath: string, trim?: TrimType) {
  return toPath(path.sep, somepath, trim)
}
