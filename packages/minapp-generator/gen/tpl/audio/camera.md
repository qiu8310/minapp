<!-- https://developers.weixin.qq.com/miniprogram/dev/component/camera.html -->

#### camera

> 基础库 1.6.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

系统相机。

需要[用户授权](https://developers.weixin.qq.com/miniprogram/dev/api/authorize-index.html) scope.camera

  属性名            |  类型          |  默认值 |  说明                    
--------------------|----------------|---------|--------------------------
  device-position   |  String        |  back   |前置或后置，值为front, back
  flash             |  String        |  auto   | 闪光灯，值为auto, on, off
  bindstop          |  EventHandle   |         |摄像头在非正常终止时触发，如退出后台等情况
  binderror         |  EventHandle   |         |用户不允许使用摄像头时触发

相关api：[wx.createCameraContext](https://developers.weixin.qq.com/miniprogram/dev/api/api-camera.html)

##### Bug & Tip

1.  `tip`: `camera` 组件是由客户端创建的原生组件，它的层级是最高的，不能通过 z-index 控制层级。可使用 `cover-view` `cover-image`覆盖在上面。
2.  `tip`: 同一页面只能插入一个 `camera` 组件。
3.  `tip`: 请勿在 `scroll-view`、`swiper`、`picker-view`、`movable-view` 中使用 `camera` 组件。

**示例：**

[在开发者工具中预览效果](wechatide://minicode/VBZ3Jim26zYu)

    <!-- camera.wxml -->
    <camera device-position="back" flash="off" binderror="error" style="width: 100%; height: 300px;"></camera>
    <button type="primary" bindtap="takePhoto">拍照</button>
    <view>预览</view>
    <image mode="widthFix" src="{{src}}"></image>
    

    // camera.js
    Page({
        takePhoto() {
            const ctx = wx.createCameraContext()
            ctx.takePhoto({
                quality: 'high',
                success: (res) => {
                    this.setData({
                        src: res.tempImagePath
                    })
                }
            })
        },
        error(e) {
            console.log(e.detail)
        }
    })
