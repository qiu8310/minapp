// https://developers.weixin.qq.com/miniprogram/dev/api/api-video.html

export namespace wx {
  /**
   * 创建并返回 video 上下文 `videoContext` 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<video/>` 组件
   *
   * **videoContext：**
   *
   * `videoContext` 通过 videoId 跟一个 video 组件绑定，通过它可以操作一个 video 组件。
   *
   * **示例代码：**
   *
   *     ```html
   *     <view class="section tc">
   *       <video id="myVideo" src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"   enable-danmu danmu-btn controls></video>
   *       <view class="btn-area">
   *         <input bindblur="bindInputBlur"/>
   *         <button bindtap="bindSendDanmu">发送弹幕</button>
   *       </view>
   *     </view>
   *     ```
   *
   * **示例代码：**
   *
   *     ```javascript
   *     function getRandomColor () {
   *       let rgb = []
   *       for (let i = 0 ; i < 3; ++i){
   *         let color = Math.floor(Math.random() * 256).toString(16)
   *         color = color.length == 1 ? '0' + color : color
   *         rgb.push(color)
   *       }
   *       return '#' + rgb.join('')
   *     }
   *
   *     Page({
   *       onReady: function (res) {
   *         this.videoContext = wx.createVideoContext('myVideo')
   *       },
   *       inputValue: '',
   *       bindInputBlur: function(e) {
   *         this.inputValue = e.detail.value
   *       },
   *       bindSendDanmu: function () {
   *         this.videoContext.sendDanmu({
   *           text: this.inputValue,
   *           color: getRandomColor()
   *         })
   *       }
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/api-video.html#wxcreatevideocontextvideoid-this
   */
  function createVideoContext(videoId: any, instance?: any): VideoContext

  class VideoContext {
    /**
     * 播放
     */
    play(): any
    /**
     * 暂停
     */
    pause(): any
    /**
     * 跳转到指定位置，单位 s
     */
    seek(position: any): any
    /**
     * 发送弹幕，danmu 包含两个属性 text, color。
     */
    sendDanmu(danmu: any): any
    /**
     * 设置倍速播放，支持的倍率有 0.5/0.8/1.0/1.25/1.5
     *
     * @since 1.4.0
     */
    playbackRate(rate: any): any
    /**
     * 进入全屏，可传入{direction}参数（1.7.0起支持），详见video组件文档
     *
     * @since 1.4.0
     */
    requestFullScreen(): any
    /**
     * 退出全屏
     *
     * @since 1.4.0
     */
    exitFullScreen(): any
  }
}
