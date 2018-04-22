<!-- https://developers.weixin.qq.com/miniprogram/dev/api/analysis-report.html -->

### wx.reportAnalytics(eventName, data)

自定义分析数据上报接口。使用前，需要在小程序管理后台自定义分析中新建事件，配置好事件名与字段。

**参数说明：**

  参数        |  类型     |  必填 |  说明                               
--------------|-----------|-------|-------------------------------------
  eventName   |  String   |  是   |  事件名。                           
  data        |  Object   |  是   |上报的自定义数据。key为配置中的字段名，value为上报的数据

**示例代码：**

    wx.reportAnalytics('purchase', {
      price: 120,
      color: 'red'
    })
