<!-- https://developers.weixin.qq.com/miniprogram/dev/component/camera.html -->

#### camera

> 基础库 1.6.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)。

系统相机。该组件是[原生组件](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)，使用时请注意相关限制。

需要[用户授权](https://developers.weixin.qq.com/miniprogram/dev/api/authorize-index.html) scope.camera

  属性名            |  类型          |  默认值   |  说明                                                                                | 最低版本 
--------------------|----------------|-----------|--------------------------------------------------------------------------------------|----------
  mode              |  String        |  normal   |  有效值为 normal, scanCode                                                           |  2.1.0   
  device-position   |  String        |  back     |  前置或后置，值为front, back                                                         |          
  flash             |  String        |  auto     |  闪光灯，值为auto, on, off                                                           |          
  scan-area         |  Array         |           |扫码识别区域，格式为[x, y, w, h]，x,y是相对于camera显示区域的左上角，w,h为区域宽度，单位px，仅在 mode="scanCode" 时生效|  2.1.0   
  bindstop          |  EventHandle   |           |  摄像头在非正常终止时触发，如退出后台等情况                                          |          
  binderror         |  EventHandle   |           |  用户不允许使用摄像头时触发                                                          |          
  bindscancode      |  EventHandle   |           |  在成功识别到一维码时触发，仅在 mode="scanCode" 时生效                               |  2.1.0   

相关api：[wx.createCameraContext](https://developers.weixin.qq.com/miniprogram/dev/api/api-camera.html)

##### Bug & Tip

1.  请注意[原生组件使用限制](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html#原生组件的使用限制)。
2.  `tip`: 同一页面只能插入一个 `camera` 组件。
3.  `bug`: `scan-area` 属性目前存在识别区域不准的问题，建议先不指定

**示例：**

[在开发者工具中预览效果](wechatide://minicode/VBZ3Jim26zYu "在开发者工具中预览效果")

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
