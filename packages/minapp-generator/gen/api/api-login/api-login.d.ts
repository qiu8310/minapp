// https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html

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
   * 调用接口获取**登录凭证（code）**进而换取用户登录态信息，包括用户的**唯一标识（openid）** 及本次登录的 **会话密钥（session_key）**等。**用户数据的加解密通讯**需要依赖会话密钥完成。
   *
   * **注：调用 `login` 会引起登录态的刷新，之前的 sessionKey 可能会失效。**
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
   *               console.log('获取用户登录态失败！' + res.errMsg)
   *             }
   *           }
   *         });
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxloginobject
   */
  function login(OBJECT: login.Param): void

  namespace checkSession {
    type Param = {
      /**
       * 接口调用成功的回调函数，登录态未过期
       */
      success?: ParamPropSuccess
      /**
       * 接口调用失败的回调函数，登录态已过期
       */
      fail?: ParamPropFail
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数，登录态未过期
     */
    type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数，登录态已过期
     */
    type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ParamPropComplete = () => any
  }
  /**
   * 通过上述接口获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。开发者只需要调用wx.checkSession接口**检测当前用户登录态是否有效**。登录态过期后开发者可以再调用wx.login获取新的用户登录态。
   *
   * **登录态维护：**
   *
   * 通过 `wx.login` 获取到用户登录态之后，需要维护登录态。
   *
   * 开发者要注意**不应该直接把 session_key、openid 等字段作为用户的标识或者 session 的标识**，而应该自己派发一个 session 登录态（请参考登录时序图）。对于开发者自己生成的 session，应该保证其安全性且不应该设置较长的过期时间。session 派发到小程序客户端之后，可将其存储在 storage ，用于后续通信使用。
   *
   * 通过 `wx.checkSession` 可以检测用户登录态是否失效。并决定是否调用 `wx.login` 重新获取登录态
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.checkSession({
   *       success: function(){
   *         //session 未过期，并且在本生命周期一直有效
   *       },
   *       fail: function(){
   *         //登录态过期
   *         wx.login() //重新登录
   *         ....
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxchecksessionobject
   */
  function checkSession(OBJECT: checkSession.Param): void

}
