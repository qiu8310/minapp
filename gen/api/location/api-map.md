<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-map.html -->

### wx.createMapContext(mapId, this)

创建并返回 map 上下文 `mapContext` 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<map/>` 组件

#### mapContext

`mapContext` 通过 mapId 跟一个 `<map/>` 组件绑定，通过它可以操作对应的 `<map/>` 组件。

**mapContext 对象的方法列表**

  方法                |  参数     |  说明                                                                                                                                     | 最低版本 
----------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------|----------
  getCenterLocation   |  OBJECT   |获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 [`wx.openLocation`](https://mp.weixin.qq.com/debug/wxadoc/dev/api/location.html#wxopenlocationobject)|          
  moveToLocation      |  无       |  将地图中心移动到当前定位点，需要配合map组件的show-location使用                                                                           |          
  translateMarker     |  OBJECT   |  平移marker，带动画                                                                                                                       |  1.2.0   
  includePoints       |  OBJECT   |  缩放视野展示所有经纬度                                                                                                                   |  1.2.0   
  getRegion           |  OBJECT   |  获取当前地图的视野范围                                                                                                                   |  1.4.0   
  getScale            |  OBJECT   |  获取当前地图的缩放级别                                                                                                                   |  1.4.0   

**getCenterLocation 的 OBJECT 参数列表**

  参数       |  类型       |  必填 |  说明                                                    
-------------|-------------|-------|----------------------------------------------------------
  success    |  Function   |  否   |接口调用成功的回调函数 ，res = { longitude: "经度", latitude: "纬度"}
  fail       |  Function   |  否   |  接口调用失败的回调函数                                  
  complete   |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）        

**translateMarker 的 OBJECT 参数列表**

  参数           |  类型       |  必填 |  说明                         
-----------------|-------------|-------|-------------------------------
  markerId       |  Number     |  是   |  指定marker                   
  destination    |  Object     |  是   |  指定marker移动到的目标点     
  autoRotate     |  Boolean    |  是   |  移动过程中是否自动旋转marker 
  rotate         |  Number     |  是   |  marker的旋转角度             
  duration       |  Number     |  否   |动画持续时长，默认值1000ms，平移与旋转分别计算
  animationEnd   |  Function   |  否   |  动画结束回调函数             
  fail           |  Function   |  否   |  接口调用失败的回调函数       

**includePoints 的 OBJECT 参数列表**

  参数      |  类型    |  必填 |  说明                                                                                   
------------|----------|-------|-----------------------------------------------------------------------------------------
  points    |  Array   |  是   |  要显示在可视区域内的坐标点列表，[{latitude, longitude}]                                
  padding   |  Array   |  否   |坐标点形成的矩形边缘到地图边缘的距离，单位像素。格式为[上,右,下,左]，安卓上只能识别数组第一项，上下左右的padding一致。开发者工具暂不支持padding参数。

**getRegion 的 OBJECT 参数列表**

  参数       |  类型       |  必填 |  说明                                                   
-------------|-------------|-------|---------------------------------------------------------
  success    |  Function   |  否   |接口调用成功的回调函数，res = {southwest, northeast}，西南角与东北角的经纬度
  fail       |  Function   |  否   |  接口调用失败的回调函数                                 
  complete   |  Function   |  否   |  接口调用结束的回调函数（调用成功、失败都会执行）       

**getScale 的 OBJECT 参数列表**

  参数       |  类型       |  必填 |  说明                        
-------------|-------------|-------|------------------------------
  success    |  Function   |  否   |接口调用成功的回调函数，res = {scale}
  fail       |  Function   |  否   |  接口调用失败的回调函数      
  complete   |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**示例代码：**

    <!-- map.wxml -->
    <map id="myMap" show-location />
    
    <button type="primary" bindtap="getCenterLocation">获取位置</button>
    <button type="primary" bindtap="moveToLocation">移动位置</button>
    <button type="primary" bindtap="translateMarker">移动标注</button>
    <button type="primary" bindtap="includePoints">缩放视野展示所有经纬度</button>
    

    // map.js
    Page({
      onReady: function (e) {
        // 使用 wx.createMapContext 获取 map 上下文
        this.mapCtx = wx.createMapContext('myMap')
      },
      getCenterLocation: function () {
        this.mapCtx.getCenterLocation({
          success: function(res){
            console.log(res.longitude)
            console.log(res.latitude)
          }
        })
      },
      moveToLocation: function () {
        this.mapCtx.moveToLocation()
      },
      translateMarker: function() {
        this.mapCtx.translateMarker({
          markerId: 0,
          autoRotate: true,
          duration: 1000,
          destination: {
            latitude:23.10229,
            longitude:113.3345211,
          },
          animationEnd() {
            console.log('animation end')
          }
        })
      },
      includePoints: function() {
        this.mapCtx.includePoints({
          padding: [10],
          points: [{
            latitude:23.10229,
            longitude:113.3345211,
          }, {
            latitude:23.00229,
            longitude:113.3345211,
          }]
        })
      }
    })
