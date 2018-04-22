// https://developers.weixin.qq.com/miniprogram/dev/api/pulldown.html

export namespace wx {
  namespace startPullDownRefresh {
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
       * 接口调用结果
       */
      errMsg: string
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
   * @since 1.5.0
   *
   * 开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.startPullDownRefresh()
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/pulldown.html#wxstartpulldownrefreshobject
   */
  function startPullDownRefresh(OBJECT: startPullDownRefresh.Param): void

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
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/pulldown.html#wxstoppulldownrefresh
   */
  function stopPullDownRefresh(): void

}
