<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/compass.html -->

### wx.onCompassChange(CALLBACK)

监听罗盘数据，频率：5次/秒，接口调用后会自动开始监听，可使用`wx.stopCompass`停止监听。

**CALLBACK返回参数：**

  参数        |  类型     |  说明      
--------------|-----------|------------
  direction   |  Number   |面对的方向度数

**示例代码：**

    wx.onCompassChange(function (res) {
      console.log(res.direction)
    })
    

### wx.startCompass(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

开始监听罗盘数据。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.startCompass()
    

### wx.stopCompass(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

停止监听罗盘数据。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.stopCompass()
