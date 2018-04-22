<!-- https://developers.weixin.qq.com/miniprogram/dev/api/file.html -->

### wx.saveFile(OBJECT)

保存文件到本地。**注意：saveFile 会把临时文件移动，因此调用成功后传入的 tempFilePath 将不可用**

**OBJECT参数说明：**

  参数           |  类型       |  必填 |  说明                                         
-----------------|-------------|-------|-----------------------------------------------
  tempFilePath   |  String     |  是   |  需要保存的文件的临时路径                     
  success        |  Function   |  否   |返回文件的保存路径，res = {savedFilePath: '文件的保存路径'}
  fail           |  Function   |  否   |  接口调用失败的回调函数                       
  complete       |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数            |  说明      
------------------|------------
  savedFilePath   |文件的保存路径

**示例代码：**

    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success: function(res) {
            var savedFilePath = res.savedFilePath
          }
        })
      }
    })
    

#### bug & tip

1.  `tip`: 本地文件存储的大小限制为 10M

### wx.getSavedFileList(OBJECT)

获取本地已保存的文件列表

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                               
-------------|-------------|-------|-------------------------------------
  success    |  Function   |  否   |接口调用成功的回调函数，返回结果见`success返回参数说明`
  fail       |  Function   |  否   |  接口调用失败的回调函数             
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数                    |  类型           |  说明                                       
--------------------------|-----------------|---------------------------------------------
  errMsg                  |  String         |  接口调用结果                               
  fileList                |  Object Array   |  文件列表                                   
  fileList[].filePath     |  String         |  文件的本地路径                             
  fileList[].createTime   |  Number         |文件的保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
  fileList[].size         |  Number         |  文件大小，单位B                            

**示例代码：**

    wx.getSavedFileList({
      success: function(res) {
        console.log(res.fileList)
      }
    })
    

### wx.getSavedFileInfo(OBJECT)

获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，请使用 [wx.getFileInfo](https://developers.weixin.qq.com/miniprogram/dev/api/getFileInfo.html) 接口。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                               
-------------|-------------|-------|-------------------------------------
  filePath   |  String     |  是   |  文件路径                           
  success    |  Function   |  否   |接口调用成功的回调函数，返回结果见`success返回参数说明`
  fail       |  Function   |  否   |  接口调用失败的回调函数             
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数         |  类型     |  说明                                     
---------------|-----------|-------------------------------------------
  errMsg       |  String   |  接口调用结果                             
  size         |  Number   |  文件大小，单位B                          
  createTime   |  Number   |文件保存时的时间戳，从1970/01/01 08:00:00 到该时刻的秒数

**示例代码：**

    wx.getSavedFileInfo({
      filePath: 'wxfile://somefile', //仅做示例用，非真正的文件路径
      success: function(res) {
        console.log(res.size)
        console.log(res.createTime)
      }
    })
    

### wx.removeSavedFile(OBJECT)

删除本地存储的文件

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  filePath   |  String     |  是   |  需要删除的文件路径         
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.getSavedFileList({
      success: function(res) {
        if (res.fileList.length > 0){
          wx.removeSavedFile({
            filePath: res.fileList[0].filePath,
            complete: function(res) {
              console.log(res)
            }
          })
        }
      }
    })
    

### wx.openDocument(OBJECT)

新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                                                       | 最低版本 
-------------|-------------|-------|-------------------------------------------------------------|----------
  filePath   |  String     |  是   |  文件路径，可通过 downFile 获得                             |          
  fileType   |  String     |  否   |文件类型，指定文件类型打开文件，有效值 doc, xls, ppt, pdf, docx, xlsx, pptx|  1.4.0   
  success    |  Function   |  否   |  接口调用成功的回调函数                                     |          
  fail       |  Function   |  否   |  接口调用失败的回调函数                                     |          
  complete   |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）           |          

#### 示例代码

    wx.downloadFile({
      url: 'http://example.com/somefile.pdf',
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
