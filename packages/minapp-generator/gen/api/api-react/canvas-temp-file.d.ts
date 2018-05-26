// https://developers.weixin.qq.com/miniprogram/dev/api/canvas/temp-file.html

export namespace wx {
  namespace canvasToTempFilePath {
    type Param0 = {
      /**
       * 画布x轴起点（默认0）
       *
       * @since 1.2.0
       */
      x?: number
      /**
       * 画布y轴起点（默认0）
       *
       * @since 1.2.0
       */
      y?: number
      /**
       * 画布宽度（默认为canvas宽度-x）
       *
       * @since 1.2.0
       */
      width?: number
      /**
       * 画布高度（默认为canvas高度-y）
       *
       * @since 1.2.0
       */
      height?: number
      /**
       * 输出图片宽度（默认为 width * 屏幕像素密度）
       *
       * @since 1.2.0
       */
      destWidth?: number
      /**
       * 输出图片高度（默认为 height * 屏幕像素密度）
       *
       * @since 1.2.0
       */
      destHeight?: number
      /**
       * 画布标识，传入 [`<canvas/>`](https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html) 的 canvas-id
       */
      canvasId: string
      /**
       * 目标文件的类型，只支持 'jpg' 或 'png'。默认为 'png'
       *
       * @since 1.7.0
       */
      fileType?: string
      /**
       * 图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理
       *
       * @since 1.7.0
       */
      quality?: number
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
   * 把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<canvas/>` 组件
   *
   * **Bug & Tip：**
   *
   * 1.  `tip`: 在 `draw` 回调里调用该方法才能保证图片导出成功。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.canvasToTempFilePath({
   *       x: 100,
   *       y: 200,
   *       width: 50,
   *       height: 50,
   *       destWidth: 100,
   *       destHeight: 100,
   *       canvasId: 'myCanvas',
   *       success: function(res) {
   *         console.log(res.tempFilePath)
   *       } 
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/canvas/temp-file.html#wxcanvastotempfilepathobject-this
   */
  function canvasToTempFilePath(OBJECT: canvasToTempFilePath.Param0, instance?: any): void

}
