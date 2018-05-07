# minapp-vscode

wxml/pug/vue 语言中，微信小程序标签、属性的智能补全


## 最近更新 [see more](./CHANGELOG.md)

* 【2018-05-07】1.2.0 模板文件支持变量高亮，[详情见下文](#highlight)
* 【2018-05-03】1.1.0 支持 link，[详情见下文](#link)
* 【2018-04-05】1.0.12 开始，支持 pug 语言的自动补全，[详情见下文](#vue)
* 【2018-03-28】1.0.8 之前用户注意：
  ![重要通知](https://n1image.hjfile.cn/res7/2018/03/23/0520246bc52ca0b726a3ca4097104ba0.png)

<!-- <div style="color:red; font-size: 1.6em;">重要通知：由于旧版本不小心被我删除了，所以请 1.0.7 版本之前的用户删除旧版本再重新安装新版本；否则可能会无法成功安装新版本，并且也得不到新版本的推送！</div> -->

## 主要功能

* [标签名与属性自动补全](#tag-and-attr)
* [根据组件已有的属性，自动筛选出对应支持的属性集合](#smart-attr)
* [属性值自动补全](#attr-value)
* [在 vue 模板文件中也能自动补全，同时支持 pug 语言](#vue)
* [支持 link（纯 wxml 或 pug 文件才支持，vue 文件不支持）](#link)
* [自定义组件自动补全（纯 wxml 文件才支持，vue 文件不支持）](#custom-component)
* [模板文件中 js 变量高亮（纯 wxml 文件才支持，vue 文件不支持）](#highlight)

> **所有自动补全的模板数据都来自于官方文档，通过[脚本](https://github.com/qiu8310/minapp/tree/master/packages/minapp-generator)自动获取的**

<a id="tag-and-attr"></a>

## 标签名与属性名自动补全

* wxml 中需要输入 `<` 才会触发标签补全，而 pug 语言只需要写标签开头即能触发标签补全
* 输入空格才会触发对应标签的属性补全

![示例图片](https://n1image.hjfile.cn/res7/2018/03/01/13631761451ae134c6eb3ea2ed1a6a12.gif)

<a id="smart-attr"></a>

## 根据组件已有的属性，自动筛选出对应支持的属性集合

- 当 picker 的 mode="selector" 时，有 `range` 和 `range-key` 的属性
- 当 picker 的 mode="time" 时，有 `start` 和 `end` 的属性

![示例图片](https://n1image.hjfile.cn/res7/2018/03/09/5c5704b51a37df84b5c6663d29a545f6.gif)


<a id="attr-value"></a>

## 属性值自动补全

- 在属性值中输入空格可以触发，补全后自动会将空格覆盖

![示例图片](https://n1image.hjfile.cn/res7/2018/03/10/aaba780a36f1de1b87687295bc6fc922.gif)


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



<a id="link"></a>

## 支持 link（纯 wxml 或 pug 文件才支持，vue 文件不支持）

- 默认只会 link src 标签，并且文件需要存在，不存在不会加 link
- 可以配置 `minapp-vscode.linkAttributeNames` 来扩展额外的支持 link 的标签，将此值配置成空数组，可以禁用 link 功能
- 可以配置 `minapp-vscode.resolveRoots` 来使用相对目录解析图片路径


![示例图片](https://n1image.hjfile.cn/res7/2018/04/27/dd7f301dc1e1593209d7f7ac169fd047.gif)


<a id="custom-component"></a>

## 自定义组件自动补全（纯 wxml 文件才支持，vue 文件不支持）

- 自动获取对应 json 文件中的组件信息
- 优先提示自定义组件
- 自动获取组件中属性的描述

![示例图片](https://n1image.hjfile.cn/res7/2018/03/09/fce0b3e9496cae95c1c81523725a1fef.gif)


<a id="highlight"></a>

## 模板文件中 js 变量高亮（纯 wxml 文件才支持，vue 文件不支持）

- 默认开启高亮，可以配置 `minapp-vscode.disableDecorate` 为 `true` 来关闭高亮
- 默认高亮颜色使用紫色，可以配置 `minapp-vscode.decorateType` 来使用你喜欢的颜色，如 `{"color": "red"}`
- 默认会将 "{{" 与 "}}" 之间的所有字符都高亮，可以配置 `minapp-vscode.decorateComplexInterpolation` 为 `false`，这样只有变量（如：`foo`, `foo.prop`, `foo[1]`）会高亮，而表达式（如：`foo + bar`, `foo < 3`）不会高亮，而使用原本的颜色

![示例图片](https://n1image.hjfile.cn/res7/2018/05/07/c6dd2e8613fbb02417029fb3dbd302ce.png)


## TODO

* [x] 单独的 wxml 文件样式实现和 vue 中的 wxml 文件样式一样的风格
* [ ] bind 或 catch 相关的属性可以点击，并跳转到对应的函数上
* [ ] 自动创建文件关联（.cjson, .wxss）
