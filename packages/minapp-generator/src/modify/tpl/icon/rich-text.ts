/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {TplModifier} from '../..'

export default class extends TplModifier {
  normalizeAfterLevelify() {
    let removes = [
      'nodes',
      '元素节点：type = node',
      '文本节点：type = text',
      '受信任的HTML节点及属性'
    ]
    this.$root.find('.section').toArray().forEach(s => {
      let $s = this.$(s)
      if (removes.indexOf($s.data('title')) >= 0) $s.remove()
    })
  }
}
