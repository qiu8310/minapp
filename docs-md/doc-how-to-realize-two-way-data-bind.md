---
title: 如何在原生的微信小程序中实现数据双向绑定
---

在原生小程序开发中，数据流是单向的，无法双向绑定，但是要实现双向绑定的功能还是蛮简单的！


> 下文要讲的是小程序框架 [minapp][minapp] 中实现双向绑定的原理，在 [minapp][minapp] 中，你只需要在 wxml 模板中给组件的属性名后加上 `.sync` 就可以实现双向绑定。下面为了解释其原理，过程可能会说的稍微复杂些，但其实 [minapp][minapp] 框架已经处理了那些繁杂的细节！


首先，**要使数据双向绑定，应该避免过多的数据源**。
在数据从上到下自然流动的情况下，如果每个组件中都维护它们自己的数据，而又要保持它们数据值的一致，这虽然可以做到，但实现过程并不会简单。
但是也没必要说为了有一个统一的数据源就使用 **mobx** 或 **redux** 来全局管理数据，这就有点杀鸡用牛刀的感觉了。
由于双向绑定只存在于父子组件之间，而数据又是从父到子传递的，所以可以优先使用父组件中的数据为数据源，
子组件每次更新数据并不更新它自己内部的数据，而是通过事件机制触发父组件更新它的数据，而父组件更新数据后又会将更新的数据自然地传给子组件，
由此达到数据的双向流动！

![data-stream](https://n1image.hjfile.cn/res7/2018/03/09/7b2b06c970055559fc6181d55b51c57a.png)


并不是所有数据都需要双向绑定，也并不是所有数据都是对外的，子组件还可以有它自己的一个内部数据。所以这就涉及到我们要说的第二个问题：**区分哪些数据需要双向绑定，哪些数据又需要子组件自己维护**。

用过 **vue** 的应该都知道，在 vue 中要实现双向绑定，需要在模板中做特殊处理。比如要将父组件的 `parentAttr` 双向绑定到子组件的 `childAttr` 上，需要在父组件的模板中这样写：

```html
<child childAttr.sync="parentAttr" />
```

但是小程序并没有这样的简单的语法，小程序的 wxml 语言的属性名中甚至都不允许出现 " . " 这样的字符。回到我们的问题上来，**子组件需要知道哪些属性需要双向绑定，哪些属性需要自己维护**，
给模板加个字段（`syncAttrMap`）专门来告诉子组件需要双向绑定的数据集合不就行了么。如，可以将上面的示例写成微信小程序支持的写法：

```html
<child childAttr="{{parentAttr}}" syncAttrMap="childAttr=parentAttr" />

<!--
  如果同时存在多个双向绑定和不需要双向绑定的属性时，可以写成下面这样：
  p1, p2 分别双向绑定到子组件的 c1, c2，而 p3 单向绑定到 c3 上
-->

<child c1="{{p1}}" c2="{{p2}}" c3="{{p3}}" syncAttrMap="c1=p1&c2=p2" />
```


接着，就需要处理**子组件数据更新的问题**了，在子组件中有两部分数据，一部分是内部数据，另一部分是父组件中的数据，
子组件可以通过读取属性 `syncAttrMap` 来得到哪些数据是内部的数据，哪些数据是父组件的数据，并且可以知道对应
的父组件中的数据的键名是什么。由于原生的组件方法 `setData` 不会管你是内部数据，还是父组件中的数据，只要
你调用它去更新数据，它只会更新内部的数据。所以需要另外实现一个新的方法，来自动判断数据源，如果是内部数据，
则直接调用 `setData` ；如果是双向绑定中的父组件数据，则可以触发一个事件去通知父组件去更新对应的值。

所以根据上面的描述，父组件需要有个监听函数，子组件需要有个智能的 `setData` 函数。不防将父组件的监听函数
命名为 `onSyncAttrUpdate`，将子组件的智能 `setData` 函数命名为 `setDataSmart`，则可以有如下代码：


```js
// 父组件
Component({
  methods: {
    onSyncAttrUpdate(e) {
      this.setData(e.detail) // 子组件传来的需要更新的数据
    }
  }
})

```

```html
<!-- 父组件的模板 -->
<child childAttr="{{parentAttr}}" syncAttrMap="childAttr=parentAttr" bind:syncAttrUpdate="onSyncAttrUpdate" />
```

```js
// 子组件
Component({
  properties: {
    childAttr: String,
    syncAttrMap: String
  },
  methods: {
    // 子组件更新数据时，只要调用此方法即可，而不是 `setData`
    setDataSmart(data) {
      // splitDataBySyncAttrMap 函数的实现过程就不说了，只是将对象拆分，大家应该都能实现
      let {parentData, innerData} = splitDataBySyncAttrMap(data, this.data.syncAttrMap)

      // 内部数据使用 setData 更新
      if (Object.keys(innerData).length) {
        this.setData(innerData) // setData 中还支持 callback 的回调，为了简化代码，这里不讨论
      }

      // 双向绑定的父组件数据触发事件让父组件自己去更新
      if (Object.keys(parentData).length) {
        this.triggerEvent('syncAttrUpdate', parentData)
      }
    }
  }
})

```

到此，一个简单的双向绑定功能就完成了。但是由于子组件也有可能包含其它组件，也就是说子组件也可以是父组件，而父组件同样也
可以是子组件。所以上面的 `onSyncAttrUpdate` `setDataSmart` 函数需要在每个组件中都实现，所以不防
定义一个公共对象 `BaseComponent` 来实现上面的所有功能，如：

```js
// BaseComponent
const BaseComponent = {
  properties: {
    syncAttrMap: String
  },
  methods: {
    setDataSmart() {
      // ...
    },
    onSyncAttrUpdate() {
      // ...
    }
  }
}
```

然后将 BaseComponent minin 到每个组件的对象上去就可以了；另外小程序中还有一个特殊的组件：**Page**，虽然 Page 和 Component 结构是两样的，
但它也应该算是一个组件，不过它一定是父组件，不可能是别的组件的子组件，所以还需要将 `onSyncAttrUpdate` 方法写了所有的 Page 定义中。
所有这些就是 [minapp][minapp] 的双向绑定的基本原理了。


等等，最后还有一件事：**wxml 模板**，不能让用户每次写双向绑定的时候都要写那么复杂语句吧？当然不用，[minapp][minapp] 在编译时，会将模板做个简单的转化：

```html
<child childAttr.sync="parentAttr" />

<!-- 由于属性名 syncAttrMap 是固定的，所以完全可以通过编译手段，将上面的模板转成下面这个模板 -->

<child childAttr="{{parentAttr}}" syncAttrMap="childAttr=parentAttr" />
```


谢谢，文章到此结束，欢迎关注 [minapp：重新定义微信小程序的开发][minapp]


[minapp]: https://github.com/qiu8310/minapp
