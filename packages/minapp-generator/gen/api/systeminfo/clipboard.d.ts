// https://mp.weixin.qq.com/debug/wxadoc/dev/api/clipboard.html

export namespace wx {
  type IWxSetClipboardDataObject = {
    /**
     * 需要设置的内容
     */
    data: string

    /**
     * 接口调用成功的回调函数
     */
    success?: (res: any) => any

    /**
     * 接口调用失败的回调函数
     */
    fail?: (err: any) => any

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => any
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
  function setClipboardData(OBJECT: IWxSetClipboardDataObject): void
  type IWxGetClipboardDataObject = {
    /**
     * 接口调用成功的回调函数
     */
    success?: (res: {
      /**
       * 剪贴板的内容
       */
      data: string
    }) => any

    /**
     * 接口调用失败的回调函数
     */
    fail?: (err: any) => any

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => any
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
  function getClipboardData(OBJECT: IWxGetClipboardDataObject): void
}
