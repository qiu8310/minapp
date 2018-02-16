<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/component/switch.html -->

#### switch

开关选择器。

  属性名       |  类型          |  默认值   |  说明                                                    
---------------|----------------|-----------|----------------------------------------------------------
  checked      |  Boolean       |  false    |  是否选中                                                
  type         |  String        |  switch   |  样式，有效值：switch, checkbox                          
  bindchange   |  EventHandle   |           |checked 改变时触发 change 事件，event.detail={ value:checked}
  color        |  Color         |           |  switch 的颜色，同 css 的 color                          

    <view class="body-view">
        <switch checked bindchange="switch1Change"/>
        <switch bindchange="switch2Change"/>
    </view>
    

    Page({
      switch1Change: function (e){
        console.log('switch1 发生 change 事件，携带值为', e.detail.value)
      },
      switch2Change: function (e){
        console.log('switch2 发生 change 事件，携带值为', e.detail.value)
      }
    })
    

![switch](https://mp.weixin.qq.com/debug/wxadoc/dev/image/pic/switch.png?t=201828)

##### Tips

1.  `tip`: switch类型切换时在iOS自带振动反馈，可在系统设置 -> 声音与触感 -> 系统触感反馈中关闭
