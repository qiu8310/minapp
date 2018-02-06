<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/phonecall.html -->

### wx.makePhoneCall(OBJECT)

**OBJECT参数说明：**

  参数          |  类型       |  必填 |  说明                       
----------------|-------------|-------|-----------------------------
  phoneNumber   |  String     |  是   |  需要拨打的电话号码         
  success       |  Function   |  否   |  接口调用成功的回调         
  fail          |  Function   |  否   |  接口调用失败的回调函数     
  complete      |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
