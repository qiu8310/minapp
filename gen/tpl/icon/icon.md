<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/component/icon.html -->

#### icon

图标。

  属性名  |  类型     | 默认值 |  说明                                                                                           
----------|-----------|--------|-------------------------------------------------------------------------------------------------
  type    |  String   |        |icon的类型，有效值：success, success_no_circle, info, warn, waiting, cancel, download, search, clear
  size    |  Number   |  23    |  icon的大小，单位px                                                                             
  color   |  Color    |        |  icon的颜色，同css的color                                                                       

**示例：**

    <view class="group">
      <block wx:for="{{iconSize}}">
        <icon type="success" size="{{item}}"/>
      </block>
    </view>
    
    <view class="group">
      <block wx:for="{{iconType}}">
        <icon type="{{item}}" size="40"/>
      </block>
    </view>
    
    
    <view class="group">
      <block wx:for="{{iconColor}}">
        <icon type="success" size="40" color="{{item}}"/>
      </block>
    </view>
    

    Page({
      data: {
        iconSize: [20, 30, 40, 50, 60, 70],
        iconColor: [
          'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
        ],
        iconType: [
          'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
        ]
      }
    })
    

![icon](https://mp.weixin.qq.com/debug/wxadoc/dev/image/pic/icon.png?t=201828)
