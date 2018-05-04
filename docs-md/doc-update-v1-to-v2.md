---
title: v1.x -> v2.x 升级指南
---

[更新日志](https://github.com/qiu8310/minapp/blob/master/CHANGELOG.md)

## minapp.json 更新指南

* **Deprecated：** `compiler.px2rpx` 和 `compiler.rpx2px` 已经废弃了，需要使用 `compiler.unitTransformer` 来替换，因为，v1.x 默认会开启 px2rpx 和 rpx2px，而在 v2.x 中，需要手动配置。[详情参考此](https://qiu8310.github.io/minapp/docs/doc-about-style.html)

* **Deprecated：** `compiler.devServer` 中配置 `port` 和 `host` 将会无效，需要使用命令行配置，如 `minapp dev --port 9000`，或者使用 `webpack.minapp.js` 配置；另外，webpack4 会自动判断端口是否占用，如果占用会自动使用相邻的未占用的端口。

* **Added：** compiler 下添加新的配置项：srcDir, distDir, npmOutputFolder, staticFileExtensions, staticOutputName, staticOutputFolder，详情查看自动补全

## package.json 更新指南

* **Breaks：** v2 不再使用 `awesome-typescript-loader`，改用了 `ts-loader`，所以 ts 项目需要在本地安装 `ts-loader`
* **Breaks：** 使用 `less` 的项目需要额外安装 `less` 和 `less-loader`；而使用了 `sass` 的项目需要额外安装 `sass` 和 `sass-loader`
* **Breaks：** `@minapp/core` 中不再自带 `wx` 和 `wxp` 模块，这些模块单独移动到 `@minapp/wx` 中了，所以当更新 `@minapp/core` 到 2.x 后，还需要安装 `@minapp/wx`

  **从 2.0.0 开始，@minapp/wx 以后会跟着官方 api 的版本号走，可能不会再和 @minapp/core 的版本保持一致，而要和小程序配置文件 project.config.json 中的 libVersion 版本号保持一致**

**快速更新 package.json：**

- ts 项目
  - 使用了 sass：     `npm i --save @minapp/core@2 @minapp/wx@2 && npm i --save-dev ts-loader sass-loader sass`
  - 使用了 less：     `npm i --save @minapp/core@2 @minapp/wx@2 && npm i --save-dev ts-loader less-loader less`
  - 使用了 css/wxss： `npm i --save @minapp/core@2 @minapp/wx@2 && npm i --save-dev ts-loader`
- js 项目
  - 使用了 sass：     `npm i --save @minapp/core@2 @minapp/wx@2 && npm i --save-dev sass-loader sass`
  - 使用了 less：     `npm i --save @minapp/core@2 @minapp/wx@2 && npm i --save-dev less-loader less`
  - 使用了 css/wxss： `npm i --save @minapp/core@2 @minapp/wx@2`


## webpack.config.js 或 webpack.config.ts 更新指南

完全兼容，可以不做修改；只是加了一个参数，和一个新的函数

* **Added：** 修改 webpack 配置的函数添加第三个 `env` 参数，可以获取当前环境相关的数据，[详情参考此](https://qiu8310.github.io/minapp/docs/doc-custom-webpack.html)
* **Added：** 新添加一个函数 `updateLoaders`，可以修改 loader 或 loader 的配置，[详情参考此](https://qiu8310.github.io/minapp/docs/doc-custom-webpack.html#minapp-v2-loader-loader)


## 其它

* 新添加命令 `minapp clear`，可以快速清空 `dist` 目录
* 可以将 `@minapp/cli` 安装在本地，即使全局安装了 `@minapp/cli`，也会优先使用本地的命令行
