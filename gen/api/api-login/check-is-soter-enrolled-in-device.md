<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/checkIsSoterEnrolledInDevice.html -->

### wx.checkIsSoterEnrolledInDevice(OBJECT)

> 基础库 1.6.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

获取设备内是否录入如指纹等生物信息的接口

**Object参数说明：**

  参数            |  类型       |  必填 |  说明                       
------------------|-------------|-------|-----------------------------
  checkAuthMode   |  String     |  是   |  认证方式                   
  success         |  Function   |  否   |  接口调用成功的回调函数     
  fail            |  Function   |  否   |  接口调用失败的回调函数     
  complete        |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数名       |  类型      |  说明      
---------------|------------|------------
  isEnrolled   |  Boolean   |是否已录入信息
  errMsg       |  String    |接口调用结果

**checkAuthMode 有效值：**

  值            |  说明         
----------------|---------------
  fingerPrint   |  指纹识别     
  facial        |人脸识别（暂未支持）
  speech        |声纹识别（暂未支持）

**示例代码：**

    wx.checkIsSoterEnrolledInDevice({
        checkAuthMode: 'fingerPrint',
        success(res) {
            console.log(res.isEnrolled)
        }
    })
