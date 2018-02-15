import {TemplateMeta, ApiModifier} from '../..'

export default class extends ApiModifier {
  modify(): TemplateMeta[] {
    return [
      {type: 'merge', toIndex: 3, fromIndex: 4, prefixes: ['fileList[].']},
      {type: 'update', index: 8, head: {col: 1, from: '说明', to: '类型'}},
    ]
  }
}
