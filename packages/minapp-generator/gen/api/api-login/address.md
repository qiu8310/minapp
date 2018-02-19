<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/address.html -->

### wx.chooseAddress(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。

需要[用户授权](https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html) scope.address

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  返回用户选择的收货地址信息 
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数           |  类型     |  说明          
-----------------|-----------|----------------
  errMsg         |  String   |  调用结果      
  userName       |  String   |  收货人姓名    
  postalCode     |  String   |  邮编          
  provinceName   |  String   |国标收货地址第一级地址
  cityName       |  String   |国标收货地址第二级地址
  countyName     |  String   |国标收货地址第三级地址
  detailInfo     |  String   |详细收货地址信息
  nationalCode   |  String   | 收货地址国家码 
  telNumber      |  String   | 收货人手机号码 

**示例代码：**

    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
