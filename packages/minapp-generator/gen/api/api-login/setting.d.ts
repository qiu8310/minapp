// https://mp.weixin.qq.com/debug/wxadoc/dev/api/setting.html

export namespace wx {
  namespace openSetting {
    type Param = {
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
       * 用户授权结果，其中 key 为 scope 值，value 为 Bool 值，表示用户是否允许授权，详见 [scope 列表](https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html#scope-列表)
       */
      authSetting: any
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
   * 调起客户端小程序设置界面，返回用户设置的操作结果。
   *
   * 注：设置界面只会出现小程序已经向用户请求过的权限。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.openSetting({
   *       success: (res) => {
   *
   *          // res.authSetting = {
   *          //   "scope.userInfo": true,
   *          //   "scope.userLocation": true
   *          // }
   *
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/setting.html#wxopensettingobject
   */
  function openSetting(OBJECT: openSetting.Param): void

  namespace getSetting {
    type Param = {
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
       * 用户授权结果，其中 key 为 scope 值，value 为 Bool 值，表示用户是否允许授权，详见 [scope 列表](https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html#scope-列表)
       */
      authSetting: any
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
   * 获取用户的当前设置。
   *
   * 注：返回值中只会出现小程序已经向用户请求过的权限。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.getSetting({
   *       success: (res) => {
   *
   *          // res.authSetting = {
   *          //   "scope.userInfo": true,
   *          //   "scope.userLocation": true
   *          // }
   *
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/setting.html#wxgetsettingobject
   */
  function getSetting(OBJECT: getSetting.Param): void

}
