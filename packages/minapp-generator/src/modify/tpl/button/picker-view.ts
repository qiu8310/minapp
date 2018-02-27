/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {TplModifier} from '../..'

export default class extends TplModifier {
  modify($root: Cheerio) {
    let title = 'Tips'
    let $h4 = $root.find('h4').eq(2)
    this.assert($h4.text(), title)
    $h4.replaceWith(this.sectionTitle(title))
  }
}
