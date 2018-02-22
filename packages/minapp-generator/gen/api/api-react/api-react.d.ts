// https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html

export namespace wx {
  namespace showToast {
    type Param = {
      /**
       * 提示的内容
       */
      title?: string
      /**
       * 图标，有效值 "success", "loading", "none"
       *
       * **icon有效值：**
       *
       *   有效值    |  说明                                 | 最低版本 
       * ------------|---------------------------------------|----------
       *   success   |显示成功图标，此时 title 文本最多显示 7 个汉字长度。默认值|          
       *   loading   |显示加载图标，此时 title 文本最多显示 7 个汉字长度。|          
       *   none      |不显示图标，此时 title 文本最多可显示两行|  1.9.0   
       */
      icon?: string
      /**
       * 自定义图标的本地路径，image 的优先级高于 icon
       *
       * @since 1.1.0
       */
      image?: string
      /**
       * 提示的延迟时间，单位毫秒，默认：1500
       */
      duration?: number
      /**
       * 是否显示透明蒙层，防止触摸穿透，默认：false
       */
      mask?: boolean
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
   * 显示消息提示框
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.showToast({
   *       title: '成功',
   *       icon: 'success',
   *       duration: 2000
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html#wxshowtoastobject
   */
  function showToast(OBJECT: showToast.Param): void

  namespace showLoading {
    type Param = {
      /**
       * 提示的内容
       */
      title?: string
      /**
       * 是否显示透明蒙层，防止触摸穿透，默认：false
       */
      mask?: boolean
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
   * 显示 loading 提示框, 需主动调用 [wx.hideLoading](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html#wxhideloading) 才能关闭提示框
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html#wxshowloadingobject
   */
  function showLoading(OBJECT: showLoading.Param): void

  /**
   * 隐藏消息提示框
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html#wxhidetoast
   */
  function hideToast(): void

  /**
   * @since 1.1.0
   *
   * 隐藏 loading 提示框
   *
   * **示例：**
   *
   *     ```javascript
   *     wx.showLoading({
   *       title: '加载中',
   *     })
   *
   *     setTimeout(function(){
   *       wx.hideLoading()
   *     },2000)
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html#wxhideloading
   */
  function hideLoading(): void

  namespace showModal {
    type Param = {
      /**
       * 提示的标题
       */
      title?: string
      /**
       * 提示的内容
       */
      content?: string
      /**
       * 是否显示取消按钮，默认为 true
       */
      showCancel?: boolean
      /**
       * 取消按钮的文字，默认为"取消"，最多 4 个字符
       */
      cancelText?: string
      /**
       * 取消按钮的文字颜色，默认为"#000000"
       */
      cancelColor?: string
      /**
       * 确定按钮的文字，默认为"确定"，最多 4 个字符
       */
      confirmText?: string
      /**
       * 确定按钮的文字颜色，默认为"#3CC51F"
       */
      confirmColor?: string
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
       * 为 true 时，表示用户点击了确定按钮
       */
      confirm?: boolean
      /**
       * 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）
       *
       * @since 1.1.0
       */
      cancel?: boolean
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
   * ​显示模态弹窗
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.showModal({
   *       title: '提示',
   *       content: '这是一个模态弹窗',
   *       success: function(res) {
   *         if (res.confirm) {
   *           console.log('用户点击确定')
   *         } else if (res.cancel) {
   *           console.log('用户点击取消')
   *         }
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html#wxshowmodalobject
   */
  function showModal(OBJECT: showModal.Param): void

  namespace showActionSheet {
    type Param = {
      /**
       * 按钮的文字数组，数组长度最大为6个
       */
      itemList?: string[]
      /**
       * 按钮的文字颜色，默认为"#000000"
       */
      itemColor?: string
      /**
       * 接口调用成功的回调函数，详见返回参数说明
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
     * 接口调用成功的回调函数，详见返回参数说明
     */
    type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    type ParamPropSuccessParam = {
      /**
       * 用户点击的按钮，从上到下的顺序，从0开始
       */
      tapIndex?: number
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
   * ​显示操作菜单
   *
   * **Bug & Tip：**
   *
   * 1.  `bug`: `Android` `6.3.30`，wx.showModal 的返回的 confirm 一直为 true；
   * 2.  `tip`: wx.showActionSheet 点击取消或蒙层时，回调 `fail`, errMsg 为 "showActionSheet:fail cancel"；
   * 3.  `tip`: wx.showLoading 和 wx.showToast 同时只能显示一个，但 wx.hideToast/wx.hideLoading 也应当配对使用；
   * 4.  `tip`: `iOS` wx.showModal 点击蒙层不会关闭模态弹窗，所以尽量避免使用“取消”分支中实现业务逻辑。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.showActionSheet({
   *       itemList: ['A', 'B', 'C'],
   *       success: function(res) {
   *         console.log(res.tapIndex)
   *       },
   *       fail: function(res) {
   *         console.log(res.errMsg)
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html#wxshowactionsheetobject
   */
  function showActionSheet(OBJECT: showActionSheet.Param): void

}
