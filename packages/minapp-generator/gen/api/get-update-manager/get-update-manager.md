<!-- https://developers.weixin.qq.com/miniprogram/dev/api/getUpdateManager.html -->

### wx.getUpdateManager()

> 基础库 1.9.90 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

获取**全局唯一**的版本更新管理器，用于管理小程序更新。

关于小程序的更新机制，可以查看 [运行机制](https://developers.weixin.qq.com/miniprogram/dev/framework/operating-mechanism.html) 文档。

#### updateManager

**updateManager 对象的方法列表：**

  方法               |  参数       |  说明                              
---------------------|-------------|------------------------------------
  onCheckForUpdate   |  callback   |当向微信后台请求完新版本信息，会进行回调
  onUpdateReady      |  callback   |  当新版本下载完成，会进行回调      
  onUpdateFailed     |  callback   |  当新版本下载失败，会进行回调      
  applyUpdate        |             |当新版本下载完成，调用该方法会强制当前小程序应用上新版本并重启

##### onCheckForUpdate(callback) 回调结果说明：

  属性        |  类型      |  说明      
--------------|------------|------------
  hasUpdate   |  Boolean   |是否有新的版本

**注：** 检查更新操作由微信在小程序冷启动时自动触发，不需由开发者主动触发，开发者只需监听检查结果即可。

##### onUpdateReady(callback) 回调结果说明：

当微信检查到小程序有新版本，会主动触发下载操作（无需开发者触发），当下载完成后，会通过 `onUpdateReady` 告知开发者。

##### onUpdateFailed(callback) 回调结果说明：

当微信检查到小程序有新版本，会主动触发下载操作（无需开发者触发），如果下载失败（可能是网络原因等），会通过 `onUpdateFailed` 告知开发者。

##### applyUpdate() 说明：

当小程序新版本已经下载时（即收到 `onUpdateReady` 回调），可以通过这个方法强制重启小程序并应用上最新版本。

**示例代码：**

    const updateManager = wx.getUpdateManager()
    
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    
    })
    
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })
    

**Tips：**

1.  微信开发者工具上可以通过「编译模式」下的「下次编译模拟更新」开关来调试
2.  小程序开发版/体验版没有「版本」概念，所以无法在开发版/体验版上测试更版本更新情况
