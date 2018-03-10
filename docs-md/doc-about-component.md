---
title: 关于 Component
---

* 官方组件的生命周期函数都不是以 `on` 开头的函数，所以为了方便和 Page 中的生命周期函数统一，你可以使用带 `on` 版本的生成周期函数：

  `onCreated`, `onAttached`, `onReady`, `onMoved`, `onDetached`


* 另外官方组件中的方法需要放在 methods 中，如

  ```js
  @comify()
  export MyComponent extends BaseComponent {
    methods = {
      fn1() {
        /**/
      }
    }
  }
  ```

  这样不方便编辑器判断函数的 `this` 的作用域，所以你可以直接将上面例子中的 `fn1` 放在最外层即可，在 `comify()` 中会将这些外部的
  非生命周期函数移动到 methods 内部！


* 组件的属性中可以配置一个 `observer` 函数，如果在每个属性中都配置的话，会很麻烦，所以做了一个钩子方法 `onPropUpdate`，只要有属性变化，就会执行此方法

  ```js
  @comify()
  export MyComponent extends BaseComponent {
    onPropUpdate(propName, propNewValue, propOldValue) {

    }
  }
  ```
