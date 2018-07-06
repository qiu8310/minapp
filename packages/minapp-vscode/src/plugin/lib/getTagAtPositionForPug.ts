/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc^126.com> (https://github.com/qiu8310)
*******************************************************************/

import {TextDocument, Position} from 'vscode'
import {Tag, getAttrs, getAttrs2} from './getTagAtPosition'

const SINGLE_LINE_TAG_REGEXP = /^(\s*)([\w-:.]+)((?:[\.#][\w-])*)(\s*\()(.*)\)/
const MULTIPLE_LINE_TAG_REGEXP = /^(\s*)([\w-:.]+)((?:[\.#][\w-])*)(\s*\()/
let replacer = (char: string) => (raw: string) => char.repeat(raw.length)

export function getTagAtPosition(doc: TextDocument, pos: Position): null | Tag {
  // 先处理单行的 pug 语法
  let line = doc.lineAt(pos.line).text
  let index = pos.character
  if (SINGLE_LINE_TAG_REGEXP.test(line)) {
    let prefix = RegExp.$1
    let name = RegExp.$2
    let classOrId = RegExp.$3
    let rest = RegExp.$4
    let attrstr = (RegExp.$5 || '').trim()

    if (index < prefix.length) {
      return null
    } else if (index <= prefix.length + name.length) {
      return {
        name,
        attrs: getAttrs(attrstr),
        posWord: name,
        isOnTagName: true,
        isOnAttrName: false,
        isOnAttrValue: false,
        attrName: ''
      }
    } else if (
      index < prefix.length + name.length + classOrId.length + rest.length ||
      index > prefix.length + name.length + classOrId.length + rest.length + attrstr.length + 1 // 后面有半个括号
    ) {
      return null
    } else {
      let {posWord, attrName, isOnAttrValue} = parseLine(line, doc, pos)
      return {
        name,
        attrs: getAttrs(attrstr),
        posWord,
        isOnTagName: false,
        isOnAttrName: !isOnAttrValue && !!posWord,
        isOnAttrValue,
        attrName
      }
    }
  } else {
    // 向上查找 ( ，不能出现 )
    // 向下查找 ) ，不能出现（
    let startLine = pos.line
    let attrs: any = {}
    let name = searchUp(doc, startLine, attrs)
    if (!name) return null
    if (!searchDown(doc, startLine + 1, attrs)) return null
    let {posWord, attrName, isOnAttrValue} = parseLine(doc.lineAt(startLine).text, doc, pos)
    return {
      name,
      attrs,
      posWord,
      isOnTagName: false,
      isOnAttrName: !isOnAttrValue && !!posWord,
      isOnAttrValue,
      attrName
    }
  }
}

function parseLine(line: string, doc: TextDocument, pos: Position) {
  // 因为双大括号里可能会有任何字符，估优先处理
  // 用特殊字符替换 "{{" 与 "}}" 和 "{" 与 "}" 之间的语句，并保证字符数一致
  line = line.replace(/\{\{[^\}]*?\}\}/g, replacer('^'))
              .replace(/\{[^\}]*?\}/g, replacer('^'))  // a(style={color: 'red', background: 'green'}) => a(style=^^^^^^^^)

  let attrFlagLine = line.replace(/("[^"]*"|'[^']*')/g, replacer('%')) // 将引号中的内容也替换了

  let range = doc.getWordRangeAtPosition(pos, /\b[\w-:.]+\b/)
  let posWord = ''
  let attrName = ''
  if (range) posWord = doc.getText(range)
  let isOnAttrValue = attrFlagLine[pos.character] === '%'
  if (isOnAttrValue) {
    attrName = getAttrName(attrFlagLine.substring(0, pos.character))
  }
  return {
    posWord, attrName, isOnAttrValue
  }
}

function searchUp(doc: TextDocument, lineNum: number, attrs: {[key: string]: any}) {
  while (lineNum >= 0) {
    let text = doc.lineAt(lineNum).text.trim()
    if (text) {
      if (text[0] === '-') return false
      if (text.indexOf(')') >= 0) return false
      if (text.indexOf('(') > 0 && MULTIPLE_LINE_TAG_REGEXP.test(text)) {
        let name = RegExp.$2
        Object.assign(attrs, getAttrs((RegExp.$5 || '').trim()))
        return name
      }
      let left = getAttrs2(text, attrs)
      if (left) return false
    }
    lineNum--
  }
  return false
}
function searchDown(doc: TextDocument, lineNum: number, attrs: {[key: string]: any}) {
  while (lineNum < doc.lineCount) {
    let text = doc.lineAt(lineNum).text.trim()
    if (text) {
      if (text[0] === '-') return false
      if (text.indexOf('(') > 0) return false
      if (text.indexOf(')') >= 0) return true

      let left = getAttrs2(text, attrs)
      if (left) return false
    }
    lineNum++
  }
  return false
}

function getAttrName(str: string) {
  // 左边可以是括号（pug）或空格
  if (/(?:\(|\s)([\w-:.]+)=%*$/.test(str)) {
    return RegExp.$1
  }
  return ''
}
