<!-- https://developers.weixin.qq.com/miniprogram/dev/api/canvas/fill-text.html -->

canvasContext.fillText
======================

### 定义

在画布上绘制被填充的文本。

### 参数

  参数       |  类型     |  说明            
-------------|-----------|------------------
  text       |  String   |在画布上输出的文本
  x          |  Number   |绘制文本的左上角x坐标位置
  y          |  Number   |绘制文本的左上角y坐标位置
  maxWidth   |  Number   |需要绘制的最大宽度，可选

### 例子

    const ctx = wx.createCanvasContext('myCanvas')
    
    ctx.setFontSize(20)
    ctx.fillText('Hello', 20, 20)
    ctx.fillText('MINA', 100, 100)
    
    ctx.draw()
    

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/text.png?t=2018413)
