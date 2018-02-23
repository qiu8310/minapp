// https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-picture.html

export namespace wx {
  namespace chooseImage {
    type Param = {
      /**
       * 最多可以选择的图片张数，默认9
       */
      count?: number
      /**
       * original 原图，compressed 压缩图，默认二者都有
       */
      sizeType?: string[]
      /**
       * album 从相册选图，camera 使用相机，默认二者都有
       */
      sourceType?: string[]
      /**
       * 成功则返回图片的本地文件路径列表 tempFilePaths
       */
      success: ParamPropSuccess
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
     * 成功则返回图片的本地文件路径列表 tempFilePaths
     */
    type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    type ParamPropSuccessParam = {
      /**
       * 图片的本地文件路径列表
       */
      tempFilePaths: string[]
      /**
       * 图片的本地文件列表，每一项是一个 File 对象
       *
       * @since 1.2.0
       */
      tempFiles: ParamPropSuccessParamPropTempFiles
    }
    /**
     * 图片的本地文件列表，每一项是一个 File 对象
     */
    type ParamPropSuccessParamPropTempFiles = ParamPropSuccessParamPropTempFilesItem[]
    type ParamPropSuccessParamPropTempFilesItem = {
      /**
       * 本地文件路径
       */
      path: string
      /**
       * 本地文件大小，单位：B
       */
      size: number
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
   * 从本地相册选择图片或使用相机拍照。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.chooseImage({
   *       count: 1, // 默认9
   *       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
   *       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
   *       success: function (res) {
   *         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
   *         var tempFilePaths = res.tempFilePaths
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-picture.html#wxchooseimageobject
   */
  function chooseImage(OBJECT: chooseImage.Param): void

  namespace previewImage {
    type Param = {
      /**
       * 当前显示图片的链接，不填则默认为 urls 的第一张
       */
      current?: string
      /**
       * 需要预览的图片链接列表
       */
      urls: string[]
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
  /**
   * 预览图片。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.previewImage({
   *       current: '', // 当前显示图片的http链接
   *       urls: [] // 需要预览的图片http链接列表
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-picture.html#wxpreviewimageobject
   */
  function previewImage(OBJECT: previewImage.Param): void

  namespace getImageInfo {
    type Param = {
      /**
       * 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
       */
      src: string
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
       * 图片宽度，单位px
       */
      width: number
      /**
       * 图片高度，单位px
       */
      height: number
      /**
       * 返回图片的本地路径
       */
      path: string
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
   * 获取图片信息
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.getImageInfo({
   *       src: 'images/a.jpg',
   *       success: function (res) {
   *         console.log(res.width)
   *         console.log(res.height)
   *       }
   *     })
   *
   *     wx.chooseImage({
   *       success: function (res) {
   *         wx.getImageInfo({
   *           src: res.tempFilePaths[0],
   *           success: function (res) {
   *             console.log(res.width)
   *             console.log(res.height)
   *           }
   *         })
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-picture.html#wxgetimageinfoobject
   */
  function getImageInfo(OBJECT: getImageInfo.Param): void

  namespace saveImageToPhotosAlbum {
    type Param = {
      /**
       * 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
       */
      filePath: string
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
      errMsg: string
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
   * 保存图片到系统相册。需要[用户授权](https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html) scope.writePhotosAlbum
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.saveImageToPhotosAlbum({
   *         success(res) {
   *         }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-picture.html#wxsaveimagetophotosalbumobject
   */
  function saveImageToPhotosAlbum(OBJECT: saveImageToPhotosAlbum.Param): void

}
