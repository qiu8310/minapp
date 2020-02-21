# minapp

**重新定义微信小程序的开发**

**[更新日志](./CHANGELOG.md)**

**minapp 2.0.0 已经发布，新版本主要采用了 webpack 4，[v1.x升级到v2.x请查看](https://qiu8310.github.io/minapp/docs/doc-update-v1-to-v2.html)**


## 介绍

**minapp 是为开发微信小程序而打造的一整套提升开发体验的工具：**
- 提供一个命令行工具 `@minapp/cli`，用它可以快速创建一个项目，并可以用 webpack 来构建生成的项目；
- 提供一个开发框架 `@minapp/core`，此框架是完全兼容原生小程序代码的框架，支持使用 class 的方式来开发，支持代码自动补全，同时提供微信所有 api 的自动补全
- 提供一个集成了 mobx 的框架 `@minapp/mobx`，此框架主要给 `@minapp/core` 注入了 mobx，可以让你轻松使用 mobx 来管理全局数据
- 提供一个 vscode 插件 `minapp-vscode`，此插件主要是针对小程序的 `wxml` 模板语言，可以自动补全所有的组件、组件属性、组件属性值等等

注意：使用 minapp 后，还是需要使用微信官方提供的"微信开发者工具"来测试

## 使用

1. 用 npm 安装命令行工具： `npm install -g @minapp/cli`
2. 初始化项目：`minapp init <你要创建项目的文件夹>` (同时支持创建 js 和 ts 项目)
3. 安装两个 vscode 插件：[minapp][vscode-minapp] 和 [dot-template][vscode-dot-template]（可选，但建议安装）

## 特点

* 完全兼容原生小程序，所有原生小程序代码可以直接迁移到 minapp 的环境中
* 集成 webpack 和 webpack-dev-server，编译有保障
* 可以选择使用 mobx，方便管理全局数据
* 所有语言在 minapp 的环境中都能自动补全，开发体验超级棒（见下面的`功能概览`）
* 支持数据双向绑定
* setData 性能优化

## 功能概览（在 vscode 编辑器下）

### wx 所有接口都有智能的提醒，同时包括接口的参数，和返回值

![wx接口示例](https://n1image.hjfile.cn/res7/2018/03/01/428c4297bb1f6b6cf335317f89bab237.gif)

  **非 minapp 用户也可以安装 `@minapp/wx` 来获取此功能，参见[这里](https://qiu8310.github.io/minapp/docs/doc-how-to-use-wxp-in-other-project.html)**

### 提供一个 promise 版的 wx 接口 wxp，和 wx 一样，只是它会将 wx 中所有需要 success/fail/complete 三个参数的函数 promise 化
  - wxp 中也支持使用 success 回调
  - wxp 给 Promise 添加了一个 finally 方法；如，你可以这样用 `wxp.getUserInfo().finally(() => { /* do something */ })`


![wxp示例](https://n1image.hjfile.cn/res7/2018/03/01/a8ccc97ac7146b81e080daf8eb778b4d.gif)

### 集成 mobx，可以非常方便的修改全局数据，并自动更新当前页面状态
  - 注入 Store 只需要在 appify 函数中添加 Store 对象即可
  - Page 和 Component 中都默认注入了 Store 对象，你可以使用 `this.store` 获取

![mobx](https://n1image.hjfile.cn/res7/2018/03/01/beaf3616dc87b851156fe107e79deff9.gif)


### wxml 模板语言支持语法高亮，组件智能提示，组件属性智能提示（需要安装 vscode 插件 [minapp][vscode-minapp]）

欲了解更多此插件的功能详情，[点此查看](./packages/minapp-vscode)

![wxml](https://n1image.hjfile.cn/res7/2018/03/01/13631761451ae134c6eb3ea2ed1a6a12.gif)

### json 文件支持自动提示

![json](https://n1image.hjfile.cn/res7/2018/03/01/ee0ec301194156469cfe5533a2008d04.gif)

### 新建一个 page 文件夹时，自动生成相关文件（需要安装 vscode 插件 [dot-template][vscode-dot-template]）
  - 自动为你创建相关的同名的文件，包括 js/json/wxml/scss，并且这些模板文件你可以随时在 .dtpl 文件夹下修改
  - 自动将新建的 page 路径注入到 app.json 文件夹中

![新建 Page 示例](https://n1image.hjfile.cn/res7/2018/03/01/8dc5a66a33857c2cfb16353727d15f41.gif)

### 小程序 Page 中支持函数自动提示

![Page 中的函数自动提示示例](https://n1image.hjfile.cn/res7/2018/03/01/18702b10498aee7ddc394eb04a703a43.gif)

### 同理，新建组件文件夹时，也会创建相关的文件；同时组件中的生命周期函数也会自动提示

![Component 示例](https://n1image.hjfile.cn/res7/2018/03/01/5ad639730bee6eea44d93a22edfc8921.gif)


## 关于此仓库说明

这不是一个项目，是有好几个项目组合而成的，用的是 [lerna](https://github.com/lerna/lerna) 开发工具，其它项目在 [packages 目录下](./packages/)，这里对其中的几个主要项目做个简要概述

* [minapp-generator][minapp-generator]: 此模块负责解析微信官方文档，生成结构化的数据，供其它模块使用
* [minapp-wx][minapp-wx]: 微信所有原生 api 的 TypeScript 定义，另外提供一个 promise 版的 wx 接口
* [minapp-core][minapp-core]: 开发框架，需要依赖 minapp-wx
* [minapp-mobx][minapp-mobx]: 集成 mobx 的开发框架，需要依赖 minapp-core
* [minapp-cli][minapp-cli]: 提供给用户的命令行工具，并可以快速创建一个新项目
* [minapp-vscode][minapp-vscode]: vscode 插件，为wxml提供语法高亮、标签与属性的自动补全

## TODO

* [ ] 小程序中的静态资源自动上传到 七牛 (完成我的 file-uploader 组件)
* [ ] 实现类似于 vue 的功能，可以将所有文件写在一个页面上
* [x] webpack 升级到 4.0
* [ ] 写一个小程序的自动化测试框架
* [x] 自定义组件支持智能提示(需要修改 minapp-vscode 插件)


[vscode-minapp]: https://marketplace.visualstudio.com/items?itemName=qiu8310.minapp-vscode
[vscode-dot-template]: https://marketplace.visualstudio.com/items?itemName=qiu8310.dot-template-vscode
[minapp-generator]: https://github.com/wx-minapp/minapp-generator
[minapp-wx]: https://github.com/wx-minapp/minapp-wx
[minapp-core]: ./packages/minapp-core
[minapp-mobx]: ./packages/minapp-mobx
[minapp-wxml-parser]: ./packages/minapp-wxml-parser
[minapp-cli]: ./packages/minapp-cli
[minapp-example-ts]: ./packages/minapp-example-ts
[minapp-example-js]: ./packages/minapp-example-js
[minapp-vscode]: https://github.com/wx-minapp/minapp-vscode
