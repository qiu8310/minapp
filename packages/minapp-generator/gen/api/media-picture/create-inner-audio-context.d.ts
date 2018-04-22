// https://developers.weixin.qq.com/miniprogram/dev/api/createInnerAudioContext.html

export namespace wx {
  /**
   * @since 1.6.0
   *
   * 创建并返回内部 audio 上下文 `innerAudioContext` 对象。_本接口是 `wx.createAudioContext` 升级版。_
   *
   * **errCode 说明：**
   *
   *   errCode   |  说明   
   * ------------|---------
   *   10001     | 系统错误
   *   10002     | 网络错误
   *   10003     | 文件错误
   *   10004     | 格式错误
   *   -1        | 未知错误
   *
   * **示例代码：**
   *
   *     ```javascript
   *     const innerAudioContext = wx.createInnerAudioContext()
   *     innerAudioContext.autoplay = true
   *     innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
   *     innerAudioContext.onPlay(() => {
   *         console.log('开始播放')
   *     })
   *     innerAudioContext.onError((res) => {
   *         console.log(res.errMsg)
   *         console.log(res.errCode)
   *     })
   *     ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/createInnerAudioContext.html#wxcreateinneraudiocontext
   */
  function createInnerAudioContext(): InnerAudioContext

  class InnerAudioContext {
    /**
     * 音频的数据链接，用于直接播放。
     */
    src: string
    /**
     * 开始播放的位置（单位：s），默认 0
     */
    startTime: number
    /**
     * 是否自动开始播放，默认 false
     */
    autoplay: boolean
    /**
     * 是否循环播放，默认 false
     */
    loop: boolean
    /**
     * 是否遵循系统静音开关，当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音，默认值 true
     */
    obeyMuteSwitch: boolean
    /**
     * 当前音频的长度（单位：s），只有在当前有合法的 src 时返回
     *
     * @readonly
     */
    duration: number
    /**
     * 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回，时间不取整，保留小数点后 6 位
     *
     * @readonly
     */
    currentTime: number
    /**
     * 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
     *
     * @readonly
     */
    paused: boolean
    /**
     * 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲。
     *
     * @readonly
     */
    buffered: number
    /**
     * 音量。范围 0~1。
     *
     * @since 1.9.90
     */
    volume: number
    /**
     * 播放
     */
    play(): any
    /**
     * 暂停
     */
    pause(): any
    /**
     * 停止
     */
    stop(): any
    /**
     * 跳转到指定位置，单位 s
     */
    seek(position: any): any
    /**
     * 销毁当前实例
     */
    destroy(): any
    /**
     * 音频进入可以播放状态，但不保证后面可以流畅播放
     */
    onCanplay(callback: any): any
    /**
     * 音频播放事件
     */
    onPlay(callback: any): any
    /**
     * 音频暂停事件
     */
    onPause(callback: any): any
    /**
     * 音频停止事件
     */
    onStop(callback: any): any
    /**
     * 音频自然播放结束事件
     */
    onEnded(callback: any): any
    /**
     * 音频播放进度更新事件
     */
    onTimeUpdate(callback: any): any
    /**
     * 音频播放错误事件
     */
    onError(callback: any): any
    /**
     * 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
     */
    onWaiting(callback: any): any
    /**
     * 音频进行 seek 操作事件
     */
    onSeeking(callback: any): any
    /**
     * 音频完成 seek 操作事件
     */
    onSeeked(callback: any): any
  }
}
