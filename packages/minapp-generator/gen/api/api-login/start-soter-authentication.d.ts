// https://developers.weixin.qq.com/miniprogram/dev/api/startSoterAuthentication.html

export namespace wx {
  namespace startSoterAuthentication {
    type Param = {
      /**
       * 请求使用的可接受的生物认证方式
       */
      requestAuthModes: string[]
      /**
       * 挑战因子。挑战因子为调用者为此次生物鉴权准备的用于签名的字符串关键识别信息，将作为result_json的一部分，供调用者识别本次请求。例如：如果场景为请求用户对某订单进行授权确认，则可以将订单号填入此参数。
       */
      challenge: string
      /**
       * 验证描述，即识别过程中显示在界面上的对话框提示内容
       */
      authContent?: string
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
       * 错误码
       */
      errCode: number
      /**
       * 生物认证方式
       */
      authMode: string
      /**
       * 在设备安全区域（TEE）内获得的本机安全信息（如TEE名称版本号等以及防重放参数）以及本次认证信息（仅Android支持，本次认证的指纹ID）（仅Android支持，本次认证的指纹ID）
       *
       * **resultJSON 说明：**
       *
       * 此数据为设备TEE中，将传入的challenge和TEE内其他安全信息组成的数据进行组装而来的JSON，对下述字段的解释如表2。例子如下：
       *
       *   字段名    |  说明                                               
       * ------------|-----------------------------------------------------
       *   raw       |  调用者传入的challenge                              
       *   fid       |（仅Android支持）本次生物识别认证的生物信息编号（如指纹识别则是指纹信息在本设备内部编号）
       *   counter   |  防重放特征参数                                     
       *   tee_n     |  TEE名称（如高通或者trustonic等）                   
       *   tee_v     |  TEE版本号                                          
       *   fp_n      |  指纹以及相关逻辑模块提供商（如FPC等）              
       *   fp_v      |  指纹以及相关模块版本号                             
       *   cpu_id    |  机器唯一识别ID                                     
       *   uid       |  概念同Android系统定义uid，即应用程序编号           
       */
      resultJSON: string
      /**
       * 用SOTER安全密钥对result_json的签名(SHA256withRSA/PSS, saltlen=20)
       */
      resultJSONSignature: string
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
   * 开始 SOTER 生物认证
   *
   * **生物识别方式定义：**
   *
   *   mode          |  说明         
   * ----------------|---------------
   *   fingerPrint   |  指纹识别     
   *   facial        |人脸识别（暂未支持）
   *   speech        |声纹识别（暂未支持）
   *
   * **resultJSON 说明：**
   *
   *     ```json
   *     {
   *         "raw":"msg",
   *         "fid":"2",
   *         "counter":123,
   *         "tee_n":"TEE Name",
   *         "tee_v":"TEE Version",
   *         "fp_n":"Fingerprint Sensor Name",
   *         "fp_v":"Fingerprint Sensor Version",
   *         "cpu_id":"CPU Id",
   *         "uid":"21"
   *     }
   *     ```
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.startSoterAuthentication({
   *       requestAuthModes: ['fingerPrint'],
   *       challenge: '123456',
   *       authContent: '请用指纹解锁',
   *       success(res) {
   *       }
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/startSoterAuthentication.html#wxstartsoterauthenticationobject
   */
  function startSoterAuthentication(OBJECT: startSoterAuthentication.Param): void

}
