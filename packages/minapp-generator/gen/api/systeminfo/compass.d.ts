// https://mp.weixin.qq.com/debug/wxadoc/dev/api/compass.html

export namespace wx {
  namespace onCompassChange {
    type Param = (res: ParamParam) => any
    type ParamParam = {
      /**
       * 面对的方向度数
       */
      direction?: number
    }
  }
  /**
   * 监听罗盘数据，频率：5次/秒，接口调用后会自动开始监听，可使用`wx.stopCompass`停止监听。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.onCompassChange(function (res) {
   *       console.log(res.direction)
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/compass.html#wxoncompasschangecallback
   */
  function onCompassChange(CALLBACK: onCompassChange.Param): void

  namespace startCompass {
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
   * 开始监听罗盘数据。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.startCompass()
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/compass.html#wxstartcompassobject
   */
  function startCompass(OBJECT: startCompass.Param): void

  namespace stopCompass {
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
   * 停止监听罗盘数据。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.stopCompass()
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/compass.html#wxstopcompassobject
   */
  function stopCompass(OBJECT: stopCompass.Param): void

}
