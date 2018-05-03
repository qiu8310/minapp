<!-- https://developers.weixin.qq.com/miniprogram/dev/api/unionID.html -->

#### UnionID机制说明

如果开发者拥有多个移动应用、网站应用、和公众帐号（包括小程序），可通过unionid来区分用户的唯一性，因为只要是同一个微信开放平台帐号下的移动应用、网站应用和公众帐号（包括小程序），用户的unionid是唯一的。换句话说，同一用户，对同一个微信开放平台下的不同应用，unionid是相同的。

#### UnionID获取途径

绑定了开发者帐号的小程序，可以通过下面3种途径获取UnionID。

1.  调用接口[wx.getUserInfo](https://developers.weixin.qq.com/miniprogram/dev/api/open.html)，从解密数据中获取UnionID。注意本接口需要用户授权，请开发者妥善处理用户拒绝授权后的情况。
    
2.  如果开发者帐号下存在**同主体的**公众号，并且该用户已经关注了该公众号。开发者可以直接通过[wx.login](https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html)获取到该用户UnionID，无须用户再次授权。
    
3.  如果开发者帐号下存在**同主体的**公众号或移动应用，并且该用户已经授权登录过该公众号或移动应用。开发者也可以直接通过[wx.login](https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html)获取到该用户UnionID，无须用户再次授权。
    

#### 微信开放平台绑定小程序流程

前提：微信开放平台帐号必须已完成开发者资质认证

开发者资质认证流程：

登录微信开放平台(open.weixin.qq.com) – 帐号中心 – 开发者资质认证

![img](https://mp.weixin.qq.com/debug/wxadoc/dev/image/open.png)

绑定流程：

登录微信开放平台（open.weixin.qq.com）—管理中心—公众帐号—绑定公众帐号

![img](https://mp.weixin.qq.com/debug/wxadoc/dev/image/union_bind.png)
