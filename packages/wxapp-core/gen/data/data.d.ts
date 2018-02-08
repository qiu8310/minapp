// https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html

export namespace wx {
  type IWxSetStorageObject = {
    /**
     * 本地缓存中的指定的 key
     */
    key: string

    /**
     * 需要存储的内容
     */
    data: any | string

    /**
     * 接口调用成功的回调函数
     */
    success?: (res: any) => any

    /**
     * 接口调用失败的回调函数
     */
    fail?: (err: any) => any

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => any
  }
  /**
   * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.setStorage({
   *       key:"key",
   *       data:"value"
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxsetstorageobject
   */
  function setStorage(OBJECT: IWxSetStorageObject): void
  /**
   * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
   *
   * **参数说明：**
   *
   *     ```javascript
   *     try {
   *         wx.setStorageSync('key', 'value')
   *     } catch (e) {    
   *     }
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxsetstoragesynckeydata
   */
  function setStorageSync(key: string, data: any | string): void
  type IWxGetStorageObject = {
    /**
     * 本地缓存中的指定的 key
     */
    key: string

    /**
     * 接口调用的回调函数,res = {data: key对应的内容}
     */
    success: (res: {
      /**
       * key对应的内容
       */
      data: string
    }) => any

    /**
     * 接口调用失败的回调函数
     */
    fail?: (err: any) => any

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => any
  }
  /**
   * 从本地缓存中异步获取指定 key 对应的内容。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.getStorage({
   *       key: 'key',
   *       success: function(res) {
   *           console.log(res.data)
   *       } 
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxgetstorageobject
   */
  function getStorage(OBJECT: IWxGetStorageObject): void
  /**
   * 从本地缓存中同步获取指定 key 对应的内容。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     try {
   *       var value = wx.getStorageSync('key')
   *       if (value) {
   *           // Do something with return value
   *       }
   *     } catch (e) {
   *       // Do something when catch error
   *     }
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxgetstoragesynckey
   */
  function getStorageSync(key: string): any | undefined
  type IWxGetStorageInfoObject = {
    /**
     * 接口调用的回调函数，详见返回参数说明
     */
    success: (res: {
      /**
       * 当前storage中所有的key
       */
      keys: string[]

      /**
       * 当前占用的空间大小, 单位kb
       */
      currentSize: number

      /**
       * 限制的空间大小，单位kb
       */
      limitSize: number
    }) => any

    /**
     * 接口调用失败的回调函数
     */
    fail?: (err: any) => any

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => any
  }
  /**
   * 异步获取当前storage的相关信息
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.getStorageInfo({
   *       success: function(res) {
   *         console.log(res.keys)
   *         console.log(res.currentSize)
   *         console.log(res.limitSize)
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxgetstorageinfoobject
   */
  function getStorageInfo(OBJECT: IWxGetStorageInfoObject): void
  type IWxGetStorageInfoSyncReturn = {
    /**
     * 当前storage中所有的key
     */
    keys: string[]

    /**
     * 当前占用的空间大小, 单位kb
     */
    currentSize: number

    /**
     * 限制的空间大小，单位kb
     */
    limitSize: number
  }
  /**
   * 同步获取当前storage的相关信息
   *
   * **示例代码：**
   *
   *     ```javascript
   *     try {
   *       var res = wx.getStorageInfoSync()
   *       console.log(res.keys)
   *       console.log(res.currentSize)
   *       console.log(res.limitSize)
   *     } catch (e) {
   *       // Do something when catch error
   *     }
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxgetstorageinfosync
   */
  function getStorageInfoSync(): IWxGetStorageInfoSyncReturn
  type IWxRemoveStorageObject = {
    /**
     * 本地缓存中的指定的 key
     */
    key: string

    /**
     * 接口调用的回调函数
     */
    success: (res: any) => any

    /**
     * 接口调用失败的回调函数
     */
    fail?: (err: any) => any

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => any
  }
  /**
   * 从本地缓存中异步移除指定 key 。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.removeStorage({
   *       key: 'key',
   *       success: function(res) {
   *         console.log(res.data)
   *       } 
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxremovestorageobject
   */
  function removeStorage(OBJECT: IWxRemoveStorageObject): void
  /**
   * 从本地缓存中同步移除指定 key 。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     try {
   *       wx.removeStorageSync('key')
   *     } catch (e) {
   *       // Do something when catch error
   *     }
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxremovestoragesynckey
   */
  function removeStorageSync(key: string): void
  /**
   * 清理本地数据缓存。
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.clearStorage()
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxclearstorage
   */
  function clearStorage(): void
  /**
   * 同步清理本地数据缓存
   *
   * **Bug & Tip：**
   *
   * 1.  `tip`: 本地数据存储的大小限制为 10MB
   *
   * **示例代码：**
   *
   *     ```javascript
   *     try {
   *         wx.clearStorageSync()
   *     } catch(e) {
   *       // Do something when catch error
   *     }
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxclearstoragesync
   */
  function clearStorageSync(): void
}
