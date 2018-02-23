// https://mp.weixin.qq.com/debug/wxadoc/dev/api/iBeacon.html

export namespace wx {
  namespace startBeaconDiscovery {
    type Param = {
      /**
       * iBeacon设备广播的 uuids
       */
      uuids: string[]
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
  function startBeaconDiscovery(OBJECT: startBeaconDiscovery.Param): void

  namespace stopBeaconDiscovery {
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
       * 调用结果
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
   * @since 1.2.0
   *
   * 停止搜索附近的`iBeacon`设备
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/iBeacon.html#wxstopbeacondiscoveryobject
   */
  function stopBeaconDiscovery(OBJECT: stopBeaconDiscovery.Param): void

  namespace getBeacons {
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
       * iBeacon 设备列表
       */
      beacons: ParamPropSuccessParamPropBeacons
      /**
       * 调用结果
       */
      errMsg: string
    }
    /**
     * iBeacon 设备列表
     */
    type ParamPropSuccessParamPropBeacons = ParamPropSuccessParamPropBeaconsItem[]
    type ParamPropSuccessParamPropBeaconsItem = {
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
   * 获取所有已搜索到的`iBeacon`设备
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/iBeacon.html#wxgetbeaconsobject
   */
  function getBeacons(OBJECT: getBeacons.Param): void

  namespace onBeaconUpdate {
    type Param = (res: ParamParam) => any
    type ParamParam = {
      /**
       * 当前搜寻到的所有 iBeacon 设备列表
       */
      beacons: ParamParamPropBeacons
    }
    /**
     * 当前搜寻到的所有 iBeacon 设备列表
     */
    type ParamParamPropBeacons = ParamParamPropBeaconsItem[]
    type ParamParamPropBeaconsItem = {
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
    }
  }
  /**
   * @since 1.2.0
   *
   * 监听 `iBeacon` 设备的更新事件
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/iBeacon.html#wxonbeaconupdatecallback
   */
  function onBeaconUpdate(CALLBACK: onBeaconUpdate.Param): void

  namespace onBeaconServiceChange {
    type Param = (res: ParamParam) => any
    type ParamParam = {
      /**
       * 服务目前是否可用
       */
      available: boolean
      /**
       * 目前是否处于搜索状态
       */
      discovering: boolean
    }
  }
  /**
   * @since 1.2.0
   *
   * 监听 `iBeacon` 服务的状态变化
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/iBeacon.html#wxonbeaconservicechangecallback
   */
  function onBeaconServiceChange(CALLBACK: onBeaconServiceChange.Param): void

}
