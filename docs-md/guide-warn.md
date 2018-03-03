---
title: 重要提醒
---

### 开发前的准备：

  1. 注册小程序：[点此直接跳到微信小程序注册页面](https://mp.weixin.qq.com/wxopen/waregister?action=step1)
  2. 登录 https://mp.weixin.qq.com/ 在菜单 “设置”-“开发设置” 中可以看到小程序的 AppID
  3. 安装官方提供的[开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)
  4. 使用 minapp init 新建项目，过程中会让你提供 appid，如果没提供，可以手动修改 src/project.config.json 中的 appid 字段

  更多详细介绍可以前往[微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/)

### 关于 project.config.json

主要是下面的 setting 部分，`es6`、`postcss`、`minified` 都设置为 false 即可，`minapp build` 的时候会自动为你做这些事；
默认情况下 `minapp init` 初始化的项目都已经帮你配置好了，你无需修改

```json
"setting": {
  "urlCheck": true,
  "es6": false,
  "postcss": false,
  "minified": false,
  "newFeature": true
}
```


