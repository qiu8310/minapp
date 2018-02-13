<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/canvas/fill-rect.html -->

canvasContext.fillRect
======================

### 定义

填充一个矩形。

**Tip**: 用 `setFillStyle()` 设置矩形的填充色，如果没设置默认是黑色。

### 参数

  参数     |  类型     |  说明          
-----------|-----------|----------------
  x        |  Number   |矩形路径左上角的x坐标
  y        |  Number   |矩形路径左上角的y坐标
  width    |  Number   | 矩形路径的宽度 
  height   |  Number   | 矩形路径的高度 

### 例子

    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('red')
    ctx.fillRect(10, 10, 150, 75)
    ctx.draw()
    

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/fill-rect.png?t=201828)
