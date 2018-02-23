// https://mp.weixin.qq.com/debug/wxadoc/dev/api/clipboard.html

export namespace wx {
  namespace setClipboardData {
    type Param = {
      /**
       * 需要设置的内容
       */
      data: string
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
   * @since 1.1.0
   *
   * 设置系统剪贴板的内容
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.setClipboardData({
   *       data: 'data',
   *       success: function(res) {
   *         wx.getClipboardData({
   *           success: function(res) {
   *             console.log(res.data) // data
   *           }
   *         })
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/clipboard.html#wxsetclipboarddataobject
   */
  function setClipboardData(OBJECT: setClipboardData.Param): void

  namespace getClipboardData {
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
       * 剪贴板的内容
       */
      data: string
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
   * @since 1.1.0
   *
   * 获取系统剪贴板内容
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.getClipboardData({
   *       success: function(res){
   *         console.log(res.data)
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/clipboard.html#wxgetclipboarddataobject
   */
  function getClipboardData(OBJECT: getClipboardData.Param): void

}
