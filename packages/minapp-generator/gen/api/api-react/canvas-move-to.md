<!-- https://developers.weixin.qq.com/miniprogram/dev/api/canvas/move-to.html -->

canvasContext.moveTo
====================

### 定义

把路径移动到画布中的指定点，不创建线条。

**Tip**: 用 `stroke()` 方法来画线条

### 参数

  参数 |  类型     |  说明       
-------|-----------|-------------
  x    |  Number   |目标位置的x坐标
  y    |  Number   |目标位置的y坐标

### 示例代码：

    const ctx = wx.createCanvasContext('myCanvas')
    ctx.moveTo(10, 10)
    ctx.lineTo(100, 10)
    
    ctx.moveTo(10, 50)
    ctx.lineTo(100, 50)
    ctx.stroke()
    ctx.draw()
    

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/move-to.png?t=2018413)
