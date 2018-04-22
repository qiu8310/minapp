// https://developers.weixin.qq.com/miniprogram/dev/api/canvas/create-canvas-context.html

export namespace wx {
  /**
   *
   * **定义：**
   *
   * 创建 canvas 绘图上下文（指定 canvasId）。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<canvas/>` 组件
   *
   * **Tip**: 需要指定 canvasId，该绘图上下文只作用于对应的 `<canvas/>`
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/canvas/create-canvas-context.html#wxcreatecanvascontextcanvasid-this
   */
  function createCanvasContext(canvasId: string, componentInstance: any): CanvasContext

}
