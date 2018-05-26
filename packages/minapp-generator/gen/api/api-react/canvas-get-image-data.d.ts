// https://developers.weixin.qq.com/miniprogram/dev/api/canvas/get-image-data.html

export namespace wx {
  namespace canvasGetImageData {
    type Param0 = {
      /**
       * 画布标识，传入 [`<canvas />`](https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html) 的 canvas-id
       */
      canvasId: string
      /**
       * 将要被提取的图像数据矩形区域的左上角 x 坐标
       */
      x: number
      /**
       * 将要被提取的图像数据矩形区域的左上角 y 坐标
       */
      y: number
      /**
       * 将要被提取的图像数据矩形区域的宽度
       */
      width: number
      /**
       * 将要被提取的图像数据矩形区域的高度
       */
      height: number
      /**
       * 接口调用成功的回调函数
       */
      success?: Param0PropSuccess
      /**
       * 接口调用失败的回调函数
       */
      fail?: Param0PropFail
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?: Param0PropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    type Param0PropSuccess = (res: Param0PropSuccessParam) => any
    type Param0PropSuccessParam = {
      /**
       * errMsg
       */
      errMsg: string
      /**
       * 图像数据矩形的宽度
       */
      width: number
      /**
       * 图像数据矩形的高度
       */
      height: number
      /**
       * 图像像素点数据，一维数组，每四项表示一个像素点的rgba
       */
      data: Uint8ClampedArray
    }
    /**
     * 接口调用失败的回调函数
     */
    type Param0PropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type Param0PropComplete = () => any
  }
  /**
   * @since 1.9.0
   *
   * 返回一个数组，用来描述 canvas 区域隐含的像素数据。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<canvas/>` 组件
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.canvasGetImageData({
   *       canvasId: 'myCanvas',
   *       x: 0,
   *       y: 0,
   *       width: 100,
   *       height: 100,
   *       success(res) {
   *         console.log(res.width) // 100
   *         console.log(res.height) // 100
   *         console.log(res.data instanceof Uint8ClampedArray) // true
   *         console.log(res.data.length) // 100 * 100 * 4
   *       }
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/canvas/get-image-data.html#wxcanvasgetimagedataobject-this
   */
  function canvasGetImageData(OBJECT: canvasGetImageData.Param0, instance?: any): void

}
