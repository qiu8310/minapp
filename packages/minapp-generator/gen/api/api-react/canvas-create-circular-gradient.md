<!-- https://developers.weixin.qq.com/miniprogram/dev/api/canvas/create-circular-gradient.html -->

canvasContext.createCircularGradient
====================================

### 定义

创建一个圆形的渐变颜色。

**Tip**: 起点在圆心，终点在圆环。

**Tip**: 需要使用 `addColorStop()` 来指定渐变点，至少要两个。

### 参数

  参数 |  类型     |  定义     
-------|-----------|-----------
  x    |  Number   |圆心的x坐标
  y    |  Number   |圆心的y坐标
  r    |  Number   |  圆的半径 

### 例子

    const ctx = wx.createCanvasContext('myCanvas')
    
    // Create circular gradient
    const grd = ctx.createCircularGradient(75, 50, 50)
    grd.addColorStop(0, 'red')
    grd.addColorStop(1, 'white')
    
    // Fill with gradient
    ctx.setFillStyle(grd)
    ctx.fillRect(10, 10, 150, 80)
    ctx.draw()
    

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/circular-gradient.png)
