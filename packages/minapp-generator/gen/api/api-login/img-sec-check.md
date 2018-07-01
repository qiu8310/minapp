<!-- https://developers.weixin.qq.com/miniprogram/dev/api/imgSecCheck.html -->

### imgSecCheck

校验一张图片是否含有违法违规内容。应用场景举例：1）图片智能鉴黄：涉及拍照的工具类应用(如美拍，识图类应用)用户拍照上传检测；电商类商品上架图片检测；媒体类用户文章里的图片检测等；2）敏感人脸识别：用户头像；媒体类用户文章里的图片检测；社交类用户上传的图片检测等。**频率限制：单个 appId 调用上限为 1000 次/分钟，100,000 次/天**

#### 请求地址

    POST https://api.weixin.qq.com/wxa/img_sec_check?access_token=ACCESS_TOKEN
    

#### 参数

  参数           |  类型                                                                                 | 默认值 | 是否必填|  说明                                                   
-----------------|---------------------------------------------------------------------------------------|--------|---------|---------------------------------------------------------
  access_token   |  string                                                                               |        |  是     |  接口调用凭证                                           
  media          |  [Form-Data](https://developers.weixin.qq.com/miniprogram/dev/api/imgSecCheck.html)   |        |  是     |要检测的图片文件，格式支持PNG、JPEG、JPG、GIF，图片尺寸不超过 750px * 1334px

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

     curl -F media=@test.jpg
     'https://api.weixin.qq.com/wxa/img_sec_check?access_token=ACCESS_TOKEN'
