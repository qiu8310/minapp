---
title: 代码自动补全
---

> **说明：**以下自动补全主要是在 vscode 编辑器中实现的，其它编辑器没有测试过；不过除了 wxml 使用了一个 vscode 插件外，
> 其它都是编辑器自己实现的，所以其它编辑器应该也能实现下面要说到的这些自动补全的功能！


### 为了得到更好的体验，请先安装如下两款 vscode 插件

* [minapp-vscode][minapp-vscode]: 实现 wxml 中的自动补全功能
* [dot-template-vscode][dot-template-vscode]：实现自动创建模板文件功能

> 非 vscode 用户，可以使用 `dot-template-cli` 来替代 dot-template-vscode 插件，需要在命令行上执行如下命令即可
> ```bash
> npm install -g dot-template-cli
> dtpl watch # 在项目根目录上运行
> ```
>
> **注意：不要同时使用 dot-template 的命令行和vscode插件**


### ts / js 中自动补全

* wx 的所有接口自动补全，包括函数名、函数的参数、函数的返回值，补全的数据包括描述、数据类型、兼容版本号、使用实例、甚至对应的官方文档链接

  ![wx](https://n1image.hjfile.cn/res7/2018/03/01/428c4297bb1f6b6cf335317f89bab237.gif)

  **自动补全数据全是从官方文档抓取下来的，会定期更新；[查看 wx.d.ts 文件](https://github.com/qiu8310/minapp/blob/master/packages/minapp-generator/gen/api/wx.d.ts)**

* wxp（wx的promise版本）的所有接口的自动补全
  - 为了方便兼容 wx 接口，wxp 接口也支持使用 success/fail/complete 函数
  - wxp 会给 Promise 添加了一个 finally 方法；如，你可以这样用 `wxp.getUserInfo().finally(() => { /* do something */ })`

  ![wxp](https://n1image.hjfile.cn/res7/2018/03/01/a8ccc97ac7146b81e080daf8eb778b4d.gif)

  **自动补全数据全是从官方文档抓取下来的，会定期更新；[查看 wxp.d.ts 文件](https://github.com/qiu8310/minapp/blob/master/packages/minapp-generator/gen/api/wxp.d.ts)**

* Page 类支持的所有方法自动补全

  ![page](https://n1image.hjfile.cn/res7/2018/03/01/18702b10498aee7ddc394eb04a703a43.gif)

* Component 类中支持的所有方法自动补全

  ![component](https://n1image.hjfile.cn/res7/2018/03/01/5ad639730bee6eea44d93a22edfc8921.gif)



### 小程序 json 文件自动补全

* app.json 自动补全
* page.json 自动补全
* component.json 自动补全

![json](//n1image.hjfile.cn/res7/2018/03/01/ee0ec301194156469cfe5533a2008d04.gif)

json 自动补全是根据预定义的元数据来实现的，参考 [http://json-schema.org/](http://json-schema.org/)

所有相关的元数据定义在此：[qiu8310/minapp/schema](https://github.com/qiu8310/minapp/tree/master/schema)


### wxml 文件自动补全 (vscode 中需要安装 [minapp-vscode][minapp-vscode])

* 支持所有标签名的补全（输入 `<` 即可触发）
* 支持所有标签的属性的补全（在标签中输入空格 ` ` 即可触发）
* 支持所有 wx 的控制语句的自动补全 (输入 `wx:` 可触发)
* 支持所有事件的自动补全（输入 `bind:` 或 `catch:` 可触发）
* 鼠标悬浮在标签上可以看到标签的文档
* 鼠标悬浮在标签属性上可以看到标签属性的文档

![wxml](https://n1image.hjfile.cn/res7/2018/03/01/13631761451ae134c6eb3ea2ed1a6a12.gif)

**自动补全使用的数据是从官方文档上抓取的，数据会定期更新，请放心使用；[查看当前抓取的组件数据文件](https://github.com/qiu8310/minapp/blob/master/packages/minapp-generator/gen/tpl/components.json)**


[minapp-vscode]: https://marketplace.visualstudio.com/items?itemName=qiu8310.minapp-vscode
[dot-template-vscode]: https://marketplace.visualstudio.com/items?itemName=qiu8310.dot-template-vscode
