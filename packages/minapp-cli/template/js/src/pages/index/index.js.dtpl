import {wxp, BasePage, pagify} from '@minapp/mobx'

// 把这个 class 转化成 微信的 Page 参数，并且注入全局 store
@pagify()
export default class extends BasePage {
  data = {
    motto: 'Hello World',
    canIUseOpenButton: wxp.canIUse('button.open-type.getUserInfo')
  }

  onClickAvatarImage() {
    // 跳转到 logs 页面
    wxp.navigateTo({
      url: '../logs/logs'
    })
  }

  onClickOpenButton(e) {
    // 轻松修改全局存储
    this.store.userInfo = e.detail.userInfo
  }

  async onLoad(options) {
    // 轻松调用全局存储
    console.log('current page store: %o', this.store)
    if (!this.store.userInfo && !this.data.canIUseOpenButton) {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      let {userInfo} = await wxp.getUserInfo()
      this.store.userInfo = userInfo
    }
  }
}
