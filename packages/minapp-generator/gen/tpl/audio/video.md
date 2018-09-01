<!-- https://developers.weixin.qq.com/miniprogram/dev/component/video.html -->

#### video

视频。该组件是[原生组件](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)，使用时请注意相关限制。

  属性名                    |  类型           |  默认值    |  说明                                                                                    | 最低版本 
----------------------------|-----------------|------------|------------------------------------------------------------------------------------------|----------
  src                       |  String         |            |  要播放视频的资源地址，支持云文件ID（2.2.3起）                                           |          
  initial-time              |  Number         |            |  指定视频初始播放位置                                                                    |  1.6.0   
  duration                  |  Number         |            |  指定视频时长                                                                            |  1.1.0   
  controls                  |  Boolean        |  true      |  是否显示默认播放控件（播放/暂停按钮、播放进度、时间）                                   |          
  danmu-list                |  Object Array   |            |  弹幕列表                                                                                |          
  danmu-btn                 |  Boolean        |  false     |  是否显示弹幕按钮，只在初始化时有效，不能动态变更                                        |          
  enable-danmu              |  Boolean        |  false     |  是否展示弹幕，只在初始化时有效，不能动态变更                                            |          
  autoplay                  |  Boolean        |  false     |  是否自动播放                                                                            |          
  loop                      |  Boolean        |  false     |  是否循环播放                                                                            |  1.4.0   
  muted                     |  Boolean        |  false     |  是否静音播放                                                                            |  1.4.0   
  page-gesture              |  Boolean        |  false     |  在非全屏模式下，是否开启亮度与音量调节手势                                              |  1.6.0   
  direction                 |  Number         |            |设置全屏时视频的方向，不指定则根据宽高比自动判断。有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）|  1.7.0   
  show-progress             |  Boolean        |  true      |  若不设置，宽度大于240时才会显示                                                         |  1.9.0   
  show-fullscreen-btn       |  Boolean        |  true      |  是否显示全屏按钮                                                                        |  1.9.0   
  show-play-btn             |  Boolean        |  true      |  是否显示视频底部控制栏的播放按钮                                                        |  1.9.0   
  show-center-play-btn      |  Boolean        |  true      |  是否显示视频中间的播放按钮                                                              |  1.9.0   
  enable-progress-gesture   |  Boolean        |  true      |  是否开启控制进度的手势                                                                  |  1.9.0   
  objectFit                 |  String         |  contain   |当视频大小与 video 容器大小不一致时，视频的表现形式。contain：包含，fill：填充，cover：覆盖|          
  poster                    |  String         |            |视频封面的图片网络资源地址或云文件ID（2.2.3起支持）如果 controls 属性值为 false 则设置 poster 无效|          
  bindplay                  |  EventHandle    |            |  当开始/继续播放时触发play事件                                                           |          
  bindpause                 |  EventHandle    |            |  当暂停播放时触发 pause 事件                                                             |          
  bindended                 |  EventHandle    |            |  当播放到末尾时触发 ended 事件                                                           |          
  bindtimeupdate            |  EventHandle    |            |  播放进度变化时触发，event.detail = {currentTime, duration} 。触发频率 250ms 一次        |          
  bindfullscreenchange      |  EventHandle    |            |视频进入和退出全屏时触发，event.detail = {fullScreen, direction}，direction取为 vertical 或 horizontal|  1.4.0   
  bindwaiting               |  EventHandle    |            |  视频出现缓冲时触发                                                                      |  1.7.0   
  binderror                 |  EventHandle    |            |  视频播放出错时触发                                                                      |  1.7.0   

`<video />` 默认宽度300px、高度225px，可通过wxss设置宽高。

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/X5V6Xmmk6xYB "在开发者工具中预览效果")

    <view class="section tc">
      <video src="{{src}}"   controls ></video>
      <view class="btn-area">
        <button bindtap="bindButtonTap">获取视频</button>
      </view>
    </view>
    
    <view class="section tc">
      <video id="myVideo" src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" danmu-list="{{danmuList}}" enable-danmu danmu-btn controls></video>
      <view class="btn-area">
        <button bindtap="bindButtonTap">获取视频</button>
        <input bindblur="bindInputBlur"/>
        <button bindtap="bindSendDanmu">发送弹幕</button>
      </view>
    </view>
    

    function getRandomColor () {
      let rgb = []
      for (let i = 0 ; i < 3; ++i){
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
      }
      return '#' + rgb.join('')
    }
    
    Page({
      onReady: function (res) {
        this.videoContext = wx.createVideoContext('myVideo')
      },
      inputValue: '',
    	data: {
    		src: '',
        danmuList: [
          {
            text: '第 1s 出现的弹幕',
            color: '#ff0000',
            time: 1
          },
          {
            text: '第 3s 出现的弹幕',
            color: '#ff00ff',
            time: 3
        }]
    	},
      bindInputBlur: function(e) {
        this.inputValue = e.detail.value
      },
      bindButtonTap: function() {
        var that = this
        wx.chooseVideo({
          sourceType: ['album', 'camera'],
          maxDuration: 60,
          camera: ['front','back'],
          success: function(res) {
            that.setData({
              src: res.tempFilePath
            })
          }
        })
      },
      bindSendDanmu: function () {
        this.videoContext.sendDanmu({
          text: this.inputValue,
          color: getRandomColor()
        })
      }
    })
    

![video](https://developers.weixin.qq.com/miniprogram/dev/image/pic/video.png)

相关api：[wx.createVideoContext](https://developers.weixin.qq.com/miniprogram/dev/api/api-video.html)

##### Bug & Tip

1.  请注意[原生组件使用限制](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html#原生组件的使用限制)。
