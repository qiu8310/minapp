<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/canvas/create-linear-gradient.html -->

canvasContext.createLinearGradient
==================================

### 定义

创建一个线性的渐变颜色。

**Tip**: 需要使用 `addColorStop()` 来指定渐变点，至少要两个。

### 参数

  参数 |  类型     |  定义     
-------|-----------|-----------
  x0   |  Number   |起点的x坐标
  y0   |  Number   |起点的y坐标
  x1   |  Number   |终点的x坐标
  y1   |  Number   |终点的y坐标

### 例子

    const ctx = wx.createCanvasContext('myCanvas')
    
    // Create linear gradient
    const grd = ctx.createLinearGradient(0, 0, 200, 0)
    grd.addColorStop(0, 'red')
    grd.addColorStop(1, 'white')
    
    // Fill with gradient
    ctx.setFillStyle(grd)
    ctx.fillRect(10, 10, 150, 80)
    ctx.draw()
    

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/linear-gradient.png?t=201828)
