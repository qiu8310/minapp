/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

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


/** 样式文件中匹配静态资源的正则 */
export const STYLE_RESOURCE_REGEXP = /(?:src=|url\(\s*)['"]?([^'"\)\(#\?]+)[#\?]?[^'"\)\(]*['"]?\s*\)?/gm

/** css 或 wxss 中支持使用 @import，@import 的文件需要 emit */
export const CSS_IMPORT_REGEXP = /(?:\/\*\!\s*)?@import\s*["']([^'"]*)["'](\s*;)(?:\s*\*\/)?/g
export const CSS_COMMENT_IMPORT_REGEXP = /(?:\/\*\!\s*)(@import\s*["'][^'"]*["']\s*;)(?:\s*\*\/)/g

export {JSON_REGEXP} from '../base/helper'

export function readFile(file: string) {
  return promisify<Buffer>(fs.readFile, fs)(file)
}

export function md5(str: string | Buffer) {
  let hash = crypto.createHash('md5')
  hash.update(str)
  return hash.digest('hex')
}

/**
 * 修改后缀名
 */
export function replaceExt(file: string, ext: string) {
  return file.replace(/\.\w+$/, ext)
}

/**
 * 将文件转化成相对路径形式
 *
 * 如将 "abc/some.js" => "./abc/some.js"
 */
export function toRelative(file: string) {
  // 以 C: 开头的可能会是 window 地址，所以也不处理
  return /^\w(?!\:)/.test(file) ? '.' + path.sep + file : file
}

let trimRE = {
  /** 去除字段首尾的 / 或 \ 符号 */
  trim: /^(?:\\|\/)|(?:\\|\/)$/g,
  /** 去除字段开头的 / 或 \ 符号 */
  ltrim: /^(?:\\|\/)/,
  /** 去除字段结束的 / 或 \ 符号 */
  rtrim: /(?:\\|\/)$/
}

export declare type TrimType = 'trim' | 'ltrim' | 'rtrim'
/**
 * 将 somepath 的开头或末尾(是开头还是末尾或两者都是根据第二个参数 type 决定)的 '/' 或 '\' 符号去掉
 */
export function trimPath(somepath: string, type: TrimType) {
  return somepath.replace(trimRE[type], '')
}
/**
 * 将 somepath 中的所有 '\' 和 '/' 替换成指定的 sep
 */
export function toPath(sep: string, somepath: string, trim?: TrimType) {
  if (trim) somepath = trimPath(somepath, trim)
  return somepath.replace(/\\|\//g, sep)
}
/**
 * 将路径中所有 '\' 替换成 '/'
 */
export function toUrlPath(somepath: string, trim?: TrimType) {
  return toPath('/', somepath, trim)
}
/**
 * 将路径中所有的 '/' 或 '\' 替换成对应系统的 seperator，如 win 下是 '\'，其它平台一般是 '/'
 */
export function toFilePath(somepath: string, trim?: TrimType) {
  return toPath(path.sep, somepath, trim)
}

const projectRootCache: {[key: string]: string} = {}
/**
 * 获取指定文件的项目根目录（主要是 package.json 所在的目录）
 *
 * 如果没有找到会抛出异常
 */
export function getProjectRoot(absFile: string) {
  if (projectRootCache[absFile]) {
    return projectRootCache[absFile]
  } else {
    let root = path.dirname(findup.pkg(path.dirname(absFile)))
    projectRootCache[absFile] = root
    return root
  }
}

export function base64EncodeBuffer(buffer: Buffer, mediaType: string) {
  let val: string
  if (mediaType === 'image/svg+xml') {
    val = 'charset=utf-8,' + encodeURIComponent(buffer.toString('utf8').trim())
  } else {
    val = 'base64,' + buffer.toString('base64')
  }
  return `data:${mediaType};${val}`
}
