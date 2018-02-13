<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/getPhoneNumber.html -->

getPhoneNumber(OBJECT)
======================

说明
--

获取微信用户绑定的手机号，需先调用[login](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html?t=201828#wxloginobject)接口。

因为需要用户主动触发才能发起获取手机号接口，所以该功能不由 API 来调用，需用 `<button>` 组件的点击来触发。

**注意：目前该接口针对非个人开发者，且完成了认证的小程序开放。需谨慎使用，若用户举报较多或被发现在不必要场景下使用，微信有权永久回收该小程序的该接口权限。**

使用方法
----

需要将 `<button>` 组件 `open-type` 的值设置为 `getPhoneNumber`，当用户点击并同意之后，可以通过 `bindgetphonenumber` 事件回调获取到微信服务器返回的加密数据， 然后在第三方服务端结合 `session_key` 以及 `app_id` 进行解密获取手机号。

注意
--

在回调中调用 `wx.login` 登录，可能会刷新登录态。此时服务器使用 code 换取的 sessionKey 不是加密时使用的 sessionKey，导致解密失败。建议开发者提前进行 `login`；或者在回调中先使用 `checkSession` 进行登录态检查，避免 `login` 刷新登录态。

例子
--

    <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"> </button>
    

    Page({ 
        getPhoneNumber: function(e) { 
            console.log(e.detail.errMsg) 
            console.log(e.detail.iv) 
            console.log(e.detail.encryptedData) 
        } 
    })
    

返回参数说明
------

  参数            |  类型     |  说明                                                                                                                                                                                 
------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  encryptedData   |  String   |包括敏感数据在内的完整用户信息的加密数据，详细见[加密数据解密算法](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html?t=201828#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95)
  iv              |  String   |加密算法的初始向量，详细见[加密数据解密算法](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html?t=201828#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95)

encryptedData 解密后为以下 json 结构，详见[加密数据解密算法](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html?t=201828#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95)

    {
        "phoneNumber": "13580006666",  
        "purePhoneNumber": "13580006666", 
        "countryCode": "86",
        "watermark":
        {
            "appid":"APPID",
            "timestamp":TIMESTAMP
        }
    }
    

  参数              |  类型     |  说明                  
--------------------|-----------|------------------------
  phoneNumber       |  String   |用户绑定的手机号（国外手机号会有区号）
  purePhoneNumber   |  String   |  没有区号的手机号      
  countryCode       |  String   |  区号                  
