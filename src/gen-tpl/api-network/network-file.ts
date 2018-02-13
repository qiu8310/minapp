import {Template, TemplateModify} from '../Template'

export default class extends Template {
  modify(): TemplateModify[] {
    return [
      {type: 'update', index: 4, head: {col: 3, from: '必填', to: '描述'}},
    ]
  }
}
