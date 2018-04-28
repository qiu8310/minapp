<!-- https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html -->

#### swiper

滑块视图容器。

  属性名                    |  类型          |  默认值              |  说明                                                                         | 最低版本 
----------------------------|----------------|----------------------|-------------------------------------------------------------------------------|----------
  indicator-dots            |  Boolean       |  false               |  是否显示面板指示点                                                           |          
  indicator-color           |  Color         |  rgba(0, 0, 0, .3)   |  指示点颜色                                                                   |  1.1.0   
  indicator-active-color    |  Color         |  #000000             |  当前选中的指示点颜色                                                         |  1.1.0   
  autoplay                  |  Boolean       |  false               |  是否自动切换                                                                 |          
  current                   |  Number        |  0                   |  当前所在滑块的 index                                                         |          
  current-item-id           |  String        |  ""                  |  当前所在滑块的 item-id ，不能与 current 被同时指定                           |  1.9.0   
  interval                  |  Number        |  5000                |  自动切换时间间隔                                                             |          
  duration                  |  Number        |  500                 |  滑动动画时长                                                                 |          
  circular                  |  Boolean       |  false               |  是否采用衔接滑动                                                             |          
  vertical                  |  Boolean       |  false               |  滑动方向是否为纵向                                                           |          
  previous-margin           |  String        |  "0px"               |  前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值                        |  1.9.0   
  next-margin               |  String        |  "0px"               |  后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值                        |  1.9.0   
  display-multiple-items    |  Number        |  1                   |  同时显示的滑块数量                                                           |  1.9.0   
  skip-hidden-item-layout   |  Boolean       |  false               |是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息|  1.9.0   
  bindchange                |  EventHandle   |                      |current 改变时会触发 change 事件，event.detail = {current: current, source: source}|          
  bindanimationfinish       |  EventHandle   |                      |  动画结束时会触发 animationfinish 事件，event.detail 同上                     |  1.9.0   

从 [1.4.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html "基础库 1.4.0 开始支持，低版本需做兼容处理。") 开始，`change`事件返回`detail`中包含一个`source`字段，表示导致变更的原因，可能值如下：

*   `autoplay` 自动播放导致swiper变化；
*   `touch` 用户划动引起swiper变化；
*   其他原因将用空字符串表示。

**注意**：其中只可放置`<swiper-item/>`组件，否则会导致未定义的行为。

#### swiper-item

仅可放置在`<swiper/>`组件中，宽高自动设置为100%。

  属性名    |  类型     | 默认值 |  说明                 | 最低版本 
------------|-----------|--------|-----------------------|----------
  item-id   |  String   |  ""    |该 swiper-item 的标识符|  1.9.0   

**示例代码：**

    <swiper indicator-dots="{{indicatorDots}}"
      autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">
      <block wx:for="{{imgUrls}}">
        <swiper-item>
          <image src="{{item}}" class="slide-image" width="355" height="150"/>
        </swiper-item>
      </block>
    </swiper>
    <button bindtap="changeIndicatorDots"> indicator-dots </button>
    <button bindtap="changeAutoplay"> autoplay </button>
    <slider bindchange="intervalChange" show-value min="500" max="2000"/> interval
    <slider bindchange="durationChange" show-value min="1000" max="10000"/> duration
    

    Page({
      data: {
        imgUrls: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000
      },
      changeIndicatorDots: function(e) {
        this.setData({
          indicatorDots: !this.data.indicatorDots
        })
      },
      changeAutoplay: function(e) {
        this.setData({
          autoplay: !this.data.autoplay
        })
      },
      intervalChange: function(e) {
        this.setData({
          interval: e.detail.value
        })
      },
      durationChange: function(e) {
        this.setData({
          duration: e.detail.value
        })
      }
    })
    

##### Bug & Tip

1.  `tip`: 如果在 `bindchange` 的事件回调函数中使用 `setData` 改变 `current` 值，则有可能导致 `setData` 被不停地调用，因而通常情况下请在改变 `current` 值前检测 `source` 字段来判断是否是由于用户触摸引起。
