// https://mp.weixin.qq.com/debug/wxadoc/dev/api/analysis-report.html

export namespace wx {
  /**
   * 自定义分析数据上报接口。使用前，需要在小程序管理后台自定义分析中新建事件，配置好事件名与字段。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.reportAnalytics('purchase', {
   *       price: 120,
   *       color: 'red'
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/analysis-report.html#wxreportanalyticseventname-data
   */
  function reportAnalytics(eventName: string, data: any): void

}
