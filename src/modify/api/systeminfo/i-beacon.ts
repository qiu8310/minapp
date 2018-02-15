import {ApiModifier, TemplateMeta} from '../..'

export default class extends ApiModifier {
  modify(): TemplateMeta[] {
    return [
      {type: 'merge', fromIndex: 6, toIndex: 5, prefixes: ['beacons[].']},
      {type: 'merge', fromIndex: 8, toIndex: 7, prefixes: ['beacons[].']},
    ]
  }
}
