// https://developers.weixin.qq.com/miniprogram/dev/api/accelerometer.html

export namespace wx {
  namespace onAccelerometerChange {
    type Param = (res: ParamParam) => any
    type ParamParam = {
      /**
       * X 轴
       */
      x: number
      /**
       * Y 轴
       */
      y: number
      /**
       * Z 轴
       */
      z: number
    }
  }
  /**
   * 监听加速度数据，频率：5次/秒，接口调用后会自动开始监听，可使用 `wx.stopAccelerometer` 停止监听。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.onAccelerometerChange(function(res) {
   *       console.log(res.x)
   *       console.log(res.y)
   *       console.log(res.z)
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/accelerometer.html#wxonaccelerometerchangecallback
   */
  function onAccelerometerChange(CALLBACK: onAccelerometerChange.Param): void

  namespace startAccelerometer {
    type Param = {
      /**
       * 监听加速度数据回调函数的执行频率
       *
       * @since 2.1.0
       */
      interval?: string
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
   * 开始监听加速度数据。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.startAccelerometer({
   *         interval: 'game'
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/accelerometer.html#wxstartaccelerometerobject
   */
  function startAccelerometer(OBJECT: startAccelerometer.Param): void

  namespace stopAccelerometer {
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
   * 停止监听加速度数据。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.stopAccelerometer()
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/accelerometer.html#wxstopaccelerometerobject
   */
  function stopAccelerometer(OBJECT: stopAccelerometer.Param): void

}
