<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/iBeacon.html -->

iBeacon
-------

### wx.startBeaconDiscovery(OBJECT)

> 基础库 1.2.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

开始搜索附近的`iBeacon`设备

**OBJECT参数说明：**

  参数名     |  类型          |  必填 |  说明                       
-------------|----------------|-------|-----------------------------
  uuids      |  StringArray   |  是   |  iBeacon设备广播的 uuids    
  success    |  Function      |  否   |  接口调用成功的回调函数     
  fail       |  Function      |  否   |  接口调用失败的回调函数     
  complete   |  Function      |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数名   |  类型     |  说明   
-----------|-----------|---------
  errMsg   |  String   | 调用结果

**示例代码：**

    wx.startBeaconDiscovery({
        success(res) {
        }
    })
    

### wx.stopBeaconDiscovery(OBJECT)

> 基础库 1.2.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

停止搜索附近的`iBeacon`设备

**OBJECT参数说明：**

  参数名     |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数名   |  类型     |  说明   
-----------|-----------|---------
  errMsg   |  String   | 调用结果

### wx.getBeacons(OBJECT)

> 基础库 1.2.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

获取所有已搜索到的`iBeacon`设备

**OBJECT参数说明：**

  参数名     |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  否   |  接口调用成功的回调函数     
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数说明：**

  参数名                |  类型          |  说明                 
------------------------|----------------|-----------------------
  beacons               |  ObjectArray   |  iBeacon 设备列表     
  errMsg                |  String        |  调用结果             
  beacons[].uuid        |  String        |iBeacon 设备广播的 uuid
  beacons[].major       |  String        |  iBeacon 设备的主 id  
  beacons[].minor       |  String        |  iBeacon 设备的次 id  
  beacons[].proximity   |  Number        |  表示设备距离的枚举值 
  beacons[].accuracy    |  Number        |  iBeacon 设备的距离   
  beacons[].rssi        |  Number        |  表示设备的信号强度   

### wx.onBeaconUpdate(CALLBACK)

> 基础库 1.2.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

监听 `iBeacon` 设备的更新事件

**CALLBACK返回参数说明：**

  参数名                |  类型           |  说明                    
------------------------|-----------------|--------------------------
  beacons               |  array object   |当前搜寻到的所有 iBeacon 设备列表
  beacons[].uuid        |  String         |  iBeacon 设备广播的 uuid 
  beacons[].major       |  String         |  iBeacon 设备的主 id     
  beacons[].minor       |  String         |  iBeacon 设备的次 id     
  beacons[].proximity   |  Number         |  表示设备距离的枚举值    
  beacons[].accuracy    |  Number         |  iBeacon 设备的距离      
  beacons[].rssi        |  Number         |  表示设备的信号强度      

### wx.onBeaconServiceChange(CALLBACK)

> 基础库 1.2.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

监听 `iBeacon` 服务的状态变化

**CALLBACK返回参数说明：**

  参数名        |  类型      |  说明         
----------------|------------|---------------
  available     |  Boolean   |服务目前是否可用
  discovering   |  Boolean   |目前是否处于搜索状态

### 错误码列表

  错误码  |  说明                            |  备注       
----------|----------------------------------|-------------
  0       |  ok                              |  正常       
  11000   |  unsupport                       |系统或设备不支持
  11001   |  bluetooth service unavailable   |蓝牙服务不可用
  11002   |  location service unavailable    |位置服务不可用
  11003   |  already start                   | 已经开始搜索
