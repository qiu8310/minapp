<!-- https://developers.weixin.qq.com/miniprogram/dev/api/token.html -->

access\_token 是全局唯一接口调用凭据，开发者调用各接口时都需使用 access\_token，请妥善保存。access\_token 的存储至少要保留512个字符空间。access\_token 的有效期目前为2个小时，需定时刷新，重复获取将导致上次获取的 access_token 失效。

### 获取 access_token

公众平台的 API 调用所需的 access_token 的使用及生成方式说明：

1.  为了保密 appsecrect，第三方需要一个 access\_token 获取和刷新的中控服务器。而其他业务逻辑服务器所使用的 access\_token 均来自于该中控服务器，不应该各自去刷新，否则会造成 access_token 覆盖而影响业务；
2.  目前 access\_token 的有效期通过返回的 expires\_in 来传达，目前是7200秒之内的值。中控服务器需要根据这个有效时间提前去刷新新 access\_token。在刷新过程中，中控服务器对外输出的依然是老 access\_token，此时公众平台后台会保证在刷新短时间内，新老 access_token 都可用，这保证了第三方业务的平滑过渡；
3.  access\_token 的有效时间可能会在未来有调整，所以中控服务器不仅需要内部定时主动刷新，还需要提供被动刷新 access\_token 的接口，这样便于业务服务器在 API 调用获知 access\_token 已超时的情况下，可以触发 access\_token 的刷新流程。

开发者可以使用 AppID 和 AppSecret 调用本接口来获取 access\_token。AppID 和 AppSecret 可登录微信公众平台官网-设置-开发设置中获得（需要已经绑定成为开发者，且帐号没有异常状态）。AppSecret 生成后请自行保存，因为在公众平台每次生成查看都会导致 AppSecret 被重置。注意调用所有微信接口时均需使用 https 协议。如果第三方不使用中控服务器，而是选择各个业务逻辑点各自去刷新 access\_token，那么就可能会产生冲突，导致服务不稳定。

**接口地址：**

    https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
    

**HTTP请求方式:**

    GET
    

**参数说明 :**

  参数         |  必填 |  说明                                   
---------------|-------|-----------------------------------------
  grant_type   |  是   | 获取 access_token 填写 client_credential
  appid        |  是   |  第三方用户唯一凭证                     
  secret       |  是   |  第三方用户唯一凭证密钥，即appsecret    

**返回参数说明：**

正常情况下，微信会返回下述 JSON 数据包给开发者：

    {"access_token": "ACCESS_TOKEN", "expires_in": 7200}
    

  参数           |  说明          
-----------------|----------------
  access_token   |  获取到的凭证  
  expires_in     |凭证有效时间，单位：秒

错误时微信会返回错误码等信息，JSON 数据包示例如下（该示例为 AppID 无效错误）:

    {"errcode": 40013, "errmsg": "invalid appid"}
