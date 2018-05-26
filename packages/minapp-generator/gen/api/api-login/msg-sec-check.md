<!-- https://developers.weixin.qq.com/miniprogram/dev/api/msgSecCheck.html -->

### msgSecCheck

检查一段文本是否含有违法违规内容。应用场景举例：用户个人资料违规文字检测；媒体新闻类用户发表文章，评论内容检测；游戏类用户编辑上传的素材(如答题类小游戏用户上传的问题及答案)检测等。**频率限制：单个 appId 调用上限为 2000 次/分钟，1,000,000 次/天**

#### 请求地址

    GET https://api.weixin.qq.com/wxa/msg_sec_check?access_token=ACCESS_TOKEN
    

#### 参数

  参数           |  类型     | 默认值 | 是否必填|  说明                   
-----------------|-----------|--------|---------|-------------------------
  access_token   |  string   |        |  是     |  接口调用凭证           
  content        |  string   |        |  是     |要检测的文本内容，长度不超过 500KB

#### 返回值

  参数      |  类型     |  说明   
------------|-----------|---------
  errcode   |  number   |  错误码 
  errMsg    |  string   | 错误信息

**errcode 的合法值**

  值      |  说明         
----------|---------------
  0       |  内容正常     
  87014   |内容含有违法违规内容

**errMsg 的合法值**

  值       |  说明                  
-----------|------------------------
  "ok"     |  内容正常              
  "risky   |content" 内容含有违法违规内容

#### 调用示例

     curl -d '{ "content":"hello world!" }'
     'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=ACCESS_TOKEN'
