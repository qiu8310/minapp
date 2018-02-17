<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-pay.html -->

### wx.requestPayment(OBJECT)

发起微信支付。

**Object参数说明：**

  参数        |  类型       |  必填 |  说明                                                                                                  
--------------|-------------|-------|--------------------------------------------------------------------------------------------------------
  timeStamp   |  String     |  是   |  时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间                                                   
  nonceStr    |  String     |  是   |  随机字符串，长度为32个字符以下。                                                                      
  package     |  String     |  是   |  统一下单接口返回的 prepay\_id 参数值，提交格式如：prepay\_id=_*_                                      
  signType    |  String     |  是   |  签名算法，暂支持 MD5                                                                                  
  paySign     |  String     |  是   |签名,具体签名方案参见[小程序支付接口文档](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=3);
  success     |  Function   |  否   |  接口调用成功的回调函数                                                                                
  fail        |  Function   |  否   |  接口调用失败的回调函数                                                                                
  complete    |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）                                                      

了解更多信息，请查看[微信支付接口文档](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1)

**回调结果：**

  回调类型  |  errMsg                                 |  说明                                    
------------|-----------------------------------------|------------------------------------------
  success   |  requestPayment:ok                      |  调用支付成功                            
  fail      |  requestPayment:fail cancel             |  用户取消支付                            
  fail      |  requestPayment:fail (detail message)   |调用支付失败，其中 detail message 为后台返回的详细失败原因

**示例代码：**

    wx.requestPayment({
       'timeStamp': '',
       'nonceStr': '',
       'package': '',
       'signType': 'MD5',
       'paySign': '',
       'success':function(res){
       },
       'fail':function(res){
       }
    })
    

#### Bug & Tip

1.  `bug`: 6.5.2 及之前版本中，用户取消支付不会触发 fail 回调，只会触发 complete 回调，回调 errMsg 为 'requestPayment:cancel'
