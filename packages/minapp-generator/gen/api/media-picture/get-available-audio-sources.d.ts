// https://developers.weixin.qq.com/miniprogram/dev/api/getAvailableAudioSources.html

export namespace wx {
  namespace getAvailableAudioSources {
    type Param = {
      /**
       * 接口调用成功的回调函数
       */
      success?: ParamPropSuccess
      /**
       * 接口调用失败的回调函数
       */
      fail?: ParamPropFail
      /**
       * 接口调用结束的回调函数（调用成功、失败都会执行）
       */
      complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    type ParamPropSuccessParam = {
      /**
       * 音频输入源，每一项对应一种音频输入源
       */
      audioSources: string[]
    }
    /**
     * 接口调用失败的回调函数
     */
    type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ParamPropComplete = () => any
  }
  /**
   * @since 2.1.0
   *
   * **audioSource 有效值：：**
   *
   *   值           |  说明                              |  支持平台               
   * ---------------|------------------------------------|-------------------------
   *   auto         |自动设置，默认使用手机麦克风，插上耳麦后自动切换使用耳机麦克风|  iOS/Android/devtools   
   *   buildInMic   |  手机麦克风                        |  iOS                    
   *   headsetMic   |  耳机麦克风                        |  iOS                    
   *   mic          |麦克风（没插耳麦时是手机麦克风，插耳麦时是耳机麦克风|  Android                
   *   camcorder    |  摄像头的麦克风                    |  Android                
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/getAvailableAudioSources.html#wxgetavailableaudiosourcesobject
   */
  function getAvailableAudioSources(OBJECT: getAvailableAudioSources.Param): void

}
