/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {ApiModifier} from '../..'

export default class extends ApiModifier {
  modify($root: Cheerio) {
    $root.find('h2').each((i, el) => {
      let $el = this.$(el)
      $el.replaceWith(`<h3 id=${$el.attr('id')}>${$el.text()}</h3>`)
    })

    $root.find('table').eq(8).prev().html('<strong>success 参数说明</strong>')
  }
}
