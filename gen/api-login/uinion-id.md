<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/uinionID.html -->

#### UnionID机制说明

如果开发者拥有多个移动应用、网站应用、和公众帐号（包括小程序），可通过unionid来区分用户的唯一性，因为只要是同一个微信开放平台帐号下的移动应用、网站应用和公众帐号（包括小程序），用户的unionid是唯一的。换句话说，同一用户，对同一个微信开放平台下的不同应用，unionid是相同的。

**同一个微信开放平台下的相同主体的App、公众号、小程序，如果用户已经关注公众号，或者曾经登录过App或公众号，则用户打开小程序时，开发者可以直接通过[wx.login](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wx.login)获取到该用户UnionID，无须用户再次授权。**

#### 微信开放平台绑定小程序流程

前提：微信开放平台帐号必须已完成开发者资质认证

开发者资质认证流程：

登录微信开放平台(open.weixin.qq.com) – 帐号中心 – 开发者资质认证

![img](https://mp.weixin.qq.com/debug/wxadoc/dev/image/open.png?t=201828)

绑定流程：

登录微信开放平台（open.weixin.qq.com）—管理中心—公众帐号—绑定公众帐号

![img](https://mp.weixin.qq.com/debug/wxadoc/dev/image/union_bind.png?t=201828)
