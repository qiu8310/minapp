<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-camera.html -->

### wx.createCameraContext(this)

> 基础库 1.6.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

创建并返回 camera 上下文 `cameraContext` 对象，`cameraContext` 与页面的 `camera` 组件绑定，一个页面只能有一个camera，通过它可以操作对应的 `<camera/>` 组件。 在自定义组件下，第一个参数传入组件实例this，以操作组件内 `<camera/>` 组件

#### cameraContext

**cameraContext 对象的方法列表：**

  方法          |  参数     |  说明               
----------------|-----------|---------------------
  takePhoto     |  OBJECT   |拍照，可指定质量，成功则返回图片
  startRecord   |  OBJECT   |  开始录像           
  stopRecord    |  OBJECT   |结束录像，成功则返回封面与视频

**takePhoto 的 OBJECT 参数列表：**

  参数       |  类型       |  必填 |  说明                                   
-------------|-------------|-------|-----------------------------------------
  quality    |  String     |  否   |成像质量，值为high, normal, low，默认normal
  success    |  Function   |  否   |接口调用成功的回调函数 ，res = { tempImagePath }
  fail       |  Function   |  否   |  接口调用失败的回调函数                 
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**startRecord 的 OBJECT 参数列表：**

  参数              |  类型       |  必填 |  说明                                                          
--------------------|-------------|-------|----------------------------------------------------------------
  success           |  Function   |  否   |  接口调用成功的回调函数                                        
  fail              |  Function   |  否   |  接口调用失败的回调函数                                        
  complete          |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）              
  timeoutCallback   |  Function   |  否   |超过30s或页面onHide时会结束录像，res = { tempThumbPath, tempVideoPath }

**stopRecord 的 OBJECT 参数列表：**

  参数       |  类型       |  必填 |  说明                                                  
-------------|-------------|-------|--------------------------------------------------------
  success    |  Function   |  否   |接口调用成功的回调函数 ，res = { tempThumbPath, tempVideoPath }
  fail       |  Function   |  否   |  接口调用失败的回调函数                                
  complete   |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）      
