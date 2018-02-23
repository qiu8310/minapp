// https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-background-audio.html

export namespace wx {
  namespace getBackgroundAudioPlayerState {
    type Param = {
      /**
       * 接口调用成功的回调函数
       */
      success?: ParamPropSuccess
      /**
       * 接口调用失败的回调函数
       */
      fail?: ParamPropFail
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    type ParamPropSuccessParam = {
      /**
       * 选定音频的长度（单位：s），只有在当前有音乐播放时返回
       */
      duration: any
      /**
       * 选定音频的播放位置（单位：s），只有在当前有音乐播放时返回
       */
      currentPosition: any
      /**
       * 播放状态（2：没有音乐在播放，1：播放中，0：暂停中）
       */
      status: any
      /**
       * 音频的下载进度（整数，80 代表 80%），只有在当前有音乐播放时返回
       */
      downloadPercent: any
      /**
       * 歌曲数据链接，只有在当前有音乐播放时返回
       */
      dataUrl: any
    }
    /**
     * 接口调用失败的回调函数
     */
    type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ParamPropComplete = () => any
  }
  /**
   * **注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 [wx.getBackgroundAudioManager](https://mp.weixin.qq.com/debug/wxadoc/dev/api/getBackgroundAudioManager.html) 接口**
   *
   * 获取后台音乐播放状态。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.getBackgroundAudioPlayerState({
   *         success: function(res) {
   *             var status = res.status
   *             var dataUrl = res.dataUrl
   *             var currentPosition = res.currentPosition
   *             var duration = res.duration
   *             var downloadPercent = res.downloadPercent
   *         }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-background-audio.html#wxgetbackgroundaudioplayerstateobject
   */
  function getBackgroundAudioPlayerState(OBJECT: getBackgroundAudioPlayerState.Param): void

  namespace playBackgroundAudio {
    type Param = {
      /**
       * 音乐链接，目前支持的格式有 m4a, aac, mp3, wav
       */
      dataUrl: string
      /**
       * 音乐标题
       */
      title?: string
      /**
       * 封面URL
       */
      coverImgUrl?: string
      /**
       * 接口调用成功的回调函数
       */
      success?: ParamPropSuccess
      /**
       * 接口调用失败的回调函数
       */
      fail?: ParamPropFail
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ParamPropComplete = () => any
  }
  /**
   * 使用后台播放器播放音乐，对于微信客户端来说，只能同时有一个后台音乐在播放。当用户离开小程序后，音乐将暂停播放；当用户点击“显示在聊天顶部”时，音乐不会暂停播放；当用户在其他小程序占用了音乐播放器，原有小程序内的音乐将停止播放。
   *
   * **OBJECT参数说明：**
   *
   *     ```javascript
   *     wx.playBackgroundAudio({
   *         dataUrl: '',
   *         title: '',
   *         coverImgUrl: ''
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-background-audio.html#wxplaybackgroundaudioobject
   */
  function playBackgroundAudio(OBJECT: playBackgroundAudio.Param): void

  /**
   * 暂停播放音乐。
   *
   * **示例代码**
   *
   * **示例：**
   *
   *     ```javascript
   *     wx.pauseBackgroundAudio()
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-background-audio.html#wxpausebackgroundaudio
   */
  function pauseBackgroundAudio(): void

  namespace seekBackgroundAudio {
    type Param = {
      /**
       * 音乐位置，单位：秒
       */
      position: number
      /**
       * 接口调用成功的回调函数
       */
      success?: ParamPropSuccess
      /**
       * 接口调用失败的回调函数
       */
      fail?: ParamPropFail
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ParamPropComplete = () => any
  }
  /**
   * 控制音乐播放进度。
   *
   * **OBJECT参数说明：**
   *
   *     ```javascript
   *     wx.seekBackgroundAudio({
   *         position: 30
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-background-audio.html#wxseekbackgroundaudioobject
   */
  function seekBackgroundAudio(OBJECT: seekBackgroundAudio.Param): void

  /**
   * 停止播放音乐。
   *
   * **示例代码**
   *
   * **示例：**
   *
   *     ```javascript
   *     wx.stopBackgroundAudio()
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-background-audio.html#wxstopbackgroundaudio
   */
  function stopBackgroundAudio(): void

  /**
   * 监听音乐播放。
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-background-audio.html#wxonbackgroundaudioplaycallback
   */
  function onBackgroundAudioPlay(CALLBACK: any): void

  /**
   * 监听音乐暂停。
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-background-audio.html#wxonbackgroundaudiopausecallback
   */
  function onBackgroundAudioPause(CALLBACK: any): void

  /**
   * 监听音乐停止。
   *
   * **bug & tip：**
   *
   * 1.  `bug`: `iOS` `6.3.30` wx.seekBackgroundAudio 会有短暂延迟
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-background-audio.html#wxonbackgroundaudiostopcallback
   */
  function onBackgroundAudioStop(CALLBACK: any): void

}
