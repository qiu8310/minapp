<!-- https://developers.weixin.qq.com/miniprogram/dev/api/accelerometer.html -->

### wx.onAccelerometerChange(CALLBACK)

监听加速度数据，频率：5次/秒，接口调用后会自动开始监听，可使用 `wx.stopAccelerometer` 停止监听。

**CALLBACK返回参数：**

  参数 |  类型     |  说明  
-------|-----------|--------
  x    |  Number   |  X 轴  
  y    |  Number   |  Y 轴  
  z    |  Number   |  Z 轴  

**示例代码：**

    wx.onAccelerometerChange(function(res) {
      console.log(res.x)
      console.log(res.y)
      console.log(res.z)
    })
    

### wx.startAccelerometer(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

开始监听加速度数据。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.startAccelerometer()
    

### wx.stopAccelerometer(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

停止监听加速度数据。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.stopAccelerometer()
