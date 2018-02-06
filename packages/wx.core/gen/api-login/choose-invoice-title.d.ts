// https://mp.weixin.qq.com/debug/wxadoc/dev/api/chooseInvoiceTitle.html

export namespace wx {
  type IWxChooseInvoiceTitleObject = {
    /**
     * 接口调用成功的回调函数
     */
    success?: (res: {
      /**
       * 抬头类型（0：单位，1：个人）
       */
      type: string

      /**
       * 抬头名称
       */
      title: string

      /**
       * 抬头税号
       */
      taxNumber: string

      /**
       * 单位地址
       */
      companyAddress: string

      /**
       * 手机号码
       */
      telephone: string

      /**
       * 银行名称
       */
      bankName: string

      /**
       * 银行账号
       */
      bankAccount: string

      /**
       * 接口调用结果
       */
      errMsg: string
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
   * @since 1.5.0
   *
   * 选择用户的发票抬头。
   *
   * 需要[用户授权](https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize-index.html) scope.invoiceTitle
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.chooseInvoiceTitle({
   *       success(res) {
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/chooseInvoiceTitle.html#wxchooseinvoicetitleobject
   */
  function chooseInvoiceTitle(OBJECT: IWxChooseInvoiceTitleObject): void
}
