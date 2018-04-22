<!-- https://developers.weixin.qq.com/miniprogram/dev/api/custommsg/receive.html -->

接收消息和事件
-------

在页面中使用 [`<button open-type="contact" />`](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) 可以显示进入客服会话按钮。

当用户在客服会话发送消息（或进行某些特定的用户操作引发的事件推送时），微信服务器会将消息（或事件）的数据包（JSON或者XML格式）POST请求开发者填写的URL。开发者收到请求后可以使用[发送客服消息](https://developers.weixin.qq.com/miniprogram/dev/api/custommsg/conversation.html#发送客服消息)接口进行异步回复。

微信服务器在将用户的消息发给小程序的开发者服务器地址（开发设置处配置）后，微信服务器在五秒内收不到响应会断掉连接，并且重新发起请求，总共重试三次，如果在调试中，发现用户无法收到响应的消息，可以检查是否消息处理超时。关于重试的消息排重，有msgid的消息推荐使用msgid排重。事件类型消息推荐使用FromUserName + CreateTime 排重。

服务器收到请求必须做出下述回复，这样微信服务器才不会对此作任何处理，并且不会发起重试，否则，将出现严重的错误提示。详见下面说明：

    1、直接回复success（推荐方式）
    2、直接回复空串（指字节长度为0的空字符串，而不是结构体中content字段的内容为空）
    

一旦遇到以下情况，微信都会在小程序会话中，向用户下发系统提示“该小程序客服暂时无法提供服务，请稍后再试”：

    1、开发者在5秒内未回复任何内容
    2、开发者回复了异常数据
    

如果开发者希望增强安全性，可以在开发者中心处开启消息加密，这样，用户发给小程序的消息以及小程序被动回复用户消息都会继续加密，详见[消息加解密说明](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419318479&token=&lang=zh_CN)。

各消息类型的推送JSON、XML数据包结构如下。

### 文本消息

用户在客服会话中发送文本消息时将产生如下数据包：

#### XML 格式

    <xml>
       <ToUserName><![CDATA[toUser]]></ToUserName>
       <FromUserName><![CDATA[fromUser]]></FromUserName>
       <CreateTime>1482048670</CreateTime>
       <MsgType><![CDATA[text]]></MsgType>
       <Content><![CDATA[this is a test]]></Content>
       <MsgId>1234567890123456</MsgId>
    </xml>
    

#### JSON 格式

    {
        "ToUserName": "toUser",
        "FromUserName": "fromUser",
        "CreateTime": 1482048670,
        "MsgType": "text",
        "Content": "this is a test",
        "MsgId": 1234567890123456
    }
    

#### 参数说明

  参数           |  说明         
-----------------|---------------
  ToUserName     | 小程序的原始ID
  FromUserName   | 发送者的openid
  CreateTime     |消息创建时间(整型）
  MsgType        |  text         
  Content        |  文本消息内容 
  MsgId          |消息id，64位整型

### 图片消息

用户在客服会话中发送图片消息时将产生如下数据包：

#### XML 格式

    <xml>
          <ToUserName><![CDATA[toUser]]></ToUserName>
          <FromUserName><![CDATA[fromUser]]></FromUserName>
          <CreateTime>1482048670</CreateTime>
          <MsgType><![CDATA[image]]></MsgType>
          <PicUrl><![CDATA[this is a url]]></PicUrl>
          <MediaId><![CDATA[media_id]]></MediaId>
          <MsgId>1234567890123456</MsgId>
    </xml>
    

#### JSON 格式

    {
        "ToUserName": "toUser",
        "FromUserName": "fromUser",
        "CreateTime": 1482048670,
        "MsgType": "image",
        "PicUrl": "this is a url",
        "MediaId": "media_id",
        "MsgId": 1234567890123456
    }
    

#### 参数说明

  参数           |  说明                                                                                                                
-----------------|----------------------------------------------------------------------------------------------------------------------
  ToUserName     |  小程序的原始ID                                                                                                      
  FromUserName   |  发送者的openid                                                                                                      
  CreateTime     |  消息创建时间(整型）                                                                                                 
  MsgType        |  image                                                                                                               
  PicUrl         |  图片链接（由系统生成）                                                                                              
  MediaId        |图片消息媒体id，可以调用[获取临时素材](https://developers.weixin.qq.com/miniprogram/dev/api/custommsg/material.html#获取临时素材)接口拉取数据。
  MsgId          |  消息id，64位整型                                                                                                    

### 小程序卡片消息

用户在客服会话中发送小程序卡片消息时将产生如下数据包：

#### XML 格式

    <xml>
        <ToUserName><![CDATA[toUser]]></ToUserName>
        <FromUserName><![CDATA[fromUser]]></FromUserName>
        <CreateTime>1482048670</CreateTime>
        <MsgType><![CDATA[miniprogrampage]]></MsgType>
        <MsgId>1234567890123456</MsgId>
        <Title><![CDATA[Title]]></Title>
        <AppId><![CDATA[AppId]]></AppId>
        <PagePath><![CDATA[PagePath]]></PagePath>
        <ThumbUrl><![CDATA[ThumbUrl]]></ThumbUrl>
        <ThumbMediaId><![CDATA[ThumbMediaId]]></ThumbMediaId>
    </xml>
    

#### JSON 格式

    {
        "ToUserName": "toUser",
        "FromUserName": "fromUser",
        "CreateTime": 1482048670,
        "MsgType": "miniprogrampage",
        "MsgId": 1234567890123456,
        "Title":"title",
        "AppId":"appid",
        "PagePath":"path",
        "ThumbUrl":"",
        "ThumbMediaId":""
    }
    

#### 参数说明

  参数           |  说明              
-----------------|--------------------
  ToUserName     |  小程序的原始ID    
  FromUserName   |  发送者的openid    
  CreateTime     | 消息创建时间(整型）
  MsgType        |  miniprogrampage   
  MsgId          |  消息id，64位整型  
  Title          |  标题              
  AppId          |  小程序appid       
  PagePath       |  小程序页面路径    
  ThumbUrl       |封面图片的临时cdn链接
  ThumbMediaId   |封面图片的临时素材id

### 进入会话事件

用户在小程序“客服会话按钮”进入客服会话时将产生如下数据包：

#### XML 格式

    <xml>
        <ToUserName><![CDATA[toUser]]></ToUserName>  
        <FromUserName><![CDATA[fromUser]]></FromUserName>  
        <CreateTime>1482048670</CreateTime>  
        <MsgType><![CDATA[event]]></MsgType>  
        <Event><![CDATA[user_enter_tempsession]]></Event>  
        <SessionFrom><![CDATA[sessionFrom]]></SessionFrom> 
    </xml>
    

#### JSON 格式

    {
        "ToUserName": "toUser",
        "FromUserName": "fromUser",
        "CreateTime": 1482048670,
        "MsgType": "event",
        "Event": "user_enter_tempsession",
        "SessionFrom": "sessionFrom"
    }
    

#### 参数说明

  参数           |  说明                                                                                                    
-----------------|----------------------------------------------------------------------------------------------------------
  ToUserName     |  小程序的原始ID                                                                                          
  FromUserName   |  发送者的openid                                                                                          
  CreateTime     |  事件创建时间(整型）                                                                                     
  MsgType        |  event                                                                                                   
  Event          |  事件类型，user_enter_tempsession                                                                        
  SessionFrom    |开发者在[客服会话按钮](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)设置的session-from属性
