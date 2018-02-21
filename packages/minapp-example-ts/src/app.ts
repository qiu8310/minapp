import {m, wxp, GlobalData, BaseApp} from './bootstrap'

console.log(require('./app.cjson?pages'))

@m.appify()
export default class extends BaseApp {
  globalData: GlobalData = {
    userInfo: null
  }

  async onLaunch() {
    // 展示本地存储能力
    let logs = wxp.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wxp.setStorageSync('logs', logs)

    // 登录
    let {code} = await wxp.login()
    console.log(code) // 发送 code 到后台换取 openId, sessionKey, unionId

    // 获取用户信息
    let setting = await wxp.getSetting()
    if (setting.authSetting['scope.userInfo']) { // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      // 可以将 getUserInfo 返回的对象发送给后台解码出 unionId
      let res = await wxp.getUserInfo()
      // console.log(res)
      this.globalData.userInfo = res.userInfo

      // // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // // 所以此处加入 callback 以防止这种情况
      // if (this.userInfoReadyCallback) {
      //   this.userInfoReadyCallback(res)
      // }

      // console.log('app')
      // console.log(this)
      // console.log(getApp())
    }
  }
}

