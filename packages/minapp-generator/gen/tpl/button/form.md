<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/component/form.html -->

#### form

表单，将组件内的用户输入的`<switch/>` `<input/>` `<checkbox/>` `<slider/>` `<radio/>` `<picker/>` 提交。

当点击 `<form/>` 表单中 formType 为 submit 的 `<button/>` 组件时，会将表单组件中的 value 值进行提交，需要在表单组件中加上 name 来作为 key。

  属性名          |  类型          |  说明                                                                                | 最低版本
------------------|----------------|--------------------------------------------------------------------------------------|---------
  report-submit   |  Boolean       |是否返回 formId 用于发送[模板消息](https://mp.weixin.qq.com/debug/wxadoc/dev/api/notice.html)|         
  bindsubmit      |  EventHandle   |携带 form 中的数据触发 submit 事件，event.detail = {value : {'name': 'value'} , formId: ''}|         
  bindreset       |  EventHandle   |  表单重置时会触发 reset 事件                                                         |         

**示例代码：**

    <form bindsubmit="formSubmit" bindreset="formReset">
      <view class="section section_gap">
        <view class="section__title">switch</view>
        <switch name="switch"/>
      </view>
      <view class="section section_gap">
        <view class="section__title">slider</view>
        <slider name="slider" show-value ></slider>
      </view>
    
      <view class="section">
        <view class="section__title">input</view>
        <input name="input" placeholder="please input here" />
      </view>
      <view class="section section_gap">
        <view class="section__title">radio</view>
        <radio-group name="radio-group">
          <label><radio value="radio1"/>radio1</label>
          <label><radio value="radio2"/>radio2</label>
        </radio-group>
      </view>
      <view class="section section_gap">
        <view class="section__title">checkbox</view>
        <checkbox-group name="checkbox">
          <label><checkbox value="checkbox1"/>checkbox1</label>
          <label><checkbox value="checkbox2"/>checkbox2</label>
        </checkbox-group>
      </view>
      <view class="btn-area">
        <button formType="submit">Submit</button>
        <button formType="reset">Reset</button>
      </view>
    </form>
    

    Page({
      formSubmit: function(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
      },
      formReset: function() {
        console.log('form发生了reset事件')
      }
    })
    

![form](https://mp.weixin.qq.com/debug/wxadoc/dev/image/pic/form.png?t=201838)
