import {Template, TemplateModify} from '../Template'

export default class extends Template {
  modify(): TemplateModify[] {
    return [
      {type: 'merge', fromIndex: 6, toIndex: 5, prefixes: ['beacons[].']},
      {type: 'merge', fromIndex: 8, toIndex: 7, prefixes: ['beacons[].']},
    ]
  }
}
