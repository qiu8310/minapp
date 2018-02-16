<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html -->

#### button

按钮。

  属性名                   |  类型      |  默认值         |  说明                                                                                                                                    |  生效时机                     | 最低版本 
---------------------------|------------|-----------------|------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|----------
  size                     |  String    |  default        |  按钮的大小                                                                                                                              |                               |          
  type                     |  String    |  default        |  按钮的样式类型                                                                                                                          |                               |          
  plain                    |  Boolean   |  false          |  按钮是否镂空，背景色透明                                                                                                                |                               |          
  disabled                 |  Boolean   |  false          |  是否禁用                                                                                                                                |                               |          
  loading                  |  Boolean   |  false          |  名称前是否带 loading 图标                                                                                                               |                               |          
  form-type                |  String    |                 |  用于 `<form/>` 组件，点击分别会触发 `<form/>` 组件的 submit/reset 事件                                                                  |                               |          
  open-type                |  String    |                 |  微信开放能力                                                                                                                            |                               |  1.1.0   
  app-parameter            |  String    |                 |  打开 APP 时，向 APP 传递的参数                                                                                                          |  open-type="launchApp"        |  1.9.5   
  hover-class              |  String    |  button-hover   |  指定按钮按下去的样式类。当 `hover-class="none"` 时，没有点击态效果                                                                      |                               |          
  hover-stop-propagation   |  Boolean   |  false          |  指定是否阻止本节点的祖先节点出现点击态                                                                                                  |                               |  1.5.0   
  hover-start-time         |  Number    |  20             |  按住后多久出现点击态，单位毫秒                                                                                                          |                               |          
  hover-stay-time          |  Number    |  70             |  手指松开后点击态保留时间，单位毫秒                                                                                                      |                               |          
  bindgetuserinfo          |  Handler   |                 |用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同[wx.getUserInfo](https://mp.weixin.qq.com/debug/wxadoc/dev/api/open.html#wxgetuserinfoobject)|  open-type="getUserInfo'      |  1.3.0   
  lang                     |  String    |  en             |  指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。                                                                       |  open-type="getUserInfo"      |  1.3.0   
  session-from             |  String    |                 |  会话来源                                                                                                                                |  open-type="contact"          |  1.4.0   
  send-message-title       |  String    |  当前标题       |  会话内消息卡片标题                                                                                                                      |  open-type="contact"          |  1.5.0   
  send-message-path        |  String    |  当前分享路径   |  会话内消息卡片点击跳转小程序路径                                                                                                        |  open-type="contact"          |  1.5.0   
  send-message-img         |  String    |  截图           |  会话内消息卡片图片                                                                                                                      |  open-type="contact"          |  1.5.0   
  show-message-card        |  Boolean   |  false          |  显示会话内消息卡片                                                                                                                      |  open-type="contact"          |  1.5.0   
  bindcontact              |  Handler   |                 |  客服消息回调                                                                                                                            |  open-type="contact"          |  1.5.0   
  bindgetphonenumber       |  Handler   |                 |  获取用户手机号回调                                                                                                                      |  open-type="getphonenumber"   |  1.2.0   
  binderrror               |  Handler   |                 |  当使用开放能力时，发生错误的回调                                                                                                        |  open-type="launchApp"        |  1.9.5   

*   **注1：`button-hover` 默认为`{background-color: rgba(0, 0, 0, 0.1); opacity: 0.7;}`**
*   **注2：`bindgetphonenumber` 从1.2.0 开始支持，但是在1.5.3以下版本中无法使用`wx.canIUse`进行检测，建议使用基础库版本进行判断。**
*   **注3: 在`bindgetphonenumber` 等返回加密信息的回调中调用 `wx.login` 登录，可能会刷新登录态。此时服务器使用 code 换取的 sessionKey 不是加密时使用的 sessionKey，导致解密失败。建议开发者提前进行 `login`；或者在回调中先使用 `checkSession` 进行登录态检查，避免 `login` 刷新登录态。**

**size 有效值：**

  值        |  说明 
------------|-------
  default   |       
  mini      |       

**type 有效值：**

  值        |  说明 
------------|-------
  primary   |       
  default   |       
  warn      |       

**form-type 有效值：**

  值       |  说明   
-----------|---------
  submit   | 提交表单
  reset    | 重置表单

**open-type 有效值：**

  值               |  说明                                                                                                                | 最低版本 
-------------------|----------------------------------------------------------------------------------------------------------------------|----------
  contact          |  打开客服会话                                                                                                        |  1.1.0   
  share            |  触发用户转发，使用前建议先阅读[使用指引](https://mp.weixin.qq.com/debug/wxadoc/dev/api/share.html#使用指引)         |  1.2.0   
  getUserInfo      |  获取用户信息，可以从bindgetuserinfo回调中获取到用户信息                                                             |  1.3.0   
  getPhoneNumber   |获取用户手机号，可以从bindgetphonenumber回调中获取到用户信息，[具体说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/getPhoneNumber.html)|  1.2.0   
  launchApp        |打开APP，可以通过app-parameter属性设定向APP传的参数[具体说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/launchApp.html)|  1.9.5   

**示例代码：**

    /** wxss **/
    /** 修改button默认的点击态样式类**/
    .button-hover {
      background-color: red;
    }
    /** 添加自定义button点击态样式类**/
    .other-button-hover {
      background-color: blue;
    }
    

    <button type="default" size="{{defaultSize}}" loading="{{loading}}" plain="{{plain}}"
            disabled="{{disabled}}" bindtap="default" hover-class="other-button-hover"> default </button>
    <button type="primary" size="{{primarySize}}" loading="{{loading}}" plain="{{plain}}"
            disabled="{{disabled}}" bindtap="primary"> primary </button>
    <button type="warn" size="{{warnSize}}" loading="{{loading}}" plain="{{plain}}"
            disabled="{{disabled}}" bindtap="warn"> warn </button>
    <button bindtap="setDisabled">点击设置以上按钮disabled属性</button>
    <button bindtap="setPlain">点击设置以上按钮plain属性</button>
    <button bindtap="setLoading">点击设置以上按钮loading属性</button>
    <button open-type="contact">进入客服会话</button>
    

    var types = ['default', 'primary', 'warn']
    var pageObject = {
      data: {
        defaultSize: 'default',
        primarySize: 'default',
        warnSize: 'default',
        disabled: false,
        plain: false,
        loading: false
      },
      setDisabled: function(e) {
        this.setData({
          disabled: !this.data.disabled
        })
      },
      setPlain: function(e) {
        this.setData({
          plain: !this.data.plain
        })
      },
      setLoading: function(e) {
        this.setData({
          loading: !this.data.loading
        })
      }
    }
    
    for (var i = 0; i < types.length; ++i) {
      (function(type) {
        pageObject[type] = function(e) {
          var key = type + 'Size'
          var changedData = {}
          changedData[key] =
            this.data[key] === 'default' ? 'mini' : 'default'
          this.setData(changedData)
        }
      })(types[i])
    }
    
    Page(pageObject)
    

![button](https://mp.weixin.qq.com/debug/wxadoc/dev/image/pic/button.png?t=201828)
