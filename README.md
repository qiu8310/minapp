
## 功能列表（完成的与待完成的）

* [x] 抓取官方文档，生成结构化的数据 <已由 [@minapp/generator][minapp-generator] 完成>
  - [x] [根据官方API文档](https://mp.weixin.qq.com/debug/wxadoc/dev/api/) 生成 wx api 数据
  - [x] [根据官方组件文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/)生成组件数据
  - [ ] 将生成的 typescripts 中的对象定义扁平化，不要出现对象中嵌套对象（方便在用户项目中引用）
* [x] 生成一个用户可以直接使用的 wx api 模块 <已由 [@minapp/core][minapp-core] 完成>
  - [x] 提供原生回调版本的 api
  - [x] 提供 promise 版本的 api
* [ ] 制作一个类似于 wepy 的框架 <由 [@minapp/mobx][minapp-mobx] 解决中>
  - [x] 嵌入 mobx，简化开发流程
  - [ ] 支持组件
  - [ ] 给框架添加更多的辅助函数，参考 wepy
  - [ ] 模板 class/属性/标签 等支持自动补全（需要 vscode 插件）
* [x] 解析 wxml，生成类似于语法树的数据 <已由 [@minapp/wxml-parser][minapp-wxml-parser] 完成>
* [ ] 制作编译器 <由 [@minapp/compiler][minapp-compiler] 和 [@minapp/webpack-utils][minapp-webpack-utils] 完成>
  - [x] js-loader
  - [x] json-loader
  - [x] wxml-loader
  - [x] wxss-loader
  - [x] ExtractMinappCode plugin
  - [ ] 需要一个 vue loader
  - [ ] ExtractMinappCode 可能需要优化（虽然现在还没发现错误，参考 extract-text-webpack-plugin）
* [ ] 制作命令行工具
  - [ ] 快速生成初始化代码
  - [ ] 集成编译器
  - [ ] 更新提醒
* [ ] 制作示例代码
  - [ ] ts 版本（mobx + typescript）
  - [ ] js 版本



[minapp-generator]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-generator
[minapp-core]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-core
[minapp-mobx]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-mobx
[minapp-wxml-parser]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-wxml-parser
[minapp-webpack-utils]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-webpack-utils
[minapp-compiler]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-compiler
[minapp-cli]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-cli
[minapp-example-ts]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-example-ts
[minapp-example-js]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-example-js
[minapp-vscode]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-vscode
