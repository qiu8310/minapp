/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {ApiModifier} from '../..'

export default class extends ApiModifier {
    normalize($root: Cheerio) {
        super.normalize($root)
        // 修正不符合规格的html
        let $target = $root.find('#res')
        $target.prev().prev().remove()
        $target.prev().remove()
        $target.remove()
        $root.find('table').eq(2).before('<p id="fortest"><strong>CALLBACK返回参数：</strong></p>')
    }
}
