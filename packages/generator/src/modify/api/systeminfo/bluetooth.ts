import {ApiModifier, TemplateMeta} from '../..'

export default class extends ApiModifier {
  modify(): TemplateMeta[] {
    return [
      {type: 'merge', fromIndex: 11, toIndex: 10, prefixes: ['devices[].']},
      {type: 'merge', fromIndex: 13, toIndex: 12, prefixes: ['devices[].']},
      {type: 'merge', fromIndex: 16, toIndex: 15, prefixes: ['devices[].']},
      {type: 'merge', fromIndex: 24, toIndex: 23, prefixes: ['services[].']},
      {type: 'merge', fromIndex: 28, toIndex: 27, prefixes: ['properties.']},
      {type: 'merge', fromIndex: 27, toIndex: 26, prefixes: ['characteristics[].']},
    ]
  }
}
