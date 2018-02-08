<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-live-player.html -->

### wx.createLivePlayerContext(domId, this)

> 基础库 1.7.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

操作对应的 `<live-player/>` 组件。 创建并返回 `live-player` 上下文 `LivePlayerContext` 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<live-player/>` 组件

#### livePlayerContext

**livePlayerContext 对象的方法列表：**

  方法                |  参数     |  说明   
----------------------|-----------|---------
  play                |  OBJECT   |  播放   
  stop                |  OBJECT   |  停止   
  mute                |  OBJECT   |  静音   
  requestFullScreen   |  OBJECT   | 进入全屏
  exitFullScreen      |  OBJECT   | 退出全屏

**requestFullScreen 的 OBJECT 参数列表：**

  参数        |  类型       |  必填 |  说明                                        
--------------|-------------|-------|----------------------------------------------
  direction   |  Number     |  否   |有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）
  success     |  Function   |  否   |  接口调用成功的回调函数                      
  fail        |  Function   |  否   |  接口调用失败的回调函数                      
  complete    |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**其他方法的 OBJECT 参数列表：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）
