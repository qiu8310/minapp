// https://mp.weixin.qq.com/debug/wxadoc/dev/api/checkIsSoterEnrolledInDevice.html

export namespace wx {
  namespace checkIsSoterEnrolledInDevice {
    type Param = {
      /**
       * 认证方式
       *
       * **checkAuthMode 有效值：**
       *
       *   值            |  说明         
       * ----------------|---------------
       *   fingerPrint   |  指纹识别     
       *   facial        |人脸识别（暂未支持）
       *   speech        |声纹识别（暂未支持）
       */
      checkAuthMode: string
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
       * 是否已录入信息
       */
      isEnrolled: boolean
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
   * @since 1.6.0
   *
   * 获取设备内是否录入如指纹等生物信息的接口
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.checkIsSoterEnrolledInDevice({
   *         checkAuthMode: 'fingerPrint',
   *         success(res) {
   *             console.log(res.isEnrolled)
   *         }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/checkIsSoterEnrolledInDevice.html#wxcheckissoterenrolledindeviceobject
   */
  function checkIsSoterEnrolledInDevice(OBJECT: checkIsSoterEnrolledInDevice.Param): void

}
