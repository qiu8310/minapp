<!-- https://developers.weixin.qq.com/miniprogram/dev/component/slider.html -->

#### slider

滑动选择器。

  属性名            |  类型          |  默认值    |  说明                                         | 最低版本 
--------------------|----------------|------------|-----------------------------------------------|----------
  min               |  Number        |  0         |  最小值                                       |          
  max               |  Number        |  100       |  最大值                                       |          
  step              |  Number        |  1         | 步长，取值必须大于 0，并且可被(max - min)整除 |          
  disabled          |  Boolean       |  false     |  是否禁用                                     |          
  value             |  Number        |  0         |  当前取值                                     |          
  color             |  Color         |  #e9e9e9   |  背景条的颜色（请使用 backgroundColor）       |          
  selected-color    |  Color         |  #1aad19   |  已选择的颜色（请使用 activeColor）           |          
  activeColor       |  Color         |  #1aad19   |  已选择的颜色                                 |          
  backgroundColor   |  Color         |  #e9e9e9   |  背景条的颜色                                 |          
  block-size        |  Number        |  28        |  滑块的大小，取值范围为 12 - 28               |  1.9.0   
  block-color       |  Color         |  #ffffff   |  滑块的颜色                                   |  1.9.0   
  show-value        |  Boolean       |  false     |  是否显示当前 value                           |          
  bindchange        |  EventHandle   |            |完成一次拖动后触发的事件，event.detail = {value: value}|          
  bindchanging      |  EventHandle   |            |拖动过程中触发的事件，event.detail = {value: value}|  1.7.0   

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/3NbqVcm56OYS "在开发者工具中预览效果")

    <view class="section section_gap">
      <text class="section__title">设置step</text>
      <view class="body-view">
        <slider bindchange="slider2change" step="5"/>
      </view>
    </view>
    
    <view class="section section_gap">
      <text class="section__title">显示当前value</text>
      <view class="body-view">
        <slider bindchange="slider3change" show-value/>
      </view>
    </view>
    
    <view class="section section_gap">
      <text class="section__title">设置最小/最大值</text>
      <view class="body-view">
        <slider bindchange="slider4change" min="50" max="200" show-value/>
      </view>
    </view>
    

    var pageData = {}
    for (var i = 1; i < 5; i++) {
      (function (index) {
        pageData['slider' + index + 'change'] = function(e) {
          console.log('slider' + 'index' + '发生 change 事件，携带值为', e.detail.value)
        }
      })(i)
    }
    Page(pageData)
    

![slider](https://developers.weixin.qq.com/miniprogram/dev/image/pic/slider.png)
