import {pagify, wxp, MyPage} from 'base/'

// 把这个 class 转化成 微信的 Page 参数，并且注入全局 store
@pagify()
export default class extends MyPage {
  data = {
    motto: 'Hello World',
    canIUseOpenButton: wxp.canIUse('button.open-type.getUserInfo')
  }

  onClickAvatarImage() {
    // 跳转到 logs 页面
    this.app.page.logs.go()

    this.setData({motto: 'You go to logs page'})
  }

  onClickOpenButton(e: any) {
    // 轻松修改全局数据
    this.store.userInfo = e.detail.userInfo

    // 组件内数据还是用 setData
    this.setData({motto: 'You click button'})
  }

  async onLoad(options: any) {
    // 使用 require 加载图片
    console.log('local image url: %o', require('images/heart-active@3x.png'))
    // 轻松读取全局数据
    console.log('current page store: %o', this.store)
    if (!this.store.userInfo && !this.data.canIUseOpenButton) {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      let {userInfo} = await wxp.getUserInfo()
      this.store.userInfo = userInfo
    }
  }
}
