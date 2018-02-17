import {TplModifier, TemplateMeta} from '../..'

export default class extends TplModifier {
  modify($root: Cheerio): TemplateMeta[] {
    return [
      {type: 'ignoreHeadWarn', index: 0, col: 4, from: '生效时机'},
    ]
  }
}
