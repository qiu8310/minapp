<!-- https://developers.weixin.qq.com/miniprogram/dev/api/data.html -->

每个微信小程序都可以有自己的本地缓存，可以通过 wx.setStorage（wx.setStorageSync）、wx.getStorage（wx.getStorageSync）、wx.clearStorage（wx.clearStorageSync）可以对本地缓存进行设置、获取和清理。同一个微信用户，同一个小程序 storage 上限为 10MB。localStorage 以用户维度隔离，同一台设备上，A 用户无法读取到 B 用户的数据。

**注意：** 如果用户储存空间不足，我们会清空最近最久未使用的小程序的本地缓存。我们不建议将关键信息全部存在 localStorage，以防储存空间不足或用户换设备的情况。

### wx.setStorage(OBJECT)

将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。

**OBJECT参数说明：**

  参数       |  类型            |  必填 |  说明                       
-------------|------------------|-------|-----------------------------
  key        |  String          |  是   |  本地缓存中的指定的 key     
  data       |  Object/String   |  是   |  需要存储的内容             
  success    |  Function        |  否   |  接口调用成功的回调函数     
  fail       |  Function        |  否   |  接口调用失败的回调函数     
  complete   |  Function        |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.setStorage({
      key:"key",
      data:"value"
    })
    

### wx.setStorageSync(KEY,DATA)

将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。

**参数说明：**

  参数   |  类型            |  必填 |  说明            
---------|------------------|-------|------------------
  key    |  String          |  是   |本地缓存中的指定的 key
  data   |  Object/String   |  是   |  需要存储的内容  

**示例代码**

    try {
        wx.setStorageSync('key', 'value')
    } catch (e) {    
    }
    

### wx.getStorage(OBJECT)

从本地缓存中异步获取指定 key 对应的内容。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                               
-------------|-------------|-------|-------------------------------------
  key        |  String     |  是   |  本地缓存中的指定的 key             
  success    |  Function   |  是   |接口调用的回调函数,res = {data: key对应的内容}
  fail       |  Function   |  否   |  接口调用失败的回调函数             
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数   |  类型     |  说明       
---------|-----------|-------------
  data   |  String   |key对应的内容

**示例代码：**

    wx.getStorage({
      key: 'key',
      success: function(res) {
          console.log(res.data)
      } 
    })
    

### wx.getStorageSync(KEY)

从本地缓存中同步获取指定 key 对应的内容。

**参数说明：**

  参数  |  类型     |  必填 |  说明            
--------|-----------|-------|------------------
  key   |  String   |  是   |本地缓存中的指定的 key

**示例代码：**

    try {
      var value = wx.getStorageSync('key')
      if (value) {
          // Do something with return value
      }
    } catch (e) {
      // Do something when catch error
    }
    

### wx.getStorageInfo(OBJECT)

异步获取当前storage的相关信息

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  是   |接口调用的回调函数，详见返回参数说明
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数          |  类型           |  说明               
----------------|-----------------|---------------------
  keys          |  String Array   |当前storage中所有的key
  currentSize   |  Number         |当前占用的空间大小, 单位kb
  limitSize     |  Number         |限制的空间大小，单位kb

**示例代码：**

    wx.getStorageInfo({
      success: function(res) {
        console.log(res.keys)
        console.log(res.currentSize)
        console.log(res.limitSize)
      }
    })
    

### wx.getStorageInfoSync

同步获取当前storage的相关信息

**示例代码：**

    try {
      var res = wx.getStorageInfoSync()
      console.log(res.keys)
      console.log(res.currentSize)
      console.log(res.limitSize)
    } catch (e) {
      // Do something when catch error
    }
    

### wx.removeStorage(OBJECT)

从本地缓存中异步移除指定 key 。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  key        |  String     |  是   |  本地缓存中的指定的 key     
  success    |  Function   |  是   |  接口调用的回调函数         
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.removeStorage({
      key: 'key',
      success: function(res) {
        console.log(res.data)
      } 
    })
    

### wx.removeStorageSync(KEY)

从本地缓存中同步移除指定 key 。

**参数说明：**

  参数  |  类型     |  必填 |  说明            
--------|-----------|-------|------------------
  key   |  String   |  是   |本地缓存中的指定的 key

**示例代码：**

    try {
      wx.removeStorageSync('key')
    } catch (e) {
      // Do something when catch error
    }
    

### wx.clearStorage()

清理本地数据缓存。

**示例代码：**

    wx.clearStorage()
    

### wx.clearStorageSync()

同步清理本地数据缓存

**示例代码：**

    try {
        wx.clearStorageSync()
    } catch(e) {
      // Do something when catch error
    }
    

#### Bug & Tip

1.  `tip`: 本地数据存储的大小限制为 10MB
