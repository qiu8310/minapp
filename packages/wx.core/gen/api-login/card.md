<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/card.html -->

### wx.addCard(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

批量添加卡券。

**Object参数说明：**

  参数                 |  类型          |  必填 |  说明                                                                                           
-----------------------|----------------|-------|-------------------------------------------------------------------------------------------------
  cardList             |  ObjectArray   |  是   |需要添加的卡券列表，列表内对象说明请参见[请求对象说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/card.html#请求对象说明)
  success              |  Function      |  否   |  接口调用成功的回调函数                                                                         
  fail                 |  Function      |  否   |  接口调用失败的回调函数                                                                         
  complete             |  Function      |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）                                               
  cardList[].cardId    |  String        |  是   |  卡券 Id                                                                                        
  cardList[].cardExt   |  String        |  是   |  卡券的扩展参数                                                                                 

**cardExt 说明**

  参数                   |  类型     |  必填 |是否参与签名|  说明                                                                                                                       
-------------------------|-----------|-------|-----------|-----------------------------------------------------------------------------------------------------------------------------
  code                   |  String   |  否   |  是       |用户领取的 code，仅自定义 code 模式的卡券须填写，非自定义 code 模式卡券不可填写，[详情](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025056)
  openid                 |  String   |  否   |  是       |  指定领取者的openid，只有该用户能领取。 bind_openid 字段为 true 的卡券必须填写，bind_openid 字段为 false 不可填写。         
  timestamp              |  Number   |  是   |  是       |  时间戳，东八区时间,UTC+8，单位为秒                                                                                         
  nonce_str              |  String   |  否   |  是       |随机字符串，由开发者设置传入，加强安全性（若不填写可能被重放请求）。随机字符串，不长于 32 位。推荐使用大小写字母和数字，不同添加请求的 nonce_str 须动态生成，若重复将会导致领取失败。
  fixed_begintimestamp   |  Number   |  否   |  否       |卡券在第三方系统的实际领取时间，为东八区时间戳（UTC+8,精确到秒）。当卡券的有效期类为 DATE_TYPE_FIX_TERM 时专用，标识卡券的实际生效时间，用于解决商户系统内起始时间和领取微信卡券时间不同步的问题。
  outer_str              |  String   |  否   |  否       |  领取渠道参数，用于标识本次领取的渠道值。                                                                                   
  signature              |  String   |  是   |  -        |签名，商户将接口列表中的参数按照指定方式进行签名,签名方式使用 SHA1，具体签名方案参见：[卡券签名](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)

**注：cardExt 需进行 JSON 序列化为字符串传入**

**回调结果：**

  回调类型  |  errMsg                          |  说明                                    
------------|----------------------------------|------------------------------------------
  success   |  addCard:ok                      |  添加卡券成功                            
  fail      |  addCard:fail cancel             |  用户取消添加卡券                        
  fail      |  addCard:fail (detail message)   |添加卡券失败，其中 detail message 为后台返回的详细失败原因

**success返回参数：**

  参数                   |  类型          |  说明                                                                                                                
-------------------------|----------------|----------------------------------------------------------------------------------------------------------------------
  cardList               |  ObjectArray   |卡券添加结果列表，列表内对象说明请详见[返回对象说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/card.html#返回对象说明)
  cardList[].code        |  String        |加密 code，为用户领取到卡券的code加密后的字符串，解密请参照：[code 解码接口](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025239)
  cardList[].cardId      |  String        |  用户领取到卡券的Id                                                                                                  
  cardList[].cardExt     |  String        |  用户领取到卡券的扩展参数，与调用时传入的参数相同                                                                    
  cardList[].isSuccess   |  Boolean       |  是否成功                                                                                                            

**示例代码：**

    wx.addCard({
      cardList: [
        {
          cardId: '',
          cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
        }, {
          cardId: '',
          cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
        }
      ],
      success: function(res) {
        console.log(res.cardList) // 卡券添加结果
      }
    })
    

### wx.openCard(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

查看微信卡包中的卡券。

**Object参数说明：**

  参数                |  类型          |  必填 |  说明                                                                                                                    
----------------------|----------------|-------|--------------------------------------------------------------------------------------------------------------------------
  cardList            |  ObjectArray   |  是   |需要打开的卡券列表，列表内参数详见[openCard 请求对象说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/card.html#opencard-请求对象说明)
  success             |  Function      |  否   |  接口调用成功的回调函数                                                                                                  
  fail                |  Function      |  否   |  接口调用失败的回调函数                                                                                                  
  complete            |  Function      |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）                                                                        
  cardList[].cardId   |  String        |  是   |  需要打开的卡券 Id                                                                                                       
  cardList[].code     |  String        |  是   |由 addCard 的返回对象中的加密 code 通过解密后得到，解密请参照：[code 解码接口](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025239)

**示例代码：**

    wx.openCard({
      cardList: [
        {
          cardId: '',
          code: ''
        }, {
          cardId: '',
          code: ''
        }
      ],
      success: function(res) {
      }
    })
    

#### Tip

1.  `tip`: 目前只有认证小程序才能使用卡券接口，可参考[指引](https://mp.weixin.qq.com/debug/wxadoc/product/renzheng.html?t=201822)进行认证。
2.  `tip`: 了解更多信息，请查看[微信卡券接口文档](https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1490190158&version=1&lang=zh_CN&platform=2)

### 会员卡组件

开发者可以在小程序内调用该接口拉起会员开卡组件，方便用户快速填写会员注册信息并领卡。 该接口拉起开卡组件无须提前将开卡组件和发起小程序绑定至同一个公众号，开发者直接调用即可。

调用前开发者须完成以下步骤：

1.  创建一张微信会员卡并设置为一键激活模式；
2.  设置开卡字段；
3.  获取开卡组件参数；

详情查看会员开卡组件介绍：[会员开卡组件](https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1479824356&version=1&lang=zh_CN&platform=2)

**参数说明**

  参数名            |  类型       | 是否必填|  参数说明                          
--------------------|-------------|---------|------------------------------------
  appId             |  String     |  是     |填写 wxeb490c6f9b154ef9，固定为此appid
  extraData         |  Object     |  是     |开卡组件参数，由第3步获取，包含以下三个参数
  encrypt_card_id   |  String     |  是     |  加密 card_id，传入前须 urldecode  
  outer_str         |  String     |  是     |会员卡领取渠道值，会在卡券领取事件回传给商户
  biz               |  String     |  是     |商户公众号标识参数，传入前须 urldecode
  success           |  Function   |  否     |  接口调用成功的回调函数            
  fail              |  Function   |  否     |  接口调用失败的回调函数            
  complete          |  Function   |  否     |接口调用结束的回调函数（调用成功、失败都会执行）

**返回参数**

  参数名   |  类型     | 参数说明
-----------|-----------|---------
  errMsg   |  String   | 调用结果

**示例代码**

    wx.navigateToMiniProgram({
      appId: 'wxeb490c6f9b154ef9', //固定为此 appid，不可改动
      extraData: data, // 包括 encrypt_card_id, outer_str, biz三个字段，须从 step3 中获得的链接中获取参数
      success: function() {
      },
      fail: function() {
      },
      complete: function() {
      }
    })
    

**返回说明**

在 App.onShow 里判断从会员开卡小程序返回的数据data

1.  判断 data.referrerInfo.appId 是否为开卡小程序 appId `wxeb490c6f9b154ef9`，如果不是则中止判断
2.  判断是否有 data.referrerInfo.extraData 是否有数据，如果没有，表示用户未激活直接左滑/点返回键返回，或者用户已经激活
3.  若用户激活成功，可以从 data.referrerInfo.extraData 中获取 activate\_ticket card\_id code 参数用于下一步操作

#### Tip

1.  在开发者工具上调用此 API 并不会真实的跳转到另外的小程序，但是开发者工具会校验本次调用跳转是否成功详情
2.  开发者工具上支持被跳转的小程序处理接收参数的调试详情
3.  开卡组件是使用wx.navigateToMiniProgram开发的官方组件，跳转时无须绑定同一个公众号，直接调用即可
