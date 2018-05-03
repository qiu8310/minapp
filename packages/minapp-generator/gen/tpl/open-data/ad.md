<!-- https://developers.weixin.qq.com/miniprogram/dev/component/ad.html -->

#### ad

> 基础库 1.9.94 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

广告。**目前暂时以邀请制开放申请，请留意后续模板消息的通知**

  属性名    |  类型     | 默认值 |  说明                                                   
------------|-----------|--------|---------------------------------------------------------
  unit-id   |  String   |        |广告单元id，可在[小程序管理后台](https://mp.weixin.qq.com)的流量主模块新建

##### 注意

1.  目前可以给 `ad` 标签设置 wxss 样式调整广告宽度，以使广告与页面更融洽，但请遵循[小程序流量主应用规范](https://wximg.qq.com/wxp/pdftool/get.html?id=rynYA8o3f&pa=10&name=miniprogramAds_supplier_guidance)
2.  在无广告展示时，`ad` 标签不会占用高度
3.  `ad` 组件不支持触发 `bindtap` 等触摸相关事件
