<!-- https://developers.weixin.qq.com/miniprogram/dev/component/label.html -->

#### label

用来改进表单组件的可用性，使用`for`属性找到对应的`id`，或者将控件放在该标签下，当点击时，就会触发对应的控件。

`for`优先级高于内部控件，内部有多个控件的时候默认触发第一个控件。

目前可以绑定的控件有：`<button/>`, `<checkbox/>`, `<radio/>`, `<switch/>`。

 属性名 |  类型     |  说明       
--------|-----------|-------------
  for   |  String   |绑定控件的 id

**示例代码：**

[在开发者工具中预览效果](wechatide://minicode/alak1cmR6JYU)

    <view class="section section_gap">
    <view class="section__title">表单组件在label内</view>
    <checkbox-group class="group" bindchange="checkboxChange">
      <view class="label-1" wx:for="{{checkboxItems}}">
        <label>
          <checkbox hidden value="{{item.name}}" checked="{{item.checked}}"></checkbox>
          <view class="label-1__icon">
            <view class="label-1__icon-checked" style="opacity:{{item.checked ? 1: 0}}"></view>
          </view>
          <text class="label-1__text">{{item.value}}</text>
        </label>
      </view>
    </checkbox-group>
    </view>
    
    <view class="section section_gap">
    <view class="section__title">label用for标识表单组件</view>
    <radio-group class="group" bindchange="radioChange">
      <view class="label-2" wx:for="{{radioItems}}">
        <radio id="{{item.name}}" hidden value="{{item.name}}" checked="{{item.checked}}"></radio>
        <view class="label-2__icon">
          <view class="label-2__icon-checked" style="opacity:{{item.checked ? 1: 0}}"></view>
        </view>
        <label class="label-2__text" for="{{item.name}}"><text>{{item.name}}</text></label>
      </view>
    </radio-group>
    </view>
    

    Page({
      data: {
        checkboxItems: [
          {name: 'USA', value: '美国'},
          {name: 'CHN', value: '中国', checked: 'true'},
          {name: 'BRA', value: '巴西'},
          {name: 'JPN', value: '日本', checked: 'true'},
          {name: 'ENG', value: '英国'},
          {name: 'TUR', value: '法国'},
        ],
        radioItems: [
          {name: 'USA', value: '美国'},
          {name: 'CHN', value: '中国', checked: 'true'},
          {name: 'BRA', value: '巴西'},
          {name: 'JPN', value: '日本'},
          {name: 'ENG', value: '英国'},
          {name: 'TUR', value: '法国'},
        ],
        hidden: false
      },
      checkboxChange: function(e) {
        var checked = e.detail.value
        var changed = {}
        for (var i = 0; i < this.data.checkboxItems.length; i ++) {
          if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
            changed['checkboxItems['+i+'].checked'] = true
          } else {
            changed['checkboxItems['+i+'].checked'] = false
          }
        }
        this.setData(changed)
      },
      radioChange: function(e) {
        var checked = e.detail.value
        var changed = {}
        for (var i = 0; i < this.data.radioItems.length; i ++) {
          if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
            changed['radioItems['+i+'].checked'] = true
          } else {
            changed['radioItems['+i+'].checked'] = false
          }
        }
        this.setData(changed)
      }
    })
    

    .label-1, .label-2{
        margin-bottom: 15px;
    }
    .label-1__text, .label-2__text {
        display: inline-block;
        vertical-align: middle;
    }
    
    .label-1__icon {
        position: relative;
        margin-right: 10px;
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        background: #fcfff4;
    }
    
    .label-1__icon-checked {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 12px;
        height: 12px;
        background: #1aad19;
    }
    
    
    .label-2__icon {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        width: 18px;
        height: 18px;
        background: #fcfff4;
        border-radius: 50px;
    }
    
    .label-2__icon-checked {
        position: absolute;
        left: 3px;
        top: 3px;
        width: 12px;
        height: 12px;
        background: #1aad19;
        border-radius: 50%;
    }
    
    .label-4_text{
        text-align: center;
        margin-top: 15px;
    }
    

![label](https://mp.weixin.qq.com/debug/wxadoc/dev/image/pic/label.png)
