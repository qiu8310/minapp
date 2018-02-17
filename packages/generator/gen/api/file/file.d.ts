// https://mp.weixin.qq.com/debug/wxadoc/dev/api/file.html

export namespace wx {
  type IWxSaveFileObject = {
    /**
     * 需要保存的文件的临时路径
     */
    tempFilePath: string

    /**
     * 返回文件的保存路径，res = {savedFilePath: '文件的保存路径'}
     */
    success?: (res: {
      /**
       * 文件的保存路径
       */
      savedFilePath: any
    }) => any

    /**
     * 接口调用失败的回调函数
     */
    fail?: (err: any) => any

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => any
  }
  /**
   * 保存文件到本地。**注意：saveFile 会把临时文件移动，因此调用成功后传入的 tempFilePath 将不可用**
   *
   * **bug & tip：**
   *
   * 1.  `tip`: 本地文件存储的大小限制为 10M
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.chooseImage({
   *       success: function(res) {
   *         var tempFilePaths = res.tempFilePaths
   *         wx.saveFile({
   *           tempFilePath: tempFilePaths[0],
   *           success: function(res) {
   *             var savedFilePath = res.savedFilePath
   *           }
   *         })
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/file.html#wxsavefileobject
   */
  function saveFile(OBJECT: IWxSaveFileObject): void
  type IWxGetSavedFileListObject = {
    /**
     * 接口调用成功的回调函数，返回结果见`success返回参数说明`
     */
    success?: (res: {
      /**
       * 接口调用结果
       */
      errMsg: string

      /**
       * 文件列表
       */
      fileList: Array<{
        /**
         * 文件的本地路径
         */
        filePath: string

        /**
         * 文件的保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
         */
        createTime: number

        /**
         * 文件大小，单位B
         */
        size: number
      }>
    }) => any

    /**
     * 接口调用失败的回调函数
     */
    fail?: (err: any) => any

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => any
  }
  /**
   * 获取本地已保存的文件列表
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.getSavedFileList({
   *       success: function(res) {
   *         console.log(res.fileList)
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/file.html#wxgetsavedfilelistobject
   */
  function getSavedFileList(OBJECT: IWxGetSavedFileListObject): void
  type IWxGetSavedFileInfoObject = {
    /**
     * 文件路径
     */
    filePath: string

    /**
     * 接口调用成功的回调函数，返回结果见`success返回参数说明`
     */
    success?: (res: {
      /**
       * 接口调用结果
       */
      errMsg: string

      /**
       * 文件大小，单位B
       */
      size: number

      /**
       * 文件保存时的时间戳，从1970/01/01 08:00:00 到该时刻的秒数
       */
      createTime: number
    }) => any

    /**
     * 接口调用失败的回调函数
     */
    fail?: (err: any) => any

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => any
  }
  /**
   * 获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，请使用 [wx.getFileInfo](https://mp.weixin.qq.com/debug/wxadoc/dev/api/getFileInfo.html) 接口。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.getSavedFileInfo({
   *       filePath: 'wxfile://somefile', //仅做示例用，非真正的文件路径
   *       success: function(res) {
   *         console.log(res.size)
   *         console.log(res.createTime)
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/file.html#wxgetsavedfileinfoobject
   */
  function getSavedFileInfo(OBJECT: IWxGetSavedFileInfoObject): void
  type IWxRemoveSavedFileObject = {
    /**
     * 需要删除的文件路径
     */
    filePath: string

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
  }
  /**
   * 删除本地存储的文件
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.getSavedFileList({
   *       success: function(res) {
   *         if (res.fileList.length > 0){
   *           wx.removeSavedFile({
   *             filePath: res.fileList[0].filePath,
   *             complete: function(res) {
   *               console.log(res)
   *             }
   *           })
   *         }
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/file.html#wxremovesavedfileobject
   */
  function removeSavedFile(OBJECT: IWxRemoveSavedFileObject): void
  type IWxOpenDocumentObject = {
    /**
     * 文件路径，可通过 downFile 获得
     */
    filePath: string

    /**
     * 文件类型，指定文件类型打开文件，有效值 doc, xls, ppt, pdf, docx, xlsx, pptx
     *
     * @since 1.4.0
     */
    fileType?: string

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
  }
  /**
   * 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.downloadFile({
   *       url: 'http://example.com/somefile.pdf',
   *       success: function (res) {
   *         var filePath = res.tempFilePath
   *         wx.openDocument({
   *           filePath: filePath,
   *           success: function (res) {
   *             console.log('打开文档成功')
   *           }
   *         })
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/file.html#wxopendocumentobject
   */
  function openDocument(OBJECT: IWxOpenDocumentObject): void
}
