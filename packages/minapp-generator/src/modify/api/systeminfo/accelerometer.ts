/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {ApiModifier} from '../..'

export default class extends ApiModifier {
    normalize($root: Cheerio) {
        super.normalize($root)
        // 处理有两个table的情况
        $root.find('table').eq(2).remove()
      }
}
