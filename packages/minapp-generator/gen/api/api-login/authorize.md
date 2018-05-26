<!-- https://developers.weixin.qq.com/miniprogram/dev/api/authorize.html -->

### wx.authorize(OBJECT)

> 基础库 1.2.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。

**OBJECT参数说明：**

  参数名     |  类型       |  必填 |  说明                                                                                                             
-------------|-------------|-------|-------------------------------------------------------------------------------------------------------------------
  scope      |  String     |  是   |需要获取权限的scope，详见 [scope 列表](https://developers.weixin.qq.com/miniprogram/dev/api/authorize-index.html#scope-列表)
  success    |  Function   |  否   |  接口调用成功的回调函数                                                                                           
  fail       |  Function   |  否   |  接口调用失败的回调函数                                                                                           
  complete   |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）                                                                 

**success返回参数说明：**

  参数名   |  类型     |  说明   
-----------|-----------|---------
  errMsg   |  String   | 调用结果

**示例代码：**

    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
        success(res) {
            if (!res.authSetting['scope.record']) {
                wx.authorize({
                    scope: 'scope.record',
                    success() {
                        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                        wx.startRecord()
                    }
                })
            }
        }
    })
    

**注意：scope 为 "scope.userInfo" 时，无法弹出授权窗口，请使用 [&ltbutton open-type="getUserInfo"&gt&lt/button&gt](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)**
