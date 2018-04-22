<!-- https://developers.weixin.qq.com/miniprogram/dev/api/network-socket.html -->

### wx.connectSocket(OBJECT)

创建一个 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) 连接。**使用前请先阅读[说明](https://developers.weixin.qq.com/miniprogram/dev/api/api-network.html)**。

**基础库 1.7.0 之前，一个微信小程序同时只能有一个 WebSocket 连接，如果当前已存在一个 WebSocket 连接，会自动关闭该连接，并重新创建一个 WebSocket 连接。基础库版本 1.7.0 及以后，支持存在多个 WebSokcet 连接，每次成功调用 wx.connectSocket 会返回一个新的 [SocketTask](https://developers.weixin.qq.com/miniprogram/dev/api/socket-task.html)。**

**OBJECT参数说明：**

  参数        |  类型          |  必填 |  说明                                                               | 最低版本 
--------------|----------------|-------|---------------------------------------------------------------------|----------
  url         |  String        |  是   |开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名|          
  header      |  Object        |  否   |  HTTP Header , header 中不能设置 Referer                            |          
  method      |  String        |  否   |默认是GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT|          
  protocols   |  StringArray   |  否   |  子协议数组                                                         |  1.4.0   
  success     |  Function      |  否   |  接口调用成功的回调函数                                             |          
  fail        |  Function      |  否   |  接口调用失败的回调函数                                             |          
  complete    |  Function      |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）                   |          

**示例代码：**

    wx.connectSocket({
      url: 'wss://example.qq.com',
      data:{
        x: '',
        y: ''
      },
      header:{ 
        'content-type': 'application/json'
      },
      protocols: ['protocol1'],
      method:"GET"
    })
    

### wx.onSocketOpen(CALLBACK)

监听WebSocket连接打开事件。

**示例代码：**

    wx.connectSocket({
      url: 'test.php'
    })
    wx.onSocketOpen(function(res) {
      console.log('WebSocket连接已打开！')
    })
    

### wx.onSocketError(CALLBACK)

监听WebSocket错误。

**示例代码：**

    wx.connectSocket({
      url: 'test.php'
    })
    wx.onSocketOpen(function(res){
      console.log('WebSocket连接已打开！')
    })
    wx.onSocketError(function(res){
      console.log('WebSocket连接打开失败，请检查！')
    })
    

### wx.sendSocketMessage(OBJECT)

通过 WebSocket 连接发送数据，需要先 [wx.connectSocket](https://developers.weixin.qq.com/miniprogram/dev/api/network-socket.html#wxconnectsocketobject)，并在 [wx.onSocketOpen](https://developers.weixin.qq.com/miniprogram/dev/api/network-socket.html#wxonsocketopencallback) 回调之后才能发送。

**OBJECT参数说明：**

  参数       |  类型                 |  必填 |  说明                       
-------------|-----------------------|-------|-----------------------------
  data       |  String/ArrayBuffer   |  是   |  需要发送的内容             
  success    |  Function             |  否   |  接口调用成功的回调函数     
  fail       |  Function             |  否   |  接口调用失败的回调函数     
  complete   |  Function             |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    var socketOpen = false
    var socketMsgQueue = []
    wx.connectSocket({
      url: 'test.php'
    })
    
    wx.onSocketOpen(function(res) {
      socketOpen = true
      for (var i = 0; i < socketMsgQueue.length; i++){
         sendSocketMessage(socketMsgQueue[i])
      }
      socketMsgQueue = []
    })
    
    function sendSocketMessage(msg) {
      if (socketOpen) {
        wx.sendSocketMessage({
          data:msg
        })
      } else {
         socketMsgQueue.push(msg)
      }
    }
    

### wx.onSocketMessage(CALLBACK)

监听WebSocket接受到服务器的消息事件。

**CALLBACK返回参数：**

  参数   |  类型                 |  说明       
---------|-----------------------|-------------
  data   |  String/ArrayBuffer   |服务器返回的消息

**示例代码：**

    wx.connectSocket({
      url: 'test.php'
    })
    
    wx.onSocketMessage(function(res) {
      console.log('收到服务器内容：' + res.data)
    })
    

### wx.closeSocket(OBJECT)

关闭 WebSocket 连接。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                                                           | 最低版本 
-------------|-------------|-------|-----------------------------------------------------------------|----------
  code       |  Number     |  否   |一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）|  1.4.0   
  reason     |  String     |  否   |一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于123字节的UTF-8 文本（不是字符）|  1.4.0   
  success    |  Function   |  否   |  接口调用成功的回调函数                                         |          
  fail       |  Function   |  否   |  接口调用失败的回调函数                                         |          
  complete   |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）               |          

### wx.onSocketClose(CALLBACK)

监听WebSocket关闭。

    wx.connectSocket({
      url: 'test.php'
    })
    
    //注意这里有时序问题，
    //如果 wx.connectSocket 还没回调 wx.onSocketOpen，而先调用 wx.closeSocket，那么就做不到关闭 WebSocket 的目的。
    //必须在 WebSocket 打开期间调用 wx.closeSocket 才能关闭。
    wx.onSocketOpen(function() {
      wx.closeSocket()
    })
    
    wx.onSocketClose(function(res) {
      console.log('WebSocket 已关闭！')
    })
    

**返回值：**

> 基础库 1.7.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

返回一个 [SocketTask](https://developers.weixin.qq.com/miniprogram/dev/api/socket-task.html)。

#### Bug & Tip

1.  `tip`: 基础库 1.7.0 开始，支持同时存在 2 条 WebSocket 连接
