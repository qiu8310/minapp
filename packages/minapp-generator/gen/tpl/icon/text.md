<!-- https://developers.weixin.qq.com/miniprogram/dev/component/text.html -->

#### text

文本。

  属性名       |  类型      |  默认值  |  说明     | 最低版本 
---------------|------------|----------|-----------|----------
  selectable   |  Boolean   |  false   |文本是否可选|  1.1.0   
  space        |  String    |  false   |显示连续空格|  1.4.0   
  decode       |  Boolean   |  false   |  是否解码 |  1.4.0   

**space 有效值：**

  值     |  说明          
---------|----------------
  ensp   |中文字符空格一半大小
  emsp   |中文字符空格大小
  nbsp   |根据字体设置的空格大小

##### Tips

*   decode可以解析的有 `&nbsp;` `&lt;` `&gt;` `&amp;` `&apos;` `&ensp;` `&emsp;`
*   各个操作系统的空格标准并不一致。
*   `<text/>` 组件内只支持 `<text/>` 嵌套。
*   除了文本节点以外的其他节点都无法长按选中。

**示例：**

[在开发者工具中预览效果](wechatide://minicode/Egao9cm46gY6)

    <view class="btn-area">
      <view class="body-view">
        <text>{{text}}</text>
        <button bindtap="add">add line</button>
        <button bindtap="remove">remove line</button>
      </view>
    </view>
    

    var initData = 'this is first line\nthis is second line'
    var extraLine = [];
    Page({
      data: {
        text: initData
      },
      add: function(e) {
        extraLine.push('other line')
        this.setData({
          text: initData + '\n' + extraLine.join('\n')
        })
      },
      remove: function(e) {
        if (extraLine.length > 0) {
          extraLine.pop()
          this.setData({
            text: initData + '\n' + extraLine.join('\n')
          })
        }
      }
    })
    

![text](https://mp.weixin.qq.com/debug/wxadoc/dev/image/pic/text.png)

#### Bug & Tip

1.  `bug` : 基础库版本低于 `2.1.0` 时， `<text/>` 组件内嵌的 `<text/>` style 设置可能不会生效。
