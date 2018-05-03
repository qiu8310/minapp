<!-- https://developers.weixin.qq.com/miniprogram/dev/api/canvas/clear-rect.html -->

canvasContext.clearRect
=======================

### 定义

清除画布上在该矩形区域内的内容。

**Tip**: clearRect 并非画一个白色的矩形在地址区域，而是清空，为了有直观感受，对 canvas 加了一层背景色。

    <canvas canvas-id="myCanvas" style="border: 1px solid; background: #123456;"/>
    

### 参数

  参数     |  类型     |  说明          
-----------|-----------|----------------
  x        |  Number   |矩形区域左上角的x坐标
  y        |  Number   |矩形区域左上角的y坐标
  width    |  Number   | 矩形区域的宽度 
  height   |  Number   | 矩形区域的高度 

### 例子

    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('red')
    ctx.fillRect(0, 0, 150, 200)
    ctx.setFillStyle('blue')
    ctx.fillRect(150, 0, 150, 200)
    ctx.clearRect(10, 10, 150, 75)
    ctx.draw()
    

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/clear-rect.png)
