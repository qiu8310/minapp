// https://mp.weixin.qq.com/debug/wxadoc/dev/api/share.html

export namespace wx {
  namespace showShareMenu {
    type Param = {
      /**
       * 是否使用带 shareTicket 的转发[详情](https://mp.weixin.qq.com/debug/wxadoc/dev/api/share.html#获取更多转发信息)
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
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/share.html#wxshowsharemenuobject
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
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/share.html#wxhidesharemenuobject
   */
  function hideShareMenu(OBJECT: hideShareMenu.Param): void

  namespace updateShareMenu {
    type Param = {
      /**
       * 是否使用带 shareTicket 的转发[详情](https://mp.weixin.qq.com/debug/wxadoc/dev/api/share.html#获取更多转发信息)
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
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/share.html#wxupdatesharemenuobject
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
    type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    type ParamPropSuccessParam = {
      /**
       * 错误信息
       */
      errMsg: string
      /**
       * 包括敏感数据在内的完整转发信息的加密数据，详细见[加密数据解密算法](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html#加密数据解密算法)
       *
       * **encryptedData 解密后为一个 JSON 结构，包含字段如下：**
       *
       *   字段      |  说明            
       * ------------|------------------
       *   openGId   |群对当前小程序的唯一 ID
       *
       * **Tip:** 如需要展示群名称，可以使用[开放数据组件](https://mp.weixin.qq.com/debug/wxadoc/dev/component/open-data.html)
       */
      encryptedData: string
      /**
       * 加密算法的初始向量，详细见[加密数据解密算法](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html#加密数据解密算法)
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
   * @since 1.1.0
   *
   * 获取转发详细信息
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/share.html#wxgetshareinfoobject
   */
  function getShareInfo(OBJECT: getShareInfo.Param): void

}
