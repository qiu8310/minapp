// https://developers.weixin.qq.com/miniprogram/dev/api/onUserCaptureScreen.html

export namespace wx {
  /**
   * @since 1.4.0
   *
   * 监听用户主动截屏事件，用户使用系统截屏按键截屏时触发此事件
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.onUserCaptureScreen(function(res) {
   *         console.log('用户截屏了')
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/onUserCaptureScreen.html#wxonusercapturescreencallback
   */
  function onUserCaptureScreen(CALLBACK: any): void

}
