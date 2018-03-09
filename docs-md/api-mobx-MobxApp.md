---
title: MobxApp
---

### Class 属性及方法：继承 [BaseApp](./api-core-BaseApp.md)

* **store**

  即通过 `appify()` 函数注入的 store 对象


### Example：

```js

import {MobxStore, MobxApp, appify} from '@minapp/mobx'

@appify(
  new MobxStore(),
  {
    pages: require('./app.json?pages'),
    tabBarList: require('./app.json?tabBar.list')
  }
)
export default class extends MobxApp {
  async onLaunch() {
    // todo
  }
}

```


> 源代码： [MobxApp.ts](https://github.com/qiu8310/minapp/blob/master/packages/minapp-mobx/src/lib/MobxApp.ts)
