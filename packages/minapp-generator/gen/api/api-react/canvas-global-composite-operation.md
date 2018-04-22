<!-- https://developers.weixin.qq.com/miniprogram/dev/api/canvas/global-composite-operation.html -->

canvasContext.globalCompositeOperation
======================================

> 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

### 定义

该属性是设置要在绘制新形状时应用的合成操作的类型。

### 语法

    canvasContext.globalCompositeOperation = type
    

### 参数

  属性值 |  类型     |  说明               
---------|-----------|---------------------
  type   |  String   |标识要使用哪种合成或混合模式操作

**`type` 支持的操作有：**

  平台  |  操作                                                                                                                                                                                                            
--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  安卓  |  xor, source-over, source-atop, destination-out, lighter, overlay, darken, lighten, hard-light                                                                                                                   
  iOS   |  xor, source-over, source-atop, destination-over, destination-out, lighter, multiply, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, saturation, luminosity   
