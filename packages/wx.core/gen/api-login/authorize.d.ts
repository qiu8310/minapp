// https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize.html

export namespace wx {
  type IWxAuthorizeObject = {
    /**
     * 需要获取权限的scope，详见 [scope 列表](https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html#scope-列表)
     */
    scope: string

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
   * @since 1.2.0
   *
   * 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
   *     wx.getSetting({
   *         success(res) {
   *             if (!res.authSetting['scope.record']) {
   *                 wx.authorize({
   *                     scope: 'scope.record',
   *                     success() {
   *                         // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
   *                         wx.startRecord()
   *                     }
   *                 })
   *             }
   *         }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize.html#wxauthorizeobject
   */
  function authorize(OBJECT: IWxAuthorizeObject): void
}
