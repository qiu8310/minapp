/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {pagify, MyPage} from 'base/'

// 把这个 class 转化成 微信的 Page 参数，并且注入全局 store
@pagify()
export default class extends MyPage {
  data = {
    count: 10,
    npmToast: false,
    demoToast: false,
    motto: ''
  }

  onShow() {
    /**
     * setDataSync 和 setData 基本一样，但 setDataSync 内部做过优化：
     *
     * 1. 支持双向绑定
     * 2. 页面隐藏是会缓存 data，等到页面显示的时候再 set
     */
    this.setDataSync({motto: 'See you again, Try to click me!'})
  }

  gotoLogsPage() {
    // 跳转到 logs 页面
    this.app.$url.logs.go({id: 1})
    this.setDataSync({motto: '开始跳转到 logs 页面'})
  }

  toggleDemoToast() {
    this.setDataSync({demoToast: !this.data.demoToast})
  }

  increase() {
    this.setDataSync({count: this.data.count + 1})
  }
}
