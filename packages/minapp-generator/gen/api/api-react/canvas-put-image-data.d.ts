// https://developers.weixin.qq.com/miniprogram/dev/api/canvas/put-image-data.html

export namespace wx {
  namespace canvasPutImageData {
    type Param0 = {
      /**
       * 画布标识，传入 [`<canvas />`](https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html) 的 canvas-id
       */
      canvasId: string
      /**
       * 图像像素点数据，一维数组，每四项表示一个像素点的rgba
       */
      data: Uint8ClampedArray
      /**
       * 源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量）
       */
      x: number
      /**
       * 源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量）
       */
      y: number
      /**
       * 源图像数据矩形区域的宽度
       */
      width: number
      /**
       * 源图像数据矩形区域的高度
       */
      height?: number
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
    type Param0PropSuccess = (res: any) => any
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
   * 将像素数据绘制到画布的方法。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<canvas/>` 组件
   *
   * **示例代码：**
   *
   *     ```javascript
   *     const data = new Uint8ClampedArray([255, 0, 0, 1])
   *     wx.canvasPutImageData({
   *       canvasId: 'myCanvas',
   *       x: 0,
   *       y: 0,
   *       width: 1,
   *       data: data,
   *       success(res) {}
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/canvas/put-image-data.html#wxcanvasputimagedataobject-this
   */
  function canvasPutImageData(OBJECT: canvasPutImageData.Param0, instance?: any): void

}
