/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc^126.com> (https://github.com/qiu8310)
*******************************************************************/

import {TextDocument, Position} from 'vscode'
import {Tag, getAttrs, getAttrName} from './getTagAtPosition'

const TAG_REGEXP = /<([\w-:.]+)(\s+[^<>]*)?/g

export function getTagAtPosition(doc: TextDocument, pos: Position): null | Tag {
  let tag: null | Tag = null
  let line = doc.lineAt(pos.line).text
  let replacer = (char: string) => (raw: string) => char.repeat(raw.length)

  // 因为双大括号里可能会有任何字符，估优先处理
  // 用特殊字符替换 "{{" 与 "}}"" 之间的语句，并保证字符数一致
  line = line.replace(/\{\{[^\}]*?\}\}/g, replacer('^'))

  let attrFlagLine = line.replace(/("[^"]*"|'[^']*')/g, replacer('%')) // 将引号中的内容也替换了

  line.replace(TAG_REGEXP, (raw: string, name: string, attrstr: string, index: number) => {
    if (!tag && index <= pos.character && index + raw.length >= pos.character) {
      let range = doc.getWordRangeAtPosition(pos, /\b[\w-:.]+\b/)
      let posWord = ''
      let attrName = ''
      if (range) posWord = doc.getText(range)
      let isOnTagName = pos.character <= index + name.length + 1
      let isOnAttrValue = attrFlagLine[pos.character] === '%'
      if (isOnAttrValue) {
        attrName = getAttrName(attrFlagLine.substring(0, pos.character))
      }
      let isOnAttrName = !isOnTagName && !isOnAttrValue && !!posWord
      tag = {
        name,
        attrs: getAttrs((attrstr || '').trim()),
        posWord,
        isOnTagName,
        isOnAttrName,
        isOnAttrValue,
        attrName
      }
    }
    return raw
  })
  return tag
}
