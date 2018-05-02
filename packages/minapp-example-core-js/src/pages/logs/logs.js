/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    logs: []
  }

  backToHome() {
    this.app.$back()
  }

  onLoad() {
    let location = this.getLocation()
    console.log(`当前页面 ${location.pathname}, 页面参数 ${JSON.stringify(location.query)}`)

    let logs = wx.getStorageSync('logs') || []
    this.setDataSmart({
      logs: logs.map(log => new Date(log).toLocaleString())
    })
  }
}
