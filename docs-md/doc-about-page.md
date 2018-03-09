---
title: 关于 Page
---

* 默认情况下，所有的 page 都会自动监听全局 store 的变化，可以设置 observe 来禁用：

  ```js
  import {MobxPage} from '@minapp/mobx'
  // 在 page 中禁用
  @pagify({observe: false})
  export MyPage extends MobxPage {

  }
  ```

* 默认情况下，如果启用了 observe，会将所有的 store 中的属性注入到 data 中，可能会和你自己定义的数据冲突，
  或者你只想监听 store 中的某个字段，你可以这样做：

  ```js
  @pagify({mapStoreToData: (store) => {
    return {
      newKey: store.oldKey
    }
  }})
  export MyPage extends MobxPage {

  }
  ```

* 不用担心使用了全局对象会造成 page 的频繁更新，当你使用 `setDataSync` 时，当页面处于 hide
  状态时，并不会真正更新隐藏的页面数据，而等到页面 show 后，会统一更新页面数据。

  如果不想要此功能，可以设置 `lazySetData` 为 false 来禁用此功能

  ```js
  @pagify({lazySetData: false})
  export MyPage extends MobxPage {

  }
  ```

* 使用 mixin 扩展组件功能

  如 [编码准则](./doc-coding-rule.md) 中所述，框架中的 App，Page，Component 的子类并不是完整的 class，有一些 class
  的功能你不能使用，但你可以使用下面的 mixin 来实现你需要的功能

  ```js
  const mixins = [
    {
      onLoad() {
        console.log('in mixin')
      }
    }
  ]

  @pagify({mixins})
  export MyPage extends MobxPage {
    onLoad() {
      console.log('in page')
    }
  }
  ```

  上面两个 onLoad 都会执行，**注意：mixins 必须保证函数的执行顺序是无关的**
