1.3.0 / 2018-05-26
==================

* 添加 snippets 功能 [详情查看](README.md#snippets)

* 优化变量高亮（切换文件时，会有些延迟），见 [#68](https://github.com/qiu8310/minapp/issues/68)
* 标签的属性值是布尔值时，会自动弹出 true/false 来让你选择
* 修复自动补全中默认值无法在编辑时选中的问题


1.2.0 / 2018-05-07
==================

* 模板文件中 js 变量高亮（纯 wxml 文件才支持，vue 文件不支持），[详情查看](README.md#highlight)

1.1.1 / 2018-05-03
==================

* 更新小程序组件数据，主要添加了 [ad 组件](https://developers.weixin.qq.com/miniprogram/dev/component/ad.html)

1.1.0 / 2018-04-28
==================

* wxml / pug 文件中的 src 标签支持 link 功能（另外可以通过配置 `minapp-vscode.linkAttributeNames` 来支持更多的标签）
* 添加新配置 `minapp-vscode.formatMaxLineCharacters` 可以指定格式化时每行最长的字符数`, close [61](https://github.com/qiu8310/minapp/issues/61)
* 更新官方组件数据

1.0.14 / 2018-04-09
==================

* 修复 pug 语言中，在单行的标签中，写 text 的时候也会触发属性补全

1.0.12 / 2018-04-05
==================

* 支持 pug 语言

  现在需要在 vue 的 template 上指定 `lang` 和 `minapp` 两个选项，如果不指定 `minapp`，默认为 `minapp="mpvue"`

  如:

  1. `<template lang="wxml" minapp="native">`   表示使用 wxml 语言，不使用任何框架
  2. `<template lang="pug" minapp="mpvue">`     表示使用 pug 语言，并使用 mpvue 框架

1.0.10 / 2018-03-31
==================

* 支持 wxml/wepy/mpvue 三类语言的补全
* 补全信息可配置

1.0.6 / 2018-03-23
==================

* 支持格式化 wxml 格式的文件（使用系统的格式化命令即可）
* 插件的分类改成了 `languages`

1.0.4 / 2018-03-17
==================

* 在 vue 模板文件中也能自动补全
