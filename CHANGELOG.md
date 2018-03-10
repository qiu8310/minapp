
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
