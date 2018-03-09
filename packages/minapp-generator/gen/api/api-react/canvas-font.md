<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/canvas/font.html -->

canvasContext.font
==================

> 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

### 定义

设置当前字体样式的属性

### 语法

    canvasContext.font = value
    

### 参数

  属性值  |  类型     |  说明                                                
----------|-----------|------------------------------------------------------
  value   |  String   |符合CSS font 语法的DOMString 字符串，默认字体是 10px sans-serif

**value 支持的属性有：**

  属性     |  说明                               
-----------|-------------------------------------
  style    |字体样式。仅支持 italic, oblique, normal
  size     |  字体大小                           
  weight   |  字体粗细。仅支持 normal, bold      
  family   | 字体族名。注意确认各平台所支持的字体
