// https://developers.weixin.qq.com/miniprogram/dev/api/share.html

export namespace wx {
  namespace showShareMenu {
    type Param = {
      /**
       * 是否使用带 shareTicket 的转发[详情](https://developers.weixin.qq.com/miniprogram/dev/api/share.html#获取更多转发信息)
       */
      withShareTicket?: boolean
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
    type ParamPropSuccess = (res: any) => any
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
   * 显示当前页面的转发按钮
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.showShareMenu({
   *       withShareTicket: true
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/share.html#wxshowsharemenuobject
   */
  function showShareMenu(OBJECT: showShareMenu.Param): void

  namespace hideShareMenu {
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
    type ParamPropSuccess = (res: any) => any
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
   * 隐藏转发按钮
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.hideShareMenu()
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/share.html#wxhidesharemenuobject
   */
  function hideShareMenu(OBJECT: hideShareMenu.Param): void

  namespace updateShareMenu {
    type Param = {
      /**
       * 是否使用带 shareTicket 的转发[详情](https://developers.weixin.qq.com/miniprogram/dev/api/share.html#获取更多转发信息)
       */
      withShareTicket?: boolean
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
    type ParamPropSuccess = (res: any) => any
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
   * 更新转发属性
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.updateShareMenu({
   *       withShareTicket: true,
   *       success() {
   *       }
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/share.html#wxupdatesharemenuobject
   */
  function updateShareMenu(OBJECT: updateShareMenu.Param): void

  namespace getShareInfo {
    type Param = {
      /**
       * shareTicket
       */
      shareTicket: string
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
    type ParamPropSuccess = (res: any) => any
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
   * 获取转发详细信息
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/share.html#wxgetshareinfoobject
   */
  function getShareInfo(OBJECT: getShareInfo.Param): void

}
