

## 层级结构图

```
Node: 导航页面生成的 Page 节点

Page
  Area (.api 或 .rest)
    Section (.section)
      Table
```


```js
  /**
   * 将页面层级化，化成如下层级结构
   *  Page
   *    Area
   *      Section
   *        Table
   *
   *  div.api[data-title=wx.xxx]
   *    div.body
   *      div.desc
   *      div.section[data-title=xxx]
   *      div.section[data-title=xxx]
   *      ...
   *    div.return
   *      div.desc  // 此内容一直为空，主要为了保持和 body 统一
   *      div.section[data-title=xxx]
   *      div.section[data-title=xxx]
   *      ...
   *
   *  div.api[data-title=wx.xxx]
   *    ...
   *
   *  div.rest[data-title=xxx]
   *    div.desc
   *    div.section[data-title=xxx]
   *
   *  div.rest[data-title=xxx]
   *    ...
   */
```
