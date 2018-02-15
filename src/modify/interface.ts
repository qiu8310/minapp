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
  }
}

export interface TableIgnoreHeadWarnTemplateMeta {
  type: 'ignoreHeadWarn',
  index: number
  col: number
  from: string
}

export declare type TemplateMeta = TableMergeTemplateMeta | TableUpdateTemplateMeta | TableIgnoreHeadWarnTemplateMeta


// 这些 CodeMeta 是直接在 Generater 代码中使用的
export interface FunctionCodeMeta {
  returns?: string
  args?: string[]
}

export interface CodeMeta {
  func: {[fnKey: string]: FunctionCodeMeta}
}
