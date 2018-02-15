import {ApiModifier, TemplateMeta} from '../..'

export default class extends ApiModifier {
  modify(): TemplateMeta[] {
    return [
      {type: 'merge', fromIndex: 2, toIndex: 1, prefixes: ['tempFiles[].']}
    ]
  }
}
