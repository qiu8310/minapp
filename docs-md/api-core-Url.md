---
title: Url
---

* **go(searchOrQuery?)**

  跳转当前 url 所指定的页面，会自动根据当前 url 是否是 tabBar 来决定调用 `wx.switchTab` 还是 `wx.navigateTo`

* **redirect(searchOrQuery?)**

  重定向到当前 url 所指定的页面

  注意：当页面是 tabBar 时，无法使用此函数

* **reload(searchOrQuery?)**

  关闭所有页面，打开到应用内的某个页面


> 源代码： [Url.ts](https://github.com/qiu8310/minapp/blob/master/packages/minapp-core/src/system/feat/Url.ts)
