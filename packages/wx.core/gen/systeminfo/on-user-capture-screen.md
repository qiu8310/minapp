<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/onUserCaptureScreen.html -->

### wx.onUserCaptureScreen(CALLBACK)

> 基础库 1.4.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

监听用户主动截屏事件，用户使用系统截屏按键截屏时触发此事件

**CALLBACK返回参数：**

无

**示例代码：**

    wx.onUserCaptureScreen(function(res) {
        console.log('用户截屏了')
    })
