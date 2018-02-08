<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/open.html -->

### wx.getUserInfo(OBJECT)

获取用户信息，withCredentials 为 true 时需要先调用 [wx.login](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxloginobject) 接口。

需要[用户授权](https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html) scope.userInfo

**OBJECT参数说明：**

  参数名            |  类型       |  必填 |  说明                                             | 最低版本 
--------------------|-------------|-------|---------------------------------------------------|----------
  withCredentials   |  Boolean    |  否   |  是否带上登录态信息                               |  1.1.0   
  lang              |  String     |  否   |指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。默认为en。|  1.3.0   
  success           |  Function   |  否   |  接口调用成功的回调函数                           |          
  fail              |  Function   |  否   |  接口调用失败的回调函数                           |          
  complete          |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行） |          

**注：当 withCredentials 为 true 时，要求此前有调用过 wx.login 且登录态尚未过期，此时返回的数据会包含 encryptedData, iv 等敏感信息；当 withCredentials 为 false 时，不要求有登录态，返回的数据不包含 encryptedData, iv 等敏感信息。**

**success返回参数说明：**

  参数                 |  类型     |  说明                                                                                                                             
-----------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------
  userInfo             |  OBJECT   |  用户信息对象，不包含 openid 等敏感信息                                                                                           
  rawData              |  String   |  不包括敏感信息的原始数据字符串，用于计算签名。                                                                                   
  signature            |  String   |使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息，参考文档 [signature](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html)。
  encryptedData        |  String   |包括敏感数据在内的完整用户信息的加密数据，详细见[加密数据解密算法](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html#加密数据解密算法)
  iv                   |  String   |  加密算法的初始向量，详细见[加密数据解密算法](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html#加密数据解密算法)      
  userInfo.nickName    |  String   |  用户昵称                                                                                                                         
  userInfo.avatarUrl   |  String   |用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
  userInfo.gender      |  String   |  用户的性别，值为1时是男性，值为2时是女性，值为0时是未知                                                                          
  userInfo.city        |  String   |  用户所在城市                                                                                                                     
  userInfo.province    |  String   |  用户所在省份                                                                                                                     
  userInfo.country     |  String   |  用户所在国家                                                                                                                     
  userInfo.language    |  String   |  用户的语言，简体中文为zh_CN                                                                                                      

**示例代码：**

    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })
    

encryptedData 解密后为以下 json 结构，详见[加密数据解密算法](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html#加密数据解密算法)

    {
        "openId": "OPENID",
        "nickName": "NICKNAME",
        "gender": GENDER,
        "city": "CITY",
        "province": "PROVINCE",
        "country": "COUNTRY",
        "avatarUrl": "AVATARURL",
        "unionId": "UNIONID",
        "watermark":
        {
            "appid":"APPID",
        "timestamp":TIMESTAMP
        }
    }
