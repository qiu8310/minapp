<!-- https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-line-dash.html -->

canvasContext.setLineDash
=========================

> 基础库 1.6.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

### 定义

设置线条的宽度。

### 参数

  参数      |  类型     |  说明                         
------------|-----------|-------------------------------
  pattern   |  Array    |一组描述交替绘制线段和间距（坐标空间单位）长度的数字
  offset    |  Number   |  虚线偏移量                   

### 例子

    const ctx = wx.createCanvasContext('myCanvas')
    
    ctx.setLineDash([10, 20], 5);
    
    ctx.beginPath();
    ctx.moveTo(0,100);
    ctx.lineTo(400, 100);
    ctx.stroke();
    
    ctx.draw()
    

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/set-line-dash.png?t=2018413)
