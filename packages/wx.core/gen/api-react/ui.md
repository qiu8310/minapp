<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui.html -->

### wx.setTopBarText(OBJECT)

> 基础库 1.4.3 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

动态设置置顶栏文字内容，只有当前小程序被置顶时能生效，如果当前小程序没有被置顶，也能调用成功，但是不会立即生效，只有在用户将这个小程序置顶后才换上设置的文字内容。**注意：调用成功后，需间隔 5s 才能再次调用此接口，如果在 5s 内再次调用此接口，会回调 fail，errMsg："setTopBarText: fail invoke too frequently"**

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  text       |  String     |  是   |  置顶栏文字内容             
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.setTopBarText({
      text: 'hello, world!'
    })
    

### wx.setNavigationBarTitle(OBJECT)

动态设置当前页面的标题。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  title      |  String     |  是   |  页面标题                   
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.setNavigationBarTitle({
      title: '当前页面'
    })
    

### wx.showNavigationBarLoading()

在当前页面显示导航条加载动画。

### wx.hideNavigationBarLoading()

隐藏导航条加载动画。
