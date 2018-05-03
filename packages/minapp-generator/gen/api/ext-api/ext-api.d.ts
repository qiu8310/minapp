// https://developers.weixin.qq.com/miniprogram/dev/api/ext-api.html

export namespace wx {
  namespace getExtConfig {
    type Param = {
      /**
       * 返回第三方平台自定义的数据
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
     * 返回第三方平台自定义的数据
     */
    type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    type ParamPropSuccessParam = {
      /**
       * 调用结果
       */
      errMsg: string
      /**
       * 第三方平台自定义的数据
       */
      extConfig: any
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
   * @since 1.1.0
   *
   * 获取[第三方平台](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/ext.html)自定义的数据字段。
   *
   * **Bug & Tip：**
   *
   * 1.  `wx.getExtConfig` 暂时无法通过 `wx.canIUse` 判断是否兼容，开发者需要自行判断 `wx.getExtConfig` 是否存在来兼容
   *
   * **示例代码：**
   *
   *     ```javascript
   *     if(wx.getExtConfig) {
   *       wx.getExtConfig({
   *         success: function (res) {
   *           console.log(res.extConfig)
   *         }
   *       })
   *     }
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/ext-api.html#wxgetextconfigobject
   */
  function getExtConfig(OBJECT: getExtConfig.Param): void

  namespace getExtConfigSync {
    type Return = {
      /**
       * 第三方平台自定义的数据
       */
      extConfig: any
    }
  }
  /**
   * @since 1.1.0
   *
   * 获取[第三方平台](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/ext.html)自定义的数据字段的同步接口。
   *
   * **Bug & Tip：**
   *
   * 1.  `wx.getExtConfigSync` 暂时无法通过 `wx.canIUse` 判断是否兼容，开发者需要自行判断 `wx.getExtConfigSync` 是否存在来兼容
   *
   * **示例代码：**
   *
   *     ```javascript
   *     let extConfig = wx.getExtConfigSync? wx.getExtConfigSync(): {}
   *     console.log(extConfig)
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/ext-api.html#wxgetextconfigsync
   */
  function getExtConfigSync(): getExtConfigSync.Return

}
