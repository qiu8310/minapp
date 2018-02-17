import {TplModifier, TemplateMeta} from '../..'

export default class extends TplModifier {
  modify($root: Cheerio): TemplateMeta[] {
    return [
      {type: 'tableTitleUpdate', index: 1, from: 'MediaError.code', to: 'binderror __描述__ MediaError.code'}
    ]
  }
}
