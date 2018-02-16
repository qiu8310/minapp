/* tslint:disable:object-literal-key-quotes */
export const SINCE_TEST_GLOBAL_REGEXP = /> 基础库 ([\d\.]+) 开始支持，低版本需做\[兼容处理\]\(.*?\)/g
export const SINCE_LINK_REGEXP = /\[([\d\.]+)\]\(https[^\)]*开始支持，低版本需做兼容处理[^\)]*\)/

export const WX_FUNC_REGEXP = /^wx\.(\w+)(?:\((.*?)\))?$/
export const TAB = '  '
export const PROMISABLE_KEYS = ['success', 'complete', 'fail']
export const RETURN_SECTION_TITLES = ['返回值', '返回说明', '同步返回参数说明']
export const TABLE_FIRST_FILED_NAMES = ['键', '参数', '参数名', '字段', '属性', '属性名', '字段名', '方法']
export const TABLE_REST_FIELD_MAP: {[key: string]: string} = {
  '类型': 'type',
  '必填': 'required',
  '是否必填': 'required',
  '是否必须': 'required',
  '只读': 'readonly',
  '参数': 'args',
  '默认值': 'defaultValue',
  '范围': 'range',
  '说明': 'desc',
  '描述': 'desc',
  '含义': 'desc',
  '定义': 'desc',
  '参数说明': 'desc',
  '返回': 'desc',
  '备注': 'notice',
  '最低版本': 'since'
}

export const TYPE_MAP: {[key: string]: string} = {
  uint8clampedarray: 'Uint8ClampedArray',
  array: 'any[]',
  function: 'function',
  eventhandle: 'function',
  eventhandler: 'function',
  handleevent: 'function',
  handler: 'function',
  string: 'string',
  color: 'string',
  hexcolor: 'string',
  number: 'number',
  float: 'number',
  integer: 'number',
  int: 'number',
  dateint: 'number',
  numberarray: 'number[]',
  arraybuffer: 'ArrayBuffer',
  stringarray: 'string[]',
  'string array': 'string[]',
  objectarray: 'ArrayObject',
  'object array': 'ArrayObject',
  'array object': 'ArrayObject',
  '二维object array': 'ArrayObject',
  '二维array': 'any[][]',
  object: 'Object',
  boolean: 'boolean',
  boolead: 'boolean',
  bool: 'boolean'
}
