// https://mp.weixin.qq.com/debug/wxadoc/dev/api/socket-task.html

export namespace wx {
  /**
   * @since 1.7.0
   *
   * WebSocket 任务，可通过 [wx.connectSocket()](https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-socket.html) 接口创建返回。
   */
  class SocketTask {
    /**
     *
     * **SocketTask.send(OBJECT)：**
     *
     * 通过 WebSocket 连接发送数据。
     */
    send(OBJECT: {
      /**
       * 需要发送的内容
       */
      data: string | ArrayBuffer

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
    }): void
    /**
     *
     * **SocketTask.close(OBJECT)：**
     *
     * 关闭 WebSocket 连接。
     */
    close(OBJECT: {
      /**
       * 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）
       */
      code?: number

      /**
       * 一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于123字节的UTF-8 文本（不是字符）
       */
      reason?: string

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
    }): void
    /**
     *
     * **SocketTask.onOpen(CALLBACK)：**
     *
     * 监听 WebSocket 连接打开事件。
     */
    onOpen(CALLBACK: any): void
    /**
     *
     * **SocketTask.onClose(CALLBACK)：**
     *
     * 监听 WebSocket 连接关闭事件。
     */
    onClose(CALLBACK: any): void
    /**
     *
     * **SocketTask.onError(CALLBACK)：**
     *
     * 监听 WebSocket 错误。
     */
    onError(CALLBACK: ((res: {
      /**
       * 错误信息
       */
      errMsg: string
    }) => any)): void
    /**
     *
     * **SocketTask.onMessage(CALLBACK)：**
     *
     * 监听WebSocket接受到服务器的消息事件。
     */
    onMessage(CALLBACK: ((res: {
      /**
       * 服务器返回的消息
       */
      data: string | ArrayBuffer
    }) => any)): void
  }
}
