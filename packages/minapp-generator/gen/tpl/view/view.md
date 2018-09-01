<!-- https://developers.weixin.qq.com/miniprogram/dev/component/view.html -->

#### view

视图容器。

  属性名                   |  类型      |  默认值  |  说明                                         | 最低版本 
---------------------------|------------|----------|-----------------------------------------------|----------
  hover-class              |  String    |  none    |指定按下去的样式类。当 `hover-class="none"` 时，没有点击态效果|          
  hover-stop-propagation   |  Boolean   |  false   |  指定是否阻止本节点的祖先节点出现点击态       |  1.5.0   
  hover-start-time         |  Number    |  50      |  按住后多久出现点击态，单位毫秒               |          
  hover-stay-time          |  Number    |  400     |  手指松开后点击态保留时间，单位毫秒           |          

**示例：**

[在开发者工具中预览效果](wechatide://minicode/eJwL4bmd6mY3 "在开发者工具中预览效果")

    <view class="section">
      <view class="section__title">flex-direction: row</view>
      <view class="flex-wrp" style="flex-direction:row;">
        <view class="flex-item bc_green">1</view>
        <view class="flex-item bc_red">2</view>
        <view class="flex-item bc_blue">3</view>
      </view>
    </view>
    <view class="section">
      <view class="section__title">flex-direction: column</view>
      <view class="flex-wrp" style="height: 300px;flex-direction:column;">
        <view class="flex-item bc_green">1</view>
        <view class="flex-item bc_red">2</view>
        <view class="flex-item bc_blue">3</view>
      </view>
    </view>
    

![view](https://developers.weixin.qq.com/miniprogram/dev/image/pic/view.png)

##### Bug & Tip

1.  `tip`: 如果需要使用滚动视图，请使用 [scroll-view](https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html)
