// https://mp.weixin.qq.com/debug/wxadoc/dev/api/location.html

export namespace wx {
  type IWxGetLocationObject = {
    /**
     * 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于`wx.openLocation`的坐标
     */
    type?: string

    /**
     * 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
     *
     * @since 1.6.0
     */
    altitude?: boolean

    /**
     * 接口调用成功的回调函数，返回内容详见返回参数说明。
     */
    success: (res: {
      /**
       * 纬度，浮点数，范围为-90~90，负数表示南纬
       */
      latitude: any

      /**
       * 经度，浮点数，范围为-180~180，负数表示西经
       */
      longitude: any

      /**
       * 速度，浮点数，单位m/s
       */
      speed: any

      /**
       * 位置的精确度
       */
      accuracy: any

      /**
       * 高度，单位 m
       *
       * @since 1.2.0
       */
      altitude: any

      /**
       * 垂直精度，单位 m（Android 无法获取，返回 0）
       *
       * @since 1.2.0
       */
      verticalAccuracy: any

      /**
       * 水平精度，单位 m
       *
       * @since 1.2.0
       */
      horizontalAccuracy: any
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
   * 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用；当用户点击“显示在聊天顶部”时，此接口可继续调用。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.getLocation({
   *       type: 'wgs84',
   *       success: function(res) {
   *         var latitude = res.latitude
   *         var longitude = res.longitude
   *         var speed = res.speed
   *         var accuracy = res.accuracy
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/location.html#wxgetlocationobject
   */
  function getLocation(OBJECT: IWxGetLocationObject): void
  type IWxChooseLocationObject = {
    /**
     * 接口调用成功的回调函数，返回内容详见返回参数说明。
     */
    success: (res: {
      /**
       * 位置名称
       */
      name: any

      /**
       * 详细地址
       */
      address: any

      /**
       * 纬度，浮点数，范围为-90~90，负数表示南纬
       */
      latitude: any

      /**
       * 经度，浮点数，范围为-180~180，负数表示西经
       */
      longitude: any
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
   * 打开地图选择位置。
   *
   * 需要[用户授权](https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html) scope.userLocation
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/location.html#wxchooselocationobject
   */
  function chooseLocation(OBJECT: IWxChooseLocationObject): void
  type IWxOpenLocationObject = {
    /**
     * 纬度，范围为-90~90，负数表示南纬
     */
    latitude: number

    /**
     * 经度，范围为-180~180，负数表示西经
     */
    longitude: number

    /**
     * 缩放比例，范围5~18，默认为18
     */
    scale?: number

    /**
     * 位置名
     */
    name?: string

    /**
     * 地址的详细说明
     */
    address?: string

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
   * ​使用微信内置地图查看位置。
   *
   * 需要[用户授权](https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html) scope.userLocation
   *
   * **Bug & Tip：**
   *
   * 1.  `bug`: `iOS` `6.3.30` type 参数不生效，只会返回 wgs84 类型的坐标信息
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.getLocation({
   *       type: 'gcj02', //返回可以用于wx.openLocation的经纬度
   *       success: function(res) {
   *         var latitude = res.latitude
   *         var longitude = res.longitude
   *         wx.openLocation({
   *           latitude: latitude,
   *           longitude: longitude,
   *           scale: 28
   *         })
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/location.html#wxopenlocationobject
   */
  function openLocation(OBJECT: IWxOpenLocationObject): void
}
