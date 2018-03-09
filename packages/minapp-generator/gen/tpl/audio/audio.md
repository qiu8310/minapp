<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/component/audio.html -->

#### audio

音频。

  属性名           |  类型          |  默认值  |  说明                                                        
-------------------|----------------|----------|--------------------------------------------------------------
  id               |  String        |          |  audio 组件的唯一标识符                                      
  src              |  String        |          |  要播放音频的资源地址                                        
  loop             |  Boolean       |  false   |  是否循环播放                                                
  controls         |  Boolean       |  false   |  是否显示默认控件                                            
  poster           |  String        |          |默认控件上的音频封面的图片资源地址，如果 controls 属性值为 false 则设置 poster 无效
  name             |  String        | 未知音频 |默认控件上的音频名字，如果 controls 属性值为 false 则设置 name 无效
  author           |  String        | 未知作者 |默认控件上的作者名字，如果 controls 属性值为 false 则设置 author 无效
  binderror        |  EventHandle   |          |当发生错误时触发 error 事件，detail = {errMsg: MediaError.code}
  bindplay         |  EventHandle   |          |  当开始/继续播放时触发play事件                               
  bindpause        |  EventHandle   |          |  当暂停播放时触发 pause 事件                                 
  bindtimeupdate   |  EventHandle   |          |当播放进度改变时触发 timeupdate 事件，detail = {currentTime, duration}
  bindended        |  EventHandle   |          |  当播放到末尾时触发 ended 事件                               

**binderror __描述__ MediaError.code**

返回错误码|  描述        
----------|--------------
  1       |获取资源被用户禁止
  2       |  网络错误    
  3       |  解码错误    
  4       |  不合适资源  

**示例代码：**

    <!-- audio.wxml -->
    <audio poster="{{poster}}" name="{{name}}" author="{{author}}" src="{{src}}" id="myAudio" controls loop></audio>
    
    <button type="primary" bindtap="audioPlay">播放</button>
    <button type="primary" bindtap="audioPause">暂停</button>
    <button type="primary" bindtap="audio14">设置当前播放时间为14秒</button>
    <button type="primary" bindtap="audioStart">回到开头</button>
    

    // audio.js
    Page({
      onReady: function (e) {
        // 使用 wx.createAudioContext 获取 audio 上下文 context
        this.audioCtx = wx.createAudioContext('myAudio')
      },
      data: {
        poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
        name: '此时此刻',
        author: '许巍',
        src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      },
      audioPlay: function () {
        this.audioCtx.play()
      },
      audioPause: function () {
        this.audioCtx.pause()
      },
      audio14: function () {
        this.audioCtx.seek(14)
      },
      audioStart: function () {
        this.audioCtx.seek(0)
      }
    })
    

![audio](https://mp.weixin.qq.com/debug/wxadoc/dev/image/pic/audio.png?t=201838)

相关api：[wx.createAudioContext](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-audio.html)
