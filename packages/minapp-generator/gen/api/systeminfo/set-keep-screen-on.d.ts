// https://mp.weixin.qq.com/debug/wxadoc/dev/api/setKeepScreenOn.html

export namespace wx {
  namespace setKeepScreenOn {
    type Param = {
      /**
       * 是否保持屏幕常亮
       */
      keepScreenOn?: boolean
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
       * 调用结果
       */
      errMsg?: string
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
   * @since 1.4.0
   *
   * 设置是否保持常亮状态。仅在当前小程序生效，离开小程序后设置失效。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     // 保持屏幕常亮
   *     wx.setKeepScreenOn({
   *         keepScreenOn: true
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/setKeepScreenOn.html#wxsetkeepscreenonobject
   */
  function setKeepScreenOn(OBJECT: setKeepScreenOn.Param): void

}
