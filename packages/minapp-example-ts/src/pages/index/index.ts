import {m, wxp, BasePage} from '../../bootstrap'

// 获取应用实例
const app = getApp() as any

@m.pagify()
export default class extends BasePage {
  data = {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    // TODO: canIUse 返回值是 void
    canIUse: wxp.canIUse('button.open-type.getUserInfo')
  }

  bindViewTap() {
    wxp.navigateTo({url: '../logs/logs'})
  }

  async onLoad(options: any) {
    console.log('page', require('../../images/heart-active@3x.png'))
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data && this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res: any) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      let {userInfo} = await wxp.getUserInfo()
      app.globalData.userInfo = userInfo
      this.setData({userInfo, hasUserInfo: true})
    }
  }

  getUserInfo(e: any) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
}
