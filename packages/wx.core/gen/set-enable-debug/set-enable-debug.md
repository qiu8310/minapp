<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/setEnableDebug.html -->

### wx.setEnableDebug(OBJECT)

> 基础库 1.4.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

设置是否打开调试开关，此开关对正式版也能生效。

**OBJECT参数说明：**

  参数名        |  类型       |  必填 |  说明                       
----------------|-------------|-------|-----------------------------
  enableDebug   |  Boolean    |  是   |  是否打开调试               
  success       |  Function   |  否   |  接口调用成功的回调函数     
  fail          |  Function   |  否   |  接口调用失败的回调函数     
  complete      |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数名   |  类型     |  说明   
-----------|-----------|---------
  errMsg   |  String   | 调用结果

**示例代码：**

    // 打开调试
    wx.setEnableDebug({
        enableDebug: true
    })
    
    // 关闭调试
    wx.setEnableDebug({
        enableDebug: false
    })
