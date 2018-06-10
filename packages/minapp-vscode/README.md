# minapp-vscode

wxml/pug/vue 语言中，微信小程序标签、属性的智能补全（同时提供 snippets）


## 最近更新 【[see more](https://github.com/qiu8310/minapp/blob/master/packages/minapp-vscode/CHANGELOG.md)】

* 【2018-06-10】1.5.0 纯 wxml 文件中支持 [wxs 标签](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/01wxs-module.html)
* 【2018-06-05】1.4.0 自动补全支持生成 self close tag。 可以在配置项 `minapp-vscode.selfCloseTags` 中配置这些 tag
* 【2018-05-26】1.3.0 支持 snippets，并内置了一些常用的 snippets [详情见下文](#snippets)
* 【2018-05-07】1.2.0 模板文件支持变量高亮，[详情见下文](#highlight)
* 【2018-05-03】1.1.0 支持 link，[详情见下文](#link)

<!-- <div style="color:red; font-size: 1.6em;">重要通知：由于旧版本不小心被我删除了，所以请 1.0.7 版本之前的用户删除旧版本再重新安装新版本；否则可能会无法成功安装新版本，并且也得不到新版本的推送！</div> -->

## 主要功能

* [标签名与属性自动补全](#tag-and-attr)
* [根据组件已有的属性，自动筛选出对应支持的属性集合](#smart-attr)
* [属性值自动补全](#attr-value)
* [在 vue 模板文件中也能自动补全，同时支持 pug 语言](#vue)
* [支持 link（纯 wxml 或 pug 文件才支持，vue 文件不支持）](#link)
* [自定义组件自动补全（纯 wxml 文件才支持，vue 或 pug 文件不支持）](#custom-component)
* [模板文件中 js 变量高亮（纯 wxml 或 pug 文件才支持，vue 文件不支持）](#highlight)
* [内置 snippets](#snippets)

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

## 自定义组件自动补全（纯 wxml 文件才支持，vue 或 pug 文件不支持）

- 自动获取对应 json 文件中的组件信息
- 优先提示自定义组件
- 自动获取组件中属性的描述

![示例图片](https://n1image.hjfile.cn/res7/2018/03/09/fce0b3e9496cae95c1c81523725a1fef.gif)


<a id="highlight"></a>

## 模板文件中 js 变量高亮（纯 wxml 或 pug 文件才支持，vue 文件不支持）

- 默认开启高亮，可以配置 `minapp-vscode.disableDecorate` 为 `true` 来关闭高亮
- 默认高亮颜色使用紫色，可以配置 `minapp-vscode.decorateType` 来使用你喜欢的颜色，如 `{"color": "red"}`
- 默认会将 "{{" 与 "}}" 之间的所有字符都高亮，可以配置 `minapp-vscode.decorateComplexInterpolation` 为 `false`，这样只有变量（如：`foo`, `foo.prop`, `foo[1]`）会高亮，而表达式（如：`foo + bar`, `foo < 3`）不会高亮，而使用原本的颜色

![示例图片](https://n1image.hjfile.cn/res7/2018/05/07/c6dd2e8613fbb02417029fb3dbd302ce.png)

**为了加快解析速度，颜色高亮使用的是正则表达式匹配，所以可能会出现匹配错误的情况；如果不满意，可以配置 `minapp-vscode.disableDecorate` 来禁用颜色高亮功能**

**已知问题：**

- pug 语言中注释中的变量也会高亮 （pug 是基于缩进的，正则不太好处理）


<a id="snippets"></a>

## 内置 snippets

  - 自带 swiper/icon/button/picker time/picker date/picker region/checkbox-group/radio-group，见[文件](https://github.com/qiu8310/minapp/blob/master/packages/minapp-vscode/src/plugin/res/snippets.ts)
  - 可以通过配置项 `minapp-vscode.snippets` 来定义你自己的 snippets

  _和官方的 Snippets 的区别时，这里的 Snippets 只需要指定 key 和 body 即可，组件描述自动会根据 key 来获取（另外后期可以让配置和内置的数据结合起来）_

  ![示例图片](https://n1image.hjfile.cn/res7/2018/05/26/4a25927085e96e6bd9f05bf735621a8b.gif)


## 常见问题

### 安装插件后没有出现自动补全

1. 确保安装后有重启过 vscode
2. 确保当前文件的格式是 wxml 或 wxml-pug 或 vue (不能看文件后缀名，因为可能在配置文件中把它们关联的其它文件格式；需要看 vscode 右下解显示的文件类型)
3. wxml 需要输入 `<` 才会触发标签补全，而 pug 中只需要输入标签名就会出来自动补全


## TODO

* [x] 单独的 wxml 文件样式实现和 vue 中的 wxml 文件样式一样的风格
* [ ] bind 或 catch 相关的属性可以点击，并跳转到对应的函数上
* [ ] 自动创建文件关联（.cjson, .wxss, .wxs）
* [ ] wxml 文件中路径自动补全
* [x] 添加常用的 snippets
* [x] 支持识别 self close tag
