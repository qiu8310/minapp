// https://developers.weixin.qq.com/miniprogram/dev/api/scancode.html

export namespace wx {
  namespace scanCode {
    type Param = {
      /**
       * 是否只能从相机扫码，不允许从相册选择图片
       *
       * @since 1.2.0
       */
      onlyFromCamera?: boolean
      /**
       * 扫码类型，参数类型是数组，二维码是'qrCode'，一维码是'barCode'，DataMatrix是‘datamatrix’，pdf417是‘pdf417’。
       *
       * @since 1.7.0
       */
      scanType?: any[]
      /**
       * 接口调用成功的回调函数，返回内容详见返回参数说明。
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
     * 接口调用成功的回调函数，返回内容详见返回参数说明。
     */
    type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    type ParamPropSuccessParam = {
      /**
       * 所扫码的内容
       */
      result: any
      /**
       * 所扫码的类型
       */
      scanType: any
      /**
       * 所扫码的字符集
       */
      charSet: any
      /**
       * 当所扫的码为当前小程序的合法二维码时，会返回此字段，内容为二维码携带的 path
       */
      path: any
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
   * 调起客户端扫码界面，扫码成功后返回对应的结果
   *
   * **示例代码：**
   *
   *     ```javascript
   *     // 允许从相机和相册扫码
   *     wx.scanCode({
   *       success: (res) => {
   *         console.log(res)
   *       }
   *     })
   *
   *     // 只允许从相机扫码
   *     wx.scanCode({
   *       onlyFromCamera: true,
   *       success: (res) => {
   *         console.log(res)
   *       }
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/scancode.html#wxscancodeobject
   */
  function scanCode(OBJECT: scanCode.Param): void

}
