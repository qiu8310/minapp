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
