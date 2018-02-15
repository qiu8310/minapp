<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/checkIsSupportSoterAuthentication.html -->

### wx.checkIsSupportSoterAuthentication(OBJECT)

> 基础库 1.5.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

获取本机支持的 SOTER 生物认证方式

**Object参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数名        |  类型          |  说明                     
----------------|----------------|---------------------------
  supportMode   |  StringArray   |该设备支持的可被SOTER识别的生物识别方式
  errMsg        |  String        |  接口调用结果             

**supportMode 有效值：**

  值            |  说明         
----------------|---------------
  fingerPrint   |  指纹识别     
  facial        |人脸识别（暂未支持）
  speech        |声纹识别（暂未支持）

**示例代码：**

    wx.checkIsSupportSoterAuthentication({
        success(res) {
            // res.supportMode = [] 不具备任何被SOTER支持的生物识别方式
            // res.supportMode = ['fingerPrint'] 只支持指纹识别
            // res.supportMode = ['fingerPrint', 'facial'] 支持指纹识别和人脸识别
        }
    })
