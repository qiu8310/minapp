---
title: Store
---

自定义的 Store 必须继承 `@minapp/mobx` 中的 Store，否则组件有可能不会更新

```js
import {Store} from '@minapp/mobx'
import {observable} from 'mobx'

export class MyStore extends Store {
  @observable userInfo = null
}
```

其它用法和 mobx 一致，可以[查看 mobx 的官方文档](https://mobx.js.org/)
