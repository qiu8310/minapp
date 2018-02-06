<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/location.html -->

### wx.getLocation(OBJECT)

获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用；当用户点击“显示在聊天顶部”时，此接口可继续调用。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                                                  | 最低版本 
-------------|-------------|-------|--------------------------------------------------------|----------
  type       |  String     |  否   |默认为 wgs84 返回 gps 坐标，gcj02 返回可用于`wx.openLocation`的坐标|          
  altitude   |  Boolean    |  否   |传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度|  1.6.0   
  success    |  Function   |  是   |  接口调用成功的回调函数，返回内容详见返回参数说明。    |          
  fail       |  Function   |  否   |  接口调用失败的回调函数                                |          
  complete   |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）      |          

**success返回参数说明：**

  参数                 |  说明                           | 最低版本 
-----------------------|---------------------------------|----------
  latitude             |纬度，浮点数，范围为-90~90，负数表示南纬|          
  longitude            |经度，浮点数，范围为-180~180，负数表示西经|          
  speed                |  速度，浮点数，单位m/s          |          
  accuracy             |  位置的精确度                   |          
  altitude             |  高度，单位 m                   |  1.2.0   
  verticalAccuracy     |垂直精度，单位 m（Android 无法获取，返回 0）|  1.2.0   
  horizontalAccuracy   |  水平精度，单位 m               |  1.2.0   

**示例代码：**

    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
    })
    

### wx.chooseLocation(OBJECT)

打开地图选择位置。

需要[用户授权](https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html) scope.userLocation

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                        
-------------|-------------|-------|------------------------------
  success    |  Function   |  是   |接口调用成功的回调函数，返回内容详见返回参数说明。
  fail       |  Function   |  否   |  接口调用失败的回调函数      
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数        |  说明                        
--------------|------------------------------
  name        |  位置名称                    
  address     |  详细地址                    
  latitude    |纬度，浮点数，范围为-90~90，负数表示南纬
  longitude   |经度，浮点数，范围为-180~180，负数表示西经

### wx.openLocation(OBJECT)

​使用微信内置地图查看位置。

需要[用户授权](https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html) scope.userLocation

**OBJECT参数说明：**

  参数        |  类型       |  必填 |  说明                       
--------------|-------------|-------|-----------------------------
  latitude    |  Float      |  是   |纬度，范围为-90~90，负数表示南纬
  longitude   |  Float      |  是   |经度，范围为-180~180，负数表示西经
  scale       |  INT        |  否   | 缩放比例，范围5~18，默认为18
  name        |  String     |  否   |  位置名                     
  address     |  String     |  否   |  地址的详细说明             
  success     |  Function   |  否   |  接口调用成功的回调函数     
  fail        |  Function   |  否   |  接口调用失败的回调函数     
  complete    |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
    

#### Bug & Tip

1.  `bug`: `iOS` `6.3.30` type 参数不生效，只会返回 wgs84 类型的坐标信息
