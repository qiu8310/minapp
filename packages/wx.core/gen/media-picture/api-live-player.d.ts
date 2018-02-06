// https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-live-player.html

export namespace wx {
  /**
   * @since 1.7.0
   *
   * 操作对应的 `<live-player/>` 组件。 创建并返回 `live-player` 上下文 `LivePlayerContext` 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<live-player/>` 组件
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-live-player.html#wxcreateliveplayercontextdomid-this
   */
  function createLivePlayerContext(domId: any, instance?: any): LivePlayerContext
  class LivePlayerContext {
    /**
     * 播放
     */
    play(OBJECT: {
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
     * 停止
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
     * 静音
     */
    mute(OBJECT: {
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
     * 进入全屏
     */
    requestFullScreen(OBJECT: {
      /**
       * 有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）
       */
      direction?: number

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
     * 退出全屏
     */
    exitFullScreen(OBJECT: {
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
