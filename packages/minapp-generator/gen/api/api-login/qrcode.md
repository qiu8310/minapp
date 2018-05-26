<!-- https://developers.weixin.qq.com/miniprogram/dev/api/qrcode.html -->

获取二维码
-----

通过后台接口可以获取小程序任意页面的二维码，扫描该二维码可以直接进入小程序对应的页面。目前微信支持两种二维码，小程序码（左），小程序二维码（右），如下所示：

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/qrcode/qrcode.png)

可以使用开发工具 1.02.1803130 及以后版本通过二维码编译功能调试所获得的二维码

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/devtools2/qrcodecompile.png)
--------------------------------------------------------------------------------

为满足不同需求和场景，这里提供了三个接口，开发者可挑选适合自己的接口。 A接口，生成小程序码，可接受path参数较长，生成个数受限。 B接口，生成小程序码，可接受页面参数较短，生成个数不受限。 C接口，生成二维码，可接受path参数较长，生成个数受限。

### 获取小程序码

我们推荐生成并使用小程序码，它具有更好的辨识度。目前有两个接口可以生成小程序码，开发者可以根据自己的需要选择合适的接口。

接口A: 适用于需要的码数量较少的业务场景 接口地址：

    https://api.weixin.qq.com/wxa/getwxacode?access_token=ACCESS_TOKEN
    

获取 access_token 详见[文档](https://mp.weixin.qq.com/wiki?id=mp1421140183)

**POST 参数说明**

  参数         |  类型     |  默认值                      |  说明                                                                          
---------------|-----------|------------------------------|--------------------------------------------------------------------------------
  path         |  String   |                              |  不能为空，最大长度 128 字节                                                   
  width        |  Int      |  430                         |  二维码的宽度                                                                  
  auto_color   |  Bool     |  false                       |  自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调                  
  line_color   |  Object   |  {"r":"0","g":"0","b":"0"}   |auth_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"},十进制表示
  is_hyaline   |  Bool     |  false                       |  是否需要透明底色， is_hyaline 为true时，生成透明底色的小程序码                

**注意：通过该接口生成的小程序码，永久有效，数量限制见文末说明，请谨慎使用。用户扫描该码进入小程序后，将直接进入 path 对应的页面。**

接口B：适用于需要的码数量极多的业务场景

接口地址：

    https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=ACCESS_TOKEN
    

获取 access_token 详见[文档](https://mp.weixin.qq.com/wiki?id=mp1421140183)

**POST 参数说明**

  参数         |  类型     |  默认值                      |  说明                                                                                                     
---------------|-----------|------------------------------|-----------------------------------------------------------------------------------------------------------
  scene        |  String   |                              |最大32个可见字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~，其它字符请自行编码为合法字符（因不支持%，中文无法使用 urlencode 处理，请使用其他编码方式）
  page         |  String   |                              |必须是已经发布的小程序存在的页面（否则报错），例如 "pages/index/index" ,根路径前不要填加'/',不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面
  width        |  Int      |  430                         |  二维码的宽度                                                                                             
  auto_color   |  Bool     |  false                       |  自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调                                             
  line_color   |  Object   |  {"r":"0","g":"0","b":"0"}   |  auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示            
  is_hyaline   |  Bool     |  false                       |  是否需要透明底色， is_hyaline 为true时，生成透明底色的小程序码                                           

**注意：通过该接口生成的小程序码，永久有效，数量暂无限制。用户扫描该码进入小程序后，开发者需在对应页面获取的码中 scene 字段的值，再做处理逻辑。使用如下代码可以获取到二维码中的 scene 字段的值。调试阶段可以使用开发工具的条件编译自定义参数 scene=xxxx 进行模拟，开发工具模拟时的 scene 的参数值需要进行 urlencode**

    // 这是首页的 js
    Page({
      onLoad: function(options) {
        // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
        var scene = decodeURIComponent(options.scene)
      }
    })
    

### 获取小程序二维码

接口C：适用于需要的码数量较少的业务场景

接口地址：

    https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=ACCESS_TOKEN
    

获取 access_token 详见[文档](https://mp.weixin.qq.com/wiki?id=mp1421140183)

**POST 参数说明**

  参数    |  类型     | 默认值 |  说明               
----------|-----------|--------|---------------------
  path    |  String   |        |不能为空，最大长度 128 字节
  width   |  Int      |  430   |  二维码的宽度       

**注意：通过该接口生成的小程序二维码，永久有效，数量限制见文末说明，请谨慎使用。用户扫描该码进入小程序后，将直接进入 path 对应的页面。**

**示例：**

    {"path": "pages/index?query=1", "width": 430}
    

**注：pages/index 需要在 `app.json` 的 [`pages`](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#pages) 中定义**

### Bug & Tip

1.  `tip`：通过该接口，仅能生成已发布的小程序的二维码。
2.  `tip`：可以在开发者工具预览时生成开发版的带参二维码。
3.  `tip`：接口A加上接口C，总共生成的码数量限制为100,000，请谨慎调用。
4.  `tip`: POST 参数需要转成 json 字符串，不支持 form 表单提交。
5.  `tip`: auto\_color line\_color 参数仅对小程序码生效。

### 错误码

45009：B接口调用分钟频率受限(目前5000次/分钟，会调整)，如需大量小程序码，建议预生成。 45029：A接口和C接口生成码个数总和到达最大个数限制。 41030：B接口所传page页面不存在，或者小程序没有发布，请注意B接口没有path参数，传path参数虽然可以生成小程序码，但是只能跳主页面。
