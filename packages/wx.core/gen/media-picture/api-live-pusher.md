<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-live-pusher.html -->

### wx.createLivePusherContext()

> 基础库 1.7.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

创建并返回 `live-pusher` 上下文 `LivePusherContext` 对象，`LivePusherContext` 与页面的 `<live-pusher />` 组件绑定，一个页面只能有一个 `live-pusher`，通过它可以操作对应的 `<live-pusher/>` 组件。 在自定义组件下，第一个参数传入组件实例this，以操作组件内 `<live-pusher/>` 组件

#### livePusherContext

**livePusherContext 对象的方法列表：**

  方法           |  参数     |  说明      
-----------------|-----------|------------
  start          |  OBJECT   |  播放推流  
  stop           |  OBJECT   |  停止推流  
  pause          |  OBJECT   |  暂停推流  
  resume         |  OBJECT   |  恢复推流  
  switchCamera   |  OBJECT   |切换前后摄像头

**所有方法的 OBJECT 参数列表：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）
