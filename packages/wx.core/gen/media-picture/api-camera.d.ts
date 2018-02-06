// https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-camera.html

export namespace wx {
  /**
   * @since 1.6.0
   *
   * 创建并返回 camera 上下文 `cameraContext` 对象，`cameraContext` 与页面的 `camera` 组件绑定，一个页面只能有一个camera，通过它可以操作对应的 `<camera/>` 组件。 在自定义组件下，第一个参数传入组件实例this，以操作组件内 `<camera/>` 组件
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-camera.html#wxcreatecameracontextthis
   */
  function createCameraContext(instance?: any): CameraContext
  class CameraContext {
    /**
     * 拍照，可指定质量，成功则返回图片
     */
    takePhoto(OBJECT: {
      /**
       * 成像质量，值为high, normal, low，默认normal
       */
      quality?: string

      /**
       * 接口调用成功的回调函数 ，res = { tempImagePath }
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
     * 开始录像
     */
    startRecord(OBJECT: {
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

      /**
       * 超过30s或页面onHide时会结束录像，res = { tempThumbPath, tempVideoPath }
       */
      timeoutCallback?: () => any
    }): any
    /**
     * 结束录像，成功则返回封面与视频
     */
    stopRecord(OBJECT: {
      /**
       * 接口调用成功的回调函数 ，res = { tempThumbPath, tempVideoPath }
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
