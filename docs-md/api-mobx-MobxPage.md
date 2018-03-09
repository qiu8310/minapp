---
title: MobxPage
---

### Class 属性及方法：继承 [BasePage](./api-core-BasePage.md)

* **store**

  对 `app.store` 的引用


### Example：

```js

import {MobxPage, pagify} from '@minapp/mobx'

@pagify({
  observe: true,    // 是否自动监听 store 的变化
  mapStoreToData: (store) => {}, // 将 store 中的值映射到当前 page 的 data 中
  lazySetData: true, // 优化性能：页面隐藏状态下不调用 setData，在页面显示时统一再调用
  mixins: []
})
export default class extends MobxPage {
  async onShow() {
    // todo
  }
}

```


> 源代码： [MobxPage.ts](https://github.com/qiu8310/minapp/blob/master/packages/minapp-mobx/src/lib/MobxPage.ts)
