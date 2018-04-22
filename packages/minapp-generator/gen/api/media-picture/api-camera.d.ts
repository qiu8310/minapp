// https://developers.weixin.qq.com/miniprogram/dev/api/api-camera.html

export namespace wx {
  /**
   * @since 1.6.0
   *
   * 创建并返回 camera 上下文 `cameraContext` 对象，`cameraContext` 与页面的 `camera` 组件绑定，一个页面只能有一个camera，通过它可以操作对应的 `<camera/>` 组件。 在自定义组件下，第一个参数传入组件实例this，以操作组件内 `<camera/>` 组件
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/api-camera.html#wxcreatecameracontextthis
   */
  function createCameraContext(instance?: any): CameraContext

  namespace CameraContext {
    namespace takePhoto {
      type Param = {
        /**
         * 成像质量，值为high, normal, low，默认normal
         */
        quality?: string
        /**
         * 接口调用成功的回调函数 ，res = { tempImagePath }
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
       * 接口调用成功的回调函数 ，res = { tempImagePath }
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
    namespace startRecord {
      type Param = {
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
        /**
         * 超过30s或页面onHide时会结束录像，res = { tempThumbPath, tempVideoPath }
         */
        timeoutCallback?: ParamPropTimeoutCallback
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
      /**
       * 超过30s或页面onHide时会结束录像，res = { tempThumbPath, tempVideoPath }
       */
      type ParamPropTimeoutCallback = () => any
    }
    namespace stopRecord {
      type Param = {
        /**
         * 接口调用成功的回调函数 ，res = { tempThumbPath, tempVideoPath }
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
       * 接口调用成功的回调函数 ，res = { tempThumbPath, tempVideoPath }
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
  }
  class CameraContext {
    /**
     * 拍照，可指定质量，成功则返回图片
     */
    takePhoto(OBJECT: CameraContext.takePhoto.Param): any
    /**
     * 开始录像
     */
    startRecord(OBJECT: CameraContext.startRecord.Param): any
    /**
     * 结束录像，成功则返回封面与视频
     */
    stopRecord(OBJECT: CameraContext.stopRecord.Param): any
  }
}
