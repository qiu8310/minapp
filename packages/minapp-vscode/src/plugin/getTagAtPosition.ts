// tslint:disable: no-conditional-assignment
import {TextDocument, Position} from 'vscode'

export interface Tag {
  name: string
  isOnTagName: boolean // 光标位置是否是在 tag name 上
  isOnAttrName: boolean // 光标位置是否是在 tag attr name 上
  isOnAttrValue: boolean // 光标位置是否是在 tag attr value 上
  posWord: string // 光标所在位置上的单词是什么
  attrs: {
    [key: string]: string | boolean
  }
}

const tagRegExp = /<([\w-:.]+)(\s+[^<>]*)?/g
const attrRegExp = /^([\w:-]+)\s*(=\s*("[^"]*"|'[^']*'|\w+))?\s*/

export function getTagAtPosition(doc: TextDocument, pos: Position): null | Tag {
  let tag: null | Tag = null
  let line = doc.lineAt(pos.line).text
  let replacer = (raw: string) => '@'.repeat(raw.length)

  // 因为双大括号里可能会有任何字符，估优先处理
  // 用特殊字符替换 "{{" 与 "}}"" 之间的语句，并保证字符数一致
  line = line.replace(/\{\{[^\}]*?\}\}/g, replacer)
            // 将引号中的内容也替换掉
            .replace(/("[^"]*"|'[^']')/g, replacer)

  line.replace(tagRegExp, (raw: string, name: string, attrstr: string, index: number) => {
    if (!tag && index <= pos.character && index + raw.length >= pos.character) {
      let range = doc.getWordRangeAtPosition(pos, /\b[\w-:.]+\b/)
      let posWord = ''
      if (range) posWord = doc.getText(range)
      let isOnTagName = pos.character <= index + name.length + 1
      let isOnAttrValue = line[pos.character] === '@'
      let isOnAttrName = !isOnTagName && !isOnAttrValue && !!posWord
      tag = {
        name,
        attrs: getAttrs((attrstr || '').trim()),
        posWord,
        isOnTagName,
        isOnAttrName,
        isOnAttrValue
      }
    }
    return raw
  })

  return tag
}


function getAttrs(text: string) {
  let attrs: any = {}
  match(text, attrRegExp, m => {
    attrs[m[1]] = m[2] ? strip(m[3]) : true
  })
  return attrs
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
}
