/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {TplModifier} from '../..'

export default class extends TplModifier {
  modify($root: Cheerio) {
    let $table = $root.find('table').eq(0)
    this.assert($table.find('tbody td').eq(0).text() === '无')
    $table.remove()
  }
}
