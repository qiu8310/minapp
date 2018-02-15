// https://mp.weixin.qq.com/debug/wxadoc/dev/api/setEnableDebug.html

export namespace wx {
  type IWxSetEnableDebugObject = {
    /**
     * 是否打开调试
     */
    enableDebug: boolean

    /**
     * 接口调用成功的回调函数
     */
    success?: (res: {
      /**
       * 调用结果
       */
      errMsg: string
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
   * @since 1.4.0
   *
   * 设置是否打开调试开关，此开关对正式版也能生效。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     // 打开调试
   *     wx.setEnableDebug({
   *         enableDebug: true
   *     })
   *
   *     // 关闭调试
   *     wx.setEnableDebug({
   *         enableDebug: false
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/setEnableDebug.html#wxsetenabledebugobject
   */
  function setEnableDebug(OBJECT: IWxSetEnableDebugObject): void
}
