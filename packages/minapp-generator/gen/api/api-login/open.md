<!-- https://developers.weixin.qq.com/miniprogram/dev/api/open.html -->

### wx.getUserInfo(OBJECT)

**注意：此接口有调整，使用该接口将不再出现授权弹窗，请使用 [<button open-type="getUserInfo"></button>](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) 引导用户主动进行授权操作**

1.  当用户未授权过，调用该接口将直接报错
2.  当用户授权过，可以使用该接口获取用户信息

**OBJECT参数说明：**

  参数名            |  类型       |  必填 |  说明                                             |  最低版本 
--------------------|-------------|-------|---------------------------------------------------|-----------
  withCredentials   |  Boolean    |  否   |  是否带上登录态信息                               |  1.1.0    
  lang              |  String     |  否   |指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。默认为en。|  1.3.0    
  timeout           |  Number     |  否   |  超时时间，单位 ms                                |  1.9.90   
  success           |  Function   |  否   |  接口调用成功的回调函数                           |           
  fail              |  Function   |  否   |  接口调用失败的回调函数                           |           
  complete          |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行） |           

**注：当 withCredentials 为 true 时，要求此前有调用过 wx.login 且登录态尚未过期，此时返回的数据会包含 encryptedData, iv 等敏感信息；当 withCredentials 为 false 时，不要求有登录态，返回的数据不包含 encryptedData, iv 等敏感信息。**

**success返回参数说明：**

  参数                 |  类型     |  说明                                                                                                                                    
-----------------------|-----------|------------------------------------------------------------------------------------------------------------------------------------------
  userInfo             |  OBJECT   |  用户信息对象，不包含 openid 等敏感信息                                                                                                  
  rawData              |  String   |  不包括敏感信息的原始数据字符串，用于计算签名。                                                                                          
  signature            |  String   |使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息，参考文档 [signature](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html)。
  encryptedData        |  String   |包括敏感数据在内的完整用户信息的加密数据，详细见[加密数据解密算法](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#加密数据解密算法)
  iv                   |  String   |  加密算法的初始向量，详细见[加密数据解密算法](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#加密数据解密算法)      
  userInfo.nickName    |  String   |  用户昵称                                                                                                                                
  userInfo.avatarUrl   |  String   |用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
  userInfo.gender      |  String   |  用户的性别，值为1时是男性，值为2时是女性，值为0时是未知                                                                                 
  userInfo.city        |  String   |  用户所在城市                                                                                                                            
  userInfo.province    |  String   |  用户所在省份                                                                                                                            
  userInfo.country     |  String   |  用户所在国家                                                                                                                            
  userInfo.language    |  String   |  用户的语言，简体中文为zh_CN                                                                                                             

**示例代码：**

    <!--wxml-->
    <!-- 如果只是展示用户头像昵称，可以使用 <open-data /> 组件 -->
    <open-data type="userAvatarUrl"></open-data>
    <open-data type="userNickName"></open-data>
    <!-- 需要使用 button 来授权登录 -->
    <button wx:if="{{canIUse}}" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">授权登录</button>
    <view wx:else>请升级微信版本</view>
    

    //js
    Page({
      data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo')
      },
      onLoad: function() {
        // 查看是否授权
        wx.getSetting({
          success: function(res){
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: function(res) {
                  console(res.userInfo)
                }
              })
            }
          }
        })
      },
      bindGetUserInfo: function(e) {
        console.log(e.detail.userInfo)
      }
    })
    

encryptedData 解密后为以下 json 结构，详见[加密数据解密算法](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#加密数据解密算法)

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
