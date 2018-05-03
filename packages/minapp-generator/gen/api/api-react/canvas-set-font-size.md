<!-- https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-font-size.html -->

canvasContext.setFontSize
=========================

### 定义

设置字体的字号。

### 参数

  参数       |  类型     |  说明    
-------------|-----------|----------
  fontSize   |  Number   |字体的字号

### 例子

    const ctx = wx.createCanvasContext('myCanvas')
    
    ctx.setFontSize(20)
    ctx.fillText('20', 20, 20)
    ctx.setFontSize(30)
    ctx.fillText('30', 40, 40)
    ctx.setFontSize(40)
    ctx.fillText('40', 60, 60)
    ctx.setFontSize(50)
    ctx.fillText('50', 90, 90)
    
    ctx.draw()
    

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/font-size.png)
