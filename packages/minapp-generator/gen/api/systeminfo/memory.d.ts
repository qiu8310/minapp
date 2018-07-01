// https://developers.weixin.qq.com/miniprogram/dev/api/memory.html

export namespace wx {
  namespace onMemoryWarning {
    type Param = (res: ParamParam) => any
    type ParamParam = {
      /**
       * 仅Android有该字段，对应系统内存告警等级宏定义
       */
      level: number
    }
  }
  /**
   * @since 2.0.2
   *
   * 监听内存不足的告警事件，Android下有告警等级划分，只有LOW和CRITICAL会回调开发者；iOS无等级划分。
   *
   * **CALLBACK返回参数：**
   *
   *     ```
   *     TRIM_MEMORY_RUNNING_MODERATE = 5
   *     TRIM_MEMORY_RUNNING_LOW = 10
   *     TRIM_MEMORY_RUNNING_CRITICAL = 15
   *     ```
   *
   * **示例代码：**
   *
   *     ```
   *     wx.onMemoryWarning(function () {
   *       console.log('onMemoryWarningReceive')
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/memory.html#wxonmemorywarningcallback
   */
  function onMemoryWarning(callback: onMemoryWarning.Param): void

}
