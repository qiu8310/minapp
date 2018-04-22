// https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html

export namespace wx {
  namespace request {
    type Param = {
      /**
       * 开发者服务器接口地址
       */
      url: string
      /**
       * 请求的参数
       */
      data?: any | string | ArrayBuffer
      /**
       * 设置请求的 header，header 中不能设置 Referer。
       */
      header?: any
      /**
       * （需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       *
       * @default GET
       */
      method?: string
      /**
       * 如果设为json，会尝试对返回的数据做一次 JSON.parse
       *
       * @default json
       */
      dataType?: string
      /**
       * 设置响应的数据类型。合法值：text、arraybuffer
       *
       * @default text
       * @since 1.7.0
       */
      responseType?: string
      /**
       * 收到开发者服务成功返回的回调函数
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
     * 收到开发者服务成功返回的回调函数
     */
    type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    type ParamPropSuccessParam = {
      /**
       * 开发者服务器返回的数据
       *
       * **data 数据说明：**
       *
       * 最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String 。转换规则如下：
       *
       * *   对于 `GET` 方法的数据，会将数据转换成 query string（encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
       * *   对于 `POST` 方法且 `header['content-type']` 为 `application/json` 的数据，会对数据进行 JSON 序列化
       * *   对于 `POST` 方法且 `header['content-type']` 为 `application/x-www-form-urlencoded` 的数据，会将数据转换成 query string （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
       */
      data: any | string | ArrayBuffer
      /**
       * 开发者服务器返回的 HTTP 状态码
       */
      statusCode: number
      /**
       * 开发者服务器返回的 HTTP Response Header
       *
       * @since 1.2.0
       */
      header: any
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
       * 中断请求任务
       *
       * @since 1.4.0
       */
      abort: ReturnPropAbort
    }
    /**
     * 中断请求任务
     */
    type ReturnPropAbort = () => any
  }
  /**
   * 发起网络请求。**使用前请先阅读[说明](https://developers.weixin.qq.com/miniprogram/dev/api/api-network.html)**。
   *
   * **返回值：**
   *
   * @since 1.4.0
   *
   * 返回一个 `requestTask` 对象，通过 `requestTask`，可中断请求任务。
   *
   * **Bug & Tip：**
   *
   * 1.  `tip`: content-type 默认为 'application/json';
   * 2.  `tip`: url 中不能有端口；
   * 3.  `bug`: 开发者工具 `0.10.102800` 版本，`header` 的 `content-type` 设置异常；
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.request({
   *       url: 'test.php', //仅为示例，并非真实的接口地址
   *       data: {
   *          x: '' ,
   *          y: ''
   *       },
   *       header: {
   *           'content-type': 'application/json' // 默认值
   *       },
   *       success: function(res) {
   *         console.log(res.data)
   *       }
   *     })
   *     ```
   *
   * **示例代码：**
   *
   *     ```javascript
   *     const requestTask = wx.request({
   *       url: 'test.php', //仅为示例，并非真实的接口地址
   *       data: {
   *          x: '' ,
   *          y: ''
   *       },
   *       header: {
   *           'content-type': 'application/json'
   *       },
   *       success: function(res) {
   *         console.log(res.data)
   *       }
   *     })
   *
   *     requestTask.abort() // 取消请求任务
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html#wxrequestobject
   */
  function request(OBJECT: request.Param): request.Return

}
