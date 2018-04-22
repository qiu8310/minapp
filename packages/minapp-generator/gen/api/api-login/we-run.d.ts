// https://developers.weixin.qq.com/miniprogram/dev/api/we-run.html

export namespace wx {
  namespace getWeRunData {
    type Param = {
      /**
       * 超时时间，单位 ms
       *
       * @since 1.9.90
       */
      timeout?: number
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
      /**
       * 包括敏感数据在内的完整用户信息的加密数据，详细见[加密数据解密算法](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#加密数据解密算法)
       *
       * **encryptedData：**
       *
       * encryptedData 解密后为以下 json 结构，详见[加密数据解密算法](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#加密数据解密算法)
       *
       *   属性                       |  类型          |  说明             
       * -----------------------------|----------------|-------------------
       *   stepInfoList               |  ObjectArray   |用户过去三十天的微信运动步数
       *   stepInfoList[].timestamp   |  Number        |时间戳，表示数据对应的时间
       *   stepInfoList[].step        |  Number        |  微信运动步数     
       */
      encryptedData: string
      /**
       * 加密算法的初始向量，详细见[加密数据解密算法](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#加密数据解密算法)
       */
      iv: string
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
   * 获取用户过去三十天微信运动步数，需要先调用 [wx.login](https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html#wxloginobject) 接口。
   *
   * 需要[用户授权](https://developers.weixin.qq.com/miniprogram/dev/api/authorize-index.html) scope.werun
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.getWeRunData({
   *         success(res) {
   *             const encryptedData = res.encryptedData
   *         }
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/we-run.html#wxgetwerundataobject
   */
  function getWeRunData(OBJECT: getWeRunData.Param): void

}
