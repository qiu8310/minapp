/**
 * wxml 可以是由多个节点组成一个文档
 */
export class Document {
  nodes: Node[] = []

  toXML(space?: number) {
    let eol = space ? '\n' : ''
    let step = space ? ' '.repeat(space) : ''
    return this.nodes.map(n => toXML(n, '', step, eol)).join(eol)
  }
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
  selfClose?: boolean

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

function toXML(n: Node, prefix: string, step: string, eol: string): string {
  if (n.is(TYPE.COMMENT)) {
    return prefix + `<!-- ${n.comment} -->`
  } else if (n.is(TYPE.TEXT)) {
    return prefix + n.content
  } else if (n.is(TYPE.TAG)) {
    let prefixedStart = `${prefix}<${n.name}${n.attrs.map(a => ' ' + a.toXML()).join('')}`
    if (n.selfClose) return prefixedStart + ' />'

    prefixedStart += '>'
    let endTag = `</${n.name}>`
    let child = n.children[0]

    if (!child) return prefixedStart + endTag
    if (n.children.length === 1 && child.is(TYPE.TEXT)) {
      let str = prefixedStart + child.content + endTag
      if (str.length <= 100) return str
    }
    return [prefixedStart, ...n.children.map(_ => toXML(_, prefix + step, step, eol)), prefix + endTag].join(eol)
  } else {
    return ''
  }
}
