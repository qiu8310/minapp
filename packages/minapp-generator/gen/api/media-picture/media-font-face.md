<!-- https://developers.weixin.qq.com/miniprogram/dev/api/media-fontFace.html -->

### wx.loadFontFace(OBJECT)

> 基础库 2.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

动态加载网络字体

**OBJECT参数说明：**

  参数           |  类型       |  必填 |  说明                               
-----------------|-------------|-------|-------------------------------------
  family         |  String     |  是   |  定义的字体名称                     
  source         |  String     |  是   |  字体资源的地址                     
  desc           |  Object     |  否   |  可选的字体描述符                   
  success        |  Function   |  否   |  接口调用成功的回调函数             
  fail           |  Function   |  否   |  接口调用失败的回调函数             
  complete       |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）
  desc.style     |  String     |  否   |  normal / italic / oblique          
  desc.weight    |  String     |  否   |  normal / bold / 100 / 200../ 900   
  desc.variant   |  String     |  否   |  normal / small-caps / inherit      

**示例代码：**

    wx.loadFontFace({
      family: 'Bitstream Vera Serif Bold',
      source: 'url("http://developer.mozilla.org/@api/deki/files/2934/=VeraSeBd.ttf")',
      success: function(res) {
        console.log(res.status) //  loaded
      },
      fail: function(res) {
        console.log(res.status) //  error
      },
      complete: function(res) {
        console.log(res.status);
      }
    });
    

#### Tip

1.  引入的外部字体资源，建议格式为TTF和WOFF，WOFF2在低版本的IOS上会不兼容。
