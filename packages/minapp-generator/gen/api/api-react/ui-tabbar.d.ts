// https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-tabbar.html

export namespace wx {
  namespace setTabBarBadge {
    type Param = {
      /**
       * tabBar的哪一项，从左边算起
       */
      index: number
      /**
       * 显示的文本，超过 3 个字符则显示成“…”
       */
      text: string
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
   * @since 1.9.0
   *
   * 为 tabBar 某一项的右上角添加文本
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.setTabBarBadge({
   *       index: 0,
   *       text: '1'
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-tabbar.html#wxsettabbarbadgeobject
   */
  function setTabBarBadge(OBJECT: setTabBarBadge.Param): void

  namespace removeTabBarBadge {
    type Param = {
      /**
       * tabBar的哪一项，从左边算起
       */
      index: number
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
   * @since 1.9.0
   *
   * 移除 tabBar 某一项右上角的文本
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-tabbar.html#wxremovetabbarbadgeobject
   */
  function removeTabBarBadge(OBJECT: removeTabBarBadge.Param): void

  namespace showTabBarRedDot {
    type Param = {
      /**
       * tabBar的哪一项，从左边算起
       */
      index: number
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
   * @since 1.9.0
   *
   * 显示 tabBar 某一项的右上角的红点
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-tabbar.html#wxshowtabbarreddotobject
   */
  function showTabBarRedDot(OBJECT: showTabBarRedDot.Param): void

  namespace hideTabBarRedDot {
    type Param = {
      /**
       * tabBar的哪一项，从左边算起
       */
      index: number
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
   * @since 1.9.0
   *
   * 隐藏 tabBar 某一项的右上角的红点
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-tabbar.html#wxhidetabbarreddotobject
   */
  function hideTabBarRedDot(OBJECT: hideTabBarRedDot.Param): void

  namespace setTabBarStyle {
    type Param = {
      /**
       * tab 上的文字默认颜色
       */
      color?: string
      /**
       * tab 上的文字选中时的颜色
       */
      selectedColor?: string
      /**
       * tab 的背景色
       */
      backgroundColor?: string
      /**
       * tabbar上边框的颜色， 仅支持 black/white
       */
      borderStyle?: string
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
   * @since 1.9.0
   *
   * 动态设置 tabBar 的整体样式
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.setTabBarStyle({
   *         color: '#FF0000',
   *         selectedColor: '#00FF00',
   *         backgroundColor: '#0000FF',
   *         borderStyle: 'white'
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-tabbar.html#wxsettabbarstyleobject
   */
  function setTabBarStyle(OBJECT: setTabBarStyle.Param): void

  namespace setTabBarItem {
    type Param = {
      /**
       * tabBar 的哪一项，从左边算起
       */
      index: number
      /**
       * tab 上按钮文字
       */
      text?: string
      /**
       * 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 postion 为 top 时，此参数无效，不支持网络图片
       */
      iconPath?: string
      /**
       * 选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 postion 为 top 时，此参数无效
       */
      selectedIconPath?: string
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
   * @since 1.9.0
   *
   * 动态设置 tabBar 某一项的内容
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.setTabBarItem({
   *         index: 0,
   *         text: 'text',
   *         iconPath: '/path/to/iconPath',
   *         selectedIconPath: '/path/to/selectedIconPath'
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-tabbar.html#wxsettabbaritemobject
   */
  function setTabBarItem(OBJECT: setTabBarItem.Param): void

  namespace showTabBar {
    type Param = {
      /**
       * 是否需要动画效果，默认无
       */
      animation?: boolean
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
   * @since 1.9.0
   *
   * 显示 tabBar
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-tabbar.html#wxshowtabbarobject
   */
  function showTabBar(OBJECT: showTabBar.Param): void

  namespace hideTabBar {
    type Param = {
      /**
       * 是否需要动画效果，默认无
       */
      animation?: boolean
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
   * @since 1.9.0
   *
   * 隐藏 tabBar
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-tabbar.html#wxhidetabbarobject
   */
  function hideTabBar(OBJECT: hideTabBar.Param): void

}
