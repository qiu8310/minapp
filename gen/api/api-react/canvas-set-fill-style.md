<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/canvas/set-fill-style.html -->

canvasContext.setFillStyle
==========================

### 定义

设置填充色。

**Tip**: 如果没有设置 `fillStyle`，默认颜色为 `black`。

### 参数

  参数    |  类型    |  定义              
----------|----------|--------------------
  color   |  Color   |  Gradient Object   

### 例子

    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('red')
    ctx.fillRect(10, 10, 150, 75)
    ctx.draw()
    

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/fill-rect.png?t=201828)
