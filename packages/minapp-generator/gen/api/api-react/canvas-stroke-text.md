<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/canvas/stroke-text.html -->

canvasContext.strokeText
========================

> 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

### 定义

给定的 (x, y) 位置绘制文本描边的方法

### 语法

    canvasContext.strokeText(text, x, y, maxWidth)
    

### 参数

  属性值     |  类型     |  说明           
-------------|-----------|-----------------
  text       |  String   |  要绘制的文本   
  x          |  Number   |文本起始点的 x 轴坐标
  y          |  Number   |文本起始点的 y 轴坐标
  maxWidth   |  Number   |需要绘制的最大宽度，可选
