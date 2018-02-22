// https://mp.weixin.qq.com/debug/wxadoc/dev/api/socket-task.html

export namespace wx {
  namespace SocketTask {
    /**
     *
     * **SocketTask.send(OBJECT)：**
     *
     * 通过 WebSocket 连接发送数据。
     */
    type Send = (OBJECT: SendParam) => void
    type SendParam = {
      /**
       * 需要发送的内容
       */
      data?: string | ArrayBuffer
      /**
       * 接口调用成功的回调函数
       */
      success?: SendParamPropSuccess
      /**
       * 接口调用失败的回调函数
       */
      fail?: SendParamPropFail
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?: SendParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    type SendParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    type SendParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type SendParamPropComplete = () => any
    /**
     *
     * **SocketTask.close(OBJECT)：**
     *
     * 关闭 WebSocket 连接。
     */
    type Close = (OBJECT: CloseParam) => void
    type CloseParam = {
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
      success?: CloseParamPropSuccess
      /**
       * 接口调用失败的回调函数
       */
      fail?: CloseParamPropFail
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?: CloseParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    type CloseParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    type CloseParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type CloseParamPropComplete = () => any
    /**
     *
     * **SocketTask.onOpen(CALLBACK)：**
     *
     * 监听 WebSocket 连接打开事件。
     */
    type OnOpen = (CALLBACK: any) => void
    /**
     *
     * **SocketTask.onClose(CALLBACK)：**
     *
     * 监听 WebSocket 连接关闭事件。
     */
    type OnClose = (CALLBACK: any) => void
    /**
     *
     * **SocketTask.onError(CALLBACK)：**
     *
     * 监听 WebSocket 错误。
     */
    type OnError = (CALLBACK: OnErrorParam) => void
    type OnErrorParam = (res: OnErrorParamParam) => any
    type OnErrorParamParam = {
      /**
       * 错误信息
       */
      errMsg?: string
    }
    /**
     *
     * **SocketTask.onMessage(CALLBACK)：**
     *
     * 监听WebSocket接受到服务器的消息事件。
     */
    type OnMessage = (CALLBACK: OnMessageParam) => void
    type OnMessageParam = (res: OnMessageParamParam) => any
    type OnMessageParamParam = {
      /**
       * 服务器返回的消息
       */
      data?: string | ArrayBuffer
    }
  }
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
    send: SocketTask.Send
    /**
     *
     * **SocketTask.close(OBJECT)：**
     *
     * 关闭 WebSocket 连接。
     */
    close: SocketTask.Close
    /**
     *
     * **SocketTask.onOpen(CALLBACK)：**
     *
     * 监听 WebSocket 连接打开事件。
     */
    onOpen: SocketTask.OnOpen
    /**
     *
     * **SocketTask.onClose(CALLBACK)：**
     *
     * 监听 WebSocket 连接关闭事件。
     */
    onClose: SocketTask.OnClose
    /**
     *
     * **SocketTask.onError(CALLBACK)：**
     *
     * 监听 WebSocket 错误。
     */
    onError: SocketTask.OnError
    /**
     *
     * **SocketTask.onMessage(CALLBACK)：**
     *
     * 监听WebSocket接受到服务器的消息事件。
     */
    onMessage: SocketTask.OnMessage
  }
}
