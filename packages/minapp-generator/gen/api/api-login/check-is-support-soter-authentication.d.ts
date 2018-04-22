// https://developers.weixin.qq.com/miniprogram/dev/api/checkIsSupportSoterAuthentication.html

export namespace wx {
  namespace checkIsSupportSoterAuthentication {
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
       * 该设备支持的可被SOTER识别的生物识别方式
       *
       * **supportMode 有效值：**
       *
       *   值            |  说明         
       * ----------------|---------------
       *   fingerPrint   |  指纹识别     
       *   facial        |人脸识别（暂未支持）
       *   speech        |声纹识别（暂未支持）
       */
      supportMode: string[]
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
   * 获取本机支持的 SOTER 生物认证方式
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.checkIsSupportSoterAuthentication({
   *         success(res) {
   *             // res.supportMode = [] 不具备任何被SOTER支持的生物识别方式
   *             // res.supportMode = ['fingerPrint'] 只支持指纹识别
   *             // res.supportMode = ['fingerPrint', 'facial'] 支持指纹识别和人脸识别
   *         }
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/checkIsSupportSoterAuthentication.html#wxcheckissupportsoterauthenticationobject
   */
  function checkIsSupportSoterAuthentication(OBJECT: checkIsSupportSoterAuthentication.Param): void

}
