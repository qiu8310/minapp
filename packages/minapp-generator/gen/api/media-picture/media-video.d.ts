// https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-video.html

export namespace wx {
  namespace chooseVideo {
    type Param = {
      /**
       * album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
       */
      sourceType?: string[]
      /**
       * 是否压缩所选的视频源文件，默认值为true，需要压缩
       *
       * @since 1.6.0
       */
      compressed?: boolean
      /**
       * 拍摄视频最长拍摄时间，单位秒。最长支持 60 秒
       */
      maxDuration?: number
      /**
       * 接口调用成功，返回视频文件的临时文件路径，详见返回参数说明
       *
       * **注：文件的临时路径，在小程序本次启动期间可以正常使用，如需持久保存，需在主动调用 [wx.saveFile](https://mp.weixin.qq.com/debug/wxadoc/dev/api/file.html)，在小程序下次启动时才能访问得到。**
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
     * 接口调用成功，返回视频文件的临时文件路径，详见返回参数说明
     *
     * **注：文件的临时路径，在小程序本次启动期间可以正常使用，如需持久保存，需在主动调用 [wx.saveFile](https://mp.weixin.qq.com/debug/wxadoc/dev/api/file.html)，在小程序下次启动时才能访问得到。**
     */
    type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    type ParamPropSuccessParam = {
      /**
       * 选定视频的临时文件路径
       */
      tempFilePath?: any
      /**
       * 选定视频的时间长度
       */
      duration?: any
      /**
       * 选定视频的数据量大小
       */
      size?: any
      /**
       * 返回选定视频的长
       */
      height?: any
      /**
       * 返回选定视频的宽
       */
      width?: any
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
   * 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。
   *
   * **示例代码：**
   *
   *     ```html
   *     <view class="container">
   *         <video src="{{src}}"></video>
   *         <button bindtap="bindButtonTap">获取视频</button>
   *     </view>
   *     ```
   *
   * **示例代码：**
   *
   *     ```javascript
   *     Page({
   *         bindButtonTap: function() {
   *             var that = this
   *             wx.chooseVideo({
   *                 sourceType: ['album','camera'],
   *                 maxDuration: 60,
   *           camera: 'back',
   *                 success: function(res) {
   *                     that.setData({
   *                         src: res.tempFilePath
   *                     })
   *                 }
   *             })
   *         }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-video.html#wxchoosevideoobject
   */
  function chooseVideo(OBJECT: chooseVideo.Param): void

  namespace saveVideoToPhotosAlbum {
    type Param = {
      /**
       * 视频文件路径，可以是临时文件路径也可以是永久文件路径
       */
      filePath?: string
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
   * @since 1.2.0
   *
   * 保存视频到系统相册。需要[用户授权](https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html) scope.writePhotosAlbum
   *
   * **Bug & Tip：**
   *
   * 1.  `tip`: camera 参数在部分 Android 手机下由于系统 ROM 不支持无法生效
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.saveVideoToPhotosAlbum({
   *         success(res) {
   *         }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-video.html#wxsavevideotophotosalbumobject
   */
  function saveVideoToPhotosAlbum(OBJECT: saveVideoToPhotosAlbum.Param): void

}
