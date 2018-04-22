<!-- https://developers.weixin.qq.com/miniprogram/dev/api/media-video.html -->

### wx.chooseVideo(OBJECT)

拍摄视频或从手机相册中选视频，返回视频的临时文件路径。

**OBJECT参数说明：**

  参数          |  类型          |  必填 |  说明                                                 | 最低版本 
----------------|----------------|-------|-------------------------------------------------------|----------
  sourceType    |  StringArray   |  否   |album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']|          
  compressed    |  Boolead       |  否   |  是否压缩所选的视频源文件，默认值为true，需要压缩     |  1.6.0   
  maxDuration   |  Number        |  否   |  拍摄视频最长拍摄时间，单位秒。最长支持 60 秒         |          
  success       |  Function      |  否   |接口调用成功，返回视频文件的临时文件路径，详见返回参数说明|          
  fail          |  Function      |  否   |  接口调用失败的回调函数                               |          
  complete      |  Function      |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）     |          

**success返回参数说明：**

  参数           |  说明          
-----------------|----------------
  tempFilePath   |选定视频的临时文件路径
  duration       |选定视频的时间长度
  size           |选定视频的数据量大小
  height         |返回选定视频的长
  width          |返回选定视频的宽

**注：文件的临时路径，在小程序本次启动期间可以正常使用，如需持久保存，需在主动调用 [wx.saveFile](https://developers.weixin.qq.com/miniprogram/dev/api/file.html)，在小程序下次启动时才能访问得到。**

**示例代码：**

[代码片段](wechatide://minicode/Qu4htbmu6RYo)

    <view class="container">
        <video src="{{src}}"></video>
        <button bindtap="bindButtonTap">获取视频</button>
    </view>
    

    Page({
        bindButtonTap: function() {
            var that = this
            wx.chooseVideo({
                sourceType: ['album','camera'],
                maxDuration: 60,
          camera: 'back',
                success: function(res) {
                    that.setData({
                        src: res.tempFilePath
                    })
                }
            })
        }
    })
    

### wx.saveVideoToPhotosAlbum(OBJECT)

> 基础库 1.2.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

保存视频到系统相册。需要[用户授权](https://developers.weixin.qq.com/miniprogram/dev/api/authorize-index.html) scope.writePhotosAlbum

**OBJECT参数说明：**

  参数名     |  类型       |  必填 |  说明                         
-------------|-------------|-------|-------------------------------
  filePath   |  String     |  是   |视频文件路径，可以是临时文件路径也可以是永久文件路径
  success    |  Function   |  否   |  接口调用成功的回调函数       
  fail       |  Function   |  否   |  接口调用失败的回调函数       
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数名   |  类型     |  说明   
-----------|-----------|---------
  errMsg   |  String   | 调用结果

**示例代码：**

    wx.saveVideoToPhotosAlbum({
      filePath: 'wxfile://xxx'
      success(res) {
        console.log(res.errMsg)
      }
    })
    

#### Bug & Tip

1.  `tip`: camera 参数在部分 Android 手机下由于系统 ROM 不支持无法生效
