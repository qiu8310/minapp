// https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-record.html

export namespace wx {
  namespace startRecord {
    type Param = {
      /**
       * 录音成功后调用，返回录音文件的临时文件路径，res = {tempFilePath: '录音文件的临时路径'}
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
     * 录音成功后调用，返回录音文件的临时文件路径，res = {tempFilePath: '录音文件的临时路径'}
     */
    type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    type ParamPropSuccessParam = {
      /**
       * 录音文件的临时路径
       */
      tempFilePath: any
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
   * **注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的 [wx.getRecorderManager](https://mp.weixin.qq.com/debug/wxadoc/dev/api/getRecorderManager.html) 接口**
   *
   * 开始录音。当主动调用`wx.stopRecord`，或者录音超过1分钟时自动结束录音，返回录音文件的临时文件路径。当用户离开小程序时，此接口无法调用。
   *
   * 需要[用户授权](https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html) scope.record
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-record.html#wxstartrecordobject
   */
  function startRecord(OBJECT: startRecord.Param): void

  /**
   * ​主动调用停止录音。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.startRecord({
   *       success: function(res) {
   *         var tempFilePath = res.tempFilePath 
   *       },
   *       fail: function(res) {
   *          //录音失败
   *       }
   *     })
   *     setTimeout(function() {
   *       //结束录音  
   *       wx.stopRecord()
   *     }, 10000)
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-record.html#wxstoprecord
   */
  function stopRecord(): void

}
