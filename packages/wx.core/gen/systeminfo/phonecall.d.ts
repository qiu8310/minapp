// https://mp.weixin.qq.com/debug/wxadoc/dev/api/phonecall.html

export namespace wx {
  type IWxMakePhoneCallObject = {
    /**
     * 需要拨打的电话号码
     */
    phoneNumber: string

    /**
     * 接口调用成功的回调
     */
    success?: (res: any) => any

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
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.makePhoneCall({
   *       phoneNumber: '1340000' //仅为示例，并非真实的电话号码
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/phonecall.html#wxmakephonecallobject
   */
  function makePhoneCall(OBJECT: IWxMakePhoneCallObject): void
}
