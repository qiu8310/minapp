<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-picture.html -->

### wx.chooseImage(OBJECT)

从本地相册选择图片或使用相机拍照。

**OBJECT参数说明：**

  参数         |  类型          |  必填 |  说明                                
---------------|----------------|-------|--------------------------------------
  count        |  Number        |  否   |  最多可以选择的图片张数，默认9       
  sizeType     |  StringArray   |  否   |original 原图，compressed 压缩图，默认二者都有
  sourceType   |  StringArray   |  否   |album 从相册选图，camera 使用相机，默认二者都有
  success      |  Function      |  是   |成功则返回图片的本地文件路径列表 tempFilePaths
  fail         |  Function      |  否   |  接口调用失败的回调函数              
  complete     |  Function      |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**注：文件的临时路径，在小程序本次启动期间可以正常使用，如需持久保存，需在主动调用 [wx.saveFile](https://mp.weixin.qq.com/debug/wxadoc/dev/api/file.html)，在小程序下次启动时才能访问得到。**

**success返回参数说明：**

  参数               |  类型          |  说明                       | 最低版本 
---------------------|----------------|-----------------------------|----------
  tempFilePaths      |  StringArray   |  图片的本地文件路径列表     |          
  tempFiles          |  ObjectArray   |图片的本地文件列表，每一项是一个 File 对象|  1.2.0   
  tempFiles[].path   |  String        |  本地文件路径               |          
  tempFiles[].size   |  Number        |  本地文件大小，单位：B      |          

**示例代码：**

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
      }
    })
    

### wx.previewImage(OBJECT)

预览图片。

**OBJECT参数说明：**

  参数       |  类型          |  必填 |  说明                         
-------------|----------------|-------|-------------------------------
  current    |  String        |  否   |当前显示图片的链接，不填则默认为 urls 的第一张
  urls       |  StringArray   |  是   |  需要预览的图片链接列表       
  success    |  Function      |  否   |  接口调用成功的回调函数       
  fail       |  Function      |  否   |  接口调用失败的回调函数       
  complete   |  Function      |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [] // 需要预览的图片http链接列表
    })
    

### wx.getImageInfo(OBJECT)

获取图片信息

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                                 
-------------|-------------|-------|---------------------------------------
  src        |  String     |  是   |图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
  success    |  Function   |  否   |  接口调用成功的回调函数               
  fail       |  Function   |  否   |  接口调用失败的回调函数               
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数          |  类型     |  说明             |  最低版本 
----------------|-----------|-------------------|-----------
  width         |  Number   |  图片宽度，单位px |           
  height        |  Number   |  图片高度，单位px |           
  path          |  String   | 返回图片的本地路径|           
  orientation   |  String   |返回图片的方向，有效值见下表|  1.9.90   
  type          |  String   |  返回图片的格式   |  1.9.90   

**orientation参数说明：**

  枚举值           |  说明           
-------------------|-----------------
  up               |  默认           
  down             |  180度旋转      
  left             |  逆时针旋转90度 
  right            |  顺时针旋转90度 
  up-mirrored      | 同up，但水平翻转
  down-mirrored    |同down，但水平翻转
  left-mirrored    |同left，但垂直翻转
  right-mirrored   |同right，但垂直翻转

**示例代码：**

    wx.getImageInfo({
      src: 'images/a.jpg',
      success: function (res) {
        console.log(res.width)
        console.log(res.height)
      }
    })
    
    wx.chooseImage({
      success: function (res) {
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res) {
            console.log(res.width)
            console.log(res.height)
          }
        })
      }
    })
    

### wx.saveImageToPhotosAlbum(OBJECT)

> 基础库 1.2.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

保存图片到系统相册。需要[用户授权](https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html) scope.writePhotosAlbum

**OBJECT参数说明：**

  参数名     |  类型       |  必填 |  说明                                   
-------------|-------------|-------|-----------------------------------------
  filePath   |  String     |  是   |图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
  success    |  Function   |  否   |  接口调用成功的回调函数                 
  fail       |  Function   |  否   |  接口调用失败的回调函数                 
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数名   |  类型     |  说明   
-----------|-----------|---------
  errMsg   |  String   | 调用结果

**示例代码：**

    wx.saveImageToPhotosAlbum({
        success(res) {
        }
    })
