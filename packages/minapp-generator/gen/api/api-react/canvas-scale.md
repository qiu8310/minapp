<!-- https://developers.weixin.qq.com/miniprogram/dev/api/canvas/scale.html -->

canvasContext.scale
===================

### 定义

在调用`scale`方法后，之后创建的路径其横纵坐标会被缩放。多次调用`scale`，倍数会相乘。

### 参数

  参数          |  类型     |  说明                                      
----------------|-----------|--------------------------------------------
  scaleWidth    |  Number   |横坐标缩放的倍数 (1 = 100%，0.5 = 50%，2 = 200%)
  scaleHeight   |  Number   |纵坐标轴缩放的倍数 (1 = 100%，0.5 = 50%，2 = 200%)

### 例子

    const ctx = wx.createCanvasContext('myCanvas')
    
    ctx.strokeRect(10, 10, 25, 15)
    ctx.scale(2, 2)
    ctx.strokeRect(10, 10, 25, 15)
    ctx.scale(2, 2)
    ctx.strokeRect(10, 10, 25, 15)
    
    ctx.draw()
    

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/scale.png)
