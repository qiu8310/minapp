<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-audio.html -->

### wx.createAudioContext(audioId, this)

**注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的 [wx.createInnerAudioContext](https://mp.weixin.qq.com/debug/wxadoc/dev/api/createInnerAudioContext.html) 接口**

创建并返回 audio 上下文 `audioContext` 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<audio/>` 组件

#### audioContext

`audioContext` 通过 audioId 跟一个 `<audio/>` 组件绑定，通过它可以操作对应的 `<audio/>` 组件。

**audioContext 对象的方法列表：**

  方法     |  参数       |  说明           
-----------|-------------|-----------------
  setSrc   |  src        |  音频的地址     
  play     |  无         |  播放           
  pause    |  无         |  暂停           
  seek     |  position   |跳转到指定位置，单位 s

**示例代码：**

    <!-- audio.wxml -->
    <audio  src="{{src}}" id="myAudio" ></audio>
    
    <button type="primary" bindtap="audioPlay">播放</button>
    <button type="primary" bindtap="audioPause">暂停</button>
    <button type="primary" bindtap="audio14">设置当前播放时间为14秒</button>
    <button type="primary" bindtap="audioStart">回到开头</button>
    

    // audio.js
    Page({
      onReady: function (e) {
        // 使用 wx.createAudioContext 获取 audio 上下文 context
        this.audioCtx = wx.createAudioContext('myAudio')
        this.audioCtx.setSrc('http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46')
        this.audioCtx.play()
      },
      data: {
        src: ''
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
