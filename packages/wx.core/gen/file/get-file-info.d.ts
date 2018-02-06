// https://mp.weixin.qq.com/debug/wxadoc/dev/api/getFileInfo.html

export namespace wx {
  type IWxGetFileInfoObject = {
    /**
     * 本地文件路径
     */
    filePath: string

    /**
     * 计算文件摘要的算法，默认值 md5，有效值：md5，sha1
     */
    digestAlgorithm?: string

    /**
     * 接口调用成功的回调函数
     */
    success?: (res: {
      /**
       * 文件大小，单位：B
       */
      size: number

      /**
       * 按照传入的 digestAlgorithm 计算得出的的文件摘要
       */
      digest: string

      /**
       * 调用结果
       */
      errMsg: string
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
   * @since 1.4.0
   *
   * 获取文件信息
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.getFileInfo({
   *         success(res) {
   *             console.log(res.size)
   *             console.log(res.digest)
   *         }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/getFileInfo.html#wxgetfileinfoobject
   */
  function getFileInfo(OBJECT: IWxGetFileInfoObject): void
}
