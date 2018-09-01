<!-- https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html -->

原生组件
----

小程序中的部分组件是由客户端创建的原生组件，这些组件有：

*   [`camera`](https://developers.weixin.qq.com/miniprogram/dev/component/camera.html)
*   [`canvas`](https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html)
*   [`input`](https://developers.weixin.qq.com/miniprogram/dev/component/input.html)
*   [`live-player`](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html)
*   [`live-pusher`](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html)
*   [`map`](https://developers.weixin.qq.com/miniprogram/dev/component/map.html)
*   [`textarea`](https://developers.weixin.qq.com/miniprogram/dev/component/textarea.html)
*   [`video`](https://developers.weixin.qq.com/miniprogram/dev/component/video.html)

原生组件的使用限制
---------

由于原生组件脱离在 WebView 渲染流程外，因此在使用时有以下限制：

*   原生组件的层级是**最高**的，所以页面中的其他组件无论设置 `z-index` 为多少，都无法盖在原生组件上。
    *   后插入的原生组件可以覆盖之前的原生组件。
*   原生组件还无法在 `scroll-view`、`swiper`、`picker-view`、`movable-view` 中使用。
*   部分CSS样式无法应用于原生组件，例如：
    *   无法对原生组件设置 CSS 动画
    *   无法定义原生组件为 `position: fixed`
    *   不能在父级节点使用 `overflow: hidden` 来裁剪原生组件的显示区域
*   原生组件的事件监听不能使用 `bind:eventname` 的写法，只支持 `bindeventname`。原生组件也不支持 catch 和 capture 的事件绑定方式
*   在iOS下，原生组件暂时不支持触摸相关事件。

**在工具上，原生组件是用web组件模拟的，因此很多情况并不能很好的还原真机的表现，建议开发者在使用到原生组件时尽量在真机上进行调试。**

cover-view 与 cover-image
------------------------

为了解决原生组件层级最高的限制。小程序专门提供了 [`cover-view`](https://developers.weixin.qq.com/miniprogram/dev/component/cover-view.html#cover-view) 和 [`cover-image`](https://developers.weixin.qq.com/miniprogram/dev/component/cover-view.html#cover-image) 组件，可以覆盖在**部分**原生组件上面。这两个组件也是原生组件，但是使用限制与其他原生组件有所不同。
