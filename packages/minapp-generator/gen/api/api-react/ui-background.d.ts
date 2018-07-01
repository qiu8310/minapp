// https://developers.weixin.qq.com/miniprogram/dev/api/ui-background.html

export namespace wx {
  namespace setBackgroundColor {
    type Param = {
      /**
       * 窗口的背景色
       */
      backgroundColor?: string
      /**
       * 顶部窗口的背景色，仅 iOS 支持
       */
      backgroundColorTop?: string
      /**
       * 底部窗口的背景色，仅 iOS 支持
       */
      backgroundColorBottom?: string
    }
  }
  /**
   * @since 2.1.0
   *
   * 动态设置窗口的背景色
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.setBackgroundColor({
   *         backgroundColor: '#ffffff', // 窗口的背景色为白色
   *     })
   *
   *     wx.setBackgroundColor({
   *         backgroundColorTop: '#ffffff', // 顶部窗口的背景色为白色
   *         backgroundColorBottom: '#ffffff', // 底部窗口的背景色为白色
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/ui-background.html#wxsetbackgroundcolorobject
   */
  function setBackgroundColor(OBJECT: setBackgroundColor.Param): void

  namespace setBackgroundTextStyle {
    type Param = {
      /**
       * 下拉背景字体、loading 图的样式，仅支持 'dark', 'light'
       */
      textStyle?: string
    }
  }
  /**
   * @since 2.1.0
   *
   * 动态设置下拉背景字体、loading 图的样式
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.setBackgroundTextStyle({
   *         textStyle: 'dark', // 下拉背景字体、loading 图的样式为dark
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/ui-background.html#wxsetbackgroundtextstyleobject
   */
  function setBackgroundTextStyle(OBJECT: setBackgroundTextStyle.Param): void

}
