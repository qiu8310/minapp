<!-- https://developers.weixin.qq.com/miniprogram/dev/api/canvas/reference.html -->

API 接口
======

  方法                                                                                                            |  说明                           
------------------------------------------------------------------------------------------------------------------|---------------------------------
  [createCanvasContext](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/create-canvas-context.html)   |创建 canvas 绘图上下文(指定 canvasId)
  [createContext](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/create-context.html)(不推荐使用)    |  创建 canvas 绘图上下文         
  [drawCanvas](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/draw-canvas.html)(不推荐使用)          |  进行绘图                       
  [canvasToTempFilePath](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/temp-file.html)              |  导出图片                       

context 对象的方法列表
===============

### 颜色，样式，阴影

  方法                                                                                                  |  说明     
--------------------------------------------------------------------------------------------------------|-----------
  [setFillStyle](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-fill-style.html)       |设置填充样式
  [setStrokeStyle](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-stroke-style.html)   |设置线条样式
  [setShadow](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-shadow.html)              |  设置阴影 

### 渐变

  方法                                                                                                                  |  说明               
------------------------------------------------------------------------------------------------------------------------|---------------------
  [createLinearGradient](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/create-linear-gradient.html)       |  创建一个线性渐变   
  [createCircularGradient](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/create-circular-gradient.html)   |  创建一个圆形渐变   
  [addColorStop](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/add-color-stop.html)                       |在渐变中的某一点添加一个颜色变化

### 线条样式

  方法                                                                                                |  说明         
------------------------------------------------------------------------------------------------------|---------------
  [setLineWidth](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-line-width.html)     |  设置线条宽度 
  [setLineCap](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-line-cap.html)         |设置线条端点的样式
  [setLineJoin](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-line-join.html)       |设置两线相交处的样式
  [setMiterLimit](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-miter-limit.html)   |  设置最大倾斜 

### 矩形

  方法                                                                                         |  说明                 
-----------------------------------------------------------------------------------------------|-----------------------
  [rect](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/rect.html)                |  创建一个矩形         
  [fillRect](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/fill-rect.html)       |  填充一个矩形         
  [strokeRect](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/stroke-rect.html)   |  画一个矩形（不填充） 
  [clearRect](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/clear-rect.html)     |在给定的矩形区域内，清除画布上的像素

### 路径

  方法                                                                                                      |  说明                           
------------------------------------------------------------------------------------------------------------|---------------------------------
  [fill](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/fill.html)                             |  对当前路径进行填充             
  [stroke](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/stroke.html)                         |  对当前路径进行描边             
  [beginPath](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/begin-path.html)                  |  开始一个路径                   
  [closePath](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/close-path.html)                  |  关闭一个路径                   
  [moveTo](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/move-to.html)                        |把路径移动到画布中的指定点，但不创建线条。
  [lineTo](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/line-to.html)                        |添加一个新点，然后在画布中创建从该点到最后指定点的线条。
  [arc](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/arc.html)                               |添加一个弧形路径到当前路径，顺时针绘制。
  [quadraticCurveTo](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/quadratic-curve-to.html)   |  创建二次方贝塞尔曲线           
  [bezierCurveTo](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/bezier-curve-to.html)         |  创建三次方贝塞尔曲线           

### 变形

  方法                                                                                      |  说明          
--------------------------------------------------------------------------------------------|----------------
  [scale](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/scale.html)           |对横纵坐标进行缩放
  [rotate](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/rotate.html)         |对坐标轴进行顺时针旋转
  [translate](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/translate.html)   |对坐标原点进行缩放

### 文字

  方法                                                                                                    |  说明           
----------------------------------------------------------------------------------------------------------|-----------------
  [fillText](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/fill-text.html)                  |在画布上绘制被填充的文本
  [setFontSize](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-font-size.html)           |  设置字体大小   
  [setTextBaseline](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-text-baseline.html)   |  设置字体基准线 
  [setTextAlign](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-text-align.html)         | 设置字体对齐方式

### 图片

  方法                                                                                       |  说明       
---------------------------------------------------------------------------------------------|-------------
  [drawImage](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/draw-image.html)   |在画布上绘制图像

### 混合

  方法                                                                                                  |  说明        
--------------------------------------------------------------------------------------------------------|--------------
  [setGlobalAlpha](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/set-global-alpha.html)   |设置全局画笔透明度

### 其他

  方法                                                                                                    |  说明                    
----------------------------------------------------------------------------------------------------------|--------------------------
  [save](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/save-restore.html#save)              |  保存当前绘图上下文      
  [restore](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/save-restore.html#restore)        | 恢复之前保过的绘图上下文 
  [draw](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/draw.html)                           |  进行绘图                
  [getActions](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/get-actions.html)(不推荐使用)  |获取当前`context`上存储的绘图动作
[clearActions](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/clear-actions.html)(不推荐使用)|  清空当前的存储绘图动作  
