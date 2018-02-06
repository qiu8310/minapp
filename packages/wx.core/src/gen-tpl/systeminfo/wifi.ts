import {Template, TemplateModify} from '../Template'

export default class extends Template {
  modify(): TemplateModify[] {
    return [
      {type: 'merge', fromIndex: 5, toIndex: 4, prefixes: ['wifiList[].']},
      {type: 'merge', fromIndex: 7, toIndex: 6, splice: [2, 0, '是'], prefixes: ['wifiList[].']},
      {type: 'merge', fromIndex: 9, toIndex: 8, prefixes: ['wifi.']},
      {type: 'merge', fromIndex: 12, toIndex: 11, prefixes: ['wifi.']},
    ]
  }
}
