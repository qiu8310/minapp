<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/canvas/set-transform.html -->

canvasContext.setTransform
==========================

> 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

### 定义

使用矩阵重新设置（覆盖）当前变换的方法

### 语法

    canvasContext.setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY)
    

### 参数

  属性值       |  类型     |  说明   
---------------|-----------|---------
  scaleX       |  Number   | 水平缩放
  skewX        |  Number   | 水平倾斜
  skewY        |  Number   | 垂直倾斜
  scaleY       |  Number   | 垂直缩放
  translateX   |  Number   | 水平移动
  translateY   |  Number   | 垂直移动
