<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html -->

用户数据的签名验证和加解密
-------------

### 数据签名校验

为了确保 [开放接口](https://mp.weixin.qq.com/debug/wxadoc/dev/api/open.html) 返回用户数据的安全性，微信会对明文数据进行签名。开发者可以根据业务需要对数据包进行签名校验，确保数据的完整性。

1.  签名校验算法涉及用户的session_key，通过 [wx.login](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxloginobject) 登录流程获取用户session_key，并自行维护与应用自身登录态的对应关系。
2.  通过调用接口（如 [wx.getUserInfo](https://mp.weixin.qq.com/debug/wxadoc/dev/api/open.html)）获取数据时，接口会同时返回 rawData、signature，其中 signature = sha1( rawData + session_key )
3.  开发者将 signature、rawData 发送到开发者服务器进行校验。服务器利用用户对应的 session_key 使用相同的算法计算出签名 signature2 ，比对 signature 与 signature2 即可校验数据的完整性。

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
    

所以，用于签名的字符串为：

    {"nickName":"Band","gender":1,"language":"zh_CN","city":"Guangzhou","province":"Guangdong","country":"CN","avatarUrl":"http://wx.qlogo.cn/mmopen/vi_32/1vZvI39NWFQ9XM4LtQpFrQJ1xlgZxx3w7bQxKARol6503Iuswjjn6nIGBiaycAjAtpujxyzYsrztuuICqIM5ibXQ/0"}HyVFkGl5F5OQWJZZaNzBBg==
    

使用sha1得到的结果为

    75e81ceda165f4ffa64f4068af58c64b8f54b88c
    

### 加密数据解密算法

接口如果涉及敏感数据（如[`wx.getUserInfo`](https://mp.weixin.qq.com/debug/wxadoc/dev/api/open.html)当中的 openId 和unionId ），接口的明文内容将不包含这些敏感数据。开发者如需要获取敏感数据，需要对接口返回的**加密数据( encryptedData )**进行对称解密。 解密算法如下：

1.  对称解密使用的算法为 AES-128-CBC，数据采用PKCS#7填充。
2.  对称解密的目标密文为 Base64_Decode(encryptedData)。
3.  对称解密秘钥 aeskey = Base64\_Decode(session\_key), aeskey 是16字节。
4.  对称解密算法初始向量 为Base64_Decode(iv)，其中iv由数据接口返回。

微信官方提供了多种编程语言的示例代码（[点击下载](https://mp.weixin.qq.com/debug/wxadoc/dev/demo/aes-sample.zip)）。每种语言类型的接口名字均一致。调用方式可以参照示例。

另外，为了应用能校验数据的有效性，会在敏感数据加上数据水印( watermark )

**watermark参数说明：**

  参数        |  类型      |  说明                                
--------------|------------|--------------------------------------
  watermark   |  OBJECT    |  数据水印                            
  appid       |  String    |敏感数据归属appid，开发者可校验此参数与自身appid是否一致
  timestamp   |  DateInt   |敏感数据获取的时间戳, 开发者可以用于数据时效性校验

如接口[`wx.getUserInfo`](https://mp.weixin.qq.com/debug/wxadoc/dev/api/open.html)敏感数据当中的watermark：

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

1.  此前提供的**加密数据（encryptData）**以及对应的加密算法将被弃用，请开发者不要再依赖旧逻辑。
2.  解密后得到的json数据根据需求可能会增加新的字段，旧字段不会改变和删减，开发者需要预留足够的空间
