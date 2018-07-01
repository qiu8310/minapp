<!-- https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html -->

### wx.request(OBJECT)

发起网络请求。**使用前请先阅读[说明](https://developers.weixin.qq.com/miniprogram/dev/api/api-network.html)**。

**OBJECT参数说明：**

  参数名         |  类型                        |  必填 |  默认值 |  说明                                                             | 最低版本 
-----------------|------------------------------|-------|---------|-------------------------------------------------------------------|----------
  url            |  String                      |  是   |         |  开发者服务器接口地址                                             |          
  data           |  Object/String/ArrayBuffer   |  否   |         |  请求的参数                                                       |          
  header         |  Object                      |  否   |         |  设置请求的 header，header 中不能设置 Referer。                   |          
  method         |  String                      |  否   |  GET    |（需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT|          
  dataType       |  String                      |  否   |  json   |  如果设为json，会尝试对返回的数据做一次 JSON.parse                |          
  responseType   |  String                      |  否   |  text   |  设置响应的数据类型。合法值：text、arraybuffer                    |  1.7.0   
  success        |  Function                    |  否   |         |  收到开发者服务成功返回的回调函数                                 |          
  fail           |  Function                    |  否   |         |  接口调用失败的回调函数                                           |          
  complete       |  Function                    |  否   |         |  接口调用结束的回调函数（调用成功、失败都会执行）                 |          

**success返回参数说明：**

  参数         |  类型                        |  说明                             | 最低版本 
---------------|------------------------------|-----------------------------------|----------
  data         |  Object/String/ArrayBuffer   |  开发者服务器返回的数据           |          
  statusCode   |  Number                      |  开发者服务器返回的 HTTP 状态码   |          
  header       |  Object                      |开发者服务器返回的 HTTP Response Header|  1.2.0   

**data 数据说明：**

最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String 。转换规则如下：

*   对于 `GET` 方法的数据，会将数据转换成 query string（encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
*   对于 `POST` 方法且 `header['content-type']` 为 `application/json` 的数据，会对数据进行 JSON 序列化
*   对于 `POST` 方法且 `header['content-type']` 为 `application/x-www-form-urlencoded` 的数据，会将数据转换成 query string （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）

**示例代码：**

    wx.request({
      url: 'test.php', //仅为示例，并非真实的接口地址
      data: {
         x: '' ,
         y: ''
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
      }
    })
    

**返回值：**

> 基础库 1.4.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

返回一个 `requestTask` 对象，通过 `requestTask`，可中断请求任务。

**requestTask 对象的方法列表：**

  方法    |  参数 |  说明     | 最低版本 
----------|-------|-----------|----------
  abort   |       |中断请求任务|  1.4.0   

**示例代码：**

    const requestTask = wx.request({
      url: 'test.php', //仅为示例，并非真实的接口地址
      data: {
         x: '' ,
         y: ''
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
      }
    })
    
    requestTask.abort() // 取消请求任务
    

#### Bug & Tip

1.  `tip`: content-type 默认为 'application/json';
2.  `bug`: 开发者工具 `0.10.102800` 版本，`header` 的 `content-type` 设置异常；
