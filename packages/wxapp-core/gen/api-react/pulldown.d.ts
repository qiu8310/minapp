// https://mp.weixin.qq.com/debug/wxadoc/dev/api/pulldown.html

export namespace wx {
  type IWxStartPullDownRefreshObject = {
    /**
     * 接口调用成功的回调函数
     */
    success?: (res: {
      /**
       * 接口调用结果
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
   * @since 1.5.0
   *
   * 开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.startPullDownRefresh()
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/pulldown.html#wxstartpulldownrefreshobject
   */
  function startPullDownRefresh(OBJECT: IWxStartPullDownRefreshObject): void
  /**
   * 停止当前页面下拉刷新。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     Page({
   *       onPullDownRefresh: function(){
   *         wx.stopPullDownRefresh()
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/pulldown.html#wxstoppulldownrefresh
   */
  function stopPullDownRefresh(): void
}
