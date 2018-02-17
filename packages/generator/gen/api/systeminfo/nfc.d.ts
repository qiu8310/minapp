// https://mp.weixin.qq.com/debug/wxadoc/dev/api/nfc.html

export namespace wx {
  type IWxGetHceStateObject = {
    /**
     * 接口调用成功的回调函数
     */
    success?: (res: {
      /**
       * 错误信息
       */
      errMsg: string

      /**
       * 错误码
       */
      errCode: number
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
   * @since 1.7.0
   *
   * 判断当前设备是否支持 HCE 能力。
   *
   * **success返回参数说明：**
   *
   *     ```javascript
   *     wx.getHCEState({
   *       success: function(res) {
   *         console.log(res.errCode)
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/nfc.html#wxgethcestateobject
   */
  function getHCEState(OBJECT: IWxGetHceStateObject): void
  type IWxStartHceObject = {
    /**
     * 需要注册到系统的 AID 列表，每个 AID 为 String 类型
     */
    aid_list: any[]

    /**
     * 接口调用成功的回调函数
     */
    success?: (res: {
      /**
       * 错误信息
       */
      errMsg: string

      /**
       * 错误码
       */
      errCode: number
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
   * @since 1.7.0
   *
   * 初始化 NFC 模块。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.startHCE({
   *       aid_list: ['F222222222']
   *       success: function(res) {
   *         console.log(res.errMsg)
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/nfc.html#wxstarthceobject
   */
  function startHCE(OBJECT: IWxStartHceObject): void
  type IWxStopHceObject = {
    /**
     * 接口调用成功的回调函数
     */
    success?: (res: {
      /**
       * 错误信息
       */
      errMsg: string

      /**
       * 错误码
       */
      errCode: number
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
   * @since 1.7.0
   *
   * 关闭 NFC 模块。仅在安卓系统下有效。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.stopHCE({
   *       success: function(res) {
   *         console.log(res.errMsg)
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/nfc.html#wxstophceobject
   */
  function stopHCE(OBJECT: IWxStopHceObject): void
  /**
   * @since 1.7.0
   *
   * 监听 NFC 设备的消息回调，并在回调中处理。返回参数中 `messageType` 表示消息类型，目前有如下值：
   *
   * *   1：消息为HCE Apdu Command类型，小程序需对此指令进行处理，并调用 `sendHCEMessage` 接口返回处理指令；
   * *   2：消息为设备离场事件
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/nfc.html#wxonhcemessagecallback
   */
  function onHCEMessage(CALLBACK: ((res: {
    /**
     * 消息类型
     */
    messageType: number

    /**
     * 客户端接收到 NFC 设备的指令，此参数当且仅当 `messageType=1` 时有效
     */
    data: ArrayBuffer

    /**
     * 此参数当且仅当 `messageType=2` 时有效
     */
    reason: number
  }) => any)): void
  type IWxSendHceMessageObject = {
    /**
     * 二进制数据
     */
    data: ArrayBuffer

    /**
     * 接口调用成功的回调函数
     */
    success?: (res: {
      /**
       * 错误信息
       */
      errMsg: string

      /**
       * 错误码
       *
       * **errCode列表：**
       *
       * 每个接口调用的时候，都会返回 `errCode` 字段。
       *
       *   错误码  |  说明                     
       * ----------|---------------------------
       *   0       |  Ok                       
       *   13000   |  当前设备不支持 NFC       
       *   13001   |当前设备支持 NFC，但系统NFC开关未开启
       *   13002   |当前设备支持 NFC，但不支持HCE
       *   13003   |  AID 列表参数格式错误     
       *   13004   |未设置微信为默认NFC支付应用
       *   13005   |  返回的指令不合法         
       *   13006   |  注册 AID 失败            
       */
      errCode: number
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
   * @since 1.7.0
   *
   * 发送 NFC 消息。仅在安卓系统下有效。
   *
   * **success返回参数说明：**
   *
   *     ```javascript
   *     const buffer = new ArrayBuffer(1)
   *     const dataView = new DataView(buffer)
   *     dataView.setUint8(0, 0)
   *
   *     wx.startHCE({
   *       success: function(res) {
   *         wx.onHCEMessage(function(res) {
   *           if (res.messageType === 1) {
   *             wx.sendHCEMessage({data: buffer})
   *           }
   *         })
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/nfc.html#wxsendhcemessageobject
   */
  function sendHCEMessage(OBJECT: IWxSendHceMessageObject): void
}
