import {Template, TemplateModify} from '../Template'

export default class extends Template {
  modify(): TemplateModify[] {
    return [
      {type: 'ignoreHeadWarn', index: 2, col: 3, from: '是否参与签名'},
      {type: 'merge', fromIndex: 1, toIndex: 0, prefixes: ['cardList[].'], splice: [2, 0, '是']},
      {type: 'merge', fromIndex: 5, toIndex: 4, prefixes: ['cardList[].']},
      {type: 'merge', fromIndex: 7, toIndex: 6, prefixes: ['cardList[].'], splice: [2, 0, '是']},
    ]
  }
}
