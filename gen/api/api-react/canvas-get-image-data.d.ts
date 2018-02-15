// https://mp.weixin.qq.com/debug/wxadoc/dev/api/canvas/get-image-data.html

export namespace wx {
  type IWxCanvasGetImageDataObject = {
    /**
     * 画布标识，传入 [`<canvas />`](https://mp.weixin.qq.com/debug/wxadoc/dev/component/canvas.html) 的 canvas-id
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
    success?: (res: {
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
   * @since 1.9.0
   *
   * 返回一个数组，用来描述 canvas 区域隐含的像素数据
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
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/canvas/get-image-data.html#wxcanvasgetimagedataobject
   */
  function canvasGetImageData(OBJECT: IWxCanvasGetImageDataObject): void
}
