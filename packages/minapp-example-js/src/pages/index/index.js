import m from 'minapp'
const {wxp} = m

@m.pagify()
export default class extends m.Page {
  data = {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wxp.canIUse('button.open-type.getUserInfo')
  }

  //事件处理函数
  bindTap() {
    wxp.navigateTo({
      url: '../logs/logs'
    })
  }

  async onLoad() {
    let {app} = this
    console.log('globalData in index page onLoad', app.globalData)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app._userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      let res = await wxp.getUserInfo()
      app.globalData.userInfo = res.userInfo
      this.setData({
        userInfo: res.userInfo,
        hasUserInfo: true
      })
    }
  }

  getUserInfo(e) {
    console.log(e)
    this.app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
}

