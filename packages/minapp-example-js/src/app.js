/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {appify, wxp, MyApp, MyStore} from 'base/'

@appify(new MyStore())
export default class extends MyApp {
  async onLaunch() {
    // 展示本地存储能力
    let logs = wxp.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wxp.setStorageSync('logs', logs)

    // 登录
    let {code} = await wxp.login()
    console.log('微信 code %o', code) // 发送 code 到后台换取 openId, sessionKey, unionId

    // 获取用户信息
    let setting = await wxp.getSetting()
    if (setting.authSetting['scope.userInfo']) { // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      // 可以将 getUserInfo 返回的对象发送给后台解码出 unionId
      let res = await wxp.getUserInfo()
      console.log('微信 userInfo %o', res.userInfo)
      this.store.userInfo = res.userInfo  // 将用户信息存入 store 中
    } else {
      console.log('没有授权过')
    }
  }
}

