<!-- https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html -->

#### rich-text

> 基础库 1.4.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

富文本。

  属性    |  类型             | 默认值 |  说明                 | 最低版本 
----------|-------------------|--------|-----------------------|----------
  nodes   |  Array / String   |  []    | 节点列表 / HTML String|  1.4.0   

支持默认事件，包括：`tap`、`touchstart`、`touchmove`、`touchcancel`、`touchend`和`longtap`

**nodes 属性推荐使用 Array 类型，由于组件会将 String 类型转换为 Array 类型，因而性能会有所下降**

##### nodes

现支持两种节点，通过type来区分，分别是元素节点和文本节点，默认是元素节点，在富文本区域里显示的HTML节点

**元素节点：type = node**

  属性       |  说明    |  类型     |  必填 |  备注                     
-------------|----------|-----------|-------|---------------------------
  name       |  标签名  |  String   |  是   |  支持部分受信任的HTML节点 
  attrs      |  属性    |  Object   |  否   |支持部分受信任的属性，遵循Pascal命名法
  children   |子节点列表|  Array    |  否   |  结构和nodes一致          

**文本节点：type = text**

  属性   |  说明 |  类型     |  必填 |  备注         
---------|-------|-----------|-------|---------------
  text   |  文本 |  String   |  是   |  支持entities 

##### 受信任的HTML节点及属性

全局支持class和style属性，**不支持id属性**。

  节点         |  属性                           
---------------|---------------------------------
  a            |                                 
  abbr         |                                 
  b            |                                 
  blockquote   |                                 
  br           |                                 
  code         |                                 
  col          |  span，width                    
  colgroup     |  span，width                    
  dd           |                                 
  del          |                                 
  div          |                                 
  dl           |                                 
  dt           |                                 
  em           |                                 
  fieldset     |                                 
  h1           |                                 
  h2           |                                 
  h3           |                                 
  h4           |                                 
  h5           |                                 
  h6           |                                 
  hr           |                                 
  i            |                                 
  img          |  alt，src，height，width        
  ins          |                                 
  label        |                                 
  legend       |                                 
  li           |                                 
  ol           |  start，type                    
  p            |                                 
  q            |                                 
  span         |                                 
  strong       |                                 
  sub          |                                 
  sup          |                                 
  table        |  width                          
  tbody        |                                 
  td           | colspan，height，rowspan，width 
  tfoot        |                                 
  th           | colspan，height，rowspan，width 
  thead        |                                 
  tr           |                                 
  ul           |                                 

**示例：**

[在开发者工具中预览效果](wechatide://minicode/zPVmpim46wYQ)

    <!-- rich-text.wxml -->
    <rich-text nodes="{{nodes}}" bindtap="tap"></rich-text>
    

    // rich-text.js
    Page({
      data: {
        nodes: [{
          name: 'div',
          attrs: {
            class: 'div_class',
            style: 'line-height: 60px; color: red;'
          },
          children: [{
            type: 'text',
            text: 'Hello&nbsp;World!'
          }]
        }]
      },
      tap() {
        console.log('tap')
      }
    })
    

##### Bug & Tip

1.  `tip`: nodes 不推荐使用 String 类型，性能会有所下降。
2.  `tip`: `rich-text` 组件内屏蔽所有节点的事件。
3.  `tip`: attrs 属性不支持 id ，支持 class 。
4.  `tip`: name 属性大小写不敏感。
5.  `tip`: 如果使用了不受信任的HTML节点，该节点及其所有子节点将会被移除。
6.  `tip`: img 标签仅支持网络图片。
7.  `tip`: 如果在自定义组件中使用 `rich-text` 组件，那么仅自定义组件的 wxss 样式对 `rich-text` 中的 class 生效。
