<!-- https://developers.weixin.qq.com/miniprogram/dev/api/share.html -->

onShareAppMessage(options)
--------------------------

在 Page 中定义 onShareAppMessage 函数，设置该页面的转发信息。

*   只有定义了此事件处理函数，右上角菜单才会显示 “转发” 按钮
*   用户点击转发按钮的时候会调用
*   此事件需要 return 一个 Object，用于自定义转发内容

**options 参数说明**

  参数     |  类型     |  说明                                                         | 最低版本 
-----------|-----------|---------------------------------------------------------------|----------
  from     |  String   |  转发事件来源。button：页面内转发按钮；menu：右上角转发菜单   |  1.2.4   
  target   |  Object   |如果 from 值是 button，则 target 是触发这次转发事件的 button，否则为 undefined|  1.2.4   

**自定义转发字段**

  字段       |  说明                                                                            |  默认值                      | 最低版本 
-------------|----------------------------------------------------------------------------------|------------------------------|----------
  title      |  转发标题                                                                        |  当前小程序名称              |          
  path       |  转发路径                                                                        |当前页面 path ，必须是以 / 开头的完整路径|          
  imageUrl   |自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4|                              |  1.5.0   

**示例代码：**

    Page({
      onShareAppMessage: function (res) {
        if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target)
        }
        return {
          title: '自定义转发标题',
          path: '/page/user?id=123'
        }
      }
    })
    

wx.showShareMenu(OBJECT)
------------------------

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

显示当前页面的转发按钮

**OBJECT参数说明：**

  参数              |  类型       |  必填 |  说明                                                                                                  
--------------------|-------------|-------|--------------------------------------------------------------------------------------------------------
  withShareTicket   |  Boolean    |  否   |是否使用带 shareTicket 的转发[详情](https://developers.weixin.qq.com/miniprogram/dev/api/share.html#获取更多转发信息)
  success           |  Function   |  否   |  接口调用成功的回调函数                                                                                
  fail              |  Function   |  否   |  接口调用失败的回调函数                                                                                
  complete          |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）                                                      

**示例代码：**

    wx.showShareMenu({
      withShareTicket: true
    })
    

wx.hideShareMenu(OBJECT)
------------------------

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

隐藏转发按钮

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.hideShareMenu()
    

wx.updateShareMenu(OBJECT)
--------------------------

> 基础库 1.2.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

更新转发属性

**OBJECT参数说明：**

  参数              |  类型       |  必填 |  说明                                                                                                  
--------------------|-------------|-------|--------------------------------------------------------------------------------------------------------
  withShareTicket   |  Boolean    |  否   |是否使用带 shareTicket 的转发[详情](https://developers.weixin.qq.com/miniprogram/dev/api/share.html#获取更多转发信息)
  success           |  Function   |  否   |  接口调用成功的回调函数                                                                                
  fail              |  Function   |  否   |  接口调用失败的回调函数                                                                                
  complete          |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）                                                      

**示例代码：**

    wx.updateShareMenu({
      withShareTicket: true,
      success() {
      }
    })
    

wx.getShareInfo(OBJECT)
-----------------------

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

获取转发详细信息

**OBJECT参数说明：**

  参数          |  类型       |  必填 |  说明                       |  最低版本 
----------------|-------------|-------|-----------------------------|-----------
  shareTicket   |  String     |  是   |  shareTicket                |           
  timeout       |  Number     |  否   |  超时时间，单位 ms          |  1.9.90   
  success       |  Function   |  否   |  接口调用成功的回调函数     |           
  fail          |  Function   |  否   |  接口调用失败的回调函数     |           
  complete      |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）|           

**CALLBACK 参数说明：**

  参数            |  类型     |  说明                                                                                                               
------------------|-----------|---------------------------------------------------------------------------------------------------------------------
  errMsg          |  String   |  错误信息                                                                                                           
  encryptedData   |  String   |包括敏感数据在内的完整转发信息的加密数据，详细见[加密数据解密算法](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#加密数据解密算法)
  iv              |  String   |加密算法的初始向量，详细见[加密数据解密算法](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#加密数据解密算法)

**encryptedData 解密后为一个 JSON 结构，包含字段如下：**

  字段      |  说明            
------------|------------------
  openGId   |群对当前小程序的唯一 ID

**Tip:** 如需要展示群名称，可以使用[开放数据组件](https://developers.weixin.qq.com/miniprogram/dev/component/open-data.html)

获取更多转发信息
--------

通常开发者希望转发出去的小程序被二次打开的时候能够获取到一些信息，例如群的标识。现在通过调用 `wx.showShareMenu` 并且设置 `withShareTicket` 为 `true` ，当用户将小程序转发到任一群聊之后，此转发卡片在群聊中被其他用户打开时，可以在 [App.onLaunch()](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html) 或 [App.onShow](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html) 获取到一个 `shareTicket`。通过调用 [wx.getShareInfo()](https://developers.weixin.qq.com/miniprogram/dev/api/share.html#wxgetshareinfoobject) 接口传入此 `shareTicket` 可以获取到转发信息。

页面内发起转发
-------

> 基础库 1.2.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

通过给 `button` 组件设置属性 `open-type="share"`，可以在用户点击按钮后触发 `Page.onShareAppMessage()` 事件，如果当前页面没有定义此事件，则点击后无效果。相关组件：[button](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)

使用指引
----

转发按钮，旨在帮助用户更流畅地与好友分享内容和服务。转发，应是用户自发的行为，且在需要时触手可及。开发者在使用时若遵从以下指引，会得到更佳的用户体验。

1.  含义清晰：明确、一目了然的图形按钮，将为用户减少理解的时间。在我们的资源下载中心，你可以找到这样的按钮素材并直接使用。或者你可以根据自己业务的设计风格，灵活设计含义清晰的按钮的样式。当然，你也可以直接使用带文案的按钮，“转发给好友”，它也足够明确。
2.  方便点击：按钮点击热区不宜过小，亦不宜过大。同时，转发按钮与其他按钮一样，热区也不宜过密，以免用户误操作。
3.  按需出现：并非所有页面都适合放置转发按钮，涉及用户隐私的非公开内容，或可能打断用户完成当前操作体验的场景，该功能并不推荐使用。同时，由于转发过程中，我们将截取用户屏幕图像作为配图，因此，需要注意帮助用户屏蔽个人信息。
4.  尊重意愿：理所当然，并非所有的用户，都喜欢与朋友分享你的小程序。因此，它不应该成为一个诱导或强制行为，如转发后才能解锁某项功能等。请注意，这类做法不仅不被推荐，还可能违反我们的[《运营规范》](https://mp.weixin.qq.com/debug/wxadoc/product/index.html)，我们强烈建议你在使用前阅读这部分内容。

以上，我们陈列了最重要的几点，如果你有时间，可以完整浏览[《设计指南》](https://mp.weixin.qq.com/debug/wxadoc/design/index.html)，相信会有更多的收获。

#### Bug & Tip

1.  `tip`: 不自定义转发图片的情况下，默认会取当前页面，从顶部开始，高度为 80% 屏幕宽度的图像作为转发图片。
2.  `tip`: 转发的调试支持请查看 [普通转发的调试支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/different.html#普通的转发) 和 [带 shareTicket 的转发](https://developers.weixin.qq.com/miniprogram/dev/devtools/different.html#带-shareticket-的转发)
3.  `tip`: 只有转发到群聊中打开才可以获取到 `shareTickets` 返回值，单聊没有 `shareTickets`
4.  `tip`: `shareTicket` 仅在当前小程序生命周期内有效
5.  `tip`: 由于策略变动，小程序群相关能力进行调整，开发者可先使用`wx.getShareInfo`接口中的群ID进行功能开发。
