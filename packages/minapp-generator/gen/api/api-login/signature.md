<!-- https://developers.weixin.qq.com/miniprogram/dev/api/signature.html -->

用户数据的签名验证和加解密
-------------

小程序可以通过各种前端接口获取微信提供的开放数据。 考虑到开发者服务器也需要获取这些开放数据，微信会对这些数据做签名和加密处理。 开发者后台拿到开放数据后可以对数据进行校验签名和解密，来保证数据不被篡改。

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/signature.jpg)

签名校验以及数据加解密涉及用户的会话密钥session_key。 开发者应该事先通过 [wx.login](https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html) 登录流程获取会话密钥 session\_key 并保存在服务器。为了数据不被篡改，开发者不应该把session\_key传到小程序客户端等服务器外的环境。

### 数据签名校验

为了确保 [开放接口](https://developers.weixin.qq.com/miniprogram/dev/api/open.html) 返回用户数据的安全性，微信会对明文数据进行签名。开发者可以根据业务需要对数据包进行签名校验，确保数据的完整性。

1.  通过调用接口（如 [wx.getUserInfo](https://developers.weixin.qq.com/miniprogram/dev/api/open.html)）获取数据时，接口会同时返回 rawData、signature，其中 signature = sha1( rawData + session_key )
2.  开发者将 signature、rawData 发送到开发者服务器进行校验。服务器利用用户对应的 session_key 使用相同的算法计算出签名 signature2 ，比对 signature 与 signature2 即可校验数据的完整性。

**如wx.getUserInfo的数据校验：**

接口返回的rawData：

    {
      "nickName": "Band",
      "gender": 1,
      "language": "zh_CN",
      "city": "Guangzhou",
      "province": "Guangdong",
      "country": "CN",
      "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/1vZvI39NWFQ9XM4LtQpFrQJ1xlgZxx3w7bQxKARol6503Iuswjjn6nIGBiaycAjAtpujxyzYsrztuuICqIM5ibXQ/0"
    }
    

用户的 session-key：

    HyVFkGl5F5OQWJZZaNzBBg==
    

用于签名的字符串为：

    {"nickName":"Band","gender":1,"language":"zh_CN","city":"Guangzhou","province":"Guangdong","country":"CN","avatarUrl":"http://wx.qlogo.cn/mmopen/vi_32/1vZvI39NWFQ9XM4LtQpFrQJ1xlgZxx3w7bQxKARol6503Iuswjjn6nIGBiaycAjAtpujxyzYsrztuuICqIM5ibXQ/0"}HyVFkGl5F5OQWJZZaNzBBg==
    

使用sha1得到的结果为

    75e81ceda165f4ffa64f4068af58c64b8f54b88c
    

### 加密数据解密算法

接口如果涉及敏感数据（如[`wx.getUserInfo`](https://developers.weixin.qq.com/miniprogram/dev/api/open.html)当中的 openId 和unionId ），接口的明文内容将不包含这些敏感数据。开发者如需要获取敏感数据，需要对接口返回的**加密数据( encryptedData )**进行对称解密。 解密算法如下：

1.  对称解密使用的算法为 AES-128-CBC，数据采用PKCS#7填充。
2.  对称解密的目标密文为 Base64_Decode(encryptedData)。
3.  对称解密秘钥 aeskey = Base64\_Decode(session\_key), aeskey 是16字节。
4.  对称解密算法初始向量 为Base64_Decode(iv)，其中iv由数据接口返回。

微信官方提供了多种编程语言的示例代码（[点击下载](https://developers.weixin.qq.com/miniprogram/dev/demo/aes-sample.zip)）。每种语言类型的接口名字均一致。调用方式可以参照示例。

另外，为了应用能校验数据的有效性，会在敏感数据加上数据水印( watermark )

**watermark参数说明：**

  参数        |  类型      |  说明                                
--------------|------------|--------------------------------------
  appid       |  String    |敏感数据归属appid，开发者可校验此参数与自身appid是否一致
  timestamp   |  DateInt   |敏感数据获取的时间戳, 开发者可以用于数据时效性校验

如接口[`wx.getUserInfo`](https://developers.weixin.qq.com/miniprogram/dev/api/open.html)敏感数据当中的watermark：

    {
        "openId": "OPENID",
        "nickName": "NICKNAME",
        "gender": GENDER,
        "city": "CITY",
        "province": "PROVINCE",
        "country": "COUNTRY",
        "avatarUrl": "AVATARURL",
        "unionId": "UNIONID",
        "watermark":
        {
            "appid":"APPID",
            "timestamp":TIMESTAMP
        }
    }
    

注：

1.  此前提供的**加密数据（encryptData）**以及对应的加密算法将被弃用，请开发者不要再依赖旧字段。
2.  解密后得到的json数据根据需求可能会增加新的字段，旧字段不会改变和删减，开发者需要预留足够的空间

### 会话密钥session_key有效性

开发者如果遇到因为session\_key不正确而校验签名失败或解密失败，请关注下面几个与session\_key有关的注意事项。

1.  wx.login()调用时，用户的session\_key会被更新而致使旧session\_key失效。开发者应该在明确需要重新登录时才调用wx.login()，及时通过[登录凭证校验](https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html#临时登录凭证校验)接口更新服务器存储的session_key。
    
2.  微信不会把session\_key的有效期告知开发者。我们会根据用户使用小程序的行为对session\_key进行续期。用户越频繁使用小程序，session_key有效期越长。
    
3.  开发者在session\_key失效时，可以通过重新执行登录流程获取有效的session\_key。使用接口wx.checkSession()可以校验session_key是否有效，从而避免小程序反复执行登录流程。
    
4.  当开发者在实现自定义登录态时，可以考虑以session_key有效期作为自身登录态有效期，也可以实现自定义的时效性策略。
    

### wx.checkSession(OBJECT)

校验用户当前session_key是否有效。

**OBJECT参数说明：**

  参数名     |  类型       |  必填 |  说明                         
-------------|-------------|-------|-------------------------------
  success    |  Function   |  否   |接口调用成功的回调函数，session_key未过期
  fail       |  Function   |  否   |接口调用失败的回调函数，session_key已过期
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.checkSession({
      success: function(){
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail: function(){
        // session_key 已经失效，需要重新执行登录流程
        wx.login() //重新登录
        ....
      }
    })
