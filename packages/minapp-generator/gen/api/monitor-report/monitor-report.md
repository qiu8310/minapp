<!-- https://developers.weixin.qq.com/miniprogram/dev/api/monitor-report.html -->

### wx.reportMonitor(name, value)

> 基础库 2.0.1 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

自定义业务数据监控上报接口。使用前，需要在小程序管理后台-运维中心-性能监控-业务数据监控中新建监控事件，配置监控描述与告警类型。每一个监控事件对应唯一的监控ID，开发者最多可以创建128个监控事件。

**参数说明：**

  参数    |  类型     |  必填 |  说明                            
----------|-----------|-------|----------------------------------
  name    |  String   |  是   |监控ID，在小程序管理后台新建数据指标后获得
  value   |  Number   |  是   |上报数值，经处理后会在小程序管理后台上展示每分钟的上报总量

**示例代码：**

    wx.reportMonitor('1', 1)
