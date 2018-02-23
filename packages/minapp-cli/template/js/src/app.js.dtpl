import {wxp, appify, BaseApp} from '@minapp/mobx'
import {MyStore} from 'base/MyStore'

@appify(new MyStore())
export default class extends BaseApp {

  async onLaunch() {
    // 展示本地存储能力
    var logs = wxp.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wxp.setStorageSync('logs', logs)

    // 登录
    let {code} = await wxp.login()
    console.log('login code %o', code) // 发送 code 到后台换取 openId, sessionKey, unionId

    // 获取用户信息
    let setting = await wxp.getSetting()
    if (setting.authSetting['scope.userInfo']) { // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      // 可以将 getUserInfo 返回的对象发送给后台解码出 unionId
      let res = await wxp.getUserInfo()
      this.store.userInfo = res.userInfo
      console.log('userInfo from app %o', res.userInfo)
    } else {
      console.log('还没有授权')
    }
  }
}
