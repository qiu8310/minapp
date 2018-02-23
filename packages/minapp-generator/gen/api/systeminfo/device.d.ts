// https://mp.weixin.qq.com/debug/wxadoc/dev/api/device.html

export namespace wx {
  namespace getNetworkType {
    type Param = {
      /**
       * 接口调用成功，返回网络类型 networkType
       */
      success: ParamPropSuccess
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
     * 接口调用成功，返回网络类型 networkType
     */
    type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    type ParamPropSuccessParam = {
      /**
       * 网络类型
       */
      networkType: any
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
   * 获取网络类型。
   *
   * **success返回参数说明：**
   *
   *     ```javascript
   *     wx.getNetworkType({
   *       success: function(res) {
   *         // 返回网络类型, 有效值：
   *         // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
   *         var networkType = res.networkType
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/device.html#wxgetnetworktypeobject
   */
  function getNetworkType(OBJECT: getNetworkType.Param): void

  namespace onNetworkStatusChange {
    type Param = (res: ParamParam) => any
    type ParamParam = {
      /**
       * 当前是否有网络连接
       */
      isConnected: boolean
      /**
       * 网络类型
       *
       * **networkType 有效值：**
       *
       *   值        |  说明               
       * ------------|---------------------
       *   wifi      |  wifi 网络          
       *   2g        |  2g 网络            
       *   3g        |  3g 网络            
       *   4g        |  4g 网络            
       *   none      |  无网络             
       *   unknown   |Android下不常见的网络类型
       */
      networkType: string
    }
  }
  /**
   * @since 1.1.0
   *
   * 监听网络状态变化。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.onNetworkStatusChange(function(res) {
   *       console.log(res.isConnected)
   *       console.log(res.networkType)
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/device.html#wxonnetworkstatuschangecallback
   */
  function onNetworkStatusChange(CALLBACK: onNetworkStatusChange.Param): void

  namespace setScreenBrightness {
    type Param = {
      /**
       * 屏幕亮度值，范围 0~1，0 最暗，1 最亮
       */
      value: number
      /**
       * 接口调用成功
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
     * 接口调用成功
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
   * @since 1.2.0
   *
   * 设置屏幕亮度。
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/device.html#wxsetscreenbrightnessobject
   */
  function setScreenBrightness(OBJECT: setScreenBrightness.Param): void

  namespace getScreenBrightness {
    type Param = {
      /**
       * 接口调用成功
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
     * 接口调用成功
     */
    type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    type ParamPropSuccessParam = {
      /**
       * 屏幕亮度值，范围 0~1，0 最暗，1 最亮
       */
      value: number
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
   * @since 1.2.0
   *
   * 获取屏幕亮度。
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/device.html#wxgetscreenbrightnessobject
   */
  function getScreenBrightness(OBJECT: getScreenBrightness.Param): void

  namespace vibrateLong {
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
   * @since 1.2.0
   *
   * 使手机发生较长时间的振动（400ms）
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/device.html#wxvibratelongobject
   */
  function vibrateLong(OBJECT: vibrateLong.Param): void

  namespace vibrateShort {
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
   * @since 1.2.0
   *
   * 使手机发生较短时间的振动（15ms）
   *
   * **Bug & Tip：**
   *
   * 1.  `tip`：`vibrateShort` 接口仅在 iPhone7/iPhone7Plus 及 Android 机型生效
   * 2.  `tip`: `getScreenBrightness` 接口若安卓系统设置中开启了自动调节亮度功能，则屏幕亮度会根据光线自动调整，该接口仅能获取自动调节亮度之前的值，而非实时的亮度值。
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/device.html#wxvibrateshortobject
   */
  function vibrateShort(OBJECT: vibrateShort.Param): void

}
