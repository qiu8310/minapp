<!-- https://developers.weixin.qq.com/miniprogram/dev/component/checkbox.html -->

#### checkbox-group

多项选择器，内部由多个`checkbox`组成。

  属性名       |  类型          | 默认值 |  说明                                                                                 
---------------|----------------|--------|---------------------------------------------------------------------------------------
  bindchange   |  EventHandle   |        |`<checkbox-group/>`中选中项发生改变是触发 change 事件，detail = {value:\[选中的checkbox的value的数组\]}

#### checkbox

多选项目。

  属性名     |  类型      |  默认值  |  说明                                                                            
-------------|------------|----------|----------------------------------------------------------------------------------
  value      |  String    |          |`<checkbox/>`标识，选中时触发`<checkbox-group/>`的 change 事件，并携带 `<checkbox/>` 的 value
  disabled   |  Boolean   |  false   |  是否禁用                                                                        
  checked    |  Boolean   |  false   |  当前是否选中，可用来设置默认选中                                                
  color      |  Color     |          |  checkbox的颜色，同css的color                                                    

**示例：**

[在开发者工具中预览效果](wechatide://minicode/hGa3DcmW6qYw)

    <checkbox-group bindchange="checkboxChange">
      <label class="checkbox" wx:for="{{items}}">
        <checkbox value="{{item.name}}" checked="{{item.checked}}"/>{{item.value}}
      </label>
    </checkbox-group>
    

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
      checkboxChange: function(e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
      }
    })
    

![checkbox](https://mp.weixin.qq.com/debug/wxadoc/dev/image/pic/checkbox.png)
