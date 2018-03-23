# minapp-vscode

![重要通知](https://n1image.hjfile.cn/res7/2018/03/23/0520246bc52ca0b726a3ca4097104ba0.png)
<!-- <div style="color:red; font-size: 1.6em;">重要通知：由于旧版本不小心被我删除了，所以请 1.0.7 版本之前的用户删除旧版本再重新安装新版本；否则可能会无法成功安装新版本，并且也得不到新版本的推送！</div> -->

微信小程序模板语言 wxml 语法高亮，并提供标签名、属性名、属性值的智能补全（同时支持在 vue 模板中补全）

> **所有自动补全的模板数据都来自于官方文档，通过[脚本](https://github.com/qiu8310/minapp/tree/master/packages/minapp-generator)自动获取的**

## 标签名与属性名自动补全

![示例图片](https://n1image.hjfile.cn/res7/2018/03/01/13631761451ae134c6eb3ea2ed1a6a12.gif)


## 在 vue 模板文件中也能自动补全
  - 需要指定 template 的 lang="wxml"，如 `<template lang="wxml"></template>`

  ![示例图片](https://n1image.hjfile.cn/res7/2018/03/17/07a2f53003393202183b100597eaf49d.gif)


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
