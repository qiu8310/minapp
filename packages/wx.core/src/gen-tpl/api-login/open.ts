import {Template, TemplateModify} from '../Template'

export default class extends Template {
  modify(): TemplateModify[] {
    return [
      {type: 'merge', fromIndex: 2, toIndex: 1, prefixes: ['userInfo.']},
    ]
  }
}
