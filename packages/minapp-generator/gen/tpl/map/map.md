<!-- https://developers.weixin.qq.com/miniprogram/dev/component/map.html -->

#### map

地图。该组件是[原生组件](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)，使用时请注意相关限制。

  属性名             |  类型          | 默认值 |  说明                                                                                                        | 最低版本 
---------------------|----------------|--------|--------------------------------------------------------------------------------------------------------------|----------
  longitude          |  Number        |        |  中心经度                                                                                                    |          
  latitude           |  Number        |        |  中心纬度                                                                                                    |          
  scale              |  Number        |  16    |  缩放级别，取值范围为5-18                                                                                    |          
  markers            |  Array         |        |  标记点                                                                                                      |          
  covers             |  Array         |        |  **即将移除，请使用 markers**                                                                                |          
  polyline           |  Array         |        |  路线                                                                                                        |          
  circles            |  Array         |        |  圆                                                                                                          |          
  controls           |  Array         |        |控件（即将废弃，建议使用 [cover-view](https://developers.weixin.qq.com/miniprogram/dev/component/cover-view.html) 代替）|          
  include-points     |  Array         |        |  缩放视野以包含所有给定的坐标点                                                                              |          
  show-location      |  Boolean       |        |  显示带有方向的当前定位点                                                                                    |          
  bindmarkertap      |  EventHandle   |        |  点击标记点时触发，会返回marker的id                                                                          |          
  bindcallouttap     |  EventHandle   |        |  点击标记点对应的气泡时触发，会返回marker的id                                                                |  1.2.0   
  bindcontroltap     |  EventHandle   |        |  点击控件时触发，会返回control的id                                                                           |          
  bindregionchange   |  EventHandle   |        |  视野发生变化时触发                                                                                          |          
  bindtap            |  EventHandle   |        |  点击地图时触发                                                                                              |          
  bindupdated        |  EventHandle   |        |  在地图渲染更新完成时触发                                                                                    |  1.6.0   

**注意: covers 属性即将移除，请使用 markers 替代**

##### markers

标记点用于在地图上显示标记的位置

  属性        |  说明                 |  类型     |  必填 |  备注                                                                 | 最低版本 
--------------|-----------------------|-----------|-------|-----------------------------------------------------------------------|----------
  id          |  标记点id             |  Number   |  否   |marker点击事件回调会返回此id。**建议为每个marker设置上Number类型id，保证更新marker时有更好的性能。**|          
  latitude    |  纬度                 |  Number   |  是   |  浮点数，范围 -90 ~ 90                                                |          
  longitude   |  经度                 |  Number   |  是   |  浮点数，范围 -180 ~ 180                                              |          
  title       |  标注点名             |  String   |  否   |                                                                       |          
  iconPath    |  显示的图标           |  String   |  是   |项目目录下的图片路径，支持相对路径写法，以'/'开头则表示相对小程序根目录；也支持临时路径|          
  rotate      |  旋转角度             |  Number   |  否   |  顺时针旋转的角度，范围 0 ~ 360，默认为 0                             |          
  alpha       |  标注的透明度         |  Number   |  否   |  默认1，无透明，范围 0 ~ 1                                            |          
  width       |  标注图标宽度         |  Number   |  否   |  默认为图片实际宽度                                                   |          
  height      |  标注图标高度         |  Number   |  否   |  默认为图片实际高度                                                   |          
  callout     |自定义标记点上方的气泡窗口|  Object   |  否   |  支持的属性见下表，可识别换行符。                                     |  1.2.0   
  label       |  为标记点旁边增加标签 |  Object   |  否   |  支持的属性见下表，可识别换行符。                                     |  1.2.0   
  anchor      |经纬度在标注图标的锚点，默认底边中点|  Object   |  否   |  {x, y}，x表示横向(0-1)，y表示竖向(0-1)。{x: .5, y: 1} 表示底边中点   |  1.2.0   

##### marker 上的气泡 callout

  属性           |  说明                              |  类型     | 最低版本 
-----------------|------------------------------------|-----------|----------
  content        |  文本                              |  String   |  1.2.0   
  color          |  文本颜色                          |  String   |  1.2.0   
  fontSize       |  文字大小                          |  Number   |  1.2.0   
  borderRadius   |  callout边框圆角                   |  Number   |  1.2.0   
  bgColor        |  背景色                            |  String   |  1.2.0   
  padding        |  文本边缘留白                      |  Number   |  1.2.0   
  display        |  'BYCLICK':点击显示; 'ALWAYS':常显 |  String   |  1.2.0   
  textAlign      |文本对齐方式。有效值: left, right, center|  String   |  1.6.0   

##### marker 上的气泡 label

  属性           |  说明                              |  类型     | 最低版本 
-----------------|------------------------------------|-----------|----------
  content        |  文本                              |  String   |  1.2.0   
  color          |  文本颜色                          |  String   |  1.2.0   
  fontSize       |  文字大小                          |  Number   |  1.2.0   
  x              |  label的坐标（废弃）               |  Number   |  1.2.0   
  y              |  label的坐标（废弃）               |  Number   |  1.2.0   
  anchorX        |label的坐标，原点是 marker 对应的经纬度|  Number   |  2.1.0   
  anchorY        |label的坐标，原点是 marker 对应的经纬度|  Number   |  2.1.0   
  borderWidth    |  边框宽度                          |  Number   |  1.6.0   
  borderColor    |  边框颜色                          |  String   |  1.6.0   
  borderRadius   |  边框圆角                          |  Number   |  1.6.0   
  bgColor        |  背景色                            |  String   |  1.6.0   
  padding        |  文本边缘留白                      |  Number   |  1.6.0   
  textAlign      |文本对齐方式。有效值: left, right, center|  String   |  1.6.0   

##### polyline

指定一系列坐标点，从数组第一项连线至最后一项

  属性            |  说明     |  类型      |  必填 |  备注                               | 最低版本 
------------------|-----------|------------|-------|-------------------------------------|----------
  points          | 经纬度数组|  Array     |  是   |  [{latitude: 0, longitude: 0}]      |          
  color           |  线的颜色 |  String    |  否   |8位十六进制表示，后两位表示alpha值，如：#000000AA|          
  width           |  线的宽度 |  Number    |  否   |                                     |          
  dottedLine      |  是否虚线 |  Boolean   |  否   |  默认false                          |          
  arrowLine       | 带箭头的线|  Boolean   |  否   | 默认false，开发者工具暂不支持该属性 |  1.2.0   
  arrowIconPath   |更换箭头图标|  String    |  否   |  在arrowLine为true时生效            |  1.6.0   
  borderColor     |线的边框颜色|  String    |  否   |                                     |  1.2.0   
  borderWidth     |  线的厚度 |  Number    |  否   |                                     |  1.2.0   

##### circles

在地图上显示圆

  属性          |  说明    |  类型     |  必填 |  备注                               
----------------|----------|-----------|-------|-------------------------------------
  latitude      |  纬度    |  Number   |  是   |  浮点数，范围 -90 ~ 90              
  longitude     |  经度    |  Number   |  是   |  浮点数，范围 -180 ~ 180            
  color         |描边的颜色|  String   |  否   |8位十六进制表示，后两位表示alpha值，如：#000000AA
  fillColor     | 填充颜色 |  String   |  否   |8位十六进制表示，后两位表示alpha值，如：#000000AA
  radius        |  半径    |  Number   |  是   |                                     
  strokeWidth   |描边的宽度|  Number   |  否   |                                     

##### controls

在地图上显示控件，控件不随着地图移动。**即将废弃，请使用 [cover-view](https://developers.weixin.qq.com/miniprogram/dev/component/cover-view.html)**

  属性        |  说明       |  类型      |  必填 |  备注                                            
--------------|-------------|------------|-------|--------------------------------------------------
  id          |  控件id     |  Number    |  否   |  在控件点击事件回调会返回此id                    
  position    |控件在地图的位置|  Object    |  是   |  控件相对地图位置                                
  iconPath    |  显示的图标 |  String    |  是   |项目目录下的图片路径，支持相对路径写法，以'/'开头则表示相对小程序根目录；也支持临时路径
  clickable   |  是否可点击 |  Boolean   |  否   |  默认不可点击                                    

###### position

  属性     |  说明         |  类型     |  必填 |  备注      
-----------|---------------|-----------|-------|------------
  left     |距离地图的左边界多远|  Number   |  否   |  默认为0   
  top      |距离地图的上边界多远|  Number   |  否   |  默认为0   
  width    |  控件宽度     |  Number   |  否   |默认为图片宽度
  height   |  控件高度     |  Number   |  否   |默认为图片高度

地图组件的经纬度必填, 如果不填经纬度则默认值是北京的经纬度。

**示例：**

[在开发者工具中预览效果](wechatide://minicode/3uVxpmmT6wY9 "在开发者工具中预览效果")

    <!-- map.wxml -->
    <map id="map" longitude="113.324520" latitude="23.099994" scale="14" controls="{{controls}}" bindcontroltap="controltap" markers="{{markers}}" bindmarkertap="markertap" polyline="{{polyline}}" bindregionchange="regionchange" show-location style="width: 100%; height: 300px;"></map>
    

    // map.js
    Page({
      data: {
        markers: [{
          iconPath: "/resources/others.png",
          id: 0,
          latitude: 23.099994,
          longitude: 113.324520,
          width: 50,
          height: 50
        }],
        polyline: [{
          points: [{
            longitude: 113.3245211,
            latitude: 23.10229
          }, {
            longitude: 113.324520,
            latitude: 23.21229
          }],
          color:"#FF0000DD",
          width: 2,
          dottedLine: true
        }],
        controls: [{
          id: 1,
          iconPath: '/resources/location.png',
          position: {
            left: 0,
            top: 300 - 50,
            width: 50,
            height: 50
          },
          clickable: true
        }]
      },
      regionchange(e) {
        console.log(e.type)
      },
      markertap(e) {
        console.log(e.markerId)
      },
      controltap(e) {
        console.log(e.controlId)
      }
    })
    

相关api：[wx.createMapContext](https://developers.weixin.qq.com/miniprogram/dev/api/api-map.html)

##### Bug & Tip

1.  请注意[原生组件使用限制](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html#原生组件的使用限制)。
2.  `tip`: `map` 组件使用的经纬度是火星坐标系，调用 `wx.getLocation` 接口需要指定 `type` 为 `gcj02`
