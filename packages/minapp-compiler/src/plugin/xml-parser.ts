/*
    根据 xml-parser 改编的，原版无法解决下面两个问题：

    1. 一个标签中同时含有 text 和 tag 时，组装的时候无法判断它们的先后关系，如： <div>text1<p>text2</p></div>
    2. 不支持属性值为空，如： <input checked />
    3. 页面开头有注释的时候的时候无法解析；主要是去掉注释后页面开头会有空格，导致解析失败

    和原版不一样的地方：这里不存在 Declaration，所以就不处理
 */

const debug = require('debug')('minapp:xml-parser')
import {EOL} from 'os'

export class Node {
  iterateTagNode<T>(callback: (tagNode: TagNode) => T[]): T[] {
    let result: T[] = []
    if (this instanceof TagNode) {
      result.push(...callback(this))
      this.children.forEach(n => result.push(...n.iterateTagNode(callback)))
    }
    return result
  }

  toHTML(space: number = 0, prefix = ''): string {
    if (this instanceof TextNode) {
      return prefix + this.content
    } else if (this instanceof TagNode) {
      let eol = space ? EOL : ''
      let childPrefix = prefix + ' '.repeat(space)

      let openTag = `<${this.name}${this.attrs.map(a => ' ' + a.toHTML()).join('')}>`
      let closeTag = `</${this.name}>`
      let {children} = this
      let firstChild = children[0]

      if (children.length === 0) return prefix + openTag + closeTag
      else if (children.length === 1 && firstChild instanceof TextNode) return prefix + openTag + firstChild.content + closeTag
      return [prefix + openTag, ...children.map(n => n.toHTML(space, childPrefix)), prefix + closeTag].join(eol)
    }
    return ''
  }
}
export class TextNode extends Node {
  constructor(public content: string) {super()}
}
export class TagNode extends Node {
  attrs: TagNodeAttr[] = []
  children: Node[] = []

  constructor(public name: string) {super()}
  getAttr(key: string) {
    return this.attrs.find(a => a.name === key)
  }
}
export class TagNodeAttr {
  constructor(public name: string, public value: string) {}
  toHTML() {
    return `${this.name}="${this.value}"`
  }
}

export function parse(xml: string) {
  let index = 0
  xml = xml.replace(/<!--[\s\S]*?-->/g, '').trim()

  return tag(true)

  /**
   * Tag.
   */
  function tag(start: boolean): Node
  function tag(): Node | undefined
  function tag(start?: boolean): Node | undefined {
    debug('tag %j', xml)
    let m = match(/^<([\w-:.]+)\s*/)
    if (!m) return start ? new TextNode(xml) : undefined

    // name
    let node = new TagNode(m[1])

    // attributes
    while (!(eos() || is('>') || is('/>'))) {
      let attr = attribute()
      if (!attr) {
        throw new SyntaxError(`xml-parser: 标签属性语法错误，位置: ${index}, 代码：` + xml.substr(0, 20))
      }
      node.attrs.push(attr)
    }

    // self closing tag
    if (match(/^\s*\/>\s*/)) return node

    // text
    node.children.push(...text())

    // tslint:disable:no-conditional-assignment
    // children
    let child
    while (child = tag()) {
      node.children.push(child)
    }

    // text
    node.children.push(...text())

    // closing
    match(/^<\/[\w-:.]+>\s*/)

    return node
  }

  /**
   * Text node.
   */

  function text() {
    debug('text %j', xml)
    let m = match(/^([^<]*)/)
    if (m && m[1].trim()) return [new TextNode(m[1].trim())]
    return []
  }

  /**
   * Attribute.
   */
  function attribute() {
    debug('attr %j', xml)
    let m = match(/([\w:-]+)\s*(?:=(?:\s*("[^"]*"|'[^']*'|\w+)\s*))?/)
    if (!m) return
    return new TagNodeAttr(m[1], strip(m[2] || ''))
  }

  /**
   * Strip quotes from `val`.
   */
  function strip(val: string) {
    return val.replace(/^['"]|['"]$/g, '')
  }

  /**
   * Match `re` and advance the string.
   */

  function match(re: RegExp) {
    let m = xml.match(re)
    if (!m) return
    xml = xml.slice(m[0].length)
    index += m[0].length
    return m
  }

  /**
   * End-of-source.
   */

  function eos() {
    return 0 === xml.length
  }

  /**
   * Check for `prefix`.
   */

  function is(prefix: string) {
    return 0 === xml.indexOf(prefix)
  }
}

