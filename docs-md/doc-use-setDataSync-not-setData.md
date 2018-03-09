---
title: 使用 setDataSync 而不是 setData
---

小程序页面在跳转时，页面对象有可能并没有销毁，同时可能会有些异步函数在页面隐藏的时候才返回值，它们返回的时候可能会去调用 setData，但这时页面其实隐藏了，这些 setData 对用户来说并没有什么效果。

还可能有种更严重的情况是：当我们使用了全局数据时（如 `@minapp/mobx` 的 store），我们只要在某个地方修改 store ，可能会导致所有引用了此 store 的 page 都更新，这样小程序性能可能就不会很好了。

所以，我们需要当页面处于隐藏状态时，不去真正触发 setData，而是将这些 data 缓存起来，当页面真正出现的时候，再将缓存的这些 data 统一去调用 setData，如此，可以避免一些不必要的性能损耗，这就是 `setDataSync` 内部会处理的逻辑。

另外，如果你要使用数据双向绑定，也必须使用 `setDataSync`，详情参考： [如何在原生的小程中实现数据双向绑定](./doc-how-to-realize-two-way-data-bind.md)



> 参考：[微信官方对性能优化的建议](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html#%E5%B8%B8%E8%A7%81%E7%9A%84-setdata-%E6%93%8D%E4%BD%9C%E9%94%99%E8%AF%AF)



### 为什么不覆盖 `setData` 方法，而去添加一个新方法？

其实是有尝试过覆盖 `setData` 方法的，但微信开发者工具会报错，此方法是只读的，无法修改！
