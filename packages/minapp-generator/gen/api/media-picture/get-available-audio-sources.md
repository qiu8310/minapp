<!-- https://developers.weixin.qq.com/miniprogram/dev/api/getAvailableAudioSources.html -->

### wx.getAvailableAudioSources(OBJECT)

> 基础库 2.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

##### OBJECT参数说明：

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数名         |  类型          |  说明                 
-----------------|----------------|-----------------------
  audioSources   |  StringArray   |音频输入源，每一项对应一种音频输入源

##### audioSource 有效值：：

  值           |  说明                              |  支持平台               
---------------|------------------------------------|-------------------------
  auto         |自动设置，默认使用手机麦克风，插上耳麦后自动切换使用耳机麦克风|  iOS/Android/devtools   
  buildInMic   |  手机麦克风                        |  iOS                    
  headsetMic   |  耳机麦克风                        |  iOS                    
  mic          |麦克风（没插耳麦时是手机麦克风，插耳麦时是耳机麦克风|  Android                
  camcorder    |  摄像头的麦克风                    |  Android                
