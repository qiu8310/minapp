<!-- https://developers.weixin.qq.com/miniprogram/dev/component/cover-view.html -->

#### cover-view

> 基础库 1.4.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

覆盖在原生组件之上的文本视图，可覆盖的原生组件包括`map`、`video`、`canvas`、`camera`、`live-player`、`live-pusher`，只支持嵌套`cover-view`、`cover-image`。

  属性名       |  类型     | 默认值 |  说明                                           | 最低版本 
---------------|-----------|--------|-------------------------------------------------|----------
  scroll-top   |  Number   |        |设置顶部滚动偏移量，仅在设置了 overflow-y: scroll 成为滚动元素后生效|  2.1.0   

#### cover-image

> 基础库 1.4.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

覆盖在原生组件之上的图片视图，可覆盖的原生组件同`cover-view`，支持嵌套在cover-view里。

  属性名      |  类型          | 默认值 |  说明                                       | 最低版本 
--------------|----------------|--------|---------------------------------------------|----------
  src         |  String        |        |图标路径，支持临时路径、网络地址（1.6.0起支持）。暂不支持base64格式。|          
  bindload    |  EventHandle   |        |  图片加载成功时触发                         |  2.1.0   
  binderror   |  EventHandle   |        |  图片加载失败时触发                         |  2.1.0   

##### Bug & Tips

1.  `tip`: 基础库 2.1.0 起支持设置 `scale` `rotate` 的css样式，包括transition动画
2.  `tip`: 基础库 1.9.90 起 `cover-view` 支持 `overflow: scroll`，但不支持动态更新 `overflow`
3.  `tip`: 基础库 1.9.90 起最外层 `cover-view` 支持 `position: fixed`
4.  `tip`: 基础库 1.9.0 起支持插在 `view` 等标签下。在此之前只可嵌套在原生组件`map`、`video`、`canvas`、`camera`内，避免嵌套在其他组件内。
5.  `tip`: 基础库 1.6.0 起支持css transition动画，`transition-property`只支持`transform (translateX, translateY)`与`opacity`。
6.  `tip`: 基础库 1.6.0 起支持css opacity。
7.  `tip`: 事件模型遵循冒泡模型，但不会冒泡到原生组件。
8.  `tip`: 文本建议都套上cover-view标签，避免排版错误。
9.  `tip`: 只支持基本的定位、布局、文本样式。不支持设置`单边的border`、`background-image`、`shadow`、`overflow: visible`等。
10.  `tip`: 建议子节点不要溢出父节点
11.  `tip`: 默认设置的样式有：`white-space: nowrap;` `line-height: 1.2;` `display: block;`

**示例：**

[在开发者工具中预览效果](wechatide://minicode/IBYfximo6AYL)

    <video id="myVideo" src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" controls="{{false}}" event-model="bubble">
      <cover-view class="controls">
        <cover-view class="play" bindtap="play">
          <cover-image class="img" src="/path/to/icon_play" />
        </cover-view>
        <cover-view class="pause" bindtap="pause">
          <cover-image class="img" src="/path/to/icon_pause" />
        </cover-view>
        <cover-view class="time">00:00</cover-view>
      </cover-view>
    </video>
    

    .controls {
      position: relative;
      top: 50%;
      height: 50px;
      margin-top: -25px;
      display: flex;
    }
    .play,.pause,.time {
      flex: 1;
      height: 100%;
    }
    .time {
      text-align: center;
      background-color: rgba(0, 0, 0, .5);
      color: white;
      line-height: 50px;
    }
    .img {
      width: 40px;
      height: 40px;
      margin: 5px auto;
    }
    

    Page({
      onReady() {
        this.videoCtx = wx.createVideoContext('myVideo')
      },
      play() {
        this.videoCtx.play()
      },
      pause() {
        this.videoCtx.pause()
      }
    })
