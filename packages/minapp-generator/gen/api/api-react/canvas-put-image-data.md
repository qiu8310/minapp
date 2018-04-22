<!-- https://developers.weixin.qq.com/miniprogram/dev/api/canvas/put-image-data.html -->

wx.canvasPutImageData(OBJECT)
=============================

> 基础库 1.9.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

将像素数据绘制到画布的方法

**OBJECT参数说明：**

  参数       |  类型                |  必填 |  说明                                                                                                         | 最低版本
-------------|----------------------|-------|---------------------------------------------------------------------------------------------------------------|---------
  canvasId   |  String              |  是   |画布标识，传入 [`<canvas />`](https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html) 的 canvas-id|         
  data       |  Uint8ClampedArray   |  是   |  图像像素点数据，一维数组，每四项表示一个像素点的rgba                                                         |         
  x          |  Number              |  是   |  源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量）                                                       |         
  y          |  Number              |  是   |  源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量）                                                       |         
  width      |  Number              |  是   |  源图像数据矩形区域的宽度                                                                                     |         
  height     |  Number              |  否   |  源图像数据矩形区域的高度                                                                                     |         
  success    |  Function            |  否   |  接口调用成功的回调函数                                                                                       |         
  fail       |  Function            |  否   |  接口调用失败的回调函数                                                                                       |         
  complete   |  Function            |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）                                                             |         

**示例代码：**

    const data = new Uint8ClampedArray([255, 0, 0, 1])
    wx.canvasPutImageData({
      canvasId: 'myCanvas',
      x: 0,
      y: 0,
      width: 1,
      data: data,
      success(res) {}
    })
