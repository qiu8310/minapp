export namespace CanvasContext {
  namespace draw {
    type Param1 = () => any
  }
}
class CanvasContext {
  /**
   *
   * **定义：**
   *
   * 设置填充色。
   *
   * **Tip**: 如果没有设置 `fillStyle`，默认颜色为 `black`。
   *
   * **参数：**
   *
   *   参数    |  类型                                                                              |  定义              
   * ----------|------------------------------------------------------------------------------------|--------------------
   *   color   |  [Color](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/color.html)   |  Gradient Object   
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.setFillStyle(color)
   *     canvasContext.fillStyle = color // 基础库 1.9.90 起支持
   *     ```
   *
   * **例子：**
   *
   *     ```js
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     ctx.setFillStyle('red')
   *     ctx.fillRect(10, 10, 150, 75)
   *     ctx.draw()
   *     ```
   */
  setFillStyle(color: string): void
  /**
   *
   * **定义：**
   *
   * 设置边框颜色。
   *
   * **Tip**: 如果没有设置 `fillStyle`，默认颜色为 `black`。
   *
   * **参数：**
   *
   *   参数    |  类型                                                                              |  定义              
   * ----------|------------------------------------------------------------------------------------|--------------------
   *   color   |  [Color](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/color.html)   |  Gradient Object   
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.setStrokeStyle(color)
   *     canvasContext.strokeStyle = color // 基础库 1.9.90 起支持
   *     ```
   *
   * **例子：**
   *
   *     ```js
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     ctx.setStrokeStyle('red')
   *     ctx.strokeRect(10, 10, 150, 75)
   *     ctx.draw()
   *     ```
   */
  setStrokeStyle(color: string): void
  /**
   *
   * **定义：**
   *
   * 设置阴影样式。
   *
   * **Tip**: 如果没有设置，offsetX 默认值为0， offsetY 默认值为0， blur 默认值为0，color 默认值为 `black`。
   *
   * **参数：**
   *
   *   参数      |  类型                                                                              |  范围    |  定义              
   * ------------|------------------------------------------------------------------------------------|----------|--------------------
   *   offsetX   |  Number                                                                            |          |阴影相对于形状在水平方向的偏移
   *   offsetY   |  Number                                                                            |          |阴影相对于形状在竖直方向的偏移
   *   blur      |  Number                                                                            |  0~100   |阴影的模糊级别，数值越大越模糊
   *   color     |  [Color](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/color.html)   |          |  阴影的颜色        
   *
   * **例子：**
   *
   *     ```js
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     ctx.setFillStyle('red')
   *     ctx.setShadow(10, 50, 50, 'blue')
   *     ctx.fillRect(10, 10, 150, 75)
   *     ctx.draw()
   *     ```
   */
  setShadow(offsetX: number, offsetY: number, blur: number, color: string): void
  /**
   * > 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   *
   * **定义：**
   *
   * 设置阴影的模糊级别
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.shadowBlur = value
   *     ```
   */
  shadowBlur(): void
  /**
   * > 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   *
   * **定义：**
   *
   * 设置阴影的颜色
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.shadowColor = value
   *     ```
   */
  shadowColor(): void
  /**
   * > 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   *
   * **定义：**
   *
   * 设置阴影相对于形状在水平方向的偏移
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.shadowOffsetX = value
   *     ```
   */
  shadowOffsetX(): void
  /**
   * > 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   *
   * **定义：**
   *
   * 设置阴影相对于形状在竖直方向的偏移
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.shadowOffsetY = value
   *     ```
   */
  shadowOffsetY(): void
  /**
   *
   * **定义：**
   *
   * 创建一个线性的渐变颜色。
   *
   * **Tip**: 需要使用 `addColorStop()` 来指定渐变点，至少要两个。
   *
   * **参数：**
   *
   *   参数 |  类型     |  定义     
   * -------|-----------|-----------
   *   x0   |  Number   |起点的x坐标
   *   y0   |  Number   |起点的y坐标
   *   x1   |  Number   |终点的x坐标
   *   y1   |  Number   |终点的y坐标
   *
   * **例子：**
   *
   *     ```js
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     // Create linear gradient
   *     const grd = ctx.createLinearGradient(0, 0, 200, 0)
   *     grd.addColorStop(0, 'red')
   *     grd.addColorStop(1, 'white')
   *
   *     // Fill with gradient
   *     ctx.setFillStyle(grd)
   *     ctx.fillRect(10, 10, 150, 80)
   *     ctx.draw()
   *     ```
   */
  createLinearGradient(x0: number, y0: number, x1: number, y1: number): void
  /**
   *
   * **定义：**
   *
   * 创建一个圆形的渐变颜色。
   *
   * **Tip**: 起点在圆心，终点在圆环。
   *
   * **Tip**: 需要使用 `addColorStop()` 来指定渐变点，至少要两个。
   *
   * **参数：**
   *
   *   参数 |  类型     |  定义     
   * -------|-----------|-----------
   *   x    |  Number   |圆心的x坐标
   *   y    |  Number   |圆心的y坐标
   *   r    |  Number   |  圆的半径 
   *
   * **例子：**
   *
   *     ```js
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     // Create circular gradient
   *     const grd = ctx.createCircularGradient(75, 50, 50)
   *     grd.addColorStop(0, 'red')
   *     grd.addColorStop(1, 'white')
   *
   *     // Fill with gradient
   *     ctx.setFillStyle(grd)
   *     ctx.fillRect(10, 10, 150, 80)
   *     ctx.draw()
   *     ```
   */
  createCircularGradient(x: number, y: number, r: number): void
  /**
   *
   * **定义：**
   *
   * 创建一个颜色的渐变点。
   *
   * **Tip**: 小于最小 stop 的部分会按最小 stop 的 color 来渲染，大于最大 stop 的部分会按最大 stop 的 color 来渲染。
   *
   * **Tip**: 需要使用 `addColorStop()` 来指定渐变点，至少要两个。
   *
   * **参数：**
   *
   *   参数    |  类型                                                                              |  定义              
   * ----------|------------------------------------------------------------------------------------|--------------------
   *   stop    |  Number(0-1)                                                                       |表示渐变点在起点和终点中的位置
   *   color   |  [Color](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/color.html)   |  渐变点的颜色      
   *
   * **示例代码：**
   *
   *     ```js
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     // Create circular gradient
   *     const grd = ctx.createLinearGradient(30, 10, 120, 10)
   *     grd.addColorStop(0, 'red')
   *     grd.addColorStop(0.16, 'orange')
   *     grd.addColorStop(0.33, 'yellow')
   *     grd.addColorStop(0.5, 'green')
   *     grd.addColorStop(0.66, 'cyan')
   *     grd.addColorStop(0.83, 'blue')
   *     grd.addColorStop(1, 'purple')
   *
   *     // Fill with gradient
   *     ctx.setFillStyle(grd)
   *     ctx.fillRect(10, 10, 150, 80)
   *     ctx.draw()
   *     ```
   */
  addColorStop(stop: number, color: string): void
  /**
   *
   * **定义：**
   *
   * 设置线条的宽度。
   *
   * **参数：**
   *
   *   参数        |  类型     |  说明           
   * --------------|-----------|-----------------
   *   lineWidth   |  Number   |线条的宽度(单位是px)
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.setLineWidth(lineWidth)
   *     canvasContext.lineWidth = lineWidth // 基础库 1.9.90 起支持
   *     ```
   *
   * **例子：**
   *
   *     ```js
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     ctx.beginPath()
   *     ctx.moveTo(10, 10)
   *     ctx.lineTo(150, 10)
   *     ctx.stroke()
   *
   *     ctx.beginPath()
   *     ctx.setLineWidth(5)
   *     ctx.moveTo(10, 30)
   *     ctx.lineTo(150, 30)
   *     ctx.stroke()
   *
   *     ctx.beginPath()
   *     ctx.setLineWidth(10)
   *     ctx.moveTo(10, 50)
   *     ctx.lineTo(150, 50)
   *     ctx.stroke()
   *
   *     ctx.beginPath()
   *     ctx.setLineWidth(15)
   *     ctx.moveTo(10, 70)
   *     ctx.lineTo(150, 70)
   *     ctx.stroke()
   *
   *     ctx.draw()
   *     ```
   */
  setLineWidth(lineWidth: number): void
  /**
   *
   * **定义：**
   *
   * 设置线条的端点样式。
   *
   * **参数：**
   *
   *   参数      |  类型     |  范围                      |  说明        
   * ------------|-----------|----------------------------|--------------
   *   lineCap   |  String   |  'butt'、'round'、'square' |线条的结束端点样式
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.setLineCap(lineCap)
   *     canvasContext.lineCap = lineCap // 基础库 1.9.90 起支持
   *     ```
   *
   * **示例代码：**
   *
   *     ```js
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     ctx.beginPath()
   *     ctx.moveTo(10, 10)
   *     ctx.lineTo(150, 10)
   *     ctx.stroke()
   *
   *     ctx.beginPath()
   *     ctx.setLineCap('butt')
   *     ctx.setLineWidth(10)
   *     ctx.moveTo(10, 30)
   *     ctx.lineTo(150, 30)
   *     ctx.stroke()
   *
   *     ctx.beginPath()
   *     ctx.setLineCap('round')
   *     ctx.setLineWidth(10)
   *     ctx.moveTo(10, 50)
   *     ctx.lineTo(150, 50)
   *     ctx.stroke()
   *
   *     ctx.beginPath()
   *     ctx.setLineCap('square')
   *     ctx.setLineWidth(10)
   *     ctx.moveTo(10, 70)
   *     ctx.lineTo(150, 70)
   *     ctx.stroke()
   *
   *     ctx.draw()
   *     ```
   */
  setLineCap(lineCap: string): void
  /**
   *
   * **定义：**
   *
   * 设置线条的交点样式。
   *
   * **参数：**
   *
   *   参数       |  类型     |  范围                      |  说明        
   * -------------|-----------|----------------------------|--------------
   *   lineJoin   |  String   |  'bevel'、'round'、'miter' |线条的结束交点样式
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.setLineJoin(lineJoin)
   *     canvasContext.lineJoin = lineJoin // 基础库 1.9.90 起支持
   *     ```
   *
   * **例子：**
   *
   *     ```js
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     ctx.beginPath()
   *     ctx.moveTo(10, 10)
   *     ctx.lineTo(100, 50)
   *     ctx.lineTo(10, 90)
   *     ctx.stroke()
   *
   *     ctx.beginPath()
   *     ctx.setLineJoin('bevel')
   *     ctx.setLineWidth(10)
   *     ctx.moveTo(50, 10)
   *     ctx.lineTo(140, 50)
   *     ctx.lineTo(50, 90)
   *     ctx.stroke()
   *
   *     ctx.beginPath()
   *     ctx.setLineJoin('round')
   *     ctx.setLineWidth(10)
   *     ctx.moveTo(90, 10)
   *     ctx.lineTo(180, 50)
   *     ctx.lineTo(90, 90)
   *     ctx.stroke()
   *
   *     ctx.beginPath()
   *     ctx.setLineJoin('miter')
   *     ctx.setLineWidth(10)
   *     ctx.moveTo(130, 10)
   *     ctx.lineTo(220, 50)
   *     ctx.lineTo(130, 90)
   *     ctx.stroke()
   *
   *     ctx.draw()
   *     ```
   */
  setLineJoin(lineJoin: string): void
  /**
   * > 基础库 1.6.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   *
   * **定义：**
   *
   * 设置线条的宽度。
   *
   * **参数：**
   *
   *   参数      |  类型     |  说明                         
   * ------------|-----------|-------------------------------
   *   pattern   |  Array    |一组描述交替绘制线段和间距（坐标空间单位）长度的数字
   *   offset    |  Number   |  虚线偏移量                   
   *
   * **例子：**
   *
   *     ```js
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     ctx.setLineDash([10, 20], 5);
   *
   *     ctx.beginPath();
   *     ctx.moveTo(0,100);
   *     ctx.lineTo(400, 100);
   *     ctx.stroke();
   *
   *     ctx.draw()
   *     ```
   */
  setLineDash(pattern: any[], offset: number): void
  /**
   *
   * **定义：**
   *
   * 设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离。 当 `setLineJoin()` 为 miter 时才有效。超过最大倾斜长度的，连接处将以 lineJoin 为 bevel 来显示
   *
   * **参数：**
   *
   *   参数         |  类型     |  说明     
   * ---------------|-----------|-----------
   *   miterLimit   |  Number   |最大斜接长度
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.setMiterLimit(miterLimit)
   *     canvasContext.miterLimit = miterLimit // 基础库 1.9.90 起支持
   *     ```
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     ctx.beginPath()
   *     ctx.setLineWidth(10)
   *     ctx.setLineJoin('miter')
   *     ctx.setMiterLimit(1)
   *     ctx.moveTo(10, 10)
   *     ctx.lineTo(100, 50)
   *     ctx.lineTo(10, 90)
   *     ctx.stroke()
   *
   *     ctx.beginPath()
   *     ctx.setLineWidth(10)
   *     ctx.setLineJoin('miter')
   *     ctx.setMiterLimit(2)
   *     ctx.moveTo(50, 10)
   *     ctx.lineTo(140, 50)
   *     ctx.lineTo(50, 90)
   *     ctx.stroke()
   *
   *     ctx.beginPath()
   *     ctx.setLineWidth(10)
   *     ctx.setLineJoin('miter')
   *     ctx.setMiterLimit(3)
   *     ctx.moveTo(90, 10)
   *     ctx.lineTo(180, 50)
   *     ctx.lineTo(90, 90)
   *     ctx.stroke()
   *
   *     ctx.beginPath()
   *     ctx.setLineWidth(10)
   *     ctx.setLineJoin('miter')
   *     ctx.setMiterLimit(4)
   *     ctx.moveTo(130, 10)
   *     ctx.lineTo(220, 50)
   *     ctx.lineTo(130, 90)
   *     ctx.stroke()
   *
   *     ctx.draw()
   *     ```
   */
  setMiterLimit(miterLimit: number): void
  /**
   *
   * **定义：**
   *
   * 创建一个矩形。
   *
   * **Tip**: 用 `fill()` 或者 `stroke()` 方法将矩形真正的画到 canvas 中。
   *
   * **参数：**
   *
   *   参数     |  类型     |  说明          
   * -----------|-----------|----------------
   *   x        |  Number   |矩形路径左上角的x坐标
   *   y        |  Number   |矩形路径左上角的y坐标
   *   width    |  Number   | 矩形路径的宽度 
   *   height   |  Number   | 矩形路径的高度 
   *
   * **例子：**
   *
   *     ```js
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     ctx.rect(10, 10, 150, 75)
   *     ctx.setFillStyle('red')
   *     ctx.fill()
   *     ctx.draw()
   *     ```
   */
  rect(x: number, y: number, width: number, height: number): void
  /**
   *
   * **定义：**
   *
   * 填充一个矩形。
   *
   * **Tip**: 用 `setFillStyle()` 设置矩形的填充色，如果没设置默认是黑色。
   *
   * **参数：**
   *
   *   参数     |  类型     |  说明          
   * -----------|-----------|----------------
   *   x        |  Number   |矩形路径左上角的x坐标
   *   y        |  Number   |矩形路径左上角的y坐标
   *   width    |  Number   | 矩形路径的宽度 
   *   height   |  Number   | 矩形路径的高度 
   *
   * **例子：**
   *
   *     ```js
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     ctx.setFillStyle('red')
   *     ctx.fillRect(10, 10, 150, 75)
   *     ctx.draw()
   *     ```
   */
  fillRect(x: number, y: number, width: number, height: number): void
  /**
   *
   * **定义：**
   *
   * 画一个矩形(非填充)。
   *
   * **Tip**: 用 `setFillStroke()` 设置矩形线条的颜色，如果没设置默认是黑色。
   *
   * **参数：**
   *
   *   参数     |  类型     |  范围 |  说明          
   * -----------|-----------|-------|----------------
   *   x        |  Number   |       |矩形路径左上角的x坐标
   *   y        |  Number   |       |矩形路径左上角的y坐标
   *   width    |  Number   |       | 矩形路径的宽度 
   *   height   |  Number   |       | 矩形路径的高度 
   *
   * **例子：**
   *
   *     ```js
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     ctx.setStrokeStyle('red')
   *     ctx.strokeRect(10, 10, 150, 75)
   *     ctx.draw()
   *     ```
   */
  strokeRect(x: number, y: number, width: number, height: number): void
  /**
   *
   * **参数：**
   *
   *   参数     |  类型     |  说明          
   * -----------|-----------|----------------
   *   x        |  Number   |矩形区域左上角的x坐标
   *   y        |  Number   |矩形区域左上角的y坐标
   *   width    |  Number   | 矩形区域的宽度 
   *   height   |  Number   | 矩形区域的高度 
   *
   * **定义：**
   *
   *     ```html
   *     <canvas canvas-id="myCanvas" style="border: 1px solid; background: #123456;"/>
   *     ```
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     ctx.setFillStyle('red')
   *     ctx.fillRect(0, 0, 150, 200)
   *     ctx.setFillStyle('blue')
   *     ctx.fillRect(150, 0, 150, 200)
   *     ctx.clearRect(10, 10, 150, 75)
   *     ctx.draw()
   *     ```
   */
  clearRect(x: number, y: number, width: number, height: number): void
  /**
   *
   * **定义：**
   *
   * 对当前路径中的内容进行填充。默认的填充色为黑色。
   *
   * **Tip**: 如果当前路径没有闭合，`fill()` 方法会将起点和终点进行连接，然后填充，详情见例一。
   *
   * **Tip**: `fill()` 填充的的路径是从 `beginPath()` 开始计算，但是不会将 `fillRect()` 包含进去，详情见例二。
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     ctx.moveTo(10, 10)
   *     ctx.lineTo(100, 10)
   *     ctx.lineTo(100, 100)
   *     ctx.fill()
   *     ctx.draw()
   *     ```
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     // begin path
   *     ctx.rect(10, 10, 100, 30)
   *     ctx.setFillStyle('yellow')
   *     ctx.fill()
   *
   *     // begin another path
   *     ctx.beginPath()
   *     ctx.rect(10, 40, 100, 30)
   *
   *     // only fill this rect, not in current path
   *     ctx.setFillStyle('blue')
   *     ctx.fillRect(10, 70, 100, 30)
   *
   *     ctx.rect(10, 100, 100, 30)
   *
   *     // it will fill current path
   *     ctx.setFillStyle('red')
   *     ctx.fill()
   *     ctx.draw()
   *     ```
   */
  fill(): void
  /**
   *
   * **定义：**
   *
   * 画出当前路径的边框。默认颜色色为黑色。
   *
   * **Tip**: `stroke()` 描绘的的路径是从 `beginPath()` 开始计算，但是不会将 `strokeRect()` 包含进去，详情见例二。
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     ctx.moveTo(10, 10)
   *     ctx.lineTo(100, 10)
   *     ctx.lineTo(100, 100)
   *     ctx.stroke()
   *     ctx.draw()
   *     ```
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     // begin path
   *     ctx.rect(10, 10, 100, 30)
   *     ctx.setStrokeStyle('yellow')
   *     ctx.stroke()
   *
   *     // begin another path
   *     ctx.beginPath()
   *     ctx.rect(10, 40, 100, 30)
   *
   *     // only stoke this rect, not in current path
   *     ctx.setStrokeStyle('blue')
   *     ctx.strokeRect(10, 70, 100, 30)
   *
   *     ctx.rect(10, 100, 100, 30)
   *
   *     // it will stroke current path
   *     ctx.setStrokeStyle('red')
   *     ctx.stroke()
   *     ctx.draw()
   *     ```
   */
  stroke(): void
  /**
   *
   * **定义：**
   *
   * 开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边。
   *
   * **Tip**: 在最开始的时候相当于调用了一次 `beginPath()`。
   *
   * **Tip**: 同一个路径内的多次`setFillStyle()`、`setStrokeStyle()`、`setLineWidth()`等设置，以最后一次设置为准。
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     // begin path
   *     ctx.rect(10, 10, 100, 30)
   *     ctx.setFillStyle('yellow')
   *     ctx.fill()
   *
   *     // begin another path
   *     ctx.beginPath()
   *     ctx.rect(10, 40, 100, 30)
   *
   *     // only fill this rect, not in current path
   *     ctx.setFillStyle('blue')
   *     ctx.fillRect(10, 70, 100, 30)
   *
   *     ctx.rect(10, 100, 100, 30)
   *
   *     // it will fill current path
   *     ctx.setFillStyle('red')
   *     ctx.fill()
   *     ctx.draw()
   *     ```
   */
  beginPath(): void
  /**
   *
   * **定义：**
   *
   * 关闭一个路径
   *
   * **Tip**: 关闭路径会连接起点和终点。
   *
   * **Tip**: 如果关闭路径后没有调用 `fill()` 或者 `stroke()` 并开启了新的路径，那之前的路径将不会被渲染。
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     ctx.moveTo(10, 10)
   *     ctx.lineTo(100, 10)
   *     ctx.lineTo(100, 100)
   *     ctx.closePath()
   *     ctx.stroke()
   *     ctx.draw()
   *     ```
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     // begin path
   *     ctx.rect(10, 10, 100, 30)
   *     ctx.closePath()
   *
   *     // begin another path
   *     ctx.beginPath()
   *     ctx.rect(10, 40, 100, 30)
   *
   *     // only fill this rect, not in current path
   *     ctx.setFillStyle('blue')
   *     ctx.fillRect(10, 70, 100, 30)
   *
   *     ctx.rect(10, 100, 100, 30)
   *
   *     // it will fill current path
   *     ctx.setFillStyle('red')
   *     ctx.fill()
   *     ctx.draw()
   *     ```
   */
  closePath(): void
  /**
   *
   * **定义：**
   *
   * 把路径移动到画布中的指定点，不创建线条。
   *
   * **Tip**: 用 `stroke()` 方法来画线条
   *
   * **参数：**
   *
   *   参数 |  类型     |  说明       
   * -------|-----------|-------------
   *   x    |  Number   |目标位置的x坐标
   *   y    |  Number   |目标位置的y坐标
   *
   * **示例代码：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     ctx.moveTo(10, 10)
   *     ctx.lineTo(100, 10)
   *
   *     ctx.moveTo(10, 50)
   *     ctx.lineTo(100, 50)
   *     ctx.stroke()
   *     ctx.draw()
   *     ```
   */
  moveTo(x: number, y: number): void
  /**
   *
   * **定义：**
   *
   * `lineTo` 方法增加一个新点，然后创建一条从上次指定点到目标点的线。
   *
   * **Tip**: 用 `stroke()` 方法来画线条
   *
   * **参数：**
   *
   *   参数 |  类型     |  说明       
   * -------|-----------|-------------
   *   x    |  Number   |目标位置的x坐标
   *   y    |  Number   |目标位置的y坐标
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     ctx.moveTo(10, 10)
   *     ctx.rect(10, 10, 100, 50)
   *     ctx.lineTo(110, 60)
   *     ctx.stroke()
   *     ctx.draw()
   *     ```
   */
  lineTo(x: number, y: number): void
  /**
   *
   * **定义：**
   *
   * 画一条弧线。
   *
   * **Tip**: 创建一个圆可以用 `arc()` 方法指定起始弧度为0，终止弧度为 `2 * Math.PI`。
   *
   * **Tip**: 用 `stroke()` 或者 `fill()` 方法来在 canvas 中画弧线。
   *
   * **参数：**
   *
   *   参数               |  类型      |  说明                                 
   * ---------------------|------------|---------------------------------------
   *   x                  |  Number    |  圆的x坐标                            
   *   y                  |  Number    |  圆的y坐标                            
   *   r                  |  Number    |  圆的半径                             
   *   sAngle             |  Number    |  起始弧度，单位弧度（在3点钟方向）    
   *   eAngle             |  Number    |  终止弧度                             
   *   counterclockwise   |  Boolean   |可选。指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     // Draw coordinates
   *     ctx.arc(100, 75, 50, 0, 2 * Math.PI)
   *     ctx.setFillStyle('#EEEEEE')
   *     ctx.fill()
   *
   *     ctx.beginPath()
   *     ctx.moveTo(40, 75)
   *     ctx.lineTo(160, 75)
   *     ctx.moveTo(100, 15)
   *     ctx.lineTo(100, 135)
   *     ctx.setStrokeStyle('#AAAAAA')
   *     ctx.stroke()
   *
   *     ctx.setFontSize(12)
   *     ctx.setFillStyle('black')
   *     ctx.fillText('0', 165, 78)
   *     ctx.fillText('0.5*PI', 83, 145)
   *     ctx.fillText('1*PI', 15, 78)
   *     ctx.fillText('1.5*PI', 83, 10)
   *
   *     // Draw points
   *     ctx.beginPath()
   *     ctx.arc(100, 75, 2, 0, 2 * Math.PI)
   *     ctx.setFillStyle('lightgreen')
   *     ctx.fill()
   *
   *     ctx.beginPath()
   *     ctx.arc(100, 25, 2, 0, 2 * Math.PI)
   *     ctx.setFillStyle('blue')
   *     ctx.fill()
   *
   *     ctx.beginPath()
   *     ctx.arc(150, 75, 2, 0, 2 * Math.PI)
   *     ctx.setFillStyle('red')
   *     ctx.fill()
   *
   *     // Draw arc
   *     ctx.beginPath()
   *     ctx.arc(100, 75, 50, 0, 1.5 * Math.PI)
   *     ctx.setStrokeStyle('#333333')
   *     ctx.stroke()
   *
   *     ctx.draw()
   *     ```
   */
  arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise: boolean): void
  /**
   *
   * **定义：**
   *
   * 创建三次方贝塞尔曲线路径。
   *
   * **Tip**: 曲线的起始点为路径中前一个点。
   *
   * **参数：**
   *
   *   参数   |  类型     |  说明              
   * ---------|-----------|--------------------
   *   cp1x   |  Number   |第一个贝塞尔控制点的 x 坐标
   *   cp1y   |  Number   |第一个贝塞尔控制点的 y 坐标
   *   cp2x   |  Number   |第二个贝塞尔控制点的 x 坐标
   *   cp2y   |  Number   |第二个贝塞尔控制点的 y 坐标
   *   x      |  Number   |  结束点的 x 坐标   
   *   y      |  Number   |  结束点的 y 坐标   
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     // Draw points
   *     ctx.beginPath()
   *     ctx.arc(20, 20, 2, 0, 2 * Math.PI)
   *     ctx.setFillStyle('red')
   *     ctx.fill()
   *
   *     ctx.beginPath()
   *     ctx.arc(200, 20, 2, 0, 2 * Math.PI)
   *     ctx.setFillStyle('lightgreen')
   *     ctx.fill()
   *
   *     ctx.beginPath()
   *     ctx.arc(20, 100, 2, 0, 2 * Math.PI)
   *     ctx.arc(200, 100, 2, 0, 2 * Math.PI)
   *     ctx.setFillStyle('blue')
   *     ctx.fill()
   *
   *     ctx.setFillStyle('black')
   *     ctx.setFontSize(12)
   *
   *     // Draw guides
   *     ctx.beginPath()
   *     ctx.moveTo(20, 20)
   *     ctx.lineTo(20, 100)
   *     ctx.lineTo(150, 75)
   *
   *     ctx.moveTo(200, 20)
   *     ctx.lineTo(200, 100)
   *     ctx.lineTo(70, 75)
   *     ctx.setStrokeStyle('#AAAAAA')
   *     ctx.stroke()
   *
   *     // Draw quadratic curve
   *     ctx.beginPath()
   *     ctx.moveTo(20, 20)
   *     ctx.bezierCurveTo(20, 100, 200, 100, 200, 20)
   *     ctx.setStrokeStyle('black')
   *     ctx.stroke()
   *
   *     ctx.draw()
   *     ```
   */
  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void
  /**
   *
   * **定义：**
   *
   * 创建二次贝塞尔曲线路径。
   *
   * **Tip**: 曲线的起始点为路径中前一个点。
   *
   * **参数：**
   *
   *   参数  |  类型     |  说明         
   * --------|-----------|---------------
   *   cpx   |  Number   |贝塞尔控制点的x坐标
   *   cpy   |  Number   |贝塞尔控制点的y坐标
   *   x     |  Number   | 结束点的x坐标 
   *   y     |  Number   | 结束点的y坐标 
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     // Draw points
   *     ctx.beginPath()
   *     ctx.arc(20, 20, 2, 0, 2 * Math.PI)
   *     ctx.setFillStyle('red')
   *     ctx.fill()
   *
   *     ctx.beginPath()
   *     ctx.arc(200, 20, 2, 0, 2 * Math.PI)
   *     ctx.setFillStyle('lightgreen')
   *     ctx.fill()
   *
   *     ctx.beginPath()
   *     ctx.arc(20, 100, 2, 0, 2 * Math.PI)
   *     ctx.setFillStyle('blue')
   *     ctx.fill()
   *
   *     ctx.setFillStyle('black')
   *     ctx.setFontSize(12)
   *
   *     // Draw guides
   *     ctx.beginPath()
   *     ctx.moveTo(20, 20)
   *     ctx.lineTo(20, 100)
   *     ctx.lineTo(200, 20)
   *     ctx.setStrokeStyle('#AAAAAA')
   *     ctx.stroke()
   *
   *     // Draw quadratic curve
   *     ctx.beginPath()
   *     ctx.moveTo(20, 20)
   *     ctx.quadraticCurveTo(20, 100, 200, 20)
   *     ctx.setStrokeStyle('black')
   *     ctx.stroke()
   *
   *     ctx.draw()
   *     ```
   */
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void
  /**
   *
   * **定义：**
   *
   * 在调用`scale`方法后，之后创建的路径其横纵坐标会被缩放。多次调用`scale`，倍数会相乘。
   *
   * **参数：**
   *
   *   参数          |  类型     |  说明                                      
   * ----------------|-----------|--------------------------------------------
   *   scaleWidth    |  Number   |横坐标缩放的倍数 (1 = 100%，0.5 = 50%，2 = 200%)
   *   scaleHeight   |  Number   |纵坐标轴缩放的倍数 (1 = 100%，0.5 = 50%，2 = 200%)
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     ctx.strokeRect(10, 10, 25, 15)
   *     ctx.scale(2, 2)
   *     ctx.strokeRect(10, 10, 25, 15)
   *     ctx.scale(2, 2)
   *     ctx.strokeRect(10, 10, 25, 15)
   *
   *     ctx.draw()
   *     ```
   */
  scale(scaleWidth: number, scaleHeight: number): void
  /**
   *
   * **定义：**
   *
   * 以原点为中心，原点可以用 [translate](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/rotate.html#translate)方法修改。顺时针旋转当前坐标轴。多次调用`rotate`，旋转的角度会叠加。
   *
   * **参数：**
   *
   *   参数     |  类型     |  说明                                               
   * -----------|-----------|-----------------------------------------------------
   *   rotate   |  Number   |旋转角度，以弧度计(degrees * Math.PI/180；degrees范围为0~360)
   *
   * ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/rotate.png)
   *
   * **参数：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     ctx.strokeRect(100, 10, 150, 100)
   *     ctx.rotate(20 * Math.PI / 180)
   *     ctx.strokeRect(100, 10, 150, 100)
   *     ctx.rotate(20 * Math.PI / 180)
   *     ctx.strokeRect(100, 10, 150, 100)
   *
   *     ctx.draw()
   *     ```
   */
  rotate(rotate: number): void
  /**
   *
   * **定义：**
   *
   * 对当前坐标系的原点(0, 0)进行变换，默认的坐标系原点为页面左上角。
   *
   * **参数：**
   *
   *   参数 |  类型     |  说明      
   * -------|-----------|------------
   *   x    |  Number   |水平坐标平移量
   *   y    |  Number   |竖直坐标平移量
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     ctx.strokeRect(10, 10, 150, 100)
   *     ctx.translate(20, 20)
   *     ctx.strokeRect(10, 10, 150, 100)
   *     ctx.translate(20, 20)
   *     ctx.strokeRect(10, 10, 150, 100)
   *
   *     ctx.draw()
   *     ```
   */
  translate(x: number, y: number): void
  /**
   * > 基础库 1.6.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   *
   * **定义：**
   *
   * clip() 方法从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。可以在使用 clip() 方法前通过使用 save() 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过 restore() 方法）。
   *
   * **例子：**
   *
   *     ```js
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     wx.downloadFile({
   *       url: 'http://is5.mzstatic.com/image/thumb/Purple128/v4/75/3b/90/753b907c-b7fb-5877-215a-759bd73691a4/source/50x50bb.jpg',
   *       success: function(res) {
   *           ctx.save()
   *           ctx.beginPath()
   *           ctx.arc(50, 50, 25, 0, 2*Math.PI)
   *           ctx.clip()
   *           ctx.drawImage(res.tempFilePath, 25, 25)
   *           ctx.restore()
   *           ctx.draw()
   *       }
   *     })
   *     ```
   */
  clip(): void
  /**
   *
   * **定义：**
   *
   * 设置字体的字号。
   *
   * **参数：**
   *
   *   参数       |  类型     |  说明    
   * -------------|-----------|----------
   *   fontSize   |  Number   |字体的字号
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     ctx.setFontSize(20)
   *     ctx.fillText('20', 20, 20)
   *     ctx.setFontSize(30)
   *     ctx.fillText('30', 40, 40)
   *     ctx.setFontSize(40)
   *     ctx.fillText('40', 60, 60)
   *     ctx.setFontSize(50)
   *     ctx.fillText('50', 90, 90)
   *
   *     ctx.draw()
   *     ```
   */
  setFontSize(fontSize: number): void
  /**
   *
   * **定义：**
   *
   * 在画布上绘制被填充的文本。
   *
   * **参数：**
   *
   *   参数       |  类型     |  说明            
   * -------------|-----------|------------------
   *   text       |  String   |在画布上输出的文本
   *   x          |  Number   |绘制文本的左上角x坐标位置
   *   y          |  Number   |绘制文本的左上角y坐标位置
   *   maxWidth   |  Number   |需要绘制的最大宽度，可选
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     ctx.setFontSize(20)
   *     ctx.fillText('Hello', 20, 20)
   *     ctx.fillText('MINA', 100, 100)
   *
   *     ctx.draw()
   *     ```
   */
  fillText(text: string, x: number, y: number, maxWidth: number): void
  /**
   * > 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   *
   * **定义：**
   *
   * 用于设置文字的对齐
   *
   * **参数：**
   *
   *   参数    |  类型     |  定义                          
   * ----------|-----------|--------------------------------
   *   align   |  String   |可选值 'left'、'center'、'right'
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.setTextAlign(align)
   *     canvasContext.textAlign = align // 基础库 1.9.90 起支持
   *     ```
   *
   * **示例代码：**
   *
   *     ```js
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     ctx.setStrokeStyle('red')
   *     ctx.moveTo(150, 20)
   *     ctx.lineTo(150, 170)
   *     ctx.stroke()
   *
   *     ctx.setFontSize(15)
   *     ctx.setTextAlign('left')
   *     ctx.fillText('textAlign=left', 150, 60)
   *
   *     ctx.setTextAlign('center')
   *     ctx.fillText('textAlign=center', 150, 80)
   *
   *     ctx.setTextAlign('right')
   *     ctx.fillText('textAlign=right', 150, 100)
   *
   *     ctx.draw()
   *     ```
   */
  setTextAlign(align: string): void
  /**
   * > 基础库 1.4.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   *
   * **定义：**
   *
   * 用于设置文字的水平对齐
   *
   * **参数：**
   *
   *   参数           |  类型     |  定义                                   
   * -----------------|-----------|-----------------------------------------
   *   textBaseline   |  String   |可选值 'top'、'bottom'、'middle'、'normal'
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.setTextBaseline(textBaseline)
   *     canvasContext.textBaseline = textBaseline // 基础库 1.9.90 起支持
   *     ```
   *
   * **示例代码：**
   *
   *     ```js
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     ctx.setStrokeStyle('red')
   *     ctx.moveTo(5, 75)
   *     ctx.lineTo(295, 75)
   *     ctx.stroke()
   *
   *     ctx.setFontSize(20)
   *
   *     ctx.setTextBaseline('top')
   *     ctx.fillText('top', 5, 75)
   *
   *     ctx.setTextBaseline('middle')
   *     ctx.fillText('middle', 50, 75)
   *
   *     ctx.setTextBaseline('bottom')
   *     ctx.fillText('bottom', 120, 75)
   *
   *     ctx.setTextBaseline('normal')
   *     ctx.fillText('normal', 200, 75)
   *
   *     ctx.draw()
   *     ```
   */
  setTextBaseline(textBaseline: string): void
  /**
   *
   * **定义：**
   *
   * 绘制图像到画布。
   *
   * **参数：**
   *
   *   参数            |  类型     |  说明                         
   * ------------------|-----------|-------------------------------
   *   imageResource   |  String   |  所要绘制的图片资源           
   *   dx              |  Number   |图像的左上角在目标canvas上 X 轴的位置
   *   dy              |  Number   |图像的左上角在目标canvas上 Y 轴的位置
   *   dWidth          |  Number   |在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放
   *   dHeigt          |  Number   |在目标画布上绘制图像的高度，允许对绘制的图像进行缩放
   *   sx              |  Number   |源图像的矩形选择框的左上角 X 坐标
   *   sy              |  Number   |源图像的矩形选择框的左上角 Y 坐标
   *   sWidth          |  Number   |  源图像的矩形选择框的高度     
   *   sHeight         |  Number   |  源图像的矩形选择框的高度     
   *
   * **有三个版本的写法：**
   *
   * *   drawImage(dx, dy)
   * *   drawImage(dx, dy, dWidth, dHeight)
   * *   drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) **从 1.9.0 起支持**
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     wx.chooseImage({
   *       success: function(res){
   *         ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
   *         ctx.draw()
   *       }
   *     })
   *     ```
   */
  drawImage(dx: number, dy: number): void
  /**
   *
   * **定义：**
   *
   * 绘制图像到画布。
   *
   * **参数：**
   *
   *   参数            |  类型     |  说明                         
   * ------------------|-----------|-------------------------------
   *   imageResource   |  String   |  所要绘制的图片资源           
   *   dx              |  Number   |图像的左上角在目标canvas上 X 轴的位置
   *   dy              |  Number   |图像的左上角在目标canvas上 Y 轴的位置
   *   dWidth          |  Number   |在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放
   *   dHeigt          |  Number   |在目标画布上绘制图像的高度，允许对绘制的图像进行缩放
   *   sx              |  Number   |源图像的矩形选择框的左上角 X 坐标
   *   sy              |  Number   |源图像的矩形选择框的左上角 Y 坐标
   *   sWidth          |  Number   |  源图像的矩形选择框的高度     
   *   sHeight         |  Number   |  源图像的矩形选择框的高度     
   *
   * **有三个版本的写法：**
   *
   * *   drawImage(dx, dy)
   * *   drawImage(dx, dy, dWidth, dHeight)
   * *   drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) **从 1.9.0 起支持**
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     wx.chooseImage({
   *       success: function(res){
   *         ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
   *         ctx.draw()
   *       }
   *     })
   *     ```
   */
  drawImage(dx: number, dy: number, dWidth: number, dHeight: any): void
  /**
   *
   * **定义：**
   *
   * 绘制图像到画布。
   *
   * **参数：**
   *
   *   参数            |  类型     |  说明                         
   * ------------------|-----------|-------------------------------
   *   imageResource   |  String   |  所要绘制的图片资源           
   *   dx              |  Number   |图像的左上角在目标canvas上 X 轴的位置
   *   dy              |  Number   |图像的左上角在目标canvas上 Y 轴的位置
   *   dWidth          |  Number   |在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放
   *   dHeigt          |  Number   |在目标画布上绘制图像的高度，允许对绘制的图像进行缩放
   *   sx              |  Number   |源图像的矩形选择框的左上角 X 坐标
   *   sy              |  Number   |源图像的矩形选择框的左上角 Y 坐标
   *   sWidth          |  Number   |  源图像的矩形选择框的高度     
   *   sHeight         |  Number   |  源图像的矩形选择框的高度     
   *
   * **有三个版本的写法：**
   *
   * *   drawImage(dx, dy)
   * *   drawImage(dx, dy, dWidth, dHeight)
   * *   drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) **从 1.9.0 起支持**
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     wx.chooseImage({
   *       success: function(res){
   *         ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
   *         ctx.draw()
   *       }
   *     })
   *     ```
   */
  drawImage(sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: any): void
  /**
   *
   * **定义：**
   *
   * 设置全局画笔透明度。
   *
   * **参数：**
   *
   *   参数    |  类型     |  范围  |  说明                     
   * ----------|-----------|--------|---------------------------
   *   alpha   |  Number   |  0~1   |透明度，0 表示完全透明，1 表示完全不透明
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.setGlobalAlpha(alpha)
   *     canvasContext.globalAlpha = alpha // 基础库 1.9.90 起支持
   *     ```
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     ctx.setFillStyle('red')
   *     ctx.fillRect(10, 10, 150, 100)
   *     ctx.setGlobalAlpha(0.2)
   *     ctx.setFillStyle('blue')
   *     ctx.fillRect(50, 50, 150, 100)
   *     ctx.setFillStyle('yellow')
   *     ctx.fillRect(100, 100, 150, 100)
   *
   *     ctx.draw()
   *     ```
   */
  setGlobalAlpha(alpha: number): void
  /**
   *
   * **定义：**
   *
   * 保存当前的绘图上下文。
   */
  save(): void
  /**
   *
   * **定义：**
   *
   * 恢复之前保存的绘图上下文。
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     // save the default fill style
   *     ctx.save() 
   *     ctx.setFillStyle('red')
   *     ctx.fillRect(10, 10, 150, 100)
   *
   *     // restore to the previous saved state
   *     ctx.restore()
   *     ctx.fillRect(50, 50, 150, 100)
   *
   *     ctx.draw()
   *     ```
   */
  restore(): void
  /**
   *
   * **定义：**
   *
   * 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
   *
   * **Tip**: 绘图上下文需要由 `wx.createCanvasContext(canvasId)` 来创建。
   *
   * **参数：**
   *
   *   参数       |  类型       |  说明                                                                                                                                       | 最低版本 
   * -------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------|----------
   *   reserve    |  Boolean    |非必填。本次绘制是否接着上一次绘制，即reserve参数为false，则在本次调用drawCanvas绘制之前native层应先清空画布再继续绘制；若reserver参数为true，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面，默认 false|          
   *   callback   |  Function   |  绘制完成后回调                                                                                                                             |  1.7.0   
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     ctx.setFillStyle('red')
   *     ctx.fillRect(10, 10, 150, 100)
   *     ctx.draw()
   *     ctx.fillRect(50, 50, 150, 100)
   *     ctx.draw()
   *     ```
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *
   *     ctx.setFillStyle('red')
   *     ctx.fillRect(10, 10, 150, 100)
   *     ctx.draw()
   *     ctx.fillRect(50, 50, 150, 100)
   *     ctx.draw(true)
   *     ```
   */
  draw(reserve?: boolean, callback?: CanvasContext.draw.Param1): void
  /**
   * > 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   *
   * **定义：**
   *
   * 测量文本尺寸信息，目前仅返回文本宽度。同步接口。
   *
   * **参数：**
   *
   *   参数   |  类型     |  说明     
   * ---------|-----------|-----------
   *   text   |  String   |要测量的文本
   *
   * **返回：**
   *
   * 返回 TextMetrics 对象，结构如下：
   *
   *   参数    |  类型     |  说明    
   * ----------|-----------|----------
   *   width   |  Number   |文本的宽度
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     ctx.font = 'italic bold 20px cursive'
   *     const metrics = ctx.measureText('Hello World')
   *     console.log(metrics.width)
   *     ```
   */
  measureText(width: number): void
  /**
   * > 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   *
   * **定义：**
   *
   * 该属性是设置要在绘制新形状时应用的合成操作的类型。
   *
   * **参数：**
   *
   *   属性值 |  类型     |  说明               
   * ---------|-----------|---------------------
   *   type   |  String   |标识要使用哪种合成或混合模式操作
   *
   * **type 支持的操作有：**
   *
   *   平台  |  操作                                                                                                                                                                                                            
   * --------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   *   安卓  |  xor, source-over, source-atop, destination-out, lighter, overlay, darken, lighten, hard-light                                                                                                                   
   *   iOS   |  xor, source-over, source-atop, destination-over, destination-out, lighter, multiply, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, saturation, luminosity   
   *
   * **Bug**: 目前安卓版本只适用于 fill 填充块的合成，用于 stroke 线段的合成效果都是 source-over
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.globalCompositeOperation = type
   *     ```
   */
  globalCompositeOperation(): void
  /**
   * > 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   *
   * **定义：**
   *
   * 根据控制点和半径绘制圆弧路径。
   *
   * **参数：**
   *
   *   属性值   |  类型     |  说明            
   * -----------|-----------|------------------
   *   x1       |  Number   |第一个控制点的 x 轴坐标
   *   y1       |  Number   |第一个控制点的 y 轴坐标
   *   x2       |  Number   |第二个控制点的 x 轴坐标
   *   y2       |  Number   |第二个控制点的 y 轴坐标
   *   radius   |  Number   |  圆弧的半径      
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.arcTo(x1, y1, x2, y2, radius)
   *     ```
   */
  arcTo(): void
  /**
   * > 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   *
   * **定义：**
   *
   * 给定的 (x, y) 位置绘制文本描边的方法
   *
   * **参数：**
   *
   *   属性值     |  类型     |  说明           
   * -------------|-----------|-----------------
   *   text       |  String   |  要绘制的文本   
   *   x          |  Number   |文本起始点的 x 轴坐标
   *   y          |  Number   |文本起始点的 y 轴坐标
   *   maxWidth   |  Number   |需要绘制的最大宽度，可选
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.strokeText(text, x, y, maxWidth)
   *     ```
   */
  strokeText(): void
  /**
   * > 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   *
   * **定义：**
   *
   * 设置虚线偏移量的属性
   *
   * **参数：**
   *
   *   属性值  |  类型     |  说明         
   * ----------|-----------|---------------
   *   value   |  Number   |偏移量，初始值为 0
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.lineDashOffset = value
   *     ```
   */
  lineDashOffset(): void
  /**
   * > 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   *
   * **定义：**
   *
   * 对指定的图像创建模式的方法，可在指定的方向上重复元图像
   *
   * **参数：**
   *
   *   属性值       |  类型     |  说明                                                   
   * ---------------|-----------|---------------------------------------------------------
   *   image        |  String   |  重复的图像源，仅支持包内路径和临时路径                 
   *   repetition   |  String   |指定如何重复图像，有效值有: repeat, repeat-x, repeat-y, no-repeat
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.createPattern(image, repetition)
   *     ```
   *
   * **例子：**
   *
   *     ```javascript
   *     const ctx = wx.createCanvasContext('myCanvas')
   *     const pattern = ctx.createPattern('/path/to/image', 'repeat-x')
   *     ctx.fillStyle = pattern
   *     ctx.fillRect(0, 0, 300, 150)
   *     ctx.draw()
   *     ```
   */
  createPattern(): void
  /**
   * > 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   *
   * **定义：**
   *
   * 设置当前字体样式的属性
   *
   * **参数：**
   *
   *   属性值  |  类型     |  说明                                                                 
   * ----------|-----------|-----------------------------------------------------------------------
   *   value   |  String   |符合 CSS font 语法的 DOMString 字符串，至少需要提供字体大小和字体族名。默认值为 10px sans-serif
   *
   * **value 支持的属性有：**
   *
   *   属性     |  说明                               
   * -----------|-------------------------------------
   *   style    |字体样式。仅支持 italic, oblique, normal
   *   weight   |  字体粗细。仅支持 normal, bold      
   *   size     |  字体大小                           
   *   family   | 字体族名。注意确认各平台所支持的字体
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.font = value
   *     ```
   */
  font(style: any, weight: any, size: any, family: any): void
  /**
   * > 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   *
   * **定义：**
   *
   * 使用矩阵重新设置（覆盖）当前变换的方法
   *
   * **参数：**
   *
   *   属性值       |  类型     |  说明   
   * ---------------|-----------|---------
   *   scaleX       |  Number   | 水平缩放
   *   skewX        |  Number   | 水平倾斜
   *   skewY        |  Number   | 垂直倾斜
   *   scaleY       |  Number   | 垂直缩放
   *   translateX   |  Number   | 水平移动
   *   translateY   |  Number   | 垂直移动
   *
   * **语法：**
   *
   *     ```javascript
   *     canvasContext.setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY)
   *     ```
   */
  setTransform(): void
}