import {Template, TemplateModify} from '../Template'

export default class extends Template {
  modify(): TemplateModify[] {
    return [
      {type: 'merge', toIndex: 3, fromIndex: 4, prefixes: ['fileList[].']},
      {type: 'update', index: 8, head: {col: 1, from: '说明', to: '类型'}},
    ]
  }
}
