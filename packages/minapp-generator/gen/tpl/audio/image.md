<!-- https://developers.weixin.qq.com/miniprogram/dev/component/image.html -->

#### image

图片。

  属性名      |  类型          |  默认值          |  说明                                                                                | 最低版本 
--------------|----------------|------------------|--------------------------------------------------------------------------------------|----------
  src         |  String        |                  |  图片资源地址                                                                        |          
  mode        |  String        |  'scaleToFill'   |  图片裁剪、缩放的模式                                                                |          
  lazy-load   |  Boolean       |  false           |  图片懒加载。只针对page与scroll-view下的image有效                                    |  1.5.0   
  binderror   |  HandleEvent   |                  |当错误发生时，发布到 AppService 的事件名，事件对象event.detail = {errMsg: 'something wrong'}|          
  bindload    |  HandleEvent   |                  |当图片载入完毕时，发布到 AppService 的事件名，事件对象event.detail = {height:'图片高度px', width:'图片宽度px'}|          

**注：image组件默认宽度300px、高度225px**

**mode 有效值：**

mode 有 13 种模式，其中 4 种是缩放模式，9 种是裁剪模式。

  值             |  说明                                                                                                                                                                                                       
-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  scaleToFill    |缩放: 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/1.png)
  aspectFit      |缩放: 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/2.png)
  aspectFill     |缩放: 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/3.png)
  widthFix       |  缩放: 宽度不变，高度自动变化，保持原图宽高比不变                                                                                                                                                           
  top            |  裁剪: 不缩放图片，只显示图片的顶部区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/4.png)                        
  bottom         |  裁剪: 不缩放图片，只显示图片的底部区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/5.png)                        
  center         |  裁剪: 不缩放图片，只显示图片的中间区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/6.png)                        
  left           |  裁剪: 不缩放图片，只显示图片的左边区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/7.png)                        
  right          |  裁剪: 不缩放图片，只显示图片的右边区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/8.png)                        
  top left       |  裁剪: 不缩放图片，只显示图片的左上边区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/9.png)                      
  top right      |  裁剪: 不缩放图片，只显示图片的右上边区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/10.png)                     
  bottom left    |  裁剪: 不缩放图片，只显示图片的左下边区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/11.png)                     
  bottom right   |  裁剪: 不缩放图片，只显示图片的右下边区域  原图：![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/0.jpg) 处理后: ![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/12.png)                     

**示例：**

[在开发者工具中预览效果](wechatide://minicode/8Mc01cmS6WYi)

    <view class="page">
      <view class="page__hd">
        <text class="page__title">image</text>
        <text class="page__desc">图片</text>
      </view>
      <view class="page__bd">
        <view class="section section_gap" wx:for="{{array}}" wx:for-item="item">
          <view class="section__title">{{item.text}}</view>
          <view class="section__ctn">
            <image style="width: 200px; height: 200px; background-color: #eeeeee;" mode="{{item.mode}}" src="{{src}}"></image>
          </view>
        </view>
      </view>
    </view>
    

    Page({
      data: {
        array: [{
          mode: 'scaleToFill',
          text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
        }, { 
          mode: 'aspectFit',
          text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
        }, { 
          mode: 'aspectFill',
          text: 'aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来'
        }, { 
          mode: 'top',
          text: 'top：不缩放图片，只显示图片的顶部区域' 
        }, {      
          mode: 'bottom',
          text: 'bottom：不缩放图片，只显示图片的底部区域'
        }, { 
          mode: 'center',
          text: 'center：不缩放图片，只显示图片的中间区域'
        }, { 
          mode: 'left',
          text: 'left：不缩放图片，只显示图片的左边区域'
        }, { 
          mode: 'right',
          text: 'right：不缩放图片，只显示图片的右边边区域'
        }, { 
          mode: 'top left',
          text: 'top left：不缩放图片，只显示图片的左上边区域' 
        }, { 
          mode: 'top right',
          text: 'top right：不缩放图片，只显示图片的右上边区域'
        }, { 
          mode: 'bottom left',
          text: 'bottom left：不缩放图片，只显示图片的左下边区域'
        }, { 
          mode: 'bottom right',
          text: 'bottom right：不缩放图片，只显示图片的右下边区域'
        }],
        src: '../../resources/cat.jpg'
      },
      imageError: function(e) {
        console.log('image3发生error事件，携带值为', e.detail.errMsg)
      }
    })
