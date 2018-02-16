/*
  {
    "camera": {
      "since": "1.6.0",
      "desc": [
        "系统相机。"
      ],
      "authorize": "scope.camera",
      "relateApis": {"name": wx.createCameraContext, "link": "..."}
      "tips": [
        "camera 组件是由客户端创建的原生组件，它的层级是最高的，不能通过 z-index 控制层级。可使用 cover-view cover-image覆盖在上面"
      ],
      "examples": [
        "..code1..",
        "..code2.."
      ],
      "attrs": [
        {"name": "", "type": "", "default": "", "enum": [], "desc": ""},
        {"name": "", "type": "", "default": "", "enum": [], "desc": ""},
        {"name": "", "type": "", "subAttrs": [
          {"equal": "...", attrs: []},
          {"equal": "...", attrs: []},
          {"equal": "...", attrs: []}
        ]}
      ]
    }
  }
*/
import {Type} from './Type'
import {Definition} from './Definition'

export class ComponentLink {
  constructor(public name: string, public link: string) {
    if (!name || !link) throw new Error(`链接需要同时存在 name 和 link 属性： ${JSON.stringify({name, link})}`)
  }
}

export class Component {
  /** 组件名称 */
  name: string

  /** 官方文档地址 */
  docLink: string

  /** 兼容的小程序版本号 */
  since?: string

  /** 描述信息 */
  desc: string[] = []

  /** 组件支持的属性 */
  attrs: ComponentAttr[] = []

  /** 需要用户预先授权 */
  authorize?: ComponentLink

  /** 相关 api */
  relateApis: ComponentLink[] = []

  /** 注意事项 */
  notices: string[] = []
  /** 提醒 */
  tips: string[] = []
  /** 已知 bug */
  bugs: string[] = []

  /** 示例代码 */
  examples: Array<{code: string, lang: string, title: string}> = []
  /** 演示图片 */
  demoImages: string[] = []

  constructor(name: string, docLink: string) {
    this.name = name
    this.docLink = docLink
  }

  toJSON(excludes?: string[], deep?: boolean) { return toJSON(this, excludes, deep) }
}

export class ComponentAttr {
  static fromDefinition(def: Definition) {
    let {name, type, desc} = def
    let ca = new ComponentAttr(name, type, desc)

    if (def.hasOwnProperty('required')) ca.required = def.required
    if (def.hasOwnProperty('since')) ca.since = def.since
    if (def.hasOwnProperty('defaultValue')) ca.defaultValue = def.defaultValue
    if (def.hasOwnProperty('extras')) ca.extras = def.extras
    if (def.hasOwnProperty('enum')) ca.enum = def.enum
    if (def.hasOwnProperty('subDefinitions')) ca.subAttrs = def.subDefinitions.map(s => new SubAttr(s.equal, s.definitions.map(d => ComponentAttr.fromDefinition(d))))
    return ca
  }

  /** 属性名称 */
  name: string
  /** 属性类型 */
  type: Type
  /** 属性描述 */
  desc: string[]
  /** 属性是否必填 */
  required?: boolean
  /** 此属性从哪个小程序版本号开始支持 */
  since?: string
  /** 属性默认值 */
  defaultValue?: string

  /** 属性可选值 */
  enum: ComponentAttrValue[] = []

  /** 其它信息 */
  extras: Array<{key: string, value: string}> = []

  subAttrs: SubAttr[] = []

  constructor(name: string, type: Type, desc: string[]) {
    if (!name || !type || !desc) throw new Error(`ComponentAttr 缺少字段 ${JSON.stringify({name, type, desc})}`)
    this.name = name
    this.type = type
    this.desc = desc
  }

  toJSON() { return toJSON(this) }
}

export class ComponentAttrValue {
  constructor(public value: string, public desc?: string, public since?: string) {
    if (!value) throw new Error(`ComponentAttrValue 的 value 字段不能为空`)
  }
}

export class SubAttr {
  constructor(public equal: string, public attrs: ComponentAttr[]) {
  }

  toJSON() { return toJSON(this) }
}

function toJSON(target: any, excludes: string[] = [], deep: boolean = false) {
  if (!target || typeof target !== 'object') return target

  return Object.keys(target).reduce((memo, key) => {
    if (excludes.indexOf(key) >= 0) return memo
    let val = target[key]
    if (!val) {
      memo[key] = val
    } else if (Array.isArray(val)) {
      memo[key] = val.map(v => toJSON(v, deep ? excludes : [], deep))
    } else if (typeof val === 'function') {
      if (key === 'toJSON') memo[key] = target.toJSON()
    } else if (typeof val === 'object') {
      memo[key] = toJSON(val, deep ? excludes : [], deep)
    } else {
      memo[key] = val
    }
    return memo
  }, {} as any)
}
