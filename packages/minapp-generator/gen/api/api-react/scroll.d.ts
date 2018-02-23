// https://mp.weixin.qq.com/debug/wxadoc/dev/api/scroll.html

export namespace wx {
  namespace pageScrollTo {
    type Param = {
      /**
       * 滚动到页面的目标位置（单位px）
       */
      scrollTop: number
      /**
       * 滚动动画的时长，默认300ms，单位 ms
       */
      duration?: number
    }
  }
  /**
   * @since 1.4.0
   *
   * 将页面滚动到目标位置。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.pageScrollTo({
   *       scrollTop: 0,
   *       duration: 300
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/scroll.html#wxpagescrolltoobject
   */
  function pageScrollTo(OBJECT: pageScrollTo.Param): void

}
