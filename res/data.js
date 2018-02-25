
/*
  [minapp-generator]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-generator
  [minapp-core]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-core
  [minapp-mobx]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-mobx
  [minapp-wxml-parser]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-wxml-parser
  [minapp-webpack-utils]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-webpack-utils
  [minapp-compiler]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-compiler
  [minapp-cli]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-cli
  [minapp-example-ts]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-example-ts
  [minapp-example-js]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-example-js
  [minapp-vscode]: https://github.com/qiu8310/minapp/tree/master/packages/minapp-vscode
*/

const data = [
  {
    name: 'generator',
    summary: [
      '此模块负责解析微信官方文档，生成结构化的数据，供其它模块使用',
      '* 抓取 [wx 所有 api](https://mp.weixin.qq.com/debug/wxadoc/dev/api/)，生成 [[gen/api/wx.d.ts]] 和 [[gen/api/wxp.d.ts]] 两个 TypeScript 的定义文件，为 [[@minapp/core]] 提供数据支持',
      '* 抓取 [组件文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/)，生成结构化的 json 数据 [[gen/tpl/components.json]]，为 [[@minapp/vscode]] 提供数据支持',
    ]
  },

  {
    name: 'core',
    summary: [
      '此模块主要提供 TypeScript 版的微信文档，包括下面数据：',
      '* [wx 对象][typing/wx.d.ts]',
      '* [App 函数][typing/app.d.ts]',
      '* [Page 函数][typing/page.d.ts]',
      '* [Component 函数][typing/component.d.ts]',
      '* [Behavior 函数][typing/behavior.d.ts]',
      '',
      '另外，最重要的是提供了一个 promise 版的 wx 对象，即 [wxp][src/index.ts]，需要使用 `import wxp from "@minapp/core"` 来使用',
    ]
  },

  {
    name: 'mobx',
    summary: [
      '这是一个小程序开发框架，类似于 wepy。内置了 mobx 框架。需要借助 [[@minapp/cli]] 来编译。框架主要提供的功能有：',
      '* 使用了 class 继承的方式来开发小程序',
      '* 完美集成了 [[@minapp/core]]，所以拥有所有 wx api 及 page 的 hooks 函数的语法提示，',
      '* wxml 中所有组件、组件属性、组件事件 的自动补全，需配合 vscode 插件 [[@minapp/vscode]] 使用',
      '* json 文件的自动补全'
    ]
  },

  {
    name: 'webpack-utils',
    summary: [
      '一些 webpack 的 loader 和 plugin，用户编译微信小程序代码，包括：',
      '* js-loader',
      '* json-loader',
      '* wxml-loader',
      '* wxss-loader',
      '* ExtractMinappCode plugin',
      '* px2rpx postcss plugin'
    ]
  },


  {
    name: 'cli',
    summary: [
      'minapp 的一个命令行工具，用于创建项目、开发项目、编译项目'
    ]
  },

  {
    name: '',
    summary: []
  },

  {
    name: '',
    summary: []
  },
]

export default data
