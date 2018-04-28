<!-- https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html -->

#### web-view

> 基础库 1.6.4 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

web-view 组件是一个可以用来承载网页的容器，会自动铺满整个小程序页面。**个人类型与海外类型的小程序暂不支持使用。**

  属性名        |  类型           | 默认值 |  说明                                                                    
----------------|-----------------|--------|--------------------------------------------------------------------------
  src           |  String         |        |webview 指向网页的链接。需登录[小程序管理后台](https://mp.weixin.qq.com/)配置域名白名单。
  bindmessage   |  EventHandler   |        |网页向小程序 postMessage 时，会在特定时机（小程序后退、组件销毁、分享）触发并收到消息。e.detail = { data }

**示例代码：**

    <!-- wxml -->
    <!-- 指向微信公众平台首页的web-view -->
    <web-view src="https://mp.weixin.qq.com/"></web-view>
    

##### 相关接口 1

`<web-view/>`网页中可使用[JSSDK 1.3.2](https://res.wx.qq.com/open/js/jweixin-1.3.2.js)提供的接口返回小程序页面。 支持的接口有：

  接口名                        |  说明         | 最低版本 
--------------------------------|---------------|----------
  wx.miniProgram.navigateTo     |参数与小程序接口一致|  1.6.4   
  wx.miniProgram.navigateBack   |参数与小程序接口一致|  1.6.4   
  wx.miniProgram.switchTab      |参数与小程序接口一致|  1.6.5   
  wx.miniProgram.reLaunch       |参数与小程序接口一致|  1.6.5   
  wx.miniProgram.redirectTo     |参数与小程序接口一致|  1.6.5   
  wx.miniProgram.postMessage    |向小程序发送消息|  1.7.1   
  wx.miniProgram.getEnv         |  获取当前环境 |  1.7.1   

**示例代码：**

    <!-- html -->
    <script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>
    
    // javascript
    wx.miniProgram.navigateTo({url: '/path/to/page'})
    wx.miniProgram.postMessage({ data: 'foo' })
    wx.miniProgram.postMessage({ data: {foo: 'bar'} })
    wx.miniProgram.getEnv(function(res) { console.log(res.miniprogram) // true })
    

##### 相关接口 2

`<web-view/>`网页中**仅支持以下JSSDK接口**：

  接口模块      |  接口说明    |  具体接口             
----------------|--------------|-----------------------
判断客户端是否支持js|              |  checkJSApi           
  图像接口      |  拍照或上传  |  chooseImage          
                |  预览图片    |  previewImage         
                |  上传图片    |  uploadImage          
                |  下载图片    |  downloadImage        
                | 获取本地图片 |  getLocalImgData      
  音频接口      |  开始录音    |  startRecord          
                |  停止录音    |  stopRecord           
                |监听录音自动停止|  onVoiceRecordEnd     
                |  播放语音    |  playVoice            
                |  暂停播放    |  pauseVoice           
                |  停止播放    |  stopVoice            
                |监听语音播放完毕|  onVoicePlayEnd       
                |  上传接口    |  uploadVoice          
                |  下载接口    |  downloadVoice        
  智能接口      |  识别音频    |  translateVoice       
  设备信息      | 获取网络状态 |  getNetworkType       
  地理位置      | 使用内置地图 |  getLocation          
                | 获取地理位置 |  openLocation         
  摇一摇周边    |  开启ibeacon |  startSearchBeacons   
                |  关闭ibeacon |  stopSearchBeacons    
                |  监听ibeacon |  onSearchBeacons      
  微信扫一扫    |调起微信扫一扫|  scanQRCode           
  微信卡券      |拉取使用卡券列表|  chooseCard           
                |批量添加卡券接口|  addCard              
                |查看微信卡包的卡券|  openCard             
  长按识别      | 小程序圆形码 |  无                   

##### 相关接口 3

用户分享时可获取当前`<web-view/>`的URL，即在`onShareAppMessage`回调中返回`webViewUrl`参数。

**示例代码：**

    Page({
      onShareAppMessage(options) {
        console.log(options.webViewUrl)
      }
    })
    

##### 相关接口 4

在网页内可通过`window.__wxjs_environment`变量判断是否在小程序环境，建议在`WeixinJSBridgeReady`回调中使用，也可以使用[JSSDK 1.3.2](https://res.wx.qq.com/open/js/jweixin-1.3.2.js)提供的`getEnv`接口。

**示例代码：**

    // web-view下的页面内
    function ready() {
      console.log(window.__wxjs_environment === 'miniprogram') // true
    }
    if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
      document.addEventListener('WeixinJSBridgeReady', ready, false)
    } else {
      ready()
    }
    
    // 或者
    wx.miniProgram.getEnv(function(res) {
      console.log(res.miniprogram) // true
    })
    

##### Bug & Tip

1.  **网页内iframe的域名也需要配置到域名白名单。**
2.  开发者工具上，可以在 `<web-view/>` 组件上通过右键 \- 调试，打开 `<web-view/>` 组件的调试。
3.  每个页面只能有一个`<web-view/>`，`<web-view/>`会自动铺满整个页面，并覆盖其他组件。
4.  `<web-view/>`网页与小程序之间不支持除JSSDK提供的接口之外的通信。
5.  在iOS中，若存在JSSDK接口调用无响应的情况，可在`<web-view/>`的src后面加个#wechat_redirect解决。
