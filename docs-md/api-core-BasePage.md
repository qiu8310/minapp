---
title: BasePage
---

### Class 属性及方法：

* **app**

  当前 app 实例，微信原生需要通过全局函数 `getApp()` 来获取，这里为了方便，可以直接在 Page 中通过 `this.app` 来获取

* **setDataSmart(data, callback?)**

  对 `setData` 的封装，不过 `setDataSmart` 还支持 **数据双向绑定** 及 **hide 状态下不更新 data** 的两个功能

* **getLocation()**

  获取关于此页面的一个 [Location](./api-core-Location.md) 对象

* **$visiable**

  限制：`readonly`

  类型： `boolean`

  当前页面是显示还是隐藏

### Example：

```js

import {BasePage, pagify} from '@minapp/core'

@pagify({
  lazySetData: true, // 优化性能：页面隐藏状态下不调用 setData，在页面显示时统一再调用
  mixins: []
})
export default class extends BasePage {
  async onShow() {
    // todo
  }
}

```


> 源代码： [BasePage.ts](https://github.com/qiu8310/minapp/blob/master/packages/minapp-core/src/module/BasePage.ts)
