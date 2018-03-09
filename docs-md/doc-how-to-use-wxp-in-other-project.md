---
title: 如何在其它项目中复用 wx 及 wxp 自动补全
---

框架中所有 wx 和 wxp 的自动补全的文档都是从官方文档中抓取下来的，为了方便复用，我把它们单独发布在了 `@minapp/core` 中，
所以，如果你不想使用 minapp 提供的框架，而是使用了 wepy 或其它框架，你也一样可以安装 `@minapp/core` 模块，这样就可以在
你的编辑器中实现所有 wx 和 wxp 的自动补全功能，引用方式如下：


* 只想使用 wx 的自动补全：使用 ts 的 reference，或将 wx.d.ts 写到配置文件 tsconfig.json 或 jsconfig.json 中

  ```ts
  /// <reference path=".../@minapp/core/typing/wx.d.ts" />
  ```

* 想要使用 wx 和 wxp 的自动补全

  ```js
  import {wxp} from '@minapp/core/wxp'  // 注意后面要带 wxp 后缀
  ```

wx 的自动补全无任何代码，完全就一个 [wx.d.ts](https://github.com/qiu8310/minapp/blob/master/packages/minapp-generator/gen/api/wx.d.ts) 文件，
而 wxp 需要使 wx promise 化，所以添加了额外的代码，不过你放心，整个 `@minapp/core/wxp` 百行代码还不到，[详情查看此链接](https://github.com/qiu8310/minapp/blob/master/packages/minapp-core/src/index.ts)
