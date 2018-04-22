<!-- https://developers.weixin.qq.com/miniprogram/dev/api/setNavigationBarColor.html -->

### wx.setNavigationBarColor(OBJECT)

> 基础库 1.4.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

**OBJECT参数说明：**

  参数名                 |  类型       |  必填 |  说明                                         
-------------------------|-------------|-------|-----------------------------------------------
  frontColor             |  String     |  是   |前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000
  backgroundColor        |  String     |  是   |  背景颜色值，有效值为十六进制颜色             
  animation              |  Object     |  否   |  动画效果                                     
  animation.duration     |  Number     |  否   |  动画变化时间，默认0，单位：毫秒              
  animation.timingFunc   |  String     |  否   |  动画变化方式，默认 linear                    
  success                |  Function   |  否   |  接口调用成功的回调函数                       
  fail                   |  Function   |  否   |  接口调用失败的回调函数                       
  complete               |  Function   |  否   |接口调用结束的回调函数（调用成功、失败都会执行）

**animation.timingFunc 有效值：**

  值          |  说明             
--------------|-------------------
  linear      |动画从头到尾的速度是相同的。
  easeIn      |  动画以低速开始   
  easeOut     |  动画以低速结束。 
  easeInOut   |动画以低速开始和结束。

**success返回参数说明：**

  参数名   |  类型     |  说明   
-----------|-----------|---------
  errMsg   |  String   | 调用结果

**示例代码：**

    wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#ff0000',
        animation: {
            duration: 400,
            timingFunc: 'easeIn'
        }
    })
