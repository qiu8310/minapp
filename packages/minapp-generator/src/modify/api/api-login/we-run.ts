/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {ApiModifier, TemplateMeta} from '../..'

export default class extends ApiModifier {
  modify(): TemplateMeta[] {
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
