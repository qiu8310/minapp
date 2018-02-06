<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/getFileInfo.html -->

### wx.getFileInfo(OBJECT)

> 基础库 1.4.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

获取文件信息

**OBJECT参数说明：**

  参数名            |  类型       |  必填 |  说明                             
--------------------|-------------|-------|-----------------------------------
  filePath          |  String     |  是   |  本地文件路径                     
  digestAlgorithm   |  String     |  否   |计算文件摘要的算法，默认值 md5，有效值：md5，sha1
  success           |  Function   |  否   |  接口调用成功的回调函数           
  fail              |  Function   |  否   |  接口调用失败的回调函数           
  complete          |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数名   |  类型     |  说明                               
-----------|-----------|-------------------------------------
  size     |  Number   |  文件大小，单位：B                  
  digest   |  String   |按照传入的 digestAlgorithm 计算得出的的文件摘要
  errMsg   |  String   |  调用结果                           

**示例代码：**

    wx.getFileInfo({
        success(res) {
            console.log(res.size)
            console.log(res.digest)
        }
    })
