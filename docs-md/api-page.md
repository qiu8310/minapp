---
title: Page
---

* **app**

  当前 app 实例，微信原生需要通过全局函数 `getApp()` 来获取，这里为了方便，可以直接在 Page 中通过 `this.app` 来获取

* **store**

  这只是个 `this.app.store` 的别名，由于 `store` 可能会经常被用到，所以把它放在最外层

* **getLocation()**

  获取关于此页面的一个 [Location](./api-location.md) 对象
