import {Struct, base} from './_'
import {Type, ObjectType, FunctionType} from './Type'

export interface DefinitionOptions {
  desc: string[]
  defaultValue?: string
  range?: string
  required?: boolean
  readonly?: boolean
  notice?: string
  since?: string
  extras: Array<{key: string, value: string}>
}

/*
  转化文档中字段定义成 ts 的字段定义

  如：
    参数名	      类型	  必填	  说明
    frontColor	String	是	    前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000

  转化成：
    {
      name: 'frontColor',
      type: 'string',
      required: true
      desc: '...'
    }
*/
export class Definition extends Struct {
  static FIELDS = [
    'desc', 'defaultValue', 'range',
    'required', 'readonly', 'notice',
    'since', 'extras'
  ]

  /** 字段描述 */
  desc: string[] = []

  /** 字段默认值 */
  defaultValue?: string

  /** 字段取值范围，有此字段 type 一般是 number */
  range?: string

  /** 是否必传 */
  required?: boolean

  /** 是否只读 */
  readonly?: boolean

  /** 注意事项 */
  notice?: string

  /** 兼容版本号 */
  since?: string

  /** 其它字段 */
  extras: Array<{key: string, value: string}> = []

  constructor(public name: string, public type: Type, opts?: DefinitionOptions) {
    super()
    if (opts) base.copy(opts, this, Definition.FIELDS)
  }

  /**
   * 如果默认没有设置 required，则将其设置成 true
   */
  setDefaultRequired() {
    if (this.required == null) this.required = true
    if (this.type instanceof ObjectType) this.type.setDefaultRequired()
  }

  toTSString(tabCount: number, fromKlass?: boolean) {
    let doc: string[] = [...(this.desc.length ? this.desc : [this.name]), '']
    let originalLen = doc.length

    if (this.notice) doc.push(this.notice)
    if (this.range) doc.push('取值范围： ' + this.range)
    if (this.extras.length) doc.push(this.extras.map(e => `${e.key}: ${e.value}`).join('; '))
    if (this.defaultValue) doc.push(`@default ${this.defaultValue}`)
    if (this.readonly) doc.push('@readonly')
    if (this.since) doc.push('@since ' + this.since)

    if (doc.length === originalLen) doc.pop() // 如果最后一行是第2行，则去除这个空行

    doc = doc.map(d => ` *${d ? ' ' + d : ''}`)
    doc.unshift('/**')
    doc.push(' */')
    if (fromKlass && this.type instanceof FunctionType) {
      doc.push(`${this.name}${this.type.toTSString(tabCount, true)}`)
    } else {
      doc.push(`${this.name}${this.required ? '' : '?'}: ${this.type.toTSString(tabCount)}`)
    }

    return base.spacify(doc, tabCount).join(base.EOL)
  }

  toString() {
    return `<Definition ${this.name}>`
  }

  clone() {
    let def = new Definition(this.name, this.type.clone())
    return base.copy(this, def, Definition.FIELDS)
  }
}
