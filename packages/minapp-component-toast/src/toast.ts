/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {comify, BaseComponent} from '@minapp/mobx'

@comify()
export default class extends BaseComponent<any, any, any> {
  properties = {
    message: {
      type: String
    },
    visible: {
      type: Boolean
    },
    timeout: {
      type: Number,
      value: 5
    }
  }

  data: any = {
    count: 0
  }

  onReady() {
    if (__ENV__ === 'development') {
      console.log('toast data', this.data)
    }
  }

  onPropUpdate(prop: string, val: boolean) {
    if (prop === 'visible' && val === true) {
      this.init()
    }
  }

  init() {
    let countDown = () => {
      if (!this.data.visible) return

      if (this.data.count <= 0) {
        this.close()
      } else {
        setTimeout(() => {
          this.setData({count: this.data.count - 1}, countDown)
        }, 1000)
      }
    }

    this.setData({count: this.data.timeout}, countDown)
  }

  close() {
    this.triggerEvent('close', {}, {})
  }
}
