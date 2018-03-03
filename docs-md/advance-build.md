---
title: minapp build 时注意事项
---

小程序的样式文件中不允许使用本地图片资源，所以在使用 `minapp build` 时，
如果样式中有本地资源，编译程序会报错，如果没有，则能顺利编译通过；如果一定
要在样式中用本地资源的话，请使用 `minapp build --publicPath "http://xxx.com/xxx"`
指定一个 `publicPath`，编译后静态文件全会在 `dist/static` 目录下，你
只需要把这些静态文件上传到你指定的那个服务器就行了。

### 为什么 `minapp dev` 时不需要使用 `publicPath`？

因为 dev 环境中内置了一个服务器，静态资源都会在服务器中，即 `publicPath` 自动指定成了那个内置的服务器的路径。
