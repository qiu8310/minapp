import wxp from '@minapp/core'

// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wxp.canIUse('button.open-type.getUserInfo')
  },

  // 事件处理函数
  bindViewTap() {
    wxp.navigateTo({url: '../logs/logs'})
  },

  async onLoad(options) {
    console.log('page', this)
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
  },

  getUserInfo(e: any) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
