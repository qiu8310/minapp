import {Template, TemplateModify} from '../Template'

export default class extends Template {
  modify(): TemplateModify[] {
    return [
      {type: 'merge', fromIndex: 3, toIndex: 2, prefixes: ['stepInfoList[].']},
    ]
  }

  normalize($root: Cheerio) {
    super.normalize($root)
    // 添加个标题
    this.sectionTitle('encryptedData')
      .insertBefore($root.find('table').eq(2).prev())
  }
}
