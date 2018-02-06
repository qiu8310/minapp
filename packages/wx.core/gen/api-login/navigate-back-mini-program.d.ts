// https://mp.weixin.qq.com/debug/wxadoc/dev/api/navigateBackMiniProgram.html

export namespace wx {
  type IWxNavigateBackMiniProgramObject = {
    /**
     * 需要返回给上一个小程序的数据，上一个小程序可在 `App.onShow()` 中获取到这份数据。[详情](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/app-service/app.html)
     */
    extraData?: any

    /**
     * 接口调用成功的回调函数
     */
    success?: (res: {
      /**
       * 调用结果
       */
      errMsg: string
    }) => any

    /**
     * 接口调用失败的回调函数
     */
    fail?: (err: any) => any

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => any
  }
  /**
   * @since 1.3.0
   * > 
   * > iOS 微信客户端 6.5.9 版本开始支持，Android 客户端即将在 6.5.10 版本开始支持，请先使用 iOS 客户端进行调试
   *
   * 返回到上一个小程序，只有在当前小程序是被其他小程序打开时可以调用成功
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.navigateBackMiniProgram({
   *       extraData: {
   *         foo: 'bar'
   *       },
   *       success(res) {
   *         // 返回成功
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/navigateBackMiniProgram.html#wxnavigatebackminiprogramobject
   */
  function navigateBackMiniProgram(OBJECT: IWxNavigateBackMiniProgramObject): void
}
