<!-- https://developers.weixin.qq.com/miniprogram/dev/api/canvas/coordinates.html -->

Canvas 坐标系
==========

canvas 是在一个二维的网格当中。

左上角的坐标为`(0, 0)`。

在之前的[章节](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/intro.html)，我们用了这个方法 `fillRect(0, 0, 150, 75)`。

它的含义为：从左上角`(0, 0)`开始，画一个`150 x 75`px 的矩形。

### 坐标系例子：

我们可以在 `<canvas/>` 中加上一些事件，来观测它的坐标系

    <canvas canvas-id="myCanvas"
      style="margin: 5px; border:1px solid #d3d3d3;"
      bindtouchstart="start"
      bindtouchmove="move"
      bindtouchend="end"/>
    
    <view hidden="{{hidden}}">
      Coordinates: ({{x}}, {{y}})
    </view>
    

    Page({
      data: {
        x: 0,
        y: 0,
        hidden: true
      },
      start: function(e) {
        this.setData({
          hidden: false,
          x: e.touches[0].x,
          y: e.touches[0].y
        })
      },
      move: function(e) {
        this.setData({
          x: e.touches[0].x,
          y: e.touches[0].y
        })
      },
      end: function(e) {
        this.setData({
          hidden: true
        })
      }
    })
    

当你把手指放到 canvas 中，就会在下边显示出触碰点的坐标：

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/coordinates.gif)
