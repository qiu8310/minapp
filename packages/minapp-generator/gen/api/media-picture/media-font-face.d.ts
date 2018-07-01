// https://developers.weixin.qq.com/miniprogram/dev/api/media-fontFace.html

export namespace wx {
  namespace loadFontFace {
    type Param = {
      /**
       * 定义的字体名称
       */
      family: string
      /**
       * 字体资源的地址
       */
      source: string
      /**
       * 可选的字体描述符
       */
      desc?: ParamPropDesc
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
     * 可选的字体描述符
     */
    type ParamPropDesc = {
      /**
       * normal / italic / oblique
       */
      style?: string
      /**
       * normal / bold / 100 / 200../ 900
       */
      weight?: string
      /**
       * normal / small-caps / inherit
       */
      variant?: string
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
   * @since 2.1.0
   *
   * 动态加载网络字体
   *
   * **Tip：**
   *
   * 1.  引入的外部字体资源，建议格式为TTF和WOFF，WOFF2在低版本的IOS上会不兼容。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.loadFontFace({
   *       family: 'Bitstream Vera Serif Bold',
   *       source: 'url("http://developer.mozilla.org/@api/deki/files/2934/=VeraSeBd.ttf")',
   *       success: function(res) {
   *         console.log(res.status) //  loaded
   *       },
   *       fail: function(res) {
   *         console.log(res.status) //  error
   *       },
   *       complete: function(res) {
   *         console.log(res.status);
   *       }
   *     });
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/media-fontFace.html#wxloadfontfaceobject
   */
  function loadFontFace(OBJECT: loadFontFace.Param): void

}
