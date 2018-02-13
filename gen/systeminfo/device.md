<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/device.html -->

### wx.getNetworkType(OBJECT)

获取网络类型。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                        
-------------|-------------|-------|------------------------------
  success    |  Function   |  是   |接口调用成功，返回网络类型 networkType
  fail       |  Function   |  否   |  接口调用失败的回调函数      
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数          |  说明   
----------------|---------
  networkType   | 网络类型

    wx.getNetworkType({
      success: function(res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
      }
    })
    

### wx.onNetworkStatusChange(CALLBACK)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

监听网络状态变化。

**CALLBACK返回参数：**

  参数          |  类型      |  说明        
----------------|------------|--------------
  isConnected   |  Boolean   |当前是否有网络连接
  networkType   |  String    |  网络类型    

**networkType 有效值：**

  值        |  说明               
------------|---------------------
  wifi      |  wifi 网络          
  2g        |  2g 网络            
  3g        |  3g 网络            
  4g        |  4g 网络            
  none      |  无网络             
  unknown   |Android下不常见的网络类型

**示例代码：**

    wx.onNetworkStatusChange(function(res) {
      console.log(res.isConnected)
      console.log(res.networkType)
    })
    

### wx.setScreenBrightness(OBJECT)

> 基础库 1.2.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

设置屏幕亮度。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  value      |  Number     |  是   |屏幕亮度值，范围 0~1，0 最暗，1 最亮
  success    |  Function   |  否   |  接口调用成功               
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

### wx.getScreenBrightness(OBJECT)

> 基础库 1.2.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

获取屏幕亮度。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功               
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数    |  类型     |  说明                     
----------|-----------|---------------------------
  value   |  Number   |屏幕亮度值，范围 0~1，0 最暗，1 最亮

### wx.vibrateLong(OBJECT)

> 基础库 1.2.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

使手机发生较长时间的振动（400ms）

**OBJECT参数说明：**

  参数名     |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

### wx.vibrateShort(OBJECT)

> 基础库 1.2.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

使手机发生较短时间的振动（15ms）

**OBJECT参数说明：**

  参数名     |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

#### Bug & Tip

1.  `tip`：`vibrateShort` 接口仅在 iPhone7/iPhone7Plus 及 Android 机型生效
2.  `tip`: `getScreenBrightness` 接口若安卓系统设置中开启了自动调节亮度功能，则屏幕亮度会根据光线自动调整，该接口仅能获取自动调节亮度之前的值，而非实时的亮度值。
