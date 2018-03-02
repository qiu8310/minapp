---
title: App
---

> 注意： api 文档可能和你本地使用的版本不一致，而且 @minapp/mobx 几乎没有提供什么额外的 api，
> 而且几乎所有相关接口都有自动补全，所以一切以你系统的自动补全的接口为准


* **store**

  即通过 `appify()` 函数注入的 store 对象


* **$home**

  当前主页的 [Url](./api-url.md) 对象，主页即配置在 app.json 中的 pages 中的第一个 url 地址

* **$url**

  类型： `{[key: string]: Url}`

  一个所有页面的 map 表，key 是对应页面的 camelCase 的文件的名称（无后缀），如有个文件名为 `foo-bar.js`
  的 page，则可以通过 `app.$url.fooBar` 来取到它的 [Url](./api-url.md) 对象

* **$back(delta: number = 1)**

  对 `wx.navigateBack` 接口的简单封装
