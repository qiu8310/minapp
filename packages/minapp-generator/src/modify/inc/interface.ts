/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

// 这些 TemplateMeta 是在模板文件中用的
export interface TableMergeTemplateMeta {
  type: 'merge'
  toIndex: number
  fromIndex: number

  /** 删除表格和前后的数据，默认为 true */
  remove?: boolean

  /** 在指定列上添加前缀 */
  prefixes?: string[]
  /** 在指定列上添加后缀 */
  suffixes?: string[]

  /** 添加或删除列（会先执行 prefix 和 suffix） */
  splice?: any[]
}

export interface TableUpdateTemplateMeta {
  type: 'update'
  index: number
  head?: {
    col: number
    from: string
    to: string
  }
  body?: {
    row: number
    col: number
    from: string
    to: string
  },
  col?: {
    splice: any[]
    head: string
    rows: any[]
  }
}

export interface TableIgnoreHeadWarnTemplateMeta {
  type: 'ignoreHeadWarn',
  index: number
  col: number
  from: string
}

/** 修改表格上方的标题 */
export interface TableTitleUpdateTemplateMeta {
  type: 'tableTitleUpdate'
  index: number
  from: string
  to: string
}

export declare type TemplateMeta = TableMergeTemplateMeta | TableUpdateTemplateMeta | TableIgnoreHeadWarnTemplateMeta | TableTitleUpdateTemplateMeta


// 这些 CodeMeta 是直接在 Generater 代码中使用的
export interface FunctionCodeMeta {
  returns?: string
  args?: string[]
}

export interface CodeMeta {
  /** 要修改的函数 */
  func: {[fnKey: string]: FunctionCodeMeta}
  /** 这里面的组件没有任何属性 */
  componentNoAttrs: string[]
}
