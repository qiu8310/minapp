<!-- https://developers.weixin.qq.com/miniprogram/dev/api/custommsg/conversation.html -->

### 发送客服消息

当用户和小程序客服产生特定动作的交互时（具体动作列表请见下方说明），微信将会把消息数据推送给开发者，开发者可以在一段时间内（目前修改为48小时）调用客服接口，通过POST一个JSON数据包来发送消息给普通用户。此接口主要用于客服等有人工消息处理环节的功能，方便开发者为用户提供更加优质的服务。

目前允许的动作列表如下，不同动作触发后，允许的客服接口下发消息条数和下发时限不同。下发条数达到上限后，会收到错误返回码，具体请见返回码说明页：

  用户动作         |允许下发条数限制| 下发时限
-------------------|-------------|---------
用户通过客服消息按钮进入会话|  1条        |  1分钟  
  用户发送信息     |  5条        |  48小时 

#### 客服接口-发消息

接口调用请求说明

    http请求方式: POST
    https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=ACCESS_TOKEN
    

各消息类型所需的JSON数据包如下：

##### 发送文本消息

    {
        "touser":"OPENID",
        "msgtype":"text",
        "text":
        {
             "content":"Hello World"
        }
    }
    

发送文本消息时，支持添加可跳转小程序的文字链

    文本内容....<a href="http://www.qq.com" data-miniprogram-appid="appid" data-miniprogram-path="pages/index/index">点击跳小程序</a>
    

说明：

1.  data-miniprogram-appid 项，填写小程序appid，则表示该链接跳转小程序；
2.  data-miniprogram-path项，填写小程序路径，路径与app.json中保持一致，可带参数；
3.  对于不支持data-miniprogram-appid 项的客户端版本，如果有herf项，则仍然保持跳href中的链接；
4.  小程序发带小程序文字链的文本消息，data-miniprogram-appid必须是该小程序的appid。

##### 发送图片消息

    {
        "touser":"OPENID",
        "msgtype":"image",
        "image":
        {
          "media_id":"MEDIA_ID"
        }
    }
    

##### 发送图文链接

每次可以发送一个图文链接

    {
    
        "touser": "OPENID",
        "msgtype": "link",
        "link": {
              "title": "Happy Day",
              "description": "Is Really A Happy Day",
              "url": "URL",
              "thumb_url": "THUMB_URL"
        }
    }
    

##### 发送小程序卡片

    {
        "touser":"OPENID",
        "msgtype":"miniprogrampage",
        "miniprogrampage":{
            "title":"title",
            "pagepath":"pagepath",
            "thumb_media_id":"thumb_media_id"
        }
    }
    

##### 参数说明

  参数             | 是否必须|  说明                                                                                                                                  
-------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------
  access_token     |  是     |  调用接口凭证                                                                                                                          
  touser           |  是     |  普通用户(openid)                                                                                                                      
  msgtype          |  是     |  消息类型，文本为text，图文链接为link                                                                                                  
  content          |  是     |  文本消息内容                                                                                                                          
  media_id         |  是     |  发送的图片的媒体ID，通过[新增素材接口](https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/material.html)上传图片文件获得。       
  title            |  是     |  消息标题                                                                                                                              
  description      |  是     |  图文链接消息                                                                                                                          
  url              |  是     |  图文链接消息被点击后跳转的链接                                                                                                        
  picurl           |  是     |  图文链接消息的图片链接，支持 JPG、PNG 格式，较好的效果为大图 640 X 320，小图 80 X 80                                                  
  pagepath         |  是     |  小程序的页面路径，跟app.json对齐，支持参数，比如pages/index/index?foo=bar                                                             
  thumb_media_id   |  是     |小程序消息卡片的封面， image类型的media_id，通过[新增素材接口](https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/material.html)上传图片文件获得，建议大小为520*416

##### 返回码说明

  参数    |  说明                                                                                           
----------|-------------------------------------------------------------------------------------------------
  -1      |  系统繁忙，此时请开发者稍候再试                                                                 
  0       |  请求成功                                                                                       
  40001   |获取 access_token 时 AppSecret 错误，或者 access_token 无效。请开发者认真比对 AppSecret 的正确性，或查看是否正在为恰当的小程序调用接口
  40002   |  不合法的凭证类型                                                                               
  40003   |  不合法的 OpenID，请开发者确认OpenID否是其他小程序的 OpenID                                     
  45015   |  回复时间超过限制                                                                               
  45047   |  客服接口下行条数超过上限                                                                       
  48001   |  api功能未授权，请确认小程序已获得该接口                                                        
