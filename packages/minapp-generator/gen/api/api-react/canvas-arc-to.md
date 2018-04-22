<!-- https://developers.weixin.qq.com/miniprogram/dev/api/canvas/arc-to.html -->

canvasContext.arcTo
===================

> 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

### 定义

根据控制点和半径绘制圆弧路径。

### 语法

    canvasContext.arcTo(x1, y1, x2, y2, radius)
    

### 参数

  属性值   |  类型     |  说明            
-----------|-----------|------------------
  x1       |  Number   |第一个控制点的 x 轴坐标
  y1       |  Number   |第一个控制点的 y 轴坐标
  x2       |  Number   |第二个控制点的 x 轴坐标
  y2       |  Number   |第二个控制点的 y 轴坐标
  radius   |  Number   |  圆弧的半径      
