<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/material.html -->

临时素材接口
------

### 获取临时素材

小程序可以使用本接口获取客服消息内的临时素材（即下载临时的多媒体文件）。目前小程序仅支持下载图片文件。

#### 接口调用请求说明

HTTP 请求方式: GET，HTTPS 调用

    https://api.weixin.qq.com/cgi-bin/media/get?access_token=ACCESS_TOKEN&media_id=MEDIA_ID
    

请求示例（示例为通过curl命令获取多媒体文件）

    curl -I -G "https://api.weixin.qq.com/cgi-bin/media/get?access_token=ACCESS_TOKEN&media_id=MEDIA_ID"
    

#### 参数说明

  参数           | 是否必须|  说明     
-----------------|---------|-----------
  access_token   |  是     |调用接口凭证
  media_id       |  是     | 媒体文件ID

#### 返回说明

正确情况下的返回 HTTP 头如下：

    HTTP/1.1 200 OK
    Connection: close
    Content-Type: image/jpeg 
    Content-disposition: attachment; filename="MEDIA_ID.jpg"
    Date: Sun, 06 Jan 2013 10:20:18 GMT
    Cache-Control: no-cache, must-revalidate
    Content-Length: 339721
    curl -G "https://api.weixin.qq.com/cgi-bin/media/get?access_token=ACCESS_TOKEN&media_id=MEDIA_ID"
    

如果返回的是视频消息素材，则内容如下：

    {
     "video_url":DOWN_URL
    }
    

错误情况下的返回JSON数据包示例如下（示例为无效媒体ID错误）：

    {
      "errcode":40007,
      "errmsg":"invalid media_id"
    }
    

### 新增临时素材

小程序可以使用本接口把媒体文件（目前仅支持图片）上传到微信服务器，用户发送客服消息或被动回复用户消息。

#### 接口调用请求说明

HTTP 请求方式：POST/FORM，HTTPS 调用

    https://api.weixin.qq.com/cgi-bin/media/upload?access_token=ACCESS_TOKEN&type=TYPE
    

调用示例（使用curl命令，用FORM表单方式上传一个多媒体文件）：

    curl -F media=@test.jpg "https://api.weixin.qq.com/cgi-bin/media/upload?access_token=ACCESS_TOKEN&type=TYPE"
    

#### 参数说明

  参数           | 是否必须|  说明                                                    
-----------------|---------|----------------------------------------------------------
  access_token   |  是     |  调用接口凭证                                            
  type           |  是     |  image                                                   
  media          |  是     |form-data中媒体文件标识，有filename、filelength、content-type等信息

#### 返回说明

正确情况下的返回 JSON 数据包结果如下：

    {
      "type":"TYPE",
      "media_id":"MEDIA_ID",
      "created_at":123456789
    }
    

  参数         |  描述           
---------------|-----------------
  type         |  image          
  media_id     |媒体文件上传后，获取标识
  created_at   |媒体文件上传时间戳

错误情况下的返回JSON数据包示例如下（示例为无效媒体类型错误）：

    {
      "errcode":40004,
      "errmsg":"invalid media type"
    }
