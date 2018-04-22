<!-- https://developers.weixin.qq.com/miniprogram/dev/api/media-background-audio.html -->

### wx.getBackgroundAudioPlayerState(OBJECT)

**注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 [wx.getBackgroundAudioManager](https://developers.weixin.qq.com/miniprogram/dev/api/getBackgroundAudioManager.html) 接口**

获取后台音乐播放状态。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数              |  说明                                  
--------------------|----------------------------------------
  duration          |选定音频的长度（单位：s），只有在当前有音乐播放时返回
  currentPosition   |选定音频的播放位置（单位：s），只有在当前有音乐播放时返回
  status            |播放状态（2：没有音乐在播放，1：播放中，0：暂停中）
  downloadPercent   |音频的下载进度（整数，80 代表 80%），只有在当前有音乐播放时返回
  dataUrl           |歌曲数据链接，只有在当前有音乐播放时返回

**示例代码：**

    wx.getBackgroundAudioPlayerState({
        success: function(res) {
            var status = res.status
            var dataUrl = res.dataUrl
            var currentPosition = res.currentPosition
            var duration = res.duration
            var downloadPercent = res.downloadPercent
        }
    })
    

### wx.playBackgroundAudio(OBJECT)

使用后台播放器播放音乐，对于微信客户端来说，只能同时有一个后台音乐在播放。当用户离开小程序后，音乐将暂停播放；当用户点击“显示在聊天顶部”时，音乐不会暂停播放；当用户在其他小程序占用了音乐播放器，原有小程序内的音乐将停止播放。

**OBJECT参数说明**

  参数          |  类型       |  必填 |  说明                               
----------------|-------------|-------|-------------------------------------
  dataUrl       |  String     |  是   |音乐链接，目前支持的格式有 m4a, aac, mp3, wav
  title         |  String     |  否   |  音乐标题                           
  coverImgUrl   |  String     |  否   |  封面URL                            
  success       |  Function   |  否   |  接口调用成功的回调函数             
  fail          |  Function   |  否   |  接口调用失败的回调函数             
  complete      |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码**

    wx.playBackgroundAudio({
        dataUrl: '',
        title: '',
        coverImgUrl: ''
    })
    

### wx.pauseBackgroundAudio()

暂停播放音乐。

**示例代码**

    wx.pauseBackgroundAudio()
    

### wx.seekBackgroundAudio(OBJECT)

控制音乐播放进度。

**OBJECT参数说明**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  position   |  Number     |  是   |  音乐位置，单位：秒         
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码**

    wx.seekBackgroundAudio({
        position: 30
    })
    

### wx.stopBackgroundAudio()

停止播放音乐。

**示例代码**

    wx.stopBackgroundAudio()
    

### wx.onBackgroundAudioPlay(CALLBACK)

监听音乐播放。

### wx.onBackgroundAudioPause(CALLBACK)

监听音乐暂停。

### wx.onBackgroundAudioStop(CALLBACK)

监听音乐停止。

#### bug & tip

1.  `bug`: `iOS` `6.3.30` wx.seekBackgroundAudio 会有短暂延迟
