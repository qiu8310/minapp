// https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html

export namespace wx {
  namespace login {
    type Param = {
      /**
       * 超时时间，单位 ms
       *
       * @since 1.9.90
       */
      timeout?: number
      /**
       * 接口调用成功的回调函数
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
     * 接口调用成功的回调函数
     */
    type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    type ParamPropSuccessParam = {
      /**
       * 调用结果
       */
      errMsg: string
      /**
       * 用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 api，使用 code 换取 openid 和 session_key 等信息
       */
      code: string
    }
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
   * 调用接口wx.login() 获取**临时登录凭证（code）**
   *
   * **示例代码：**
   *
   *     ```javascript
   *     //app.js
   *     App({
   *       onLaunch: function() {
   *         wx.login({
   *           success: function(res) {
   *             if (res.code) {
   *               //发起网络请求
   *               wx.request({
   *                 url: 'https://test.com/onLogin',
   *                 data: {
   *                   code: res.code
   *                 }
   *               })
   *             } else {
   *               console.log('登录失败！' + res.errMsg)
   *             }
   *           }
   *         });
   *       }
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html#wxloginobject
   */
  function login(OBJECT: login.Param): void

}
