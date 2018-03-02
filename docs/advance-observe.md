---
title: 个性化定制Page和Component
---

* 默认情况下，所有的 page 都会自动监听全局 store 的变化，而 component 则不会，
  所以，如果要在 page 中禁用，或在 component 中启用，可以这样做：

  ```js
  // 在 page 中禁用
  @pagify({observe: false})
  export MyPage extends BasePage {

  }

  // 在 component 中启用
  @comify({observe: true})
  export MyComponent extends BaseComponent {

  }
  ```

* 默认情况下，如果启用了 observe，会将所有的 store 中的属性注入到 data 中，可能会和你自己定义的数据冲突，
  或者你只想监听 store 中的某个字段，你可以这样做（ page 和 component 做法一样）：

  ```js
  @pagify({mapStoreToData: (store) => {
    return {
      newKey: store.oldKey
    }
  }})
  export MyPage extends BasePage {

  }
  ```

* 使用 mixin 扩展组件功能

  如 [编码准则](./advance-code.md) 中所述，框架中的 App，Page，Component 的子类并不是完整的 class，有一些 class
  的功能你不能使用，但你可以使用下面的 mixin 来实现你需要的功能

  ```js
  const mixins = [
    {
      onLoad() {
        console.log('in mixin')
      }
    }
  ]

  @pagify({minxins})
  export MyPage extends BasePage {
    onLoad() {
      console.log('in page')
    }
  }
  ```

  上面两个 onLoad 都会执行，**注意：minxins 必须保证函数的执行顺序是无关的**
