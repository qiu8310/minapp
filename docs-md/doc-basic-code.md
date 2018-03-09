---
title: 基本代码
---


**MyStore.js**

```js
// MyStore.js 建一个 MobxStore 类

import {MobxStore} from '@minapp/mobx'
import {observable} from 'mobx'

export class MyStore extends MobxStore {
  @observable userInfo = null
}
```


**MyApp.js**

```js
// MyApp.js
import {MobxApp, MobxStore, appify, wxp} from '@minapp/mobx'
import {MyStore} from './MyStore'

// appify 主要是将 MyApp 转化成一个 PlainObject，并传入微信原生的函数 App 中；另外注入全局 store 和框架需要的数据
@appify(
  new MyStore(),
  {
    // 下面两个参数主要是提供给 @minapp/mobx 框架使用，生成一个 $url 实例，让你可以方便的在 url 之间跳转
    pages: require('./app.json?pages'),           // 获取 app.json 中的 pages 字段
    tabBarList: require('./app.json?tabBar.list') // 获取 app.json 中的 tabBar.list 字段
  }
)
export class MyApp extends MobxApp {
  async onLoad() {
    this.store.userInfo = (await wxp.getUserInfo()).userInfo // 轻松修改全局数据
  }
}
```

**IndexPage.js**

```js
import {MobxPage, pagify} from '@minapp/mobx'

// 类似于 appify，所有 Page 都需要调用 pagify；
// 它会将 IndexPage 转化成 PlainObject，并传入微信原生的函数 App 中；
// 另外会像这个对象中注入 app 实例和 app.store 对象
@pagify()
export class IndexPage extends MobxPage {
  onLoad() {
    // getUserInfo 是网络接口，所以当 indexPage 加载完的时候，app 中的接口不一定请求完了，所以要判断
    if (this.store.userInfo) {

    }
  }
}
```
