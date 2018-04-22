// https://developers.weixin.qq.com/miniprogram/dev/api/signature.html

export namespace wx {
  namespace checkSession {
    type Param = {
      /**
       * 接口调用成功的回调函数，session_key未过期
       */
      success?: ParamPropSuccess
      /**
       * 接口调用失败的回调函数，session_key已过期
       */
      fail?: ParamPropFail
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数，session_key未过期
     */
    type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数，session_key已过期
     */
    type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ParamPropComplete = () => any
  }
  /**
   * 校验用户当前session_key是否有效。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.checkSession({
   *       success: function(){
   *         //session_key 未过期，并且在本生命周期一直有效
   *       },
   *       fail: function(){
   *         // session_key 已经失效，需要重新执行登录流程
   *         wx.login() //重新登录
   *         ....
   *       }
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#wxchecksessionobject
   */
  function checkSession(OBJECT: checkSession.Param): void

}
