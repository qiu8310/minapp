// https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-voice.html

export namespace wx {
  namespace playVoice {
    type Param = {
      /**
       * 需要播放的语音文件的文件路径
       */
      filePath: string
      /**
       * 指定录音时长，到达指定的录音时长后会自动停止录音，单位：秒，默认值：60
       *
       * @since 1.6.0
       */
      duration?: number
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
   * **注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的 [wx.createInnerAudioContext](https://mp.weixin.qq.com/debug/wxadoc/dev/api/createInnerAudioContext.html) 接口**
   *
   * 开始播放语音，同时只允许一个语音文件正在播放，如果前一个语音文件还没播放完，将中断前一个语音播放。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.startRecord({
   *       success: function(res) {
   *         var tempFilePath = res.tempFilePath
   *         wx.playVoice({
   *           filePath: tempFilePath,
   *           complete: function(){
   *           }
   *         })
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-voice.html#wxplayvoiceobject
   */
  function playVoice(OBJECT: playVoice.Param): void

  /**
   * 暂停正在播放的语音。再次调用wx.playVoice播放同一个文件时，会从暂停处开始播放。如果想从头开始播放，需要先调用 wx.stopVoice。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.startRecord({
   *       success: function(res) {
   *         var tempFilePath = res.tempFilePath
   *           wx.playVoice({
   *           filePath: tempFilePath
   *         })
   *
   *         setTimeout(function() {
   *             //暂停播放
   *           wx.pauseVoice()
   *         }, 5000)
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-voice.html#wxpausevoice
   */
  function pauseVoice(): void

  /**
   * 结束播放语音。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.startRecord({
   *       success: function(res) {
   *         var tempFilePath = res.tempFilePath
   *         wx.playVoice({
   *           filePath:tempFilePath
   *         })
   *
   *         setTimeout(function(){
   *           wx.stopVoice()
   *         }, 5000)
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-voice.html#wxstopvoice
   */
  function stopVoice(): void

}
