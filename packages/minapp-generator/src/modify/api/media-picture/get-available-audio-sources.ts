/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {ApiModifier, TemplateMeta} from '../..'

export default class extends ApiModifier {

  normalize($root: Cheerio) {
    super.normalize($root)

    let $target1 = this.$root.find('table').eq(0).prev()
    $target1.replaceWith(this.sectionTitle("OBJECT参数说明"))

    let $target = this.$root.find('table').eq(2).prev()
    let title = $target.text()
    $target.replaceWith(this.sectionTitle(title))
  }

  modify(): TemplateMeta[] {
    return [
      {type: 'update', index: 1, body: {row: 0, col: 1, from: 'ArrayString', to: 'StringArray'}}
    ]
  }

  
}