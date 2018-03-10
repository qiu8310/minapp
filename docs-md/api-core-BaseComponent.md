---
title: BaseComponent
---

### Class 属性及方法：

* **getApp()**

  获取 app 实例，对微信原生全局函数 `getApp()` 的简单封装


* **setDataSync(data, callback?)**

  对 `setData` 的封装，不过 `setDataSync` 还支持 **数据双向绑定** 及 **hide 状态下不更新 data** 的两个功能

* **生成周期函数：**

  - `onCreated：`组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData
  - `onAttached：`组件生命周期函数，在组件实例进入页面节点树时执行
  - `onReady：`组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
  - `onMoved：`组件生命周期函数，在组件实例被移动到节点树另一个位置时执行
  - `onDetached：`组件生命周期函数，在组件实例被从页面节点树移除时执行
  - `onPropUpdate(prop: string, newValue: any, oldValue: any)：`组件中 data 值变化时调用


### Example：

```js

import {BaseComponent, comify} from '@minapp/core'

@comify({
  mixins: []
})
export default class extends BaseComponent {
  async onReady() {
    // todo
  }
}

```


> 源代码： [BaseComponent.ts](https://github.com/qiu8310/minapp/blob/master/packages/minapp-core/src/system/module/BaseComponent.ts)
