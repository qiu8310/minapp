/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

export namespace Document {
  export interface ToXMLOptions {
    /** 自定义输出的每行的前缀，默认 "" */
    prefix?: string
    /** tab 使用 space 而不是 \t，默认 true */
    preferSpaces?: boolean
    /** 单个 tab 缩进的数量，默认 2 */
    tabSize?: number
    /** 指定换行符，默认 "\n" */
    eol?: string

    /** 单行带文本的标签的长度如果超过此限制，则换成多行的写法；如果指定为 0，则表示无限大 */
    maxLineCharacters?: number

    /** 是否删除注释；注意：开启此选项处理后，原结构中的 CommentNode 都会被移除 */
    removeComment?: boolean

    /**
     * 这里指定的 tag 中的内容不会格式化，会和原内容一致
     *
     * 比如在微信小程序中 text 标签中开始的换行和结束的换行都会占用布局，所以这一部分不能被格式化了
     */
    reserveTags?: string[]
  }

  export type RequiredToXMLOptions = Required<ToXMLOptions> & {source: string}
}

const DefaultToXMLOptions: Document.RequiredToXMLOptions = {
  source: '',
  prefix: '',
  preferSpaces: true,
  tabSize: 2,
  eol: '\n',
  maxLineCharacters: 100,
  removeComment: false,
  reserveTags: []
}

/**
 * wxml 可以是由多个节点组成一个文档
 */
export class Document {
  constructor(public source: string) {}

  nodes: Node[] = []

  toXML(opts: Document.ToXMLOptions = {}) {
    let _: Document.RequiredToXMLOptions = {...DefaultToXMLOptions, ...opts, source: this.source}
    let step = (_.preferSpaces ? ' ' : '\t').repeat(_.tabSize)

    let nodes = opts.removeComment ? this.nodes.filter(removeComentNode) : this.nodes
    return nodes.map(n => toXML(n, _.prefix, step, _)).join(_.eol)
  }
}

function removeComentNode(n: Node) {
  if (n.is(TYPE.COMMENT)) return false
  if (n.is(TYPE.TAG)) n.children = n.children.filter(removeComentNode)
  return true
}

export enum TYPE {
  TAG, TEXT, COMMENT
}

export abstract class Location {
  /** 节点起始位置 */
  // @ts-ignore
  start: number
  /** 节点结束位置 */
  // @ts-ignore
  end: number

  constructor(start?: number, end?: number) {
    if (start != null) this.start = start
    if (end != null) this.end = end
  }
}

/**
 * 节点的基类
 */
export abstract class Node extends Location {
  static TYPE = TYPE

  is(type: TYPE.TAG): this is TagNode
  is(type: TYPE.TEXT): this is TextNode
  is(type: TYPE.COMMENT): this is CommentNode
  is(type: TYPE) {
    return type === TYPE.TAG ? this instanceof TagNode
      : type === TYPE.TEXT ? this instanceof TextNode
      : type === TYPE.COMMENT ? this instanceof CommentNode
      : false
  }
}

/**
 * 注释节点
 */
export class CommentNode extends Node {
  constructor(public comment: string, start?: number, end?: number) {
    super(start, end)
  }
}
/**
 * 文本节点
 */
export class TextNode extends Node {
  constructor(public content: string, start?: number, end?: number) {
    super(start, end)
  }
}
/**
 * 标签节点
 */
export class TagNode extends Node {
  attrs: TagNodeAttr[] = []
  children: Node[] = []

  /** 是否是自动闭合的标签 */
  selfClose?: boolean

  /** 标签内容开始的位置（selfClose = false 时此字段才有值） */
  contentStart?: number
  /** 标签内容结束的位置（selfClose = false 时此字段才有值） */
  contentEnd?: number

  constructor(public name: string, start?: number, end?: number) {
    super(start, end)
  }
  getAttr(key: string) {
    return this.attrs.find(a => a.name === key)
  }
}

/**
 * 标签节点的属性
 */
export class TagNodeAttr extends Location {
  constructor(public name: string, public value: string | true, start?: number, end?: number) {
    super(start, end)
  }

  toXML() {
    return this.value !== true
      ? `${this.name}="${this.value}"`
      : `${this.name}`
  }
}

function toXML(n: Node, prefix: string, step: string, opts: Document.RequiredToXMLOptions): string {
  if (n.is(TYPE.COMMENT)) {
    return prefix + `<!-- ${n.comment} -->`
  } else if (n.is(TYPE.TEXT)) {
    return prefix + n.content
  } else if (n.is(TYPE.TAG)) {
    let prefixedStart = `${prefix}<${n.name}${n.attrs.map(a => ' ' + a.toXML()).join('')}`
    if (n.selfClose) return prefixedStart + ' />'
    prefixedStart += '>'
    let endTag = `</${n.name}>`

    if (opts.reserveTags.indexOf(n.name) >= 0 && n.contentEnd && n.contentStart) {
      return prefixedStart + opts.source.substring(n.contentStart, n.contentEnd) + endTag
    }

    let child = n.children[0]
    if (!child) return prefixedStart + endTag
    if (n.children.length === 1 && child.is(TYPE.TEXT)) {
      let str = prefixedStart + child.content + endTag
      if (opts.maxLineCharacters === 0 || str.length <= opts.maxLineCharacters) return str
    }
    return [
      prefixedStart,
      ...n.children.map(_ => toXML(_, prefix + step, step, opts)),
      prefix + endTag
    ].join(opts.eol)
  } else {
    return ''
  }
}
