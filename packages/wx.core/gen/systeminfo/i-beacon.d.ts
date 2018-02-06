// https://mp.weixin.qq.com/debug/wxadoc/dev/api/iBeacon.html

export namespace wx {
  type IWxStartBeaconDiscoveryObject = {
    /**
     * iBeacon设备广播的 uuids
     */
    uuids: string[]

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
   * @since 1.2.0
   *
   * 开始搜索附近的`iBeacon`设备
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.startBeaconDiscovery({
   *         success(res) {
   *         }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/iBeacon.html#wxstartbeacondiscoveryobject
   */
  function startBeaconDiscovery(OBJECT: IWxStartBeaconDiscoveryObject): void
  type IWxStopBeaconDiscoveryObject = {
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
   * @since 1.2.0
   *
   * 停止搜索附近的`iBeacon`设备
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/iBeacon.html#wxstopbeacondiscoveryobject
   */
  function stopBeaconDiscovery(OBJECT: IWxStopBeaconDiscoveryObject): void
  type IWxGetBeaconsObject = {
    /**
     * 接口调用成功的回调函数
     */
    success?: (res: {
      /**
       * iBeacon 设备列表
       */
      beacons: Array<{
        /**
         * iBeacon 设备广播的 uuid
         */
        uuid: string

        /**
         * iBeacon 设备的主 id
         */
        major: string

        /**
         * iBeacon 设备的次 id
         */
        minor: string

        /**
         * 表示设备距离的枚举值
         */
        proximity: number

        /**
         * iBeacon 设备的距离
         */
        accuracy: number

        /**
         * 表示设备的信号强度
         */
        rssi: number
      }>

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
   * @since 1.2.0
   *
   * 获取所有已搜索到的`iBeacon`设备
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/iBeacon.html#wxgetbeaconsobject
   */
  function getBeacons(OBJECT: IWxGetBeaconsObject): void
  /**
   * @since 1.2.0
   *
   * 监听 `iBeacon` 设备的更新事件
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/iBeacon.html#wxonbeaconupdatecallback
   */
  function onBeaconUpdate(CALLBACK: ((res: {
    /**
     * 当前搜寻到的所有 iBeacon 设备列表
     */
    beacons: Array<{
      /**
       * iBeacon 设备广播的 uuid
       */
      uuid: string

      /**
       * iBeacon 设备的主 id
       */
      major: string

      /**
       * iBeacon 设备的次 id
       */
      minor: string

      /**
       * 表示设备距离的枚举值
       */
      proximity: number

      /**
       * iBeacon 设备的距离
       */
      accuracy: number

      /**
       * 表示设备的信号强度
       */
      rssi: number
    }>
  }) => any)): void
  /**
   * @since 1.2.0
   *
   * 监听 `iBeacon` 服务的状态变化
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/iBeacon.html#wxonbeaconservicechangecallback
   */
  function onBeaconServiceChange(CALLBACK: ((res: {
    /**
     * 服务目前是否可用
     */
    available: boolean

    /**
     * 目前是否处于搜索状态
     */
    discovering: boolean
  }) => any)): void
}
