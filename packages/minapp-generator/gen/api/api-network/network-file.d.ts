// https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-file.html

export namespace wx {
  namespace uploadFile {
    type Param = {
      /**
       * 开发者服务器 url
       */
      url?: string
      /**
       * 要上传文件资源的路径
       */
      filePath?: string
      /**
       * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
       */
      name?: string
      /**
       * HTTP 请求 Header, header 中不能设置 Referer
       */
      header?: any
      /**
       * HTTP 请求中其他额外的 form data
       */
      formData?: any
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
       * 开发者服务器返回的数据
       */
      data?: string
      /**
       * 开发者服务器返回的 HTTP 状态码
       */
      statusCode?: number
    }
    /**
     * 接口调用失败的回调函数
     */
    type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ParamPropComplete = () => any
    type Return = {
      /**
       * 监听上传进度变化
       *
       * @since 1.4.0
       */
      onProgressUpdate?: ReturnPropOnProgressUpdate
      /**
       * 中断上传任务
       *
       * @since 1.4.0
       */
      abort?: ReturnPropAbort
    }
    /**
     * 监听上传进度变化
     */
    type ReturnPropOnProgressUpdate = (callback: ReturnPropOnProgressUpdateParam) => any
    type ReturnPropOnProgressUpdateParam = (res: ReturnPropOnProgressUpdateParamParam) => any
    type ReturnPropOnProgressUpdateParamParam = {
      /**
       * 上传进度百分比
       */
      progress?: number
      /**
       * 已经上传的数据长度，单位 Bytes
       */
      totalBytesSent?: number
      /**
       * 预期需要上传的数据总长度，单位 Bytes
       */
      totalBytesExpectedToSend?: number
    }
    /**
     * 中断上传任务
     */
    type ReturnPropAbort = () => any
  }
  /**
   * 将本地资源上传到开发者服务器，客户端发起一个 HTTPS POST 请求，其中 `content-type` 为 `multipart/form-data` 。**使用前请先阅读[说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-network.html)**。
   *
   * 如页面通过 [wx.chooseImage](https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-picture.html#wxchooseimageobject) 等接口获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器。
   *
   * **返回值：**
   *
   * @since 1.4.0
   *
   * 返回一个 `uploadTask` 对象，通过 `uploadTask`，可监听上传进度变化事件，以及取消上传任务。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.chooseImage({
   *       success: function(res) {
   *         var tempFilePaths = res.tempFilePaths
   *         wx.uploadFile({
   *           url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
   *           filePath: tempFilePaths[0],
   *           name: 'file',
   *           formData:{
   *             'user': 'test'
   *           },
   *           success: function(res){
   *             var data = res.data
   *             //do something
   *           }
   *         })
   *       }
   *     })
   *     ```
   *
   * **示例代码：**
   *
   *     ```javascript
   *     const uploadTask = wx.uploadFile({
   *         url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
   *         filePath: tempFilePaths[0],
   *         name: 'file',
   *         formData:{
   *             'user': 'test'
   *         },
   *         success: function(res){
   *             var data = res.data
   *             //do something
   *         }
   *     })
   *
   *     uploadTask.onProgressUpdate((res) => {
   *         console.log('上传进度', res.progress)
   *         console.log('已经上传的数据长度', res.totalBytesSent)
   *         console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
   *     })
   *
   *     uploadTask.abort() // 取消上传任务
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-file.html#wxuploadfileobject
   */
  function uploadFile(OBJECT: uploadFile.Param): uploadFile.Return

  namespace downloadFile {
    type Param = {
      /**
       * 下载资源的 url
       */
      url?: string
      /**
       * HTTP 请求 Header，header 中不能设置 Referer
       */
      header?: any
      /**
       * 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
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
     * 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
     */
    type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    type ParamPropSuccessParam = {
      /**
       * 临时文件路径，下载后的文件会存储到一个临时文件
       */
      tempFilePath?: string
      /**
       * 开发者服务器返回的 HTTP 状态码
       */
      statusCode?: number
    }
    /**
     * 接口调用失败的回调函数
     */
    type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ParamPropComplete = () => any
    type Return = {
      /**
       * 监听下载进度变化
       *
       * @since 1.4.0
       */
      onProgressUpdate?: ReturnPropOnProgressUpdate
      /**
       * 中断下载任务
       *
       * @since 1.4.0
       */
      abort?: ReturnPropAbort
    }
    /**
     * 监听下载进度变化
     */
    type ReturnPropOnProgressUpdate = (callback: ReturnPropOnProgressUpdateParam) => any
    type ReturnPropOnProgressUpdateParam = (res: ReturnPropOnProgressUpdateParamParam) => any
    type ReturnPropOnProgressUpdateParamParam = {
      /**
       * 下载进度百分比
       */
      progress?: number
      /**
       * 已经下载的数据长度，单位 Bytes
       */
      totalBytesWritten?: number
      /**
       * 预期需要下载的数据总长度，单位 Bytes
       */
      totalBytesExpectedToWrite?: number
    }
    /**
     * 中断下载任务
     */
    type ReturnPropAbort = () => any
  }
  /**
   * 下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。**使用前请先阅读[说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-network.html)**。
   *
   * **返回值：**
   *
   * @since 1.4.0
   *
   * 返回一个 `downloadTask` 对象，通过 `downloadTask`，可监听下载进度变化事件，以及取消下载任务。
   *
   * **Bug & Tip：**
   *
   * 1.  `tip`: 6.5.3 以及之前版本的 iOS 微信客户端 `header` 设置无效
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.downloadFile({
   *       url: 'https://example.com/audio/123', //仅为示例，并非真实的资源
   *       success: function(res) {
   *         // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
   *         if (res.statusCode === 200) {
   *             wx.playVoice({
   *               filePath: res.tempFilePath
   *             })
   *         }
   *       }
   *     })
   *     ```
   *
   * **示例代码：**
   *
   *     ```javascript
   *     const downloadTask = wx.downloadFile({
   *         url: 'http://example.com/audio/123', //仅为示例，并非真实的资源
   *         success: function(res) {
   *             wx.playVoice({
   *                 filePath: res.tempFilePath
   *             })
   *         }
   *     })
   *
   *     downloadTask.onProgressUpdate((res) => {
   *         console.log('下载进度', res.progress)
   *         console.log('已经下载的数据长度', res.totalBytesWritten)
   *         console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
   *     })
   *
   *     downloadTask.abort() // 取消下载任务
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-file.html#wxdownloadfileobject
   */
  function downloadFile(OBJECT: downloadFile.Param): downloadFile.Return

}
