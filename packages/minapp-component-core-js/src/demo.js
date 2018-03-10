/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {comify, BaseComponent} from '@minapp/core/system'

@comify()
export default class extends BaseComponent {
  properties = {
    /** 是否显示 toast */
    toast: {
      type: Boolean,
      value: false
    }
  }
  onCreated() {
    console.log('require image from demo component %o', require('./heart@3x.png'))
  }

  onReady() {
  }

  toggleToast() {
    this.setDataSync({toast: !this.data.toast})
  }
}
