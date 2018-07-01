// https://developers.weixin.qq.com/miniprogram/dev/api/getLogManager.html

export namespace wx {
  /**
   * @since 2.1.0
   *
   * 获取日志管理器 `logManager` 对象。logManager提供log、info、warn、debug四个方法写日志到文件，这四个方法接受任意个类型为Object/Array/Number/String的参数，每次调用的参数的总大小不超过100Kb。最多保存5M的日志内容，超过5M后，旧的日志内容会被删除。用户可以通过设置[Button组件](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) 的`open-type`为`feedback`来上传打印的日志。用户上传的日志可以通过登录[小程序管理后台](https://mp.weixin.qq.com/)后进入左侧菜单“客服反馈”页面获取到。
   *
   * 基础库默认会把App、Page的生命周期函数和wx命名空间下的函数调用写入日志。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     const logger = wx.getLogManager()
   *     logger.log({str: 'hello world'}, 'basic log', 100, [1, 2, 3])
   *     logger.info({str: 'hello world'}, 'info log', 100, [1, 2, 3])
   *     logger.debug({str: 'hello world'}, 'debug log', 100, [1, 2, 3])
   *     logger.warn({str: 'hello world'}, 'warn log', 100, [1, 2, 3])
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/getLogManager.html#wxgetlogmanager
   */
  function getLogManager(): LogManager

  class LogManager {
    /**
     * 写log日志，可以提供任意个参数，每个参数的类型为Object/Array/Number/String，参数p1到pN的内容会写入日志
     */
    log(p1 [: any, p2: any, ...: any, pN]: any): any
    /**
     * 写info日志，参数同log方法
     */
    info(p1 [: any, p2: any, ...: any, pN]: any): any
    /**
     * 写warn日志，参数同log方法
     */
    warn(p1 [: any, p2: any, ...: any, pN]: any): any
    /**
     * 写debug日志，参数同log方法
     */
    debug(p1 [: any, p2: any, ...: any, pN]: any): any
  }
}
