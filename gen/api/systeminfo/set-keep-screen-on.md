<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/setKeepScreenOn.html -->

### wx.setKeepScreenOn(OBJECT)

> 基础库 1.4.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

设置是否保持常亮状态。仅在当前小程序生效，离开小程序后设置失效。

**OBJECT参数说明：**

  参数名         |  类型       |  必填 |  说明                       
-----------------|-------------|-------|-----------------------------
  keepScreenOn   |  Boolean    |  是   |  是否保持屏幕常亮           
  success        |  Function   |  否   |  接口调用成功的回调函数     
  fail           |  Function   |  否   |  接口调用失败的回调函数     
  complete       |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数名   |  类型     |  说明   
-----------|-----------|---------
  errMsg   |  String   | 调用结果

**示例代码：**

    // 保持屏幕常亮
    wx.setKeepScreenOn({
        keepScreenOn: true
    })
