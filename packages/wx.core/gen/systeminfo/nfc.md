<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/nfc.html -->

暂仅支持 HCE（基于主机的卡模拟）模式，即将安卓手机模拟成实体智能卡。

适用机型：支持 NFC 功能，且系统版本为Android5.0及以上的手机

适用卡范围：符合ISO 14443-4标准的CPU卡

### wx.getHCEState(OBJECT)

> 基础库 1.7.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

判断当前设备是否支持 HCE 能力。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数      |  类型     |  说明   
------------|-----------|---------
  errMsg    |  String   | 错误信息
  errCode   |  Number   |  错误码 

    wx.getHCEState({
      success: function(res) {
        console.log(res.errCode)
      }
    })
    

### wx.startHCE(OBJECT)

> 基础库 1.7.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

初始化 NFC 模块。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                                 
-------------|-------------|-------|---------------------------------------
  aid_list   |  Array      |  是   |需要注册到系统的 AID 列表，每个 AID 为 String 类型
  success    |  Function   |  否   |  接口调用成功的回调函数               
  fail       |  Function   |  否   |  接口调用失败的回调函数               
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数      |  类型     |  说明   
------------|-----------|---------
  errMsg    |  String   | 错误信息
  errCode   |  Number   |  错误码 

**示例代码：**

    wx.startHCE({
      aid_list: ['F222222222']
      success: function(res) {
        console.log(res.errMsg)
      }
    })
    

### wx.stopHCE(OBJECT)

> 基础库 1.7.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

关闭 NFC 模块。仅在安卓系统下有效。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数      |  类型     |  说明   
------------|-----------|---------
  errMsg    |  String   | 错误信息
  errCode   |  Number   |  错误码 

**示例代码：**

    wx.stopHCE({
      success: function(res) {
        console.log(res.errMsg)
      }
    })
    

### wx.onHCEMessage(CALLBACK)

> 基础库 1.7.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

监听 NFC 设备的消息回调，并在回调中处理。返回参数中 `messageType` 表示消息类型，目前有如下值：

*   1：消息为HCE Apdu Command类型，小程序需对此指令进行处理，并调用 `sendHCEMessage` 接口返回处理指令；
*   2：消息为设备离场事件

**CALLBACK 返回参数说明：**

  参数          |  类型          |  说明                                           
----------------|----------------|-------------------------------------------------
  messageType   |  Number        |  消息类型                                       
  data          |  ArrayBuffer   |客户端接收到 NFC 设备的指令，此参数当且仅当 `messageType=1` 时有效
  reason        |  Number        |  此参数当且仅当 `messageType=2` 时有效          

### wx.sendHCEMessage(OBJECT)

> 基础库 1.7.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

发送 NFC 消息。仅在安卓系统下有效。

**OBJECT参数说明：**

  参数       |  类型          |  必填 |  说明                       
-------------|----------------|-------|-----------------------------
  data       |  ArrayBuffer   |  是   |  二进制数据                 
  success    |  Function      |  否   |  接口调用成功的回调函数     
  fail       |  Function      |  否   |  接口调用失败的回调函数     
  complete   |  Function      |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数      |  类型     |  说明   
------------|-----------|---------
  errMsg    |  String   | 错误信息
  errCode   |  Number   |  错误码 

    const buffer = new ArrayBuffer(1)
    const dataView = new DataView(buffer)
    dataView.setUint8(0, 0)
    
    wx.startHCE({
      success: function(res) {
        wx.onHCEMessage(function(res) {
          if (res.messageType === 1) {
            wx.sendHCEMessage({data: buffer})
          }
        })
      }
    })
    

#### errCode列表

每个接口调用的时候，都会返回 `errCode` 字段。

  错误码  |  说明                     
----------|---------------------------
  0       |  Ok                       
  13000   |  当前设备不支持 NFC       
  13001   |当前设备支持 NFC，但系统NFC开关未开启
  13002   |当前设备支持 NFC，但不支持HCE
  13003   |  AID 列表参数格式错误     
  13004   |未设置微信为默认NFC支付应用
  13005   |  返回的指令不合法         
  13006   |  注册 AID 失败            
