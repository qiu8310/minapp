2.0.4 / 2018-05-27
==================

* cli: 可以在 webpack.minapp.js 中配置 wxml 格式化的选项
  - 新创建的项目会自动生成 Example
  - 老项目可以参考文件： https://github.com/qiu8310/minapp/blob/v2.0.4/packages/minapp-cli/common/Application/base/webpack.minapp.js.dtpl#L19-L33

  **注意：小程序的 text 标签的开头和结尾的换行符可能会影响到页面的布局，而格式化时开头和结尾是否会有换行符是自动根据内容的长短来自适应的。如果需要保留原格式，可以配置 `reserveTags` 选项**

* 修复 wxss 和 css 文件在 build 模式时，不会生成 import 的文件
* 修复 ts 项目使用了 dot-template 用户在新建 page 文件夹时，自动注入到 base/MyApp.ts 没有采用驼峰形式
  - 新创建的项目无需任何修改
  - 老项目如果没有修改过 `.dtpl/dtpl.js` 文件，可以参考[此文件](https://github.com/qiu8310/minapp/blob/v2.0.4/packages/minapp-cli/common/Application/ts/.dtpl/dtpl.js.dtpl)来修改（如果没有修改过这个文件，则直接复制粘贴即可）


2.0.2 / 2018-05-07
==================

* cli: 修复 dev 模式下未更新的文件也会重新生成 [#67](https://github.com/qiu8310/minapp/issues/67)

2.0.1 / 2018-05-05
==================

* cli: 修复 window 相对路径引用问题（主要是不区分大小写引起的） [#65](https://github.com/qiu8310/minapp/issues/65)


2.0.0 / 2018-05-04
==================

* compiler 和 webpack-utils 模块删除，统一合并到 cli 模块
* webpack 升级到 4.0
* minapp.json 中废弃了 px2rpx、rpx2px 及 devServer 中的 host 和 port 选项
* minapp.json 中添加新配置：srcDir, distDir, npmOutputFolder, staticFileExtensions, staticOutputName, staticOutputFolder
* 不再自动将样式中的 px 单位转化成 rpx，同时将 rpx 单位转化成 px，需要手动配置
* 使用 sass 的项目需要在本地安装 sass-loader 和 node-sass；而使用了 less 的项目需要在本地安装 less 和 less-loader
* 使用了 ts 的项目需要在本地安装 ts-loader (以前是 awesome-typescript-loader)
* @minapp/cli 新添加命令 `minapp clear`
* webpack.minapp.js 支持新函数 `updateLoaders`
* 如果将 @minapp/cli 安装在本地，则默认会使用[本地的命令行](https://github.com/qiu8310/minapp/issues/58)

**升级指南请查看：https://qiu8310.github.io/minapp/docs/doc-update-v1-to-v2.html**


1.1.0 / 2018-04-28
==================

* compiler: 自定义的 webpack.minapp.js 文件导出的函数的第二个参数会传入 webpack，见 https://qiu8310.github.io/minapp/docs/doc-custom-webpack.html
* compiler: wxml 文件没有任何内容时，也会生成一个新的文件（1.1.0 之前版本不会给空的模板生成新文件）
* core: 修复双向绑定中组件参数不支持中化线的问题 close #53
* core: 支持微信插件，见 https://github.com/qiu8310/minapp/issues/50
* core: 更新 wx.d.ts 和 wxp.d.ts （同步官方的 2018.04.12 版本）
* vscode: 插件更新，[详情查看](https://github.com/qiu8310/minapp/blob/master/packages/minapp-vscode/CHANGELOG.md)

1.0.15 / 2018-04-10
==================

* webpack-utils: 修复 extract code 失败的问题; close #52

1.0.12 / 2018-04-05
==================

* vscode: 新加一个 ID 为 wxml-pug 的语言，支持 pug 语言自动补全
* compiler: 引入 pug-loader

1.0.11 / 2018-04-04
==================

* compiler: minapp.json支持配置 unitTransformer，px2rpx 和 rpx2px 会被废弃
* compiler: 引入 json2sass-loader
* compiler: 支持使用 webpack.minapp.js / webpack.minapp.ts 来修改 webpack 配置

1.0.6 / 2018-03-23
==================

* compiler: 样式中支持图片处理相关函数：data/width/height/size
* compiler: 支持 urlLoaderLimit

1.0.5 / 2018-03-19
==================

* core: 修复 Component 中无法定义属性的问题
* loader: app.json 中可以配置 tabBar 上的图片


1.0.3 / 2018-03-16
==================

* loader: 修复 window 上静态资源路径使用了 \ 的问题
* cli: 添加验证版本功能


1.0.2 / 2018-03-15
==================

* 添加生成 bundle 的脚本，方便用户直接使用单个 bundle 文件
* 示例项目中有多余的 page
* 修复 sass 和 less 的 import 路径 resolve 问题 close #18
* 更新 mora-scripts，支持判断哪些命令行参数是用户自定义的

1.0.1 / 2018-03-12
==================

* 暴露 webpack-dev-server 的配置 close #17
* Component 添加 externalClasses 字段
* vscode 插件只支持 5 个 keywords

1.0.0 / 2018-03-11
==================

* minapp-vscode 属性值也可以自动补全了
* minapp-vscode 根据已有属性，自动筛选出对应支持的属性集合
* minapp-vscode 自定义组件自动补全
* 全新的组件开发模式（支持创建组件项目，编译组件项目）
* 支持直接引用 npm 包中的组件
* wxml 模板支持数据双向绑定（只需要在模板后面加上 `.sync` 即可实现）
* 可选择是否使用 mobx 框架
* 可选择支持的样式语言： scss、less、css、wxss
* 更新 wx.d.ts 和 wxp.d.ts，详情查看[官方更新](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/uplog.html#20180307-%E5%9F%BA%E7%A1%80%E5%BA%93%E6%9B%B4%E6%96%B0-1992)


0.0.9 / 2018-03-04
==================

* 修复 0.0.7 引入的 bug (@minapp/webpack-utils)
  微信中的 json 文件中的路径不能用 window 中文件路径，需要使用 "/"


0.0.8 / 2018-03-04
==================

* 降低 vscode 的 engine (minapp-vscode)


0.0.7 / 2018-03-04
==================

* 支持直接引用 npm 中的组件 (@minapp/webpack-utils)


0.0.4 / 2018-03-01
==================

* 发布第一个可用版本
