import {pagify, wxp, BasePage} from 'base/bootstrap'

@pagify()
export default class extends BasePage {
  data = {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wxp.canIUse('button.open-type.getUserInfo')
  }

  bindViewTap() {
    wxp.navigateTo({url: this.app.pagesMap.logs})
  }

  async onLoad(options: any) {
    console.log('page', require('images/heart-active@3x.png'))
    if (this.app.globalData.userInfo) {
      this.setData({
        userInfo: this.app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data && this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      this.app._userInfoReadyCallback = (res: any) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      let {userInfo} = await wxp.getUserInfo()
      this.app.globalData.userInfo = userInfo
      this.setData({userInfo, hasUserInfo: true})
    }
  }

  getUserInfo(e: any) {
    console.log(e)
    this.app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
}
