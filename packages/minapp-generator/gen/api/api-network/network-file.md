<!-- https://developers.weixin.qq.com/miniprogram/dev/api/network-file.html -->

### wx.uploadFile(OBJECT)

将本地资源上传到开发者服务器，客户端发起一个 HTTPS POST 请求，其中 `content-type` 为 `multipart/form-data` 。**使用前请先阅读[说明](https://developers.weixin.qq.com/miniprogram/dev/api/api-network.html)**。

如页面通过 [wx.chooseImage](https://developers.weixin.qq.com/miniprogram/dev/api/media-picture.html#wxchooseimageobject) 等接口获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                                        
-------------|-------------|-------|----------------------------------------------
  url        |  String     |  是   |  开发者服务器 url                            
  filePath   |  String     |  是   |  要上传文件资源的路径                        
  name       |  String     |  是   |文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
  header     |  Object     |  否   |  HTTP 请求 Header, header 中不能设置 Referer 
  formData   |  Object     |  否   |  HTTP 请求中其他额外的 form data             
  success    |  Function   |  否   |  接口调用成功的回调函数                      
  fail       |  Function   |  否   |  接口调用失败的回调函数                      
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数         |  类型     |  说明                 
---------------|-----------|-----------------------
  data         |  String   | 开发者服务器返回的数据
  statusCode   |  Number   |开发者服务器返回的 HTTP 状态码

**示例代码：**

    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData:{
            'user': 'test'
          },
          success: function(res){
            var data = res.data
            //do something
          }
        })
      }
    })
    

**返回值：**

> 基础库 1.4.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

返回一个 `uploadTask` 对象，通过 `uploadTask`，可监听上传进度变化事件，以及取消上传任务。

#### uploadTask

**uploadTask 对象的方法列表：**

  方法               |  参数       |  说明       | 最低版本 
---------------------|-------------|-------------|----------
  onProgressUpdate   |  callback   |监听上传进度变化|  1.4.0   
  abort              |             | 中断上传任务|  1.4.0   

**onProgressUpdate 返回参数说明：**

  参数                       |  类型     |  说明                    
-----------------------------|-----------|--------------------------
  progress                   |  Number   |  上传进度百分比          
  totalBytesSent             |  Number   |已经上传的数据长度，单位 Bytes
  totalBytesExpectedToSend   |  Number   |预期需要上传的数据总长度，单位 Bytes

**示例代码：**

    const uploadTask = wx.uploadFile({
        url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        name: 'file',
        formData:{
            'user': 'test'
        },
        success: function(res){
            var data = res.data
            //do something
        }
    })
    
    uploadTask.onProgressUpdate((res) => {
        console.log('上传进度', res.progress)
        console.log('已经上传的数据长度', res.totalBytesSent)
        console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })
    
    uploadTask.abort() // 取消上传任务
    

### wx.downloadFile(OBJECT)

下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。**使用前请先阅读[说明](https://developers.weixin.qq.com/miniprogram/dev/api/api-network.html)**。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  描述                                                          
-------------|-------------|-------|----------------------------------------------------------------
  url        |  String     |  是   |  下载资源的 url                                                
  header     |  Object     |  否   |  HTTP 请求 Header，header 中不能设置 Referer                   
  success    |  Function   |  否   |下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
  fail       |  Function   |  否   |  接口调用失败的回调函数                                        
  complete   |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）              

**注：文件的临时路径，在小程序本次启动期间可以正常使用，如需持久保存，需在主动调用 [wx.saveFile](https://developers.weixin.qq.com/miniprogram/dev/api/file.html)，才能在小程序下次启动时访问得到。** **注：请在 header 中指定合理的 Content-Type 字段，以保证客户端正确处理文件类型**

**success返回参数说明：**

  参数           |  类型     |  说明                      
-----------------|-----------|----------------------------
  tempFilePath   |  String   |临时文件路径，下载后的文件会存储到一个临时文件
  statusCode     |  Number   |开发者服务器返回的 HTTP 状态码

**示例代码:**

    wx.downloadFile({
      url: 'https://example.com/audio/123', //仅为示例，并非真实的资源
      success: function(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
            wx.playVoice({
              filePath: res.tempFilePath
            })
        }
      }
    })
    

**返回值：**

> 基础库 1.4.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

返回一个 `downloadTask` 对象，通过 `downloadTask`，可监听下载进度变化事件，以及取消下载任务。

#### downloadTask

**downloadTask 对象的方法列表：**

  方法               |  参数       |  说明       | 最低版本 
---------------------|-------------|-------------|----------
  onProgressUpdate   |  callback   |监听下载进度变化|  1.4.0   
  abort              |             | 中断下载任务|  1.4.0   

**onProgressUpdate 返回参数说明：**

  参数                        |  类型     |  说明                    
------------------------------|-----------|--------------------------
  progress                    |  Number   |  下载进度百分比          
  totalBytesWritten           |  Number   |已经下载的数据长度，单位 Bytes
  totalBytesExpectedToWrite   |  Number   |预期需要下载的数据总长度，单位 Bytes

**示例代码：**

    const downloadTask = wx.downloadFile({
        url: 'http://example.com/audio/123', //仅为示例，并非真实的资源
        success: function(res) {
            wx.playVoice({
                filePath: res.tempFilePath
            })
        }
    })
    
    downloadTask.onProgressUpdate((res) => {
        console.log('下载进度', res.progress)
        console.log('已经下载的数据长度', res.totalBytesWritten)
        console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    })
    
    downloadTask.abort() // 取消下载任务
    

#### Bug & Tip

1.  `tip`: 6.5.3 以及之前版本的 iOS 微信客户端 `header` 设置无效
