<!-- https://developers.weixin.qq.com/miniprogram/dev/api/ui-navigate.html -->

### wx.navigateTo(OBJECT)

保留当前页面，跳转到应用内的某个页面，使用`wx.navigateBack`可以返回到原页面。

**OBJECT 参数说明：**

  参数       |  类型       |  必填 |  说明                                                                                                        
-------------|-------------|-------|--------------------------------------------------------------------------------------------------------------
  url        |  String     |  是   |需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用`?`分隔，参数键与参数值用`=`相连，不同参数用`&`分隔；如 'path?key=value&key2=value2'
  success    |  Function   |  否   |  接口调用成功的回调函数                                                                                      
  fail       |  Function   |  否   |  接口调用失败的回调函数                                                                                      
  complete   |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）                                                            

**示例代码：**

    wx.navigateTo({
      url: 'test?id=1'
    })
    

    //test.js
    Page({
      onLoad: function(option){
        console.log(option.query)
      }
    })
    

**注意：目前页面路径最多只能十层。**

### wx.redirectTo(OBJECT)

关闭当前页面，跳转到应用内的某个页面。

**OBJECT 参数说明：**

  参数       |  类型       |  必填 |  说明                                                                                                      
-------------|-------------|-------|------------------------------------------------------------------------------------------------------------
  url        |  String     |  是   |需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用`?`分隔，参数键与参数值用`=`相连，不同参数用`&`分隔；如 'path?key=value&key2=value2'
  success    |  Function   |  否   |  接口调用成功的回调函数                                                                                    
  fail       |  Function   |  否   |  接口调用失败的回调函数                                                                                    
  complete   |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）                                                          

**示例代码：**

    wx.redirectTo({
      url: 'test?id=1'
    })
    

### wx.reLaunch(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

关闭所有页面，打开到应用内的某个页面。

**OBJECT 参数说明：**

  参数       |  类型       |  必填 |  说明                                                                                                                        
-------------|-------------|-------|------------------------------------------------------------------------------------------------------------------------------
  url        |  String     |  是   |需要跳转的应用内页面路径 , 路径后可以带参数。参数与路径之间使用`?`分隔，参数键与参数值用`=`相连，不同参数用`&`分隔；如 'path?key=value&key2=value2'，如果跳转的页面路径是 tabBar 页面则不能带参数
  success    |  Function   |  否   |  接口调用成功的回调函数                                                                                                      
  fail       |  Function   |  否   |  接口调用失败的回调函数                                                                                                      
  complete   |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）                                                                            

**示例代码：**

    wx.reLaunch({
      url: 'test?id=1'
    })
    

    //test.js
    Page({
      onLoad: function(option){
        console.log(option.query)
      }
    })
    

### wx.switchTab(OBJECT)

跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面

**OBJECT 参数说明：**

  参数       |  类型       |  必填 |  说明                                                                                                                                         
-------------|-------------|-------|-----------------------------------------------------------------------------------------------------------------------------------------------
  url        |  String     |  是   |需要跳转的 tabBar 页面的路径（需在 app.json 的 [tabBar](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#tabbar) 字段定义的页面），路径后不能带参数
  success    |  Function   |  否   |  接口调用成功的回调函数                                                                                                                       
  fail       |  Function   |  否   |  接口调用失败的回调函数                                                                                                                       
  complete   |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）                                                                                             

**示例代码：**

    {
      "tabBar": {
        "list": [{
          "pagePath": "index",
          "text": "首页"
        },{
          "pagePath": "other",
          "text": "其他"
        }]
      }
    }
    

    wx.switchTab({
      url: '/index'
    })
    

### wx.navigateBack(OBJECT)

关闭当前页面，返回上一页面或多级页面。可通过 [`getCurrentPages()`](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#getCurrentPages()) 获取当前的页面栈，决定需要返回几层。

**OBJECT 参数说明：**

  参数    |  类型     | 默认值 |  说明                              
----------|-----------|--------|------------------------------------
  delta   |  Number   |  1     |返回的页面数，如果 delta 大于现有页面数，则返回到首页。

**示例代码：**

    // 注意：调用 navigateTo 跳转时，调用该方法的页面会被加入堆栈，而 redirectTo 方法则不会。见下方示例代码
    
    // 此处是A页面
    wx.navigateTo({
      url: 'B?id=1'
    })
    
    // 此处是B页面
    wx.navigateTo({
      url: 'C?id=1'
    })
    
    // 在C页面内 navigateBack，将返回A页面
    wx.navigateBack({
      delta: 2
    })
    

#### Tip

1.  `tip`: wx.navigateTo 和 wx.redirectTo 不允许跳转到 tabbar 页面，只能用 wx.switchTab 跳转到 tabbar 页面
