<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-record.html -->

### wx.startRecord(OBJECT)

**注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的 [wx.getRecorderManager](https://mp.weixin.qq.com/debug/wxadoc/dev/api/getRecorderManager.html) 接口**

开始录音。当主动调用`wx.stopRecord`，或者录音超过1分钟时自动结束录音，返回录音文件的临时文件路径。当用户离开小程序时，此接口无法调用。

需要[用户授权](https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html) scope.record

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                                                      
-------------|-------------|-------|------------------------------------------------------------
  success    |  Function   |  否   |录音成功后调用，返回录音文件的临时文件路径，res = {tempFilePath: '录音文件的临时路径'}
  fail       |  Function   |  否   |  接口调用失败的回调函数                                    
  complete   |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）          

**注：文件的临时路径，在小程序本次启动期间可以正常使用，如需持久保存，需在主动调用[wx.saveFile](https://mp.weixin.qq.com/debug/wxadoc/dev/api/file.html)，在小程序下次启动时才能访问得到。**

**success返回参数说明：**

  参数           |  说明        
-----------------|--------------
  tempFilePath   |录音文件的临时路径

### wx.stopRecord()

​主动调用停止录音。

**示例代码：**

    wx.startRecord({
      success: function(res) {
        var tempFilePath = res.tempFilePath 
      },
      fail: function(res) {
         //录音失败
      }
    })
    setTimeout(function() {
      //结束录音  
      wx.stopRecord()
    }, 10000)
