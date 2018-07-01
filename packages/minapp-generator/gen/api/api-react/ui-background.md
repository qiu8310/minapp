<!-- https://developers.weixin.qq.com/miniprogram/dev/api/ui-background.html -->

### wx.setBackgroundColor(OBJECT)

> 基础库 2.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

动态设置窗口的背景色

**OBJECT 参数说明：**

  参数                    |  类型       |  说明                
--------------------------|-------------|----------------------
  backgroundColor         |  HexColor   |  窗口的背景色        
  backgroundColorTop      |  HexColor   |顶部窗口的背景色，仅 iOS 支持
  backgroundColorBottom   |  HexColor   |底部窗口的背景色，仅 iOS 支持

**示例代码：**

    wx.setBackgroundColor({
        backgroundColor: '#ffffff', // 窗口的背景色为白色
    })
    
    wx.setBackgroundColor({
        backgroundColorTop: '#ffffff', // 顶部窗口的背景色为白色
        backgroundColorBottom: '#ffffff', // 底部窗口的背景色为白色
    })
    

### wx.setBackgroundTextStyle(OBJECT)

> 基础库 2.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

动态设置下拉背景字体、loading 图的样式

**OBJECT 参数说明：**

  参数        |  类型     |  说明                                      
--------------|-----------|--------------------------------------------
  textStyle   |  String   |下拉背景字体、loading 图的样式，仅支持 'dark', 'light'

**示例代码：**

    wx.setBackgroundTextStyle({
        textStyle: 'dark', // 下拉背景字体、loading 图的样式为dark
    })
