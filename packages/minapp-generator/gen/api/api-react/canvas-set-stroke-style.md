<!-- https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-stroke-style.html -->

canvasContext.setStrokeStyle
============================

### 定义

设置边框颜色。

**Tip**: 如果没有设置 `fillStyle`，默认颜色为 `black`。

### 语法

    canvasContext.setStrokeStyle(color)
    canvasContext.strokeStyle = color // 基础库 1.9.90 起支持
    

### 参数

  参数    |  类型                                                                              |  定义              
----------|------------------------------------------------------------------------------------|--------------------
  color   |  [Color](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/color.html)   |  Gradient Object   

### 例子

    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setStrokeStyle('red')
    ctx.strokeRect(10, 10, 150, 75)
    ctx.draw()
    

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/stroke-rect.png?t=2018413)
