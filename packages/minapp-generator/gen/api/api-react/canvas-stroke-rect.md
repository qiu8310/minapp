<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/canvas/stroke-rect.html -->

canvasContext.strokeRect
========================

### 定义

画一个矩形(非填充)。

**Tip**: 用 `setFillStroke()` 设置矩形线条的颜色，如果没设置默认是黑色。

### 参数

  参数     |  类型     |  范围 |  说明          
-----------|-----------|-------|----------------
  x        |  Number   |       |矩形路径左上角的x坐标
  y        |  Number   |       |矩形路径左上角的y坐标
  width    |  Number   |       | 矩形路径的宽度 
  height   |  Number   |       | 矩形路径的高度 

### 例子

    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setStrokeStyle('red')
    ctx.strokeRect(10, 10, 150, 75)
    ctx.draw()
    

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/stroke-rect.png?t=201828)
