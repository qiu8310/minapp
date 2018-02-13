// https://mp.weixin.qq.com/debug/wxadoc/dev/api/systeminfo.html

export namespace wx {
  type IWxGetSystemInfoObject = {
    /**
     * 接口调用成功的回调
     */
    success: (res: {
      /**
       * 手机品牌
       *
       * @since 1.5.0
       */
      brand: any

      /**
       * 手机型号
       */
      model: any

      /**
       * 设备像素比
       */
      pixelRatio: any

      /**
       * 屏幕宽度
       *
       * @since 1.1.0
       */
      screenWidth: any

      /**
       * 屏幕高度
       *
       * @since 1.1.0
       */
      screenHeight: any

      /**
       * 可使用窗口宽度
       */
      windowWidth: any

      /**
       * 可使用窗口高度
       */
      windowHeight: any

      /**
       * 状态栏的高度
       *
       * @since 1.9.0
       */
      statusBarHeight: any

      /**
       * 微信设置的语言
       */
      language: any

      /**
       * 微信版本号
       */
      version: any

      /**
       * 操作系统版本
       */
      system: any

      /**
       * 客户端平台
       */
      platform: any

      /**
       * 用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px
       *
       * @since 1.5.0
       */
      fontSizeSetting: any

      /**
       * 客户端基础库版本
       *
       * @since 1.1.0
       */
      SDKVersion: any
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
   * 获取系统信息。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.getSystemInfo({
   *       success: function(res) {
   *         console.log(res.model)
   *         console.log(res.pixelRatio)
   *         console.log(res.windowWidth)
   *         console.log(res.windowHeight)
   *         console.log(res.language)
   *         console.log(res.version)
   *         console.log(res.platform)
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/systeminfo.html#wxgetsysteminfoobject
   */
  function getSystemInfo(OBJECT: IWxGetSystemInfoObject): void
  type IWxGetSystemInfoSyncReturn = {
    /**
     * 手机品牌
     *
     * @since 1.5.0
     */
    brand: any

    /**
     * 手机型号
     */
    model: any

    /**
     * 设备像素比
     */
    pixelRatio: any

    /**
     * 屏幕宽度
     *
     * @since 1.1.0
     */
    screenWidth: any

    /**
     * 屏幕高度
     *
     * @since 1.1.0
     */
    screenHeight: any

    /**
     * 可使用窗口宽度
     */
    windowWidth: any

    /**
     * 可使用窗口高度
     */
    windowHeight: any

    /**
     * 微信设置的语言
     */
    language: any

    /**
     * 微信版本号
     */
    version: any

    /**
     * 操作系统版本
     */
    system: any

    /**
     * 客户端平台
     */
    platform: any

    /**
     * 用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px
     *
     * @since 1.5.0
     */
    fontSizeSetting: any

    /**
     * 客户端基础库版本
     *
     * @since 1.1.0
     */
    SDKVersion: any
  }
  /**
   * 获取系统信息同步接口
   *
   * **示例代码：**
   *
   *     ```javascript
   *     try {
   *       var res = wx.getSystemInfoSync()
   *       console.log(res.model)
   *       console.log(res.pixelRatio)
   *       console.log(res.windowWidth)
   *       console.log(res.windowHeight)
   *       console.log(res.language)
   *       console.log(res.version)
   *       console.log(res.platform)
   *     } catch (e) {
   *       // Do something when catch error
   *     }
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/systeminfo.html#wxgetsysteminfosync
   */
  function getSystemInfoSync(): IWxGetSystemInfoSyncReturn
}
