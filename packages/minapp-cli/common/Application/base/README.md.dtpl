## minapp 开发简易手册

### 开发环境

* vscode 用户
  - 安装插件 [minapp](https://marketplace.visualstudio.com/items?itemName=qiu8310.minapp-vscode)：提供 wxml 的语法高亮和自动补全功能
  - 安装插件 [dot-template](https://marketplace.visualstudio.com/items?itemName=qiu8310.dot-template-vscode)：提供快速创建模板文件功能

* 非 vscode 用户
  - wxml 插件功能暂时无法提供，你可以搜索对应插件市场是否有类似插件
  - 模板文件可以通过安装 `npm i -g dot-template-cli`，并在 `@minapp/cli` 创建的项目根目录下执行 `dtpl watch` 命令，即可实现 vscode 插件 dot-template 类似的功能

### 注意事项

1. `.cjson` 后缀的文件表示的是带注释的 json 文件，你可以在 vscode 中配置文件关联(minapp 项目中的 json 文件都支持带注释)
2. 由于微信原生 api 并不支持 class，所以除 `Store` 外，`App`，`Component` 和 `Page` 相关的类都要遵循下面的约束：

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
