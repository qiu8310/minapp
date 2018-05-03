---
title: BaseApp
---


### Class 属性及方法：

* **$home**

  当前主页的 [Url](./api-core-Url.md) 对象，主页即配置在 app.json 中的 pages 中的第一个 url 地址

* **$url**

  类型： `{[key: string]: Url}`

  一个所有页面的 map 表，key 是对应页面的 camelCase 的文件的名称（无后缀），如有个文件名为 `foo-bar.js`
  的 page，则可以通过 `app.$url.fooBar` 来取到它的 [Url](./api-core-Url.md) 对象

* **$back(delta: number = 1)**

  对 `wx.navigateBack` 接口的简单封装

### Example：

```js

import {BaseApp, appify} from '@minapp/core'

@appify({
  pages: require('./app.json?pages'),
  tabBarList: require('./app.json?tabBar.list')
})
export default class extends BaseApp {
  async onLaunch() {
    // todo
  }
}

```


> 源代码： [BaseApp.ts](https://github.com/qiu8310/minapp/blob/master/packages/minapp-core/src/module/BaseApp.ts)
