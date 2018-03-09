---
title: MobxComponent
---

### Class 属性及方法：继承 [BaseComponent](./api-core-BaseComponent.md)

* **getStore()**

  获取 app 中的 store 实例


### Example：

```js

import {MobxComponent, comify} from '@minapp/mobx'

@comify({
  mixins: []
})
export default class extends MobxComponent {
  async onReady() {
    // todo
  }
}

```


> 源代码： [MobxComponent.ts](https://github.com/qiu8310/minapp/blob/master/packages/minapp-mobx/src/lib/MobxComponent.ts)
