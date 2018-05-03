<!-- https://developers.weixin.qq.com/miniprogram/dev/api/canvas/draw.html -->

canvasContext.draw
==================

### 定义

将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。

**Tip**: 绘图上下文需要由 `wx.createCanvasContext(canvasId)` 来创建。

### 参数

  参数       |  类型       |  说明                                                                                                                                       | 最低版本 
-------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------|----------
  reserve    |  Boolean    |非必填。本次绘制是否接着上一次绘制，即reserve参数为false，则在本次调用drawCanvas绘制之前native层应先清空画布再继续绘制；若reserver参数为true，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面，默认 false|          
  callback   |  Function   |  绘制完成后回调                                                                                                                             |  1.7.0   

### 例子

    const ctx = wx.createCanvasContext('myCanvas')
    
    ctx.setFillStyle('red')
    ctx.fillRect(10, 10, 150, 100)
    ctx.draw()
    ctx.fillRect(50, 50, 150, 100)
    ctx.draw()
    

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/un-reserve.png)

### 例子

    const ctx = wx.createCanvasContext('myCanvas')
    
    ctx.setFillStyle('red')
    ctx.fillRect(10, 10, 150, 100)
    ctx.draw()
    ctx.fillRect(50, 50, 150, 100)
    ctx.draw(true)
    

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/reserve.png)
