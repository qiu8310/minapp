/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {TplModifier, TemplateMeta} from '../..'

export default class extends TplModifier {
  modify($root: Cheerio): TemplateMeta[] {
    return [
      {type: 'merge', fromIndex: 2, toIndex: 1, splice: [1, 0, 'EventHandle', ''], remove: false}
    ]
  }

  normalize($root: Cheerio) {
    super.normalize($root)
    let $table = $root.find('table').eq(2)
    $table.prev().remove()
    $table.remove()
  }
}
