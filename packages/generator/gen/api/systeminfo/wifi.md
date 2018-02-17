<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/wifi.html -->

在小程序中支持搜索周边的 Wi-Fi，同时可以针对指定 Wi-Fi，传入密码发起连接。

该系列接口为系统原生能力，如需查看“微信连Wi-Fi”能力及配置跳转小程序，请参考[文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=215135855720FBA0)。

连接指定 Wi-Fi 接口调用时序：

*   Android： startWifi —> connectWifi —> onWifiConnected
*   iOS（仅iOS 11及以上版本支持）：  
    startWifi —> connectWifi —> onWifiConnected

连周边 Wi-Fi 接口调用时序：

*   Android startWifi —> getWifiList —> onGetWifiList —> connectWifi —> onWifiConnected
*   iOS（iOS 11.0及11.1版本因系统原因暂不支持）：  
    startWifi —> getWifiList —> onGetWifiList —> setWifiList —> onWifiConnected

**注意：**

*   Wi-Fi 相关接口暂不可用 `wx.canIUse` 接口判断。
*   Android 6.0 以上版本，在没有打开定位开关的时候会导致设备不能正常获取周边的 Wi-Fi 信息。

### wx.startWifi(OBJECT)

> 基础库 1.6.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

初始化 Wi-Fi 模块。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.startWifi({
      success: function(res) {
        console.log(res.errMsg)
      }
    })
    

### wx.stopWifi(OBJECT)

> 基础库 1.6.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

关闭 Wi-Fi 模块。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.stopWifi({
      success: function(res) {
        console.log(res.errMsg)
      }
    })
    

### wx.connectWifi(OBJECT)

> 基础库 1.6.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

连接 Wi-Fi。若已知 Wi-Fi 信息，可以直接利用该接口连接。仅 Android 与 iOS 11 以上版本支持。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  SSID       |  String     |  是   |  Wi-Fi 设备ssid             
  BSSID      |  String     |  是   |  Wi-Fi 设备bssid            
  password   |  String     |  否   |  Wi-Fi 设备密码             
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.connectWifi({
      SSID: '',
      BSSID: '',
      success: function(res) {
        console.log(res.errMsg)
      }
    })
    

### wx.getWifiList(OBJECT)

> 基础库 1.6.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

请求获取 Wi-Fi 列表，在 `onGetWifiList` 注册的回调中返回 wifiList 数据。iOS 将跳转到系统的 Wi-Fi 界面，Android 不会跳转。 **iOS 11.0 及 iOS 11.1 两个版本因系统问题，该方法失效。但在 iOS 11.2 中已修复。**

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

### wx.onGetWifiList(CALLBACK)

> 基础库 1.6.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

监听在获取到 Wi-Fi 列表数据时的事件，在回调中将返回 wifiList。

**CALLBACK 返回参数说明：**

  参数                        |  类型      |  说明           
------------------------------|------------|-----------------
  wifiList                    |  Array     |  Wi-Fi 列表数据 
  wifiList[].SSID             |  String    |  Wi-Fi 的SSID   
  wifiList[].BSSID            |  String    |  Wi-Fi 的BSSID  
  wifiList[].secure           |  Boolean   |  Wi-Fi 是否安全 
  wifiList[].signalStrength   |  Number    |  Wi-Fi 信号强度 

### wx.setWifiList(OBJECT)

> 基础库 1.6.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

**iOS特有接口** 在 `onGetWifiList` 回调后，利用接口设置 wifiList 中 AP 的相关信息。

注意：

1.  该接口只能在 `onGetWifiList` 回调之后才能调用。
2.  此时客户端会挂起，等待小程序设置 Wi-Fi 信息，请务必尽快调用该接口，若无数据请传入一个空数组。
3.  有可能随着周边 Wi-Fi 列表的刷新，单个流程内收到多次带有存在重复的 Wi-Fi 列表的回调。

**OBJECT参数说明：**

  参数                  |  类型       |  必填 |  说明                       
------------------------|-------------|-------|-----------------------------
  wifiList              |  Array      |  是   |  提供预设的 Wi-Fi 信息列表  
  success               |  Function   |  否   |  接口调用成功的回调函数     
  fail                  |  Function   |  否   |  接口调用失败的回调函数     
  complete              |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）
  wifiList[].SSID       |  String     |  是   |  Wi-Fi 设备ssid             
  wifiList[].BSSID      |  String     |  是   |  Wi-Fi 设备bssid            
  wifiList[].password   |  String     |  是   |  Wi-Fi 设备密码             

**示例代码：**

    wx.onGetWifiList(function(res) {
      if (res.wifiList.length) {
        wx.setWifiList({
          wifiList: [{
            SSID: res.wifiList[0].SSID,
            BSSID: res.wifiList[0].BSSID,
            password: '123456'
          }]
        })
      } else {
        wx.setWifiList({
          wifiList: []
        })
      }
    })
    wx.getWifiList()
    

### wx.onWifiConnected(CALLBACK)

> 基础库 1.6.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

监听连接上 Wi-Fi 的事件。

**CALLBACK 返回参数说明：**

  参数                  |  类型      |  说明           
------------------------|------------|-----------------
  wifi                  |  Object    |  Wi-Fi 信息     
  wifi.SSID             |  String    |  Wi-Fi 的SSID   
  wifi.BSSID            |  String    |  Wi-Fi 的BSSID  
  wifi.secure           |  Boolean   |  Wi-Fi 是否安全 
  wifi.signalStrength   |  Number    |  Wi-Fi 信号强度 

### wx.getConnectedWifi(OBJECT)

> 基础库 1.6.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

获取已连接中的 Wi-Fi 信息

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数                  |  类型      |  说明           
------------------------|------------|-----------------
  wifi                  |  Object    |  Wi-Fi 信息     
  wifi.SSID             |  String    |  Wi-Fi 的SSID   
  wifi.BSSID            |  String    |  Wi-Fi 的BSSID  
  wifi.secure           |  Boolean   |  Wi-Fi 是否安全 
  wifi.signalStrength   |  Number    |  Wi-Fi 信号强度 

#### errCode列表

每个接口调用的时候，都会返回 `errCode` 字段。

  错误码  |  说明                    |  备注                        
----------|--------------------------|------------------------------
  0       |  ok                      |  正常                        
  12000   |  not init                |  未先调用startWifi接口       
  12001   |  system not support      |  当前系统不支持相关能力      
  12002   |  password error          |  Wi-Fi 密码错误              
  12003   |  connection timeout      |  连接超时                    
  12004   |  duplicate request       |  重复连接 Wi-Fi              
  12005   |  wifi not turned on      |Android特有，未打开 Wi-Fi 开关
  12006   |  gps not turned on       |Android特有，未打开 GPS 定位开关
  12007   |  user denied             |  用户拒绝授权链接 Wi-Fi      
  12008   |  invalid SSID            |  无效SSID                    
  12009   |  system config err       | 系统运营商配置拒绝连接 Wi-Fi 
  12010   |  system internal error   |系统其他错误，需要在errmsg打印具体的错误原因
  12011   |  weapp in background     |  应用在后台无法配置 Wi-Fi    
