<!-- https://developers.weixin.qq.com/miniprogram/dev/api/api-react.html -->

### wx.showToast(OBJECT)

显示消息提示框

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                                  | 最低版本 
-------------|-------------|-------|----------------------------------------|----------
  title      |  String     |  是   |  提示的内容                            |          
  icon       |  String     |  否   |图标，有效值 "success", "loading", "none"|          
  image      |  String     |  否   |自定义图标的本地路径，image 的优先级高于 icon|  1.1.0   
  duration   |  Number     |  否   |  提示的延迟时间，单位毫秒，默认：1500  |          
  mask       |  Boolean    |  否   |是否显示透明蒙层，防止触摸穿透，默认：false|          
  success    |  Function   |  否   |  接口调用成功的回调函数                |          
  fail       |  Function   |  否   |  接口调用失败的回调函数                |          
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）|          

**icon有效值**

  有效值    |  说明                                 | 最低版本 
------------|---------------------------------------|----------
  success   |显示成功图标，此时 title 文本最多显示 7 个汉字长度。默认值|          
  loading   |显示加载图标，此时 title 文本最多显示 7 个汉字长度。|          
  none      |不显示图标，此时 title 文本最多可显示两行|  1.9.0   

**示例代码：**

    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
    

### wx.showLoading(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

显示 loading 提示框, 需主动调用 [wx.hideLoading](https://developers.weixin.qq.com/miniprogram/dev/api/api-react.html#wxhideloading) 才能关闭提示框

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  title      |  String     |  是   |  提示的内容                 
  mask       |  Boolean    |  否   |是否显示透明蒙层，防止触摸穿透，默认：false
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

### wx.hideToast()

隐藏消息提示框

### wx.hideLoading()

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

隐藏 loading 提示框

    wx.showLoading({
      title: '加载中',
    })
    
    setTimeout(function(){
      wx.hideLoading()
    },2000)
    

### wx.showModal(OBJECT)

​显示模态弹窗

**OBJECT参数说明：**

  参数           |  类型       |  必填 |  说明                       
-----------------|-------------|-------|-----------------------------
  title          |  String     |  是   |  提示的标题                 
  content        |  String     |  是   |  提示的内容                 
  showCancel     |  Boolean    |  否   |是否显示取消按钮，默认为 true
  cancelText     |  String     |  否   |取消按钮的文字，默认为"取消"，最多 4 个字符
  cancelColor    |  HexColor   |  否   |取消按钮的文字颜色，默认为"#000000"
  confirmText    |  String     |  否   |确定按钮的文字，默认为"确定"，最多 4 个字符
  confirmColor   |  HexColor   |  否   |确定按钮的文字颜色，默认为"#3CC51F"
  success        |  Function   |  否   |  接口调用成功的回调函数     
  fail           |  Function   |  否   |  接口调用失败的回调函数     
  complete       |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数      |  类型      |  说明                                                  | 最低版本 
------------|------------|--------------------------------------------------------|----------
  confirm   |  Boolean   |  为 true 时，表示用户点击了确定按钮                    |          
  cancel    |  Boolean   |为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）|  1.1.0   

**示例代码：**

    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    

### wx.showActionSheet(OBJECT)

​显示操作菜单

**OBJECT参数说明：**

  参数        |  类型           |  必填 |  说明                       
--------------|-----------------|-------|-----------------------------
  itemList    |  String Array   |  是   |按钮的文字数组，数组长度最大为6个
  itemColor   |  HexColor       |  否   |按钮的文字颜色，默认为"#000000"
  success     |  Function       |  否   |接口调用成功的回调函数，详见返回参数说明
  fail        |  Function       |  否   |  接口调用失败的回调函数     
  complete    |  Function       |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数       |  类型     |  说明                   
-------------|-----------|-------------------------
  tapIndex   |  Number   |用户点击的按钮，从上到下的顺序，从0开始

**示例代码：**

    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success: function(res) {
        console.log(res.tapIndex)
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
    

#### Bug & Tip

1.  `bug`: `Android` `6.3.30`，wx.showModal 的返回的 confirm 一直为 true；
2.  `tip`: wx.showActionSheet 点击取消或蒙层时，回调 `fail`, errMsg 为 "showActionSheet:fail cancel"；
3.  `tip`: wx.showLoading 和 wx.showToast 同时只能显示一个，但 wx.hideToast/wx.hideLoading 也应当配对使用；
4.  `tip`: `iOS` wx.showModal 点击蒙层不会关闭模态弹窗，所以尽量避免使用“取消”分支中实现业务逻辑。
