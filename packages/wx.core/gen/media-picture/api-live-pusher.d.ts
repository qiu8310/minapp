// https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-live-pusher.html

export namespace wx {
  /**
   * @since 1.7.0
   *
   * 创建并返回 `live-pusher` 上下文 `LivePusherContext` 对象，`LivePusherContext` 与页面的 `<live-pusher />` 组件绑定，一个页面只能有一个 `live-pusher`，通过它可以操作对应的 `<live-pusher/>` 组件。 在自定义组件下，第一个参数传入组件实例this，以操作组件内 `<live-pusher/>` 组件
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-live-pusher.html#wxcreatelivepushercontext
   */
  function createLivePusherContext(): LivePusherContext
  class LivePusherContext {
    /**
     * 播放推流
     */
    start(OBJECT: {
      /**
       * 接口调用成功的回调函数
       */
      success?: (res: any) => any

      /**
       * 接口调用失败的回调函数
       */
      fail?: (err: any) => any

      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?: () => any
    }): any
    /**
     * 停止推流
     */
    stop(OBJECT: {
      /**
       * 接口调用成功的回调函数
       */
      success?: (res: any) => any

      /**
       * 接口调用失败的回调函数
       */
      fail?: (err: any) => any

      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?: () => any
    }): any
    /**
     * 暂停推流
     */
    pause(OBJECT: {
      /**
       * 接口调用成功的回调函数
       */
      success?: (res: any) => any

      /**
       * 接口调用失败的回调函数
       */
      fail?: (err: any) => any

      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?: () => any
    }): any
    /**
     * 恢复推流
     */
    resume(OBJECT: {
      /**
       * 接口调用成功的回调函数
       */
      success?: (res: any) => any

      /**
       * 接口调用失败的回调函数
       */
      fail?: (err: any) => any

      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?: () => any
    }): any
    /**
     * 切换前后摄像头
     */
    switchCamera(OBJECT: {
      /**
       * 接口调用成功的回调函数
       */
      success?: (res: any) => any

      /**
       * 接口调用失败的回调函数
       */
      fail?: (err: any) => any

      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?: () => any
    }): any
  }
}
