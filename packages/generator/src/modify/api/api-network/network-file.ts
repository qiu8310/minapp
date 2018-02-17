import {ApiModifier, TemplateMeta} from '../..'

export default class extends ApiModifier {
  modify(): TemplateMeta[] {
    return [
      {type: 'update', index: 4, head: {col: 3, from: '必填', to: '描述'}},
    ]
  }
}
