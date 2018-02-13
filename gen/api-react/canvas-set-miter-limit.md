<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/canvas/set-miter-limit.html -->

canvasContext.setMiterLimit
===========================

### 定义

设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离。 当 `setLineJoin()` 为 miter 时才有效。超过最大倾斜长度的，连接处将以 lineJoin 为 bevel 来显示

### 参数

  参数         |  类型     |  说明     
---------------|-----------|-----------
  miterLimit   |  Number   |最大斜接长度

### 例子

    const ctx = wx.createCanvasContext('myCanvas')
    ctx.beginPath()
    ctx.setLineWidth(10)
    ctx.setLineJoin('miter')
    ctx.setMiterLimit(1)
    ctx.moveTo(10, 10)
    ctx.lineTo(100, 50)
    ctx.lineTo(10, 90)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.setLineWidth(10)
    ctx.setLineJoin('miter')
    ctx.setMiterLimit(2)
    ctx.moveTo(50, 10)
    ctx.lineTo(140, 50)
    ctx.lineTo(50, 90)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.setLineWidth(10)
    ctx.setLineJoin('miter')
    ctx.setMiterLimit(3)
    ctx.moveTo(90, 10)
    ctx.lineTo(180, 50)
    ctx.lineTo(90, 90)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.setLineWidth(10)
    ctx.setLineJoin('miter')
    ctx.setMiterLimit(4)
    ctx.moveTo(130, 10)
    ctx.lineTo(220, 50)
    ctx.lineTo(130, 90)
    ctx.stroke()
    
    ctx.draw()
    

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/miter-limit.png?t=201828)
