<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/pulldown.html -->

onPullDownRefresh
=================

在 Page 中定义 onPullDownRefresh 处理函数，监听该页面用户下拉刷新事件。

*   需要在 `config` 的[`window`](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html#window)选项中开启 `enablePullDownRefresh`。
*   当处理完数据刷新后，[`wx.stopPullDownRefresh`](https://mp.weixin.qq.com/debug/wxadoc/dev/api/pulldown.html#wxstoppulldownrefresh)可以停止当前页面的下拉刷新。

### wx.startPullDownRefresh(OBJECT)

> 基础库 1.5.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致

**Object参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数名   |  类型     |  说明     
-----------|-----------|-----------
  errMsg   |  String   |接口调用结果

**示例代码：**

    wx.startPullDownRefresh()
    

### wx.stopPullDownRefresh()

停止当前页面下拉刷新。

**示例代码：**

    Page({
      onPullDownRefresh: function(){
        wx.stopPullDownRefresh()
      }
    })
