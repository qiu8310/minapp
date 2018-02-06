<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/trans.html -->

### 转发消息

如果小程序设置了消息推送，普通微信用户向小程序客服发消息时，微信服务器会先将消息 POST 到开发者填写的 url 上，如果希望将消息转发到网页版客服工具，则需要开发者在响应包中返回 MsgType 为 transfer\_customer\_service 的消息，微信服务器收到响应后会把当次发送的消息转发至客服系统。

用户被客服接入以后，客服关闭会话以前，处于会话过程中时，用户发送的消息均会被直接转发至客服系统。当会话超过 30 分钟客服没有关闭时，微信服务器会自动停止转发至客服，而将消息恢复发送至开发者填写的 url 上。

用户在等待队列中时，用户发送的消息仍然会被推送至开发者填写的 url 上。

这里特别要注意，只针对微信用户发来的消息才进行转发，而对于其他事件（比如用户从小程序唤起客服会话）都不应该转接，否则客服在客服系统上就会看到一些无意义的消息了。

**消息转发到网页版客服工具**

开发者只在响应包中返回 MsgType 为 transfer\_customer\_service 的消息，微信服务器收到响应后就会把当次发送的消息转发至客服系统。

     <xml>
         <ToUserName><![CDATA[touser]]></ToUserName>
         <FromUserName><![CDATA[fromuser]]></FromUserName>
         <CreateTime>1399197672</CreateTime>
         <MsgType><![CDATA[transfer_customer_service]]></MsgType>
     </xml>
    

参数说明

  参数           | 是否必须|  描述                        
-----------------|---------|------------------------------
  ToUserName     |  是     |  接收方帐号（收到的OpenID）  
  FromUserName   |  是     |  开发者微信号                
  CreateTime     |  是     |  消息创建时间 （整型）       
  MsgType        |  是     |  transfer_customer_service   
