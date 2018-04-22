<!-- https://developers.weixin.qq.com/miniprogram/dev/api/systeminfo.html -->

### wx.getSystemInfo(OBJECT)

获取系统信息。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  是   |  接口调用成功的回调         
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success回调参数说明：**

  参数              |  说明                                   | 最低版本 
--------------------|-----------------------------------------|----------
  brand             |  手机品牌                               |  1.5.0   
  model             |  手机型号                               |          
  pixelRatio        |  设备像素比                             |          
  screenWidth       |  屏幕宽度                               |  1.1.0   
  screenHeight      |  屏幕高度                               |  1.1.0   
  windowWidth       |  可使用窗口宽度                         |          
  windowHeight      |  可使用窗口高度                         |          
  statusBarHeight   |  状态栏的高度                           |  1.9.0   
  language          |  微信设置的语言                         |          
  version           |  微信版本号                             |          
  system            |  操作系统版本                           |          
  platform          |  客户端平台                             |          
  fontSizeSetting   |用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px|  1.5.0   
  SDKVersion        |  客户端基础库版本                       |  1.1.0   

**示例代码：**

    wx.getSystemInfo({
      success: function(res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
      }
    })
    

### wx.getSystemInfoSync()

获取系统信息同步接口

**同步返回参数说明：**

  参数              |  说明                                   | 最低版本 
--------------------|-----------------------------------------|----------
  brand             |  手机品牌                               |  1.5.0   
  model             |  手机型号                               |          
  pixelRatio        |  设备像素比                             |          
  screenWidth       |  屏幕宽度                               |  1.1.0   
  screenHeight      |  屏幕高度                               |  1.1.0   
  windowWidth       |  可使用窗口宽度                         |          
  windowHeight      |  可使用窗口高度                         |          
  statusBarHeight   |  状态栏的高度                           |  1.9.0   
  language          |  微信设置的语言                         |          
  version           |  微信版本号                             |          
  system            |  操作系统版本                           |          
  platform          |  客户端平台                             |          
  fontSizeSetting   |用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px|  1.5.0   
  SDKVersion        |  客户端基础库版本                       |  1.1.0   

**示例代码：**

    try {
      var res = wx.getSystemInfoSync()
      console.log(res.model)
      console.log(res.pixelRatio)
      console.log(res.windowWidth)
      console.log(res.windowHeight)
      console.log(res.language)
      console.log(res.version)
      console.log(res.platform)
    } catch (e) {
      // Do something when catch error
    }
