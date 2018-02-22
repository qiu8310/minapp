// https://mp.weixin.qq.com/debug/wxadoc/dev/api/setNavigationBarColor.html

export namespace wx {
  namespace setNavigationBarColor {
    type Param = {
      /**
       * 前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000
       */
      frontColor?: string
      /**
       * 背景颜色值，有效值为十六进制颜色
       */
      backgroundColor?: string
      /**
       * 动画效果
       *
       * **animation.timingFunc 有效值：**
       *
       *   值          |  说明             
       * --------------|-------------------
       *   linear      |动画从头到尾的速度是相同的。
       *   easeIn      |  动画以低速开始   
       *   easeOut     |  动画以低速结束。 
       *   easeInOut   |动画以低速开始和结束。
       */
      animation?: ParamPropAnimation
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
     * 动画效果
     *
     * **animation.timingFunc 有效值：**
     *
     * 值          |  说明
     * --------------|-------------------
     * linear      |动画从头到尾的速度是相同的。
     * easeIn      |  动画以低速开始
     * easeOut     |  动画以低速结束。
     * easeInOut   |动画以低速开始和结束。
     */
    type ParamPropAnimation = {
      /**
       * 动画变化时间，默认0，单位：毫秒
       */
      duration?: number
      /**
       * 动画变化方式，默认 linear
       */
      timingFunc?: string
    }
    /**
     * 接口调用成功的回调函数
     */
    type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    type ParamPropSuccessParam = {
      /**
       * 调用结果
       */
      errMsg?: string
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
   * @since 1.4.0
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.setNavigationBarColor({
   *         frontColor: '#ffffff',
   *         backgroundColor: '#ff0000',
   *         animation: {
   *             duration: 400,
   *             timingFunc: 'easeIn'
   *         }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/setNavigationBarColor.html#wxsetnavigationbarcolorobject
   */
  function setNavigationBarColor(OBJECT: setNavigationBarColor.Param): void

}
