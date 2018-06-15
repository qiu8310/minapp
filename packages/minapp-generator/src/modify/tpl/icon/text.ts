/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {TplModifier, TemplateMeta} from '../..'

export default class extends TplModifier {
  modify($root: Cheerio): TemplateMeta[] {
    let $el = $root.find('#bug--tip')
    this.assert($el.length === 1)
    this.assert($el.is('h4'))

    $el.replaceWith(this.sectionTitle('Tips'))

    return []
  }
}
