import {pagify, wxp, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    motto: 'Hello World',
    canIUseOpenButton: wxp.canIUse('button.open-type.getUserInfo')
  }

  onClickAvatarImage() {
    wxp.navigateTo({url: this.app.page.logs})
  }

  onClickOpenButton(e: any) {
    console.log('click open button %o', e)
    this.app.store.userInfo = e.detail.userInfo
  }

  async onLoad(options: any) {
    console.log('local image url: %o', require('images/heart-active@3x.png'))
    console.log('current page store: %o', this.app.store)
    if (!this.app.store.userInfo && !this.data.canIUseOpenButton) {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      let {userInfo} = await wxp.getUserInfo()
      this.app.store.userInfo = userInfo
    }
  }
}
