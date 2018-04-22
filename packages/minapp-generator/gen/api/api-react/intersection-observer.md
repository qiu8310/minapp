<!-- https://developers.weixin.qq.com/miniprogram/dev/api/intersection-observer.html -->

WXML节点布局相交状态
============

节点布局交叉状态API可用于监听两个或多个组件节点在布局位置上的相交状态。这一组API常常可以用于推断某些节点是否可以被用户看见、有多大比例可以被用户看见。

这一组API涉及的主要概念如下。

*   参照节点：监听的参照节点，取它的布局区域作为参照区域。如果有多个参照节点，则会取它们布局区域的 **交集** 作为参照区域。页面显示区域也可作为参照区域之一。
*   目标节点：监听的目标，只能是一个节点。
*   相交区域：目标节点的布局区域与参照区域的相交区域。
*   相交比例：相交区域占参照区域的比例。
*   阈值：相交比例如果达到阈值，则会触发监听器的回调函数。阈值可以有多个。

以下示例代码可以在目标节点（用选择器 `.target-class` 指定）每次进入或离开页面显示区域时，触发回调函数。

**示例代码：**

    Page({
      onLoad: function(){
        wx.createIntersectionObserver().relativeToViewport().observe('.target-class', (res) => {
          res.intersectionRatio // 相交区域占目标节点的布局区域的比例
          res.intersectionRect // 相交区域
          res.intersectionRect.left // 相交区域的左边界坐标
          res.intersectionRect.top // 相交区域的上边界坐标
          res.intersectionRect.width // 相交区域的宽度
          res.intersectionRect.height // 相交区域的高度
        })
      }
    })
    

以下示例代码可以在目标节点（用选择器 `.target-class` 指定）与参照节点（用选择器 `.relative-class` 指定）在页面显示区域内相交或相离，且相交或相离程度达到目标节点布局区域的20%和50%时，触发回调函数。

**示例代码：**

    Page({
      onLoad: function(){
        wx.createIntersectionObserver({
          thresholds: [0.2, 0.5]
        }).relativeTo('.relative-class').relativeToViewport().observe('.target-class', (res) => {
          res.intersectionRatio // 相交区域占目标节点的布局区域的比例
          res.intersectionRect // 相交区域
          res.intersectionRect.left // 相交区域的左边界坐标
          res.intersectionRect.top // 相交区域的上边界坐标
          res.intersectionRect.width // 相交区域的宽度
          res.intersectionRect.height // 相交区域的高度
        })
      }
    })
    

wx.createIntersectionObserver(\[this\], \[options\])
----------------------------------------------------

> 基础库 1.9.3 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

创建并返回一个 IntersectionObserver 对象实例。在自定义组件中，可以使用 `this.createIntersectionObserver([options])` 来代替。

**可选的 options ：**

  字段名         |  类型     |  说明                                                         
-----------------|-----------|---------------------------------------------------------------
  thresholds     |  Array    |  一个数值数组，包含所有阈值。默认为 `[0]` 。                  
  initialRatio   |  Number   |初始的相交比例，如果调用时检测到的相交比例与这个值不相等且达到阈值，则会触发一次监听器的回调函数。默认为 `0` 。

### intersectionObserver.relativeTo(selector, \[margins\])

使用选择器指定一个节点，作为参照区域之一。 `margins` 可以用来扩展（或收缩）参照节点布局区域的边界，可包含 `left` 、 `right` 、 `top` 、 `bottom` 四项。

### intersectionObserver.relativeToViewport(\[margins\])

指定页面显示区域作为参照区域之一。 `margins` 可以用来扩展（或收缩）参照节点布局区域的边界，可包含 `left` 、 `right` 、 `top` 、 `bottom` 四项。

下面的示例代码中，如果目标节点（用选择器 `.target-class` 指定）进入显示区域以下 100px 时，就会触发回调函数。

    Page({
      onLoad: function(){
        wx.createIntersectionObserver().relativeToViewport({bottom: 100}).observe('.target-class', (res) => {
          res.intersectionRatio // 相交区域占目标节点的布局区域的比例
          res.intersectionRect // 相交区域
          res.intersectionRect.left // 相交区域的左边界坐标
          res.intersectionRect.top // 相交区域的上边界坐标
          res.intersectionRect.width // 相交区域的宽度
          res.intersectionRect.height // 相交区域的高度
        })
      }
    })
    

### intersectionObserver.observe(targetSelector, callback)

指定目标节点并开始监听相交状态变化情况。回调函数 `callback` 包含一个参数 `result` 。

**回调函数 result 包含的字段：**

  字段名               |  类型     |  说明                                                    
-----------------------|-----------|----------------------------------------------------------
  intersectionRatio    |  Number   |  相交比例                                                
  intersectionRect     |  Object   |相交区域的边界，包含 `left` 、 `right` 、 `top` 、 `bottom` 四项
  boundingClientRect   |  Object   |目标节点布局区域的边界，包含 `left` 、 `right` 、 `top` 、 `bottom` 四项
  relativeRect         |  Object   |参照区域的边界，包含 `left` 、 `right` 、 `top` 、 `bottom` 四项
  time                 |  Number   |  相交检测时的时间戳                                      

### intersectionObserver.disconnect()

停止监听。回调函数将不再触发。

**Tips:**

*   与页面显示区域的相交区域并不准确代表用户可见的区域，因为参与计算的区域是“布局区域”，布局区域可能会在绘制时被其他节点裁剪隐藏（如祖先节点中 overflow 样式为 hidden 的节点）或遮盖（如 fixed 定位的节点）。
