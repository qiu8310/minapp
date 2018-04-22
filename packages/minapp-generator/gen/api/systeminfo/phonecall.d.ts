// https://developers.weixin.qq.com/miniprogram/dev/api/phonecall.html

export namespace wx {
  namespace makePhoneCall {
    type Param = {
      /**
       * 需要拨打的电话号码
       */
      phoneNumber: string
      /**
       * 接口调用成功的回调
       */
      success?: ParamPropSuccess
      /**
       * 接口调用失败的回调函数
       */
      fail?: ParamPropFail
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调
     */
    type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ParamPropComplete = () => any
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
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/phonecall.html#wxmakephonecallobject
   */
  function makePhoneCall(OBJECT: makePhoneCall.Param): void

}
