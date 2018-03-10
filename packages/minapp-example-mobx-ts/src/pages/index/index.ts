/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {pagify, wxp, MyPage} from 'base/'

// 把这个 class 转化成 微信的 Page 参数，并且注入全局 store
@pagify()
export default class extends MyPage {
  data = {
    count: 10,
    npmToast: false,
    demoToast: false,

    motto: '',
    canIUseOpenButton: wxp.canIUse('button.open-type.getUserInfo')
  }

  onShow() {
    this.setDataSmart({motto: 'See you again'})
  }

  onClickAvatarImage() {
    // 跳转到 logs 页面
    this.app.$url.logs.go({id: 1})
    this.setDataSmart({motto: '开始跳转到 logs 页面'})
  }

  onClickOpenButton(e: any) {
    // 轻松修改全局数据
    this.store.userInfo = e.detail.userInfo

    // 组件内数据还是用 setData
    this.setDataSmart({motto: '点击了『获取头像昵称』按钮'})
  }

  showToast() {
    console.log('showToast')
    this.setDataSmart({npmToast: true})
  }
  hideToast() {
    console.log('hideToast')
    this.setDataSmart({npmToast: false})
  }

  toggleDemoToast() {
    this.setDataSmart({demoToast: !this.data.demoToast})
  }

  increase() {
    this.setDataSmart({count: this.data.count + 1})
  }

  async onLoad(options: any) {
    // 使用 require 加载图片
    console.log('可以使用 require 的方法加载图片: %o', require('images/heart@3x.png'))
    // 轻松读取全局数据
    console.log('当前 Store: %o', this.store)
    if (!this.store.userInfo && !this.data.canIUseOpenButton) {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      let {userInfo} = await wxp.getUserInfo()
      this.store.userInfo = userInfo
    }
  }
}
