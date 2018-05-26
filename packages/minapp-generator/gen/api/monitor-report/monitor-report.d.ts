// https://developers.weixin.qq.com/miniprogram/dev/api/monitor-report.html

export namespace wx {
  /**
   * @since 2.0.1
   *
   * 自定义业务数据监控上报接口。使用前，需要在小程序管理后台-运维中心-性能监控-业务数据监控中新建监控事件，配置监控描述与告警类型。每一个监控事件对应唯一的监控ID，开发者最多可以创建128个监控事件。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.reportMonitor('1', 1)
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/monitor-report.html#wxreportmonitorname-value
   */
  function reportMonitor(name: string, value: number): void

}
