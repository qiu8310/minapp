---
title: 自定义 webpack 配置
---

在根目录上使用文件 `webpack.minapp.js` 或 `webpack.minapp.ts`（如果使用了 ts，需要安装 `ts-node` 模块）

**注意：**

- minapp@v1 使用的是 webpack@3，所以请使用 webpack@3 相关的插件或配置
- minapp@v2 使用的是 webpack@4，所以请使用 webpack@4 相关的插件或配置

如:

```js
// webpack.minapp.js

module.exports = function(webpackOpts, webpack, env) {
  // minapp build 时 env.mode 为 production
  // minapp dev   时 env.mode 为 development

  if (env.mode === 'production') {

  } else {

  }

  // env 中还有许多其它环境相关的变量，输出查看其结构
  // console.log(env)
}
```

```ts
// webpack.minapp.ts

export default function(webpackOpts: any, webpack: any, env: any) {
  // minapp build 时 env.mode 为 production
  // minapp dev   时 env.mode 为 development

  if (env.mode === 'production') {

  } else {

  }

  // env 中还有许多其它环境相关的变量，输出查看其结构
  // console.log(env)
}

```

### 另外 minapp v2 中，可以自定义修改 loader 或 loader 的配置，如：

```js
module.exports.updateLoaders = function(loaders, env) {
  /** 修改 ts loader **/
  loaders.ts.loader = 'awesome-typescript-loader' // 使用本地的 awesome-typescript-loader
  loaders.ts.options = {} // 修改配置


  /** 添加 postcss plugin **/
  loaders.postcss.options.plugins.push(/* your plugin */)


  /** 添加 babel plugin (ts 项目不会使用 babel-loader) **/
  loaders.babel.options.plugins.push(/* your plugin */)


  /** 查看 loaders 结构 **/
  console.log(loaders)
}
```
