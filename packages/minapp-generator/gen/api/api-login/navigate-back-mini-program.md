<!-- https://developers.weixin.qq.com/miniprogram/dev/api/navigateBackMiniProgram.html -->

### wx.navigateBackMiniProgram(OBJECT)

> 基础库 1.3.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
> 
> iOS 微信客户端 6.5.9 版本开始支持，Android 客户端即将在 6.5.10 版本开始支持，请先使用 iOS 客户端进行调试

返回到上一个小程序，只有在当前小程序是被其他小程序打开时可以调用成功

**OBJECT参数说明：**

  参数名      |  类型       |  必填 |  说明                                                                                                                                    
--------------|-------------|-------|------------------------------------------------------------------------------------------------------------------------------------------
  extraData   |  Object     |  否   |需要返回给上一个小程序的数据，上一个小程序可在 `App.onShow()` 中获取到这份数据。[详情](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html)
  success     |  Function   |  否   |  接口调用成功的回调函数                                                                                                                  
  fail        |  Function   |  否   |  接口调用失败的回调函数                                                                                                                  
  complete    |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）                                                                                        

**success返回参数说明：**

  参数名   |  类型     |  说明   
-----------|-----------|---------
  errMsg   |  String   | 调用结果

**示例代码：**

    wx.navigateBackMiniProgram({
      extraData: {
        foo: 'bar'
      },
      success(res) {
        // 返回成功
      }
    })
