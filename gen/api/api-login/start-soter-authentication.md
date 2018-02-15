<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/startSoterAuthentication.html -->

### wx.startSoterAuthentication(OBJECT)

> 基础库 1.5.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

开始 SOTER 生物认证

**Object参数说明：**

  参数               |  类型          |  必填 |  说明                                                                                                       
---------------------|----------------|-------|-------------------------------------------------------------------------------------------------------------
  requestAuthModes   |  StringArray   |  是   |  请求使用的可接受的生物认证方式                                                                             
  challenge          |  String        |  是   |挑战因子。挑战因子为调用者为此次生物鉴权准备的用于签名的字符串关键是别信息，将作为result_json的一部分，供调用者识别本次请求。例如：如果场景为请求用户对某订单进行授权确认，则可以将订单号填入此参数。
  authContent        |  String        |  否   |  验证描述，即识别过程中显示在界面上的对话框提示内容                                                         
  success            |  Function      |  否   |  接口调用成功的回调函数                                                                                     
  fail               |  Function      |  否   |  接口调用失败的回调函数                                                                                     
  complete           |  Function      |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）                                                           

**success返回参数说明：**

  参数名                |  类型     |  说明                                                                                            
------------------------|-----------|--------------------------------------------------------------------------------------------------
  errCode               |  Number   |  错误码                                                                                          
  authMode              |  String   |  生物认证方式                                                                                    
  resultJSON            |  String   |在设备安全区域（TEE）内获得的本机安全信息（如TEE名称版本号等以及防重放参数）以及本次认证信息（仅Android支持，本次认证的指纹ID）（仅Android支持，本次认证的指纹ID）
  resultJSONSignature   |  String   |  用SOTER安全密钥对result_json的签名(SHA256withRSA/PSS, saltlen=20)                               
  errMsg                |  String   |  接口调用结果                                                                                    

**生物识别方式定义：**

  mode          |  说明         
----------------|---------------
  fingerPrint   |  指纹识别     
  facial        |人脸识别（暂未支持）
  speech        |声纹识别（暂未支持）

**resultJSON 说明：**

此数据为设备TEE中，将传入的challenge和TEE内其他安全信息组成的数据进行组装而来的JSON，对下述字段的解释如表2。例子如下：

    {
        "raw":"msg",
        "fid":"2",
        "counter":123,
        "tee_n":"TEE Name",
        "tee_v":"TEE Version",
        "fp_n":"Fingerprint Sensor Name",
        "fp_v":"Fingerprint Sensor Version",
        "cpu_id":"CPU Id",
        "uid":"21"
    }
    

  字段名    |  说明                                               
------------|-----------------------------------------------------
  raw       |  调用者传入的challenge                              
  fid       |（仅Android支持）本次生物识别认证的生物信息编号（如指纹识别则是指纹信息在本设备内部编号）
  counter   |  防重放特征参数                                     
  tee_n     |  TEE名称（如高通或者trustonic等）                   
  tee_v     |  TEE版本号                                          
  fp_n      |  指纹以及相关逻辑模块提供商（如FPC等）              
  fp_v      |  指纹以及相关模块版本号                             
  cpu_id    |  机器唯一识别ID                                     
  uid       |  概念同Android系统定义uid，即应用程序编号           

**示例代码：**

    wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'],
      challenge: '123456',
      authContent: '请用指纹解锁',
      success(res) {
      }
    })
    

### 调用流程

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/soter.png?t=201828)

#### 流程步骤说明

1\. 本次请求使用的生物识别方式。例如:如果本次请求使用指纹识别，则填入 \["fingerPrint"\] ；  
2\. 挑战因子为调用者为此次生物鉴权准备的用于签名的字符串关键识别信息，将作为 resultJSON 的一部分，供调用者识别本次请求。例如:如果场景为支付则可以将订单号填入此参数；  
3\. 此数据为设备 TEE 中，将传入的 challenge 和 TEE 内其他安全信息组成的数据进行组装而来的JSON，例子及对例子中字段的解释如下:

    { "raw":"msg", "fid":"2", "counter":123, "tee_n":"TEE Name", "tee_v":"TEE Version", "fp_n":"Fingerprint Sensor Name", "fp_v":"Fingerprint Sensor Version","uid":"21"}
    

  字段名    |  含义                                               
------------|-----------------------------------------------------
  raw       |  调用者传入的challenge                              
  fid       |(仅Android支持)本次生物识别认证的生物信息编号(如指纹识别则是指纹信息在本设备内部编号)
  counter   |  防重放特征参数                                     
  tee_n     |  TEE名称(如高通或者trustonic等)                     
  tee_v     |  TEE版本号                                          
  fp_n      |  指纹以及相关逻辑模块提供商(如FPC等)                
  fp_v      |  指纹以及相关模块版本号                             
  cpu_id    |  机器唯一识别ID                                     
  uid       |  概念同Android系统定义uid，即应用程序编号           

4\. 此处使用 SHA256withRSA/PSS 作为签名算法进行验签。此公式数学定义如下: bool 验签结果=verify(用于签名的原串，签名串，验证签名的公钥)  
5\. 此步骤为建议流程，如果业务不需要等待可以不执行  
6\. 微信已经提供后台接口，用于可信的密钥验签服务，微信将保证该接口返回的验签结果的正确性与可靠性，并且对于 Android root 情况下该接口具有上述特征(将返回是否保证root情况安全性)。  

接口地址：

> [http://api.weixin.qq.com/cgi-bin/soter/verify\_signature?access\_token=%access_token](http://api.weixin.qq.com/cgi-bin/soter/verify_signature?access_token=%access_token)

post 数据内容（JSON 编码）:

    {"openid":"$openid", "json_string" : "$json", "json_signature" : "$sign" }
