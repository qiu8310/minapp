<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/ext-api.html -->

### wx.getExtConfig(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

获取第三方平台自定义的数据字段。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  返回                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  返回第三方平台自定义的数据 
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数        |  类型     |  说明          
--------------|-----------|----------------
  errMsg      |  String   |  调用结果      
  extConfig   |  Object   |第三方平台自定义的数据

#### Bug & Tip

1.  `wx.getExtConfig` 暂时无法通过 `wx.canIUse` 判断是否兼容，开发者需要自行判断 `wx.getExtConfig` 是否存在来兼容

**示例代码：**

    if(wx.getExtConfig) {
      wx.getExtConfig({
        success: function (res) {
          console.log(res.extConfig)
        }
      })
    }
    

### wx.getExtConfigSync()

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

获取第三方平台自定义的数据字段的同步接口。

**返回说明：**

  参数        |  类型     |  说明          
--------------|-----------|----------------
  extConfig   |  Object   |第三方平台自定义的数据

#### Bug & Tip

1.  `wx.getExtConfigSync` 暂时无法通过 `wx.canIUse` 判断是否兼容，开发者需要自行判断 `wx.getExtConfigSync` 是否存在来兼容

**示例代码：**

    let extConfig = wx.getExtConfigSync? wx.getExtConfigSync(): {}
    console.log(extConfig)
