/*
{
  "camera": {
    "since": "1.6.0",
    "desc": [
      "系统相机。",
      "需要<a href='...'>用户授权</a> scope.camera",
      "相关api: <a href='...'>wx.createCameraContext</a>"
    ],
    "tips": [
      "camera 组件是由客户端创建的原生组件，它的层级是最高的，不能通过 z-index 控制层级。可使用 cover-view cover-image覆盖在上面"
    ],
    "examples": [
      "..code1..",
      "..code2.."
    ],
    "attrs": [
      {"name": "", "type": "", "default": "", "enum": [

      ], "desc": "", "since": "", "extra": ""},
      {"name": "", "type": "", "default": "", "enum": [

      ], "desc": "", "since": "", "extra": ""}
    ]
  }
}
*/

interface Component {
  /** 组件名称 */
  key: string

  /** 兼容的小程序版本号 */
  since?: string

  /** 描述信息 */
  desc: string[]

  /** 组件支持的属性 */
  attrs: ComponentAttr[]
  optionalAttrs: any[]  // TODO: 设计结构

  /** 需要授权 */
  requireAuthorize: string[]

  /** 相关 api */
  relateApis: Array<{name: string, link: string}>

  /** tip、 bug 及 注意事项 */
  tips: string[]
  /** 代码示例 */
  examples: string[]
}

interface ComponentAttr {
  /** 属性名称 */
  name: string
  /** 属性类型 */
  type: string | object // TODO: 嵌套表格
  /** 属性描述 */
  desc: string
  /** 属性是否必填 */
  required: boolean
  /** 此属性从哪个小程序版本号开始支持 */
  since?: string
  /** 属性默认值 */
  default?: string
  /** 属性可选值 */
  optional?: any  // TODO: optional 是子表
  /** 其它信息 */
  extra?: any     // TODO: 设计结构
}
