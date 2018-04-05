/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc^126.com> (https://github.com/qiu8310)
*******************************************************************/

// tslint:disable: no-conditional-assignment
import {TextDocument, Position} from 'vscode'

export interface Tag {
  /** Tag 的名称 */
  name: string
  /** 光标位置是否是在 tag name 上 */
  isOnTagName: boolean
  /** 光标位置是否是在 tag attr name 上 */
  isOnAttrName: boolean
  /** 只有 isOnAttrName 为 true 时才有效 */
  attrName: string
  /** 光标位置是否是在 tag attr value 上 */
  isOnAttrValue: boolean
  /** 光标所在位置上的单词是什么 */
  posWord: string
  attrs: {
    [key: string]: string | boolean
  }
}

export type getTagAtPosition = (doc: TextDocument, pos: Position) => null | Tag

export function getAttrName(str: string) {
  if (/\s([\w-:.]+)=%*$/.test(str)) {
    return RegExp.$1
  }
  return ''
}

// 也可以是以 @ 开头的字符，触发事件
const TAG_ATTR_REGEXP = /^(@|@?[\w:-]+)\s*(=\s*("[^"]*"|'[^']*'|\w+))?\s*/
export function getAttrs(text: string) {
  let attrs: any = {}
  getAttrs2(text, attrs)
  return attrs
}
export function getAttrs2(text: string, attrs: {[key: string]: any}) {
  return match(text, TAG_ATTR_REGEXP, m => {
    attrs[stripColon(m[1])] = m[2] ? strip(m[3]) : true
  })
}

function stripColon(name: string) {
  return name
    // .replace(':', '')
    // .replace(/^@/, 'bind')
    .replace(/\..*$/, '') // 去除修饰字符，如 .default, .stop, .user, .sync
}

function strip(val: string) {
  return val.replace(/^['"]|['"]$/g, '')
}

function match(str: string, reg: RegExp, cb: (mat: RegExpMatchArray) => boolean | void) {
  let mat: RegExpMatchArray | null

  while (str.length && (mat = str.match(reg))) {
    if (cb(mat)) break
    str = str.slice(mat[0].length)
  }

  return str
}
