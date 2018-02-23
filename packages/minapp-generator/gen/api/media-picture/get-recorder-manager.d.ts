// https://mp.weixin.qq.com/debug/wxadoc/dev/api/getRecorderManager.html

export namespace wx {
  /**
   * @since 1.6.0
   *
   * 获取**全局唯一**的录音管理器 `recorderManager`。
   *
   * **其中，采样率和码率有一定要求，具体有效值如下：：**
   *
   *   采样率  |  编码码率         
   * ----------|-------------------
   *   8000    |  16000 ~ 48000    
   *   11025   |  16000 ~ 48000    
   *   12000   |  24000 ~ 64000    
   *   16000   |  24000 ~ 96000    
   *   22050   |  32000 ~ 128000   
   *   24000   |  32000 ~ 128000   
   *   32000   |  48000 ~ 192000   
   *   44100   |  64000 ~ 320000   
   *   48000   |  64000 ~ 320000   
   *
   * **示例代码：**
   *
   *     ```javascript
   *     const recorderManager = wx.getRecorderManager()
   *
   *     recorderManager.onStart(() => {
   *       console.log('recorder start')
   *     })
   *     recorderManager.onResume(() => {
   *       console.log('recorder resume')
   *     })
   *     recorderManager.onPause(() => {
   *       console.log('recorder pause')
   *     })
   *     recorderManager.onStop((res) => {
   *       console.log('recorder stop', res)
   *       const { tempFilePath } = res
   *     })
   *     recorderManager.onFrameRecorded((res) => {
   *       const { frameBuffer } = res
   *       console.log('frameBuffer.byteLength', frameBuffer.byteLength)
   *     })
   *
   *     const options = {
   *       duration: 10000,
   *       sampleRate: 44100,
   *       numberOfChannels: 1,
   *       encodeBitRate: 192000,
   *       format: 'aac',
   *       frameSize: 50
   *     }
   *
   *     recorderManager.start(options)
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/getRecorderManager.html#wxgetrecordermanager
   */
  function getRecorderManager(): RecorderManager

  namespace RecorderManager {
    namespace start {
      type Param = {
        /**
         * 指定录音的时长，单位 ms ，如果传入了合法的 duration ，在到达指定的 duration 后会自动停止录音，最大值 600000（10 分钟）,默认值 60000（1 分钟）
         */
        duration?: number
        /**
         * 采样率，有效值 8000/16000/44100
         */
        sampleRate?: number
        /**
         * 录音通道数，有效值 1/2
         */
        numberOfChannels?: number
        /**
         * 编码码率，有效值见下表格
         */
        encodeBitRate?: number
        /**
         * 音频格式，有效值 aac/mp3
         */
        format?: string
        /**
         * 指定帧大小，单位 KB。传入 frameSize 后，每录制指定帧大小的内容后，会回调录制的文件内容，不指定则不会回调。暂仅支持 mp3 格式。
         */
        frameSize?: number
      }
    }
    namespace onStop {
      type Param = (res: ParamParam) => any
      type ParamParam = {
        /**
         * 录音文件的临时路径
         */
        tempFilePath: string
      }
    }
    namespace onFrameRecorded {
      type Param = (res: ParamParam) => any
      type ParamParam = {
        /**
         * 录音分片结果数据
         */
        frameBuffer: ArrayBuffer
        /**
         * 当前帧是否正常录音结束前的最后一帧
         */
        isLastFrame: boolean
      }
    }
    namespace onError {
      type Param = (res: ParamParam) => any
      type ParamParam = {
        /**
         * 错误信息
         */
        errMsg: string
      }
    }
  }
  class RecorderManager {
    /**
     * 开始录音
     */
    start(options: RecorderManager.start.Param): any
    /**
     * 暂停录音
     */
    pause(): any
    /**
     * 继续录音
     */
    resume(): any
    /**
     * 停止录音
     */
    stop(): any
    /**
     * 录音开始事件
     */
    onStart(callback: any): any
    /**
     * 录音暂停事件
     */
    onPause(callback: any): any
    /**
     * 录音停止事件，会回调文件地址
     */
    onStop(callback: RecorderManager.onStop.Param): any
    /**
     * 已录制完指定帧大小的文件，会回调录音分片结果数据。如果设置了 frameSize ，则会回调此事件
     */
    onFrameRecorded(callback: RecorderManager.onFrameRecorded.Param): any
    /**
     * 录音错误事件, 会回调错误信息
     */
    onError(callback: RecorderManager.onError.Param): any
  }
}
