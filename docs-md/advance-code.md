---
title: 编码准则
---

由于微信原生 api 并不支持 class，所以除 `Store` 外，`App`，`Component` 和 `Page` 相关的类都要遵循下面的约束：

* **除了类的 constructor 函数中可以调用 super，其它类方法中都不能用 super （可以使用 mixin 来实现）**

  不可以这样写：
  ```ts
  @pagify()
  class MyPage extends BasePage {
    foo() {
      super.foo()
    }
  }
  ```

  可以这样写：
  ```ts
  @pagify({
    mixins: [
      {
        foo() { /* do something */ }
      }
    ]
  })
  class MyPage extends BasePage {
    foo() {
      /* do something else */
    }
  }
  ```

* **不要在 class 的类方法中使用箭头函数，但可以在类方法内部使用（主要因为箭头函数将 this 绑定死了 Class，无法转到 Object 上）**

  不可以这样用：
  ```ts
  class MyPage extends BasePage {
    foo = () => this.app
  }
  ```

  可以这样用：
  ```ts
  class MyPage extends BasePage {
    foo() {
      someArr.forEach(() => {})
    }
  }
  ```

* **最好不要使用 `get prop() {}`，@minapp/mobx 框架支持，但微信内部会遍历 Object 中的属性的值，所以你的 prop 在 Page 还没初始化前就会被调用，有可能会导致错误**

  最好不要这样用：
  ```ts
  class MyPage extends BasePage {
    get foo() {
      return this.something
    }
  }
  ```
