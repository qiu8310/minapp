---
title: MobxStore
---

自定义的 Store 必须继承 `@minapp/mobx` 中的 MobxStore，否则组件有可能不会更新

其它用法和 mobx 一致，可以[查看 mobx 的官方文档](https://mobx.js.org/)


### Example：

```js
import {MobxStore} from '@minapp/mobx'
import {observable} from 'mobx'

export class MyStore extends MobxStore {
  @observable userInfo = null
}
```


> 源代码： [MobxStore.ts](https://github.com/qiu8310/minapp/blob/master/packages/minapp-mobx/src/lib/MobxStore.ts)
