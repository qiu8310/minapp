<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/component/movable-view.html -->

#### movable-area

> 基础库 1.2.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

`movable-view` 的可移动区域

**注意：movable-area 必须设置width和height属性，不设置默认为10px**

#### movable-view

> 基础库 1.2.0 开始支持，低版本需做[兼容处理](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/compatibility.html)

可移动的视图容器，在页面中可以拖拽滑动

  属性名          |  类型      |  默认值  |  说明                                                 
------------------|------------|----------|-------------------------------------------------------
  direction       |  String    |  none    |movable-view的移动方向，属性值有all、vertical、horizontal、none
  inertia         |  Boolean   |  false   |  movable-view是否带有惯性                             
  out-of-bounds   |  Boolean   |  false   |  超过可移动区域后，movable-view是否还可以移动         
  x               |  Number    |          |定义x轴方向的偏移，如果x的值不在可移动范围内，会自动移动到可移动范围；改变x的值会触发动画
  y               |  Number    |          |定义y轴方向的偏移，如果y的值不在可移动范围内，会自动移动到可移动范围；改变y的值会触发动画
  damping         |  Number    |  20      |阻尼系数，用于控制x或y改变时的动画和过界回弹的动画，值越大移动越快
  friction        |  Number    |  2       |摩擦系数，用于控制惯性滑动的动画，值越大摩擦力越大，滑动越快停止；必须大于0，否则会被设置成默认值

> movable-view 必须设置width和height属性，不设置默认为10px
> 
> movable-view 默认为绝对定位，top和left属性为0px
> 
> 当movable-view小于movable-area时，movable-view的移动范围是在movable-area内；当movable-view大于movable-area时，movable-view的移动范围必须包含movable-area（x轴方向和y轴方向分开考虑）

**注意**：movable-view必须在`<movable-area/>`组件中，并且必须是直接子节点，否则不能移动。

**示例代码：**

    <view class="section">
      <view class="section__title">movable-view区域小于movable-area</view>
      <movable-area style="height: 200px;width: 200px;background: red;">
        <movable-view style="height: 50px; width: 50px; background: blue;" x="{{x}}" y="{{y}}" direction="all">
        </movable-view>
      </movable-area>
      <view class="btn-area">
        <button size="mini" bindtap="tap">click me to move to (30px, 30px)</button>
      </view>
      <view class="section__title">movable-view区域大于movable-area</view>
      <movable-area style="height: 100px;width: 100px;background: red;" direction="all">
        <movable-view style="height: 200px; width: 200px; background: blue;">
        </movable-view>
      </movable-area>
    </view>
    

    Page({
      data: {
        x: 0,
        y: 0
      },
      tap: function(e) {
        this.setData({
          x: 30,
          y: 30
        });
      }
    })
