# minapp-vscode

## 1.0.12 开始，支持 pug 语言的自动补全，[详情见下文](#vue)

![重要通知](https://n1image.hjfile.cn/res7/2018/03/23/0520246bc52ca0b726a3ca4097104ba0.png)
<!-- <div style="color:red; font-size: 1.6em;">重要通知：由于旧版本不小心被我删除了，所以请 1.0.7 版本之前的用户删除旧版本再重新安装新版本；否则可能会无法成功安装新版本，并且也得不到新版本的推送！</div> -->

微信小程序模板语言 wxml/pug 语法高亮，并提供标签名、属性名、属性值的智能补全（同时支持在 vue 模板中补全）

> **所有自动补全的模板数据都来自于官方文档，通过[脚本](https://github.com/qiu8310/minapp/tree/master/packages/minapp-generator)自动获取的**

## 标签名与属性名自动补全

![示例图片](https://n1image.hjfile.cn/res7/2018/03/01/13631761451ae134c6eb3ea2ed1a6a12.gif)


<a id="vue"></a>

## 在 vue 模板文件中也能自动补全，同时支持 pug 语言

  vue 中的 template 板支持两个属性：

  1. `lang` 可以设置为 `"wxml"` 或 `"pug"`，表示使用的语言
  2. `minapp` 可以设置为 `"native"`, `"wepy"` 或 `"mpvue"`，表示使用的框架，默认为 `"mpvue"`

  如:

  * `<template lang="wxml" minapp="native">`   表示使用 wxml 语言，不使用任何框架
  * `<template lang="pug" minapp="mpvue">`     表示使用 pug 语言，并使用 mpvue 框架

  > 注意，[mpvue 中指定 lang="wxml" 会报错](https://github.com/Meituan-Dianping/mpvue/issues/208)，需要等待作者修复！不过
  > 你可以临时使用 `xlang="wxml"`，但这样同时也会触发 vue 的自动补全

  指定为不同的 minapp 值会触发对应框架的自动补全，由于本人没有使用 wepy 和 mpvue 开发过，所以这些自动补全是根据官方文档说明而加上的，如果有错误，欢迎 PR（只需要修改文件 [src/plugin/lib/language.ts](https://github.com/qiu8310/minapp/blob/master/packages/minapp-vscode/src/plugin/lib/language.ts))

  ![示例图片](https://n1image.hjfile.cn/res7/2018/04/09/0b4573624091b04566232c38df08e323.gif)


## 属性值也可以自动补全
 - 在属性值中输入空格可以触发，补全后自动会将空格覆盖

  ![示例图片](https://n1image.hjfile.cn/res7/2018/03/10/aaba780a36f1de1b87687295bc6fc922.gif)

## 根据组件属性值的不同，自动筛选出对应支持的属性集合
  - 当 picker 的 mode="selector" 时，有 `range` 和 `range-key` 的属性
  - 当 picker 的 mode="time" 时，有 `start` 和 `end` 的属性

  ![示例图片](https://n1image.hjfile.cn/res7/2018/03/09/5c5704b51a37df84b5c6663d29a545f6.gif)

## 自定义组件自动补全（纯 wxml 文件才支持，vue 文件不支持）
  - 自动获取对应 json 文件中的组件信息
  - 优先提示自定义组件
  - 自动获取组件中属性的描述

  ![示例图片](https://n1image.hjfile.cn/res7/2018/03/09/fce0b3e9496cae95c1c81523725a1fef.gif)
