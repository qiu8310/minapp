// https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-tabbar.html

export namespace wx {
  type IWxSetTabBarBadgeObject = {
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
    success?: (res: any) => any

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
  function setTabBarBadge(OBJECT: IWxSetTabBarBadgeObject): void
  type IWxRemoveTabBarBadgeObject = {
    /**
     * tabBar的哪一项，从左边算起
     */
    index: number

    /**
     * 接口调用成功的回调函数
     */
    success?: (res: any) => any

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
   * @since 1.9.0
   *
   * 移除 tabBar 某一项右上角的文本
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-tabbar.html#wxremovetabbarbadgeobject
   */
  function removeTabBarBadge(OBJECT: IWxRemoveTabBarBadgeObject): void
  type IWxShowTabBarRedDotObject = {
    /**
     * tabBar的哪一项，从左边算起
     */
    index: number

    /**
     * 接口调用成功的回调函数
     */
    success?: (res: any) => any

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
   * @since 1.9.0
   *
   * 显示 tabBar 某一项的右上角的红点
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-tabbar.html#wxshowtabbarreddotobject
   */
  function showTabBarRedDot(OBJECT: IWxShowTabBarRedDotObject): void
  type IWxHideTabBarRedDotObject = {
    /**
     * tabBar的哪一项，从左边算起
     */
    index: number

    /**
     * 接口调用成功的回调函数
     */
    success?: (res: any) => any

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
   * @since 1.9.0
   *
   * 隐藏 tabBar 某一项的右上角的红点
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-tabbar.html#wxhidetabbarreddotobject
   */
  function hideTabBarRedDot(OBJECT: IWxHideTabBarRedDotObject): void
  type IWxSetTabBarStyleObject = {
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
    success?: (res: any) => any

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
  function setTabBarStyle(OBJECT: IWxSetTabBarStyleObject): void
  type IWxSetTabBarItemObject = {
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
    success?: (res: any) => any

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
  function setTabBarItem(OBJECT: IWxSetTabBarItemObject): void
  type IWxShowTabBarObject = {
    /**
     * 是否需要动画效果，默认无
     */
    aniamtion?: boolean

    /**
     * 接口调用成功的回调函数
     */
    success?: (res: any) => any

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
   * @since 1.9.0
   *
   * 显示 tabBar
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-tabbar.html#wxshowtabbarobject
   */
  function showTabBar(OBJECT: IWxShowTabBarObject): void
  type IWxHideTabBarObject = {
    /**
     * 是否需要动画效果，默认无
     */
    aniamtion?: boolean

    /**
     * 接口调用成功的回调函数
     */
    success?: (res: any) => any

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
   * @since 1.9.0
   *
   * 隐藏 tabBar
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-tabbar.html#wxhidetabbarobject
   */
  function hideTabBar(OBJECT: IWxHideTabBarObject): void
}
