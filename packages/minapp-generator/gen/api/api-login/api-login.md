<!-- https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html -->

小程序登录
-----

小程序可以通过微信官方提供的登录能力方便地获取微信提供的用户身份标识，快速建立小程序内的用户体系。

### 登录流程时序

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/api-login.jpg)

#### 说明：

1.  小程序调用wx.login() 获取 **临时登录凭证code** ，并回传到开发者服务器。
    
2.  开发者服务器以code换取 **用户唯一标识openid** 和 **会话密钥session_key**。
    

之后开发者服务器可以根据用户标识来生成自定义登录态，用于后续业务逻辑中前后端交互时识别用户身份。

### wx.login(OBJECT)

调用接口wx.login() 获取**临时登录凭证（code）**

**OBJECT参数说明：**

  参数名     |  类型       |  必填 |  说明                       |  最低版本 
-------------|-------------|-------|-----------------------------|-----------
  timeout    |  Number     |  否   |  超时时间，单位 ms          |  1.9.90   
  success    |  Function   |  否   |  接口调用成功的回调函数     |           
  fail       |  Function   |  否   |  接口调用失败的回调函数     |           
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）|           

**success返回参数：**

  参数名   |  类型     |  说明                                                                      
-----------|-----------|----------------------------------------------------------------------------
  errMsg   |  String   |  调用结果                                                                  
  code     |  String   |用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 api，使用 code 换取 openid 和 session_key 等信息

#### 示例代码

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
              console.log('登录失败！' + res.errMsg)
            }
          }
        });
      }
    })
    

### 登录凭证校验

临时登录凭证校验接口是一个 HTTPS 接口，开发者服务器使用 **临时登录凭证code** 获取 session_key 和 openid 等。

**注意：**

1.  会话密钥session_key 是对用户数据进行[加密签名](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#用户数据的签名验证和加解密)的密钥。为了应用自身的数据安全，开发者服务器**不应该把会话密钥下发到小程序，也不应该对外提供这个密钥**。
    
2.  UnionID 只在满足一定条件的情况下返回。具体参看[UnionID机制说明](https://developers.weixin.qq.com/miniprogram/dev/api/unionID.html)
    
3.  临时登录凭证code只能使用一次
    

**接口地址：**

    https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
    

#### 请求参数

  参数         |  必填 |  说明                     
---------------|-------|---------------------------
  appid        |  是   |  小程序唯一标识           
  secret       |  是   |  小程序的 app secret      
  js_code      |  是   |  登录时获取的 code        
  grant_type   |  是   | 填写为 authorization_code 

#### 在不满足UnionID下发条件的情况下，返回参数

  参数          |  说明     
----------------|-----------
  openid        |用户唯一标识
  session_key   |  会话密钥 

#### 在满足UnionID下发条件的情况下，返回参数

  参数          |  说明            
----------------|------------------
  openid        |  用户唯一标识    
  session_key   |  会话密钥        
  unionid       |用户在开放平台的唯一标识符

#### 返回说明

    //正常返回的JSON数据包
    {
          "openid": "OPENID",
          "session_key": "SESSIONKEY",
    }
    
    //满足UnionID返回条件时，返回的JSON数据包
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
    

#### Bug & Tip

1.  `bug`: `iOS/Android` `6.3.30`，在 App.onLaunch 调用 wx.login 会出现异常；
