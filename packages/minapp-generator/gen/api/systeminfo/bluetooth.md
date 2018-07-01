<!-- https://developers.weixin.qq.com/miniprogram/dev/api/bluetooth.html -->

蓝牙适配器接口
-------

> 基础库版本 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
> 
> iOS 微信客户端 6.5.6 版本开始支持，Android 6.5.7 版本开始支持
> 
> 目前不支持在开发者工具上进行调试，需要使用真机才能正常调用小程序蓝牙接口

### wx.openBluetoothAdapter(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

初始化小程序蓝牙模块，生效周期为调用`wx.openBluetoothAdapter`至调用`wx.closeBluetoothAdapter`或小程序被销毁为止。 在小程序蓝牙适配器模块生效期间，开发者可以正常调用下面的小程序API，并会收到蓝牙模块相关的on回调。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  是   |  成功则返回成功初始化信息   
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    wx.openBluetoothAdapter({
      success: function (res) {
        console.log(res)
      }
    })
    

#### Bug & Tip

1.  `tip`: 基础库版本 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
2.  `tip`: 在没有调用`wx.openBluetoothAdapter`的情况下调用小程序其它蓝牙模块相关API，API会返回错误，错误码为`10000`
3.  `bug`: 在用户蓝牙开关未开启或者手机不支持蓝牙功能的情况下，调用`wx.openBluetoothAdapter`会返回错误，错误码为`10001`，表示手机蓝牙功能不可用；此时小程序蓝牙模块已经初始化完成，可通过`wx.onBluetoothAdapterStateChange`监听手机蓝牙状态的改变，也可以调用蓝牙模块的所有API。

### wx.closeBluetoothAdapter(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

关闭蓝牙模块，使其进入未初始化状态。调用该方法将断开所有已建立的链接并释放系统资源。建议在使用小程序蓝牙流程后调用，与`wx.openBluetoothAdapter`成对调用。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  是   |  成功则返回成功关闭模块信息 
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    wx.closeBluetoothAdapter({
      success: function (res) {
        console.log(res)
      }
    })
    

### wx.getBluetoothAdapterState(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

获取本机蓝牙适配器状态

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  是   | 成功则返回本机蓝牙适配器状态
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数：**

  参数          |  类型      |  说明            
----------------|------------|------------------
  discovering   |  Boolean   | 是否正在搜索设备 
  available     |  Boolean   |蓝牙适配器是否可用
  errMsg        |  String    |成功：ok，错误：详细信息

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    wx.getBluetoothAdapterState({
      success: function (res) {
        console.log(res)
      }
    })
    

### wx.onBluetoothAdapterStateChange(CALLBACK)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

监听蓝牙适配器状态变化事件

**CALLBACK参数说明：**

  参数          |  类型      |  说明            
----------------|------------|------------------
  available     |  Boolean   |蓝牙适配器是否可用
  discovering   |  Boolean   |蓝牙适配器是否处于搜索状态

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    wx.onBluetoothAdapterStateChange(function(res) {
      console.log(`adapterState changed, now is`, res)
    })
    

### wx.startBluetoothDevicesDiscovery(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

开始搜寻附近的蓝牙外围设备。注意，该操作比较耗费系统资源，请在搜索并连接到设备后调用 stop 方法停止搜索。

**OBJECT参数说明：**

  参数                 |  类型       |  必填 |  说明                                                              
-----------------------|-------------|-------|--------------------------------------------------------------------
  services             |  Array      |  否   |  蓝牙设备主 service 的 uuid 列表                                   
  allowDuplicatesKey   |  Boolean    |  否   |是否允许重复上报同一设备， 如果允许重复上报，则onDeviceFound 方法会多次上报同一设备，但是 RSSI 值会有不同
  interval             |  Number     |  否   |上报设备的间隔，默认为0，意思是找到新设备立即上报，否则根据传入的间隔上报
  success              |  Function   |  是   |  成功则返回本机蓝牙适配器状态                                      
  fail                 |  Function   |  否   |  接口调用失败的回调函数                                            
  complete             |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）                  

**services**参数说明：某些蓝牙设备会广播自己的主 service 的 uuid。如果这里传入该数组，那么根据该 uuid 列表，只搜索发出广播包有这个主服务的蓝牙设备，建议主要通过该参数过滤掉周边不需要处理的其他蓝牙设备。

**success返回参数：**

  参数     |  类型     |  说明            
-----------|-----------|------------------
  errMsg   |  String   |成功：ok，错误：详细信息

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    // 以微信硬件平台的蓝牙智能灯为例，主服务的 UUID 是 FEE7。传入这个参数，只搜索主服务 UUID 为 FEE7 的设备
    wx.startBluetoothDevicesDiscovery({
      services: ['FEE7'],
      success: function (res) {
        console.log(res)
      }
    })
    

### wx.stopBluetoothDevicesDiscovery(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  是   | 成功则返回本机蓝牙适配器状态
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数：**

  参数     |  类型     |  说明            
-----------|-----------|------------------
  errMsg   |  String   |成功：ok，错误：详细信息

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    wx.stopBluetoothDevicesDiscovery({
      success: function (res) {
        console.log(res)
      }
    })
    

### wx.getBluetoothDevices(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

获取在小程序蓝牙模块生效期间所有已发现的蓝牙设备，包括已经和本机处于连接状态的设备。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  success    |  Function   |  是   | 成功则返回本机蓝牙适配器状态
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数：**

  参数                             |  类型          |  说明                                                                         
-----------------------------------|----------------|-------------------------------------------------------------------------------
  devices                          |  Array         |  uuid 对应的的已连接设备列表                                                  
  errMsg                           |  String        |  成功：ok，错误：详细信息                                                     
  devices[].name                   |  String        |  蓝牙设备名称，某些设备可能没有                                               
  devices[].deviceId               |  String        |  用于区分设备的 id                                                            
  devices[].RSSI                   |  Number        |  当前蓝牙设备的信号强度                                                       
  devices[].advertisData           |  ArrayBuffer   |当前蓝牙设备的广播数据段中的ManufacturerData数据段 **（注意：vConsole 无法打印出 ArrayBuffer 类型数据）**
  devices[].advertisServiceUUIDs   |  Array         |  当前蓝牙设备的广播数据段中的ServiceUUIDs数据段                               
  devices[].localName              |  String        |  当前蓝牙设备的广播数据段中的LocalName数据段                                  
  devices[].serviceData            |  ArrayBuffer   |  当前蓝牙设备的广播数据段中的ServiceData数据段                                

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    // ArrayBuffer转16进度字符串示例
    function ab2hex(buffer) {
      var hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function(bit) {
          return ('00' + bit.toString(16)).slice(-2)
        }
      )
      return hexArr.join('');
    }
    wx.getBluetoothDevices({
      success: function (res) {
        console.log(res)
        if (res.devices[0]) {
          console.log(ab2hex(res.devices[0].advertisData))
        }
      }
    })
    

#### Bug & Tip

1.  `tip`: Mac系统可能无法获取`advertisData`及`RSSI`，请使用真机调试
2.  `tip`: 开发者工具和 Android 上获取到的`deviceId`为设备 MAC 地址，iOS 上则为设备 uuid。因此`deviceId`不能硬编码到代码中
3.  `tip`: 注意该接口获取到的设备列表为**小程序蓝牙模块生效期间所有搜索到的蓝牙设备**，若在蓝牙模块使用流程结束后未及时调用 wx.closeBluetoothAdapter 释放资源，会存在调用该接口会返回之前的蓝牙使用流程中搜索到的蓝牙设备，可能设备已经不在用户身边，无法连接。
4.  `tips`: 蓝牙设备在被搜索到时，系统返回的 name 字段一般为广播包中的LocalName字段中的设备名称，而如果与蓝牙设备建立连接，系统返回的 name 字段会改为从蓝牙设备上获取到的GattName。若需要动态改变设备名称并展示，建议使用localName字段。

### wx.onBluetoothDeviceFound(CALLBACK)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

监听寻找到新设备的事件

**CALLBACK参数说明：**

  参数                             |  类型          |  说明                                                                         
-----------------------------------|----------------|-------------------------------------------------------------------------------
  devices                          |  Array         |  新搜索到的设备列表                                                           
  devices[].name                   |  String        |  蓝牙设备名称，某些设备可能没有                                               
  devices[].deviceId               |  String        |  用于区分设备的 id                                                            
  devices[].RSSI                   |  Number        |  当前蓝牙设备的信号强度                                                       
  devices[].advertisData           |  ArrayBuffer   |当前蓝牙设备的广播数据段中的ManufacturerData数据段 **（注意：vConsole 无法打印出 ArrayBuffer 类型数据）**
  devices[].advertisServiceUUIDs   |  Array         |  当前蓝牙设备的广播数据段中的ServiceUUIDs数据段                               
  devices[].localName              |  String        |  当前蓝牙设备的广播数据段中的LocalName数据段                                  
  devices[].serviceData            |  ArrayBuffer   |  当前蓝牙设备的广播数据段中的ServiceData数据段                                

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    // ArrayBuffer转16进度字符串示例
    function ab2hex(buffer) {
      var hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function(bit) {
          return ('00' + bit.toString(16)).slice(-2)
        }
      )
      return hexArr.join('');
    }
    wx.onBluetoothDeviceFound(function(devices) {
      console.log('new device list has founded')
      console.dir(devices)
      console.log(ab2hex(devices[0].advertisData))
    })
    

#### Bug & Tip

1.  `tip`: Mac系统可能无法获取`advertisData`及`RSSI`，请使用真机调试
2.  `tip`: 开发者工具和 Android 上获取到的`deviceId`为设备 MAC 地址，iOS 上则为设备 uuid。因此`deviceId`不能硬编码到代码中
3.  `tip`: 若在onBluetoothDeviceFound回调了某个设备，则此设备会添加到 wx.getBluetoothDevices 接口获取到的数组中

### wx.getConnectedBluetoothDevices(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

根据 uuid 获取处于已连接状态的设备

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  services   |  Array      |  是   |蓝牙设备主 service 的 uuid 列表
  success    |  Function   |  是   | 成功则返回本机蓝牙适配器状态
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数：**

  参数                 |  类型     |  说明              
-----------------------|-----------|--------------------
  devices              |  Array    |  搜索到的设备列表  
  errMsg               |  String   |成功：ok，错误：详细信息
  devices[].name       |  String   |蓝牙设备名称，某些设备可能没有
  devices[].deviceId   |  String   |  用于区分设备的 id 

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    wx.getConnectedBluetoothDevices({
      success: function (res) {
        console.log(res)
      }
    })
    

#### Bug & Tip

1.  `tip`: 开发者工具和 Android 上获取到的`deviceId`为设备 MAC 地址，iOS 上则为设备 uuid。因此`deviceId`不能硬编码到代码中

低功耗蓝牙接口
-------

### wx.createBLEConnection(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

连接低功耗蓝牙设备。

> 若小程序在之前已有搜索过某个蓝牙设备，并成功建立链接，可直接传入之前搜索获取的deviceId直接尝试连接该设备，无需进行搜索操作。

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  deviceId   |  String     |  是   |蓝牙设备 id，参考 getDevices 接口
  timeout    |  Number     |  否   |超时时间，单位ms，不填表示不会超时
  success    |  Function   |  是   | 成功则返回本机蓝牙适配器状态
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数：**

  参数     |  类型     |  说明            
-----------|-----------|------------------
  errMsg   |  String   |成功：ok，错误：详细信息

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    wx.createBLEConnection({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接 
      deviceId: deviceId,
      success: function (res) {
        console.log(res)
      }
    })
    

#### Bug & Tip

1.  `tip`: 安卓手机上如果多次调用create创建连接，有可能导致系统持有同一设备多个连接的实例，导致调用close的时候并不能真正的断开与设备的连接。因此请保证尽量成对的调用create和close接口
2.  `tip`: 蓝牙链接随时可能断开，建议监听 wx.onBLEConnectionStateChange 回调事件，当蓝牙设备断开时按需执行重连操作
3.  `tip`: 若对未连接的设备或已断开连接的设备调用数据读写操作的接口，会返回10006错误，详见错误码，建议进行重连操作

### wx.closeBLEConnection(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

断开与低功耗蓝牙设备的连接

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  deviceId   |  String     |  是   |蓝牙设备 id，参考 getDevices 接口
  success    |  Function   |  是   | 成功则返回本机蓝牙适配器状态
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数：**

  参数     |  类型     |  说明            
-----------|-----------|------------------
  errMsg   |  String   |成功：ok，错误：详细信息

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    wx.closeBLEConnection({
      deviceId:deviceId
      success: function (res) {
        console.log(res)
      }
    })
    

### wx.onBLEConnectionStateChange(CALLBACK)

> 基础库 1.1.1 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

监听低功耗蓝牙连接状态的改变事件，包括开发者主动连接或断开连接，设备丢失，连接异常断开等等

**CALLBACK参数说明：**

  参数        |  类型      |  说明                   
--------------|------------|-------------------------
  deviceId    |  String    |蓝牙设备 id，参考 device 对象
  connected   |  Boolean   |  连接目前的状态         

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    wx.onBLEConnectionStateChange(function(res) {
      // 该方法回调中可以用于处理连接意外断开等异常情况
      console.log(`device ${res.deviceId} state has changed, connected: ${res.connected}`)
    })
    

### wx.getBLEDeviceServices(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

获取蓝牙设备所有 service（服务）

**OBJECT参数说明：**

  参数       |  类型       |  必填 |  说明                       
-------------|-------------|-------|-----------------------------
  deviceId   |  String     |  是   |蓝牙设备 id，参考 getDevices 接口
  success    |  Function   |  是   | 成功则返回本机蓝牙适配器状态
  fail       |  Function   |  否   |  接口调用失败的回调函数     
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数：**

  参数                   |  类型      |  说明            
-------------------------|------------|------------------
  services               |  Array     |  设备服务列表    
  errMsg                 |  String    |成功：ok，错误：详细信息
  services[].uuid        |  String    |蓝牙设备服务的 uuid
  services[].isPrimary   |  Boolean   |该服务是否为主服务

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    wx.getBLEDeviceServices({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接 
      deviceId: deviceId,
      success: function (res) {
        console.log('device services:', res.services)
      }
    })
    

#### Bug & Tip

1.  `tip`:iOS平台上后续对特征值的read、write、notify，由于系统需要获取特征值实例，传入的 serviceId 与 characteristicId 必须由 getBLEDeviceServices 与 getBLEDeviceCharacteristics 中获取到后才能使用。建议双平台统一在建立链接后先执行 getBLEDeviceServices 与 getBLEDeviceCharacteristics 后再进行与蓝牙设备的数据交互

### wx.getBLEDeviceCharacteristics(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

获取蓝牙设备某个服务中的所有 characteristic（特征值）

**OBJECT参数说明：**

  参数        |  类型       |  必填 |  说明                       
--------------|-------------|-------|-----------------------------
  deviceId    |  String     |  是   |蓝牙设备 id，参考 device 对象
  serviceId   |  String     |  是   |  蓝牙服务 uuid              
  success     |  Function   |  是   | 成功则返回本机蓝牙适配器状态
  fail        |  Function   |  否   |  接口调用失败的回调函数     
  complete    |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数：**

  参数                                    |  类型      |  说明                   
------------------------------------------|------------|-------------------------
  characteristics                         |  Array     |  设备特征值列表         
  errMsg                                  |  String    | 成功：ok，错误：详细信息
  characteristics[].uuid                  |  String    |  蓝牙设备特征值的 uuid  
  characteristics[].properties            |  Object    |  该特征值支持的操作类型 
  characteristics[].properties.read       |  Boolean   |该特征值是否支持 read 操作
  characteristics[].properties.write      |  Boolean   |该特征值是否支持 write 操作
  characteristics[].properties.notify     |  Boolean   |该特征值是否支持 notify 操作
  characteristics[].properties.indicate   |  Boolean   |该特征值是否支持 indicate 操作

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    wx.getBLEDeviceCharacteristics({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
      deviceId: deviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
      serviceId: serviceId,
      success: function (res) {
        console.log('device getBLEDeviceCharacteristics:', res.characteristics)
      }
    })
    

#### Bug & Tip

1.  `tip`:传入的serviceId需要在getBLEDeviceServices获取到
2.  `tip`:iOS平台上后续对特征值的read、write、notify，由于系统需要获取特征值实例，传入的 serviceId 与 characteristicId 必须由 getBLEDeviceServices 与 getBLEDeviceCharacteristics 中获取到后才能使用。建议双平台统一在建立链接后先执行 getBLEDeviceServices 与 getBLEDeviceCharacteristics 后再进行与蓝牙设备的数据交互

### wx.readBLECharacteristicValue(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持`read`才可以成功调用，具体参照 characteristic 的 properties 属性

**OBJECT参数说明：**

  参数               |  类型       |  必填 |  说明                       
---------------------|-------------|-------|-----------------------------
  deviceId           |  String     |  是   |蓝牙设备 id，参考 device 对象
  serviceId          |  String     |  是   |  蓝牙特征值对应服务的 uuid  
  characteristicId   |  String     |  是   |  蓝牙特征值的 uuid          
  success            |  Function   |  是   | 成功则返回本机蓝牙适配器状态
  fail               |  Function   |  否   |  接口调用失败的回调函数     
  complete           |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数：**

  参数      |  类型     |  说明            
------------|-----------|------------------
  errCode   |  Number   |  错误码          
  errMsg    |  String   |成功：ok，错误：详细信息

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    // 必须在这里的回调才能获取
    wx.onBLECharacteristicValueChange(function(characteristic) {
      console.log('characteristic value comed:', characteristic)
    })
    
    wx.readBLECharacteristicValue({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接  [**new**]
      deviceId: deviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
      serviceId: serviceId,
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
      characteristicId: characteristicId,
      success: function (res) {
        console.log('readBLECharacteristicValue:', res.errCode)
      }
    })
    

#### Bug & Tip

1.  `tip`: 并行调用多次读写接口存在读写失败的可能性。
2.  `tip`: `read`接口读取到的信息需要在`onBLECharacteristicValueChange`方法注册的回调中获取。

### wx.writeBLECharacteristicValue(OBJECT)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

向低功耗蓝牙设备特征值中写入二进制数据。注意：必须设备的特征值支持`write`才可以成功调用，具体参照 characteristic 的 properties 属性

_tips: 并行调用多次读写接口存在读写失败的可能性_

**OBJECT参数说明：**

  参数               |  类型          |  必填 |  说明                       
---------------------|----------------|-------|-----------------------------
  deviceId           |  String        |  是   |蓝牙设备 id，参考 device 对象
  serviceId          |  String        |  是   |  蓝牙特征值对应服务的 uuid  
  characteristicId   |  String        |  是   |  蓝牙特征值的 uuid          
  value              |  ArrayBuffer   |  是   | 蓝牙设备特征值对应的二进制值
  success            |  Function      |  是   | 成功则返回本机蓝牙适配器状态
  fail               |  Function      |  否   |  接口调用失败的回调函数     
  complete           |  Function      |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数：**

  参数     |  类型     |  说明            
-----------|-----------|------------------
  errMsg   |  String   |成功：ok，错误：详细信息

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    // 向蓝牙设备发送一个0x00的16进制数据
    let buffer = new ArrayBuffer(1)
    let dataView = new DataView(buffer)
    dataView.setUint8(0, 0)
    
    wx.writeBLECharacteristicValue({
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      deviceId: deviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
      serviceId: serviceId,
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
      characteristicId: characteristicId,
      // 这里的value是ArrayBuffer类型
      value: buffer,
      success: function (res) {
        console.log('writeBLECharacteristicValue success', res.errMsg)
      }
    })
    

#### Bug & Tip

1.  `tip`: 并行调用多次读写接口存在读写失败的可能性。
2.  `tip`: 小程序不会对写入数据包大小做限制，但系统与蓝牙设备会确定蓝牙4.0单次传输的数据大小，超过最大字节数后会发生写入错误，建议每次写入不超过20字节。
3.  `tip`: 安卓平台上，在调用notify成功后立即调用write接口，在部分机型上会发生 10008 系统错误
4.  `bug`: 若单次写入数据过长，iOS平台上存在系统不会有任何回调的情况(包括错误回调)。

### wx.notifyBLECharacteristicValueChange(OBJECT)

> 基础库 1.1.1 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。注意：必须设备的特征值支持`notify`或者`indicate`才可以成功调用，具体参照 characteristic 的 properties 属性

另外，必须先启用`notify`才能监听到设备 characteristicValueChange 事件

**OBJECT参数说明：**

  参数               |  类型       |  必填 |  说明                                
---------------------|-------------|-------|--------------------------------------
  deviceId           |  String     |  是   |  蓝牙设备 id，参考 device 对象       
  serviceId          |  String     |  是   |  蓝牙特征值对应服务的 uuid           
  characteristicId   |  String     |  是   |  蓝牙特征值的 uuid                   
  state              |  Boolean    |  是   | true: 启用 notify; false: 停用 notify
  success            |  Function   |  是   |  成功则返回本机蓝牙适配器状态        
  fail               |  Function   |  否   |  接口调用失败的回调函数              
  complete           |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**success返回参数：**

  参数     |  类型     |  说明            
-----------|-----------|------------------
  errMsg   |  String   |成功：ok，错误：详细信息

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    wx.notifyBLECharacteristicValueChange({
      state: true, // 启用 notify 功能
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接  
      deviceId: deviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
      serviceId: serviceId,
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
      characteristicId: characteristicId,
      success: function (res) {
        console.log('notifyBLECharacteristicValueChange success', res.errMsg)
      }
    })
    

#### Bug & Tip

1.  `tip`: 订阅操作成功后需要设备主动更新特征值的value，才会触发 wx.onBLECharacteristicValueChange 回调。
2.  `tip`: 安卓平台上，在调用notify成功后立即调用write接口，在部分机型上会发生 10008 系统错误

### wx.onBLECharacteristicValueChange(CALLBACK)

> 基础库 1.1.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

监听低功耗蓝牙设备的特征值变化。必须先启用`notify`接口才能接收到设备推送的notification。

**CALLBACK参数说明：**

  参数               |  类型          |  说明                                               
---------------------|----------------|-----------------------------------------------------
  deviceId           |  String        |  蓝牙设备 id，参考 device 对象                      
  serviceId          |  String        |  特征值所属服务 uuid                                
  characteristicId   |  String        |  特征值 uuid                                        
  value              |  ArrayBuffer   |特征值最新的值 **（注意：vConsole 无法打印出 ArrayBuffer 类型数据）**

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/OF4Y9Gme6rZ4)

    // ArrayBuffer转16进度字符串示例
    function ab2hex(buffer) {
      var hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function(bit) {
          return ('00' + bit.toString(16)).slice(-2)
        }
      )
      return hexArr.join('');
    }
    wx.onBLECharacteristicValueChange(function(res) {
      console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`)
      console.log(ab2hext(res.value))
    })
    

### 蓝牙错误码(errCode)列表

  错误码  |  说明                   |  备注                             
----------|-------------------------|-----------------------------------
  0       |  ok                     |  正常                             
  10000   |  not init               |  未初始化蓝牙适配器               
  10001   |  not available          |  当前蓝牙适配器不可用             
  10002   |  no device              |  没有找到指定设备                 
  10003   |  connection fail        |  连接失败                         
  10004   |  no service             |  没有找到指定服务                 
  10005   |  no characteristic      |  没有找到指定特征值               
  10006   |  no connection          |  当前连接已断开                   
  10007   |  property not support   |  当前特征值不支持此操作           
  10008   |  system error           |  其余所有系统上报的异常           
  10009   |  system not support     |Android 系统特有，系统版本低于 4.3 不支持BLE
