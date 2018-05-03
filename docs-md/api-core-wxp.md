---
title: wxp
---


### `wxp` 是官方 `wx` 接口的 promise 化的版本

* `wx` 上所有接口都能在 `wxp` 上找到
* `wxp` 会将 `wx` 接口中需要提供 `success/fail/complete` 回调函数的所有接口 promise 化
* 为了和 `wx` 接口兼容，你也可以在 `wxp` 中使用 `success/fail/complete` 回调函数
* `wxp` 也给 `Promise` 注入了一个 `finally` 方法，类似于 `complete` 函数

### 调用方法

  ```js
  import {wxp} from '@minapp/core'
  ```



### 示例

1. 在 async/await 中使用

    ```js
    async onLoad() {
      let res = await wxp.getUserInfo()
    }
    ```

2. 原生 Promise

    ```js
    onLoad() {
      wxp.getUserInfo()
        .then(res => {
          // 处理结果
        })
        .catch(e => {
          // 处理错误
        })
        .finally(() => {
          // 请求完成
        })
    }
    ```

3. 像 wx 一样使用

    ```js
    wxp.getUserInfo({
      success() {

      },
      fail() {

      },
      complete() {

      }
    })
    ```


> 源代码： [wxp](https://github.com/qiu8310/minapp/blob/master/packages/minapp-wx/src/wxp.ts)
