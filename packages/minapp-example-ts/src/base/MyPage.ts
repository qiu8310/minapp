/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {BasePage} from '@minapp/mobx'
import {MyStore} from './MyStore'
import {MyApp} from './MyApp'


/*
  写继承时要注意，由于微信的 Page 函数需要接受一个 Object 而不是一个 Class 对象，
  所以在 @minapp/mobx 框架中会将 Class 实例扁平化压缩成 Object，故下面几点要注意：

  1. 除了 constructor 函数中可以调用 super，其它类方法中都不能用 super （可以使用 mixin 来实现）

  2. 不要在 class 的类方法中使用箭头函数，但可以在类方法内部使用（主要因为箭头函数将 this 绑定死了 Class，无法转到 Object 上）

    不可以这样用：
    ```ts
    class MyPage extends BasePage {
      foo = () => this.app
    }
    ```

    可以这样用：
    ```
    class MyPage extends BasePage {
      foo() {
        someArr.forEach(() => {})
      }
    }
    ```

  3. 最好不要使用 `get prop() {}`，@minapp/mobx 框架支持，但微信内部会遍历 Object 中的属性的值，
    所以你的 prop 在 Page 还没初始化前就会被调用，有可能会导致错误

    最好不要这样用：
    ```ts
    class MyPage extends BasePage {
      get foo() {
        return 123
      }
    }
    ```
 */
export class MyPage<D = any> extends BasePage<D, MyStore, MyApp> {

}
