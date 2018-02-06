<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html -->

### wx.login(OBJECT)

调用接口获取**登录凭证（code）**进而换取用户登录态信息，包括用户的**唯一标识（openid）** 及本次登录的 **会话密钥（session_key）**等。**用户数据的加解密通讯**需要依赖会话密钥完成。

**注：调用 `login` 会引起登录态的刷新，之前的 sessionKey 可能会失效。**

**OBJECT参数说明：**

  参数名     |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数名   |  类型     |  说明                                                                      
-----------|-----------|----------------------------------------------------------------------------
  errMsg   |  String   |  调用结果                                                                  
  code     |  String   |用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 api，使用 code 换取 openid 和 session_key 等信息

**示例代码：**

    //app.js
    App({
      onLaunch: function() {
        wx.login({
          success: function(res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: 'https://test.com/onLogin',
                data: {
                  code: res.code
                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        });
      }
    })
    

### code 换取 session_key

​这是一个 HTTPS 接口，开发者服务器使用**登录凭证 code** 获取 session_key 和 openid。

session_key 是对用户数据进行[加密签名](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html)的密钥。为了自身应用安全，**session_key 不应该在网络上传输**。

**接口地址：**

    https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
    

**请求参数：**

  参数         |  必填 |  说明                     
---------------|-------|---------------------------
  appid        |  是   |  小程序唯一标识           
  secret       |  是   |  小程序的 app secret      
  js_code      |  是   |  登录时获取的 code        
  grant_type   |  是   | 填写为 authorization_code 

**返回参数：**

  参数          |  说明                                                                                                             
----------------|-------------------------------------------------------------------------------------------------------------------
  openid        |  用户唯一标识                                                                                                     
  session_key   |  会话密钥                                                                                                         
  unionid       |用户在开放平台的唯一标识符。本字段在满足一定条件的情况下才返回。具体参看[UnionID机制说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/uinionID.html)

**返回说明：**

    //正常返回的JSON数据包
    {
          "openid": "OPENID",
          "session_key": "SESSIONKEY",
          "unionid": "UNIONID"
    }
    //错误时返回JSON数据包(示例为Code无效)
    {
        "errcode": 40029,
        "errmsg": "invalid code"
    }
    

### wx.checkSession(OBJECT)

通过上述接口获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。开发者只需要调用wx.checkSession接口**检测当前用户登录态是否有效**。登录态过期后开发者可以再调用wx.login获取新的用户登录态。

**OBJECT参数说明：**

  参数名     |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |接口调用成功的回调函数，登录态未过期
  fail       |  Function   |  否   |接口调用失败的回调函数，登录态已过期
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.checkSession({
      success: function(){
        //session 未过期，并且在本生命周期一直有效
      },
      fail: function(){
        //登录态过期
        wx.login() //重新登录
        ....
      }
    })
    

登录态维护
-----

通过 `wx.login` 获取到用户登录态之后，需要维护登录态。

开发者要注意**不应该直接把 session_key、openid 等字段作为用户的标识或者 session 的标识**，而应该自己派发一个 session 登录态（请参考登录时序图）。对于开发者自己生成的 session，应该保证其安全性且不应该设置较长的过期时间。session 派发到小程序客户端之后，可将其存储在 storage ，用于后续通信使用。

通过 `wx.checkSession` 可以检测用户登录态是否失效。并决定是否调用 `wx.login` 重新获取登录态

### 登录时序图

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/login.png?t=201822)

#### Bug & Tip

1.  `bug`: `iOS/Android` `6.3.30`，在 App.onLaunch 调用 wx.login 会出现异常；
