---
title: 自定义 webpack 配置
---

在根目录上使用文件 `webpack.minapp.js` 或 `webpack.minapp.ts`（如果使用了 ts，需要安装 `ts-node` 模块）

**注意：目前 minapp 使用的是 webpack@3，所以请使用 webpack@3 相关的插件或配置**

如:

```js
// webpack.minapp.js

module.exports = function(webpackOpts) {

  // 在这里修改 webpackOpts

  return webpackOpts
}
```

```ts
// webpack.minapp.ts

export default function(webpackOpts: any) {

  // 在这里修改 webpackOpts

  return webpackOpts
}

```
