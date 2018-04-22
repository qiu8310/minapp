<!-- https://developers.weixin.qq.com/miniprogram/dev/api/phone-contact.html -->

### wx.addPhoneContact(OBJECT)

> 基础库 1.2.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

调用后，用户可以选择将该表单以“新增联系人”或“添加到已有联系人”的方式，写入手机系统通讯录，完成手机通讯录联系人和联系方式的增加。

**OBJECT参数说明：**

  参数                    |  类型       |  必填 |  说明                       
--------------------------|-------------|-------|-----------------------------
  photoFilePath           |  String     |  否   |  头像本地文件路径           
  nickName                |  String     |  否   |  昵称                       
  lastName                |  String     |  否   |  姓氏                       
  middleName              |  String     |  否   |  中间名                     
  firstName               |  String     |  是   |  名字                       
  remark                  |  String     |  否   |  备注                       
  mobilePhoneNumber       |  String     |  否   |  手机号                     
  weChatNumber            |  String     |  否   |  微信号                     
  addressCountry          |  String     |  否   |  联系地址国家               
  addressState            |  String     |  否   |  联系地址省份               
  addressCity             |  String     |  否   |  联系地址城市               
  addressStreet           |  String     |  否   |  联系地址街道               
  addressPostalCode       |  String     |  否   |  联系地址邮政编码           
  organization            |  String     |  否   |  公司                       
  title                   |  String     |  否   |  职位                       
  workFaxNumber           |  String     |  否   |  工作传真                   
  workPhoneNumber         |  String     |  否   |  工作电话                   
  hostNumber              |  String     |  否   |  公司电话                   
  email                   |  String     |  否   |  电子邮件                   
  url                     |  String     |  否   |  网站                       
  workAddressCountry      |  String     |  否   |  工作地址国家               
  workAddressState        |  String     |  否   |  工作地址省份               
  workAddressCity         |  String     |  否   |  工作地址城市               
  workAddressStreet       |  String     |  否   |  工作地址街道               
  workAddressPostalCode   |  String     |  否   |  工作地址邮政编码           
  homeFaxNumber           |  String     |  否   |  住宅传真                   
  homePhoneNumber         |  String     |  否   |  住宅电话                   
  homeAddressCountry      |  String     |  否   |  住宅地址国家               
  homeAddressState        |  String     |  否   |  住宅地址省份               
  homeAddressCity         |  String     |  否   |  住宅地址城市               
  homeAddressStreet       |  String     |  否   |  住宅地址街道               
  homeAddressPostalCode   |  String     |  否   |  住宅地址邮政编码           
  success                 |  Function   |  否   |  接口调用成功               
  fail                    |  Function   |  否   |  接口调用失败的回调函数     
  complete                |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**回调结果：**

  回调类型  |  errMsg           |  说明                 
------------|-------------------|-----------------------
  success   |  ok               |  添加成功             
  fail      |  fail cancel      |  用户取消操作         
  fail      |  fail ${detail}   |调用失败，detail 加上详细信息
