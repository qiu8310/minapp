<!-- https://mp.weixin.qq.com/debug/wxadoc/dev/api/canvas/save-restore.html -->

canvasContext.save
==================

### 定义

保存当前的绘图上下文。

restore
=======

### 定义

恢复之前保存的绘图上下文。

### 例子

    const ctx = wx.createCanvasContext('myCanvas')
    
    // save the default fill style
    ctx.save() 
    ctx.setFillStyle('red')
    ctx.fillRect(10, 10, 150, 100)
    
    // restore to the previous saved state
    ctx.restore()
    ctx.fillRect(50, 50, 150, 100)
    
    ctx.draw()
    

![](https://mp.weixin.qq.com/debug/wxadoc/dev/image/canvas/save-restore.png?t=201838)
