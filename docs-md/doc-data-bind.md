---
title: 数据双向绑定
---

在 minapp 中使用数据双向绑定非常简单，只需要满足如下四个条件：

1. 父子组件都要继承自 `BaseComponent` 或 `BasePage` （使用 minapp 框架默认就满足此条件）
2. 组件更新数据时，不要使用 `setData`，而是使用 `setDataSmart` （更多详情请参考文档[如何在原生的小程中实现数据双向绑定](./doc-how-to-realize-two-way-data-bind.md)）
3. wxml 中绑定数据时使用 `.sync` 后缀，如 `<child childAttr.sync="parentAttr"></child>`
4. 使用 `@minapp/cli` 编译项目（主要是需要 wxml 编译功能）

### Example：

```js
// 子组件: toast
import {BaseComponent, comify} from '@minapp/core'

@comify()
export default class extends BaseComponent {
  properties = {
    visible: {
      // 实现双向绑定，不需要在子组件中额外配置
      type: Boolean,
      value: false
    }
  }
}

```

```js
// 父容器
import {BasePage, pagify} from '@minapp/core'

@pagify()
export default class extends BasePage {
  data = {
    isToastVisible: false
  }

  toggleToast() {
    this.setDataSmart({isToastVisible: !this.data.isToastVisible})
  }
}
```

```html
<!-- 父容器 wxml 模板 -->

<toast visible.sync="isToastVisible" />

```
