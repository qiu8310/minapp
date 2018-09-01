<!-- https://developers.weixin.qq.com/miniprogram/dev/component/radio.html -->

#### radio-group

单项选择器，内部由多个`<radio/>`组成。

  属性名       |  类型          | 默认值 |  说明                                                                             
---------------|----------------|--------|-----------------------------------------------------------------------------------
  bindchange   |  EventHandle   |        |`<radio-group/>` 中的选中项发生变化时触发 change 事件，event.detail = {value: 选中项radio的value}

#### radio

单选项目

  属性名     |  类型      |  默认值  |  说明                                                                             
-------------|------------|----------|-----------------------------------------------------------------------------------
  value      |  String    |          |`<radio/>` 标识。当该`<radio/>` 选中时，`<radio-group/>` 的 change 事件会携带`<radio/>`的value
  checked    |  Boolean   |  false   |  当前是否选中                                                                     
  disabled   |  Boolean   |  false   |  是否禁用                                                                         
  color      |  Color     |          |  radio的颜色，同css的color                                                        

**示例：**

[在开发者工具中预览效果](wechatide://minicode/tpbv9cmv6HYr "在开发者工具中预览效果")

    <radio-group class="radio-group" bindchange="radioChange">
      <label class="radio" wx:for="{{items}}">
        <radio value="{{item.name}}" checked="{{item.checked}}"/>{{item.value}}
      </label>
    </radio-group>
    

    Page({
      data: {
        items: [
          {name: 'USA', value: '美国'},
          {name: 'CHN', value: '中国', checked: 'true'},
          {name: 'BRA', value: '巴西'},
          {name: 'JPN', value: '日本'},
          {name: 'ENG', value: '英国'},
          {name: 'TUR', value: '法国'},
        ]
      },
      radioChange: function(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
      }
    })
    

![radio](https://developers.weixin.qq.com/miniprogram/dev/image/pic/radio.png)
