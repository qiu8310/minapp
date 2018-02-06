// https://mp.weixin.qq.com/debug/wxadoc/dev/api/phone-contact.html

export namespace wx {
  type IWxAddPhoneContactObject = {
    /**
     * 头像本地文件路径
     */
    photoFilePath?: string

    /**
     * 昵称
     */
    nickName?: string

    /**
     * 姓氏
     */
    lastName?: string

    /**
     * 中间名
     */
    middleName?: string

    /**
     * 名字
     */
    firstName: string

    /**
     * 备注
     */
    remark?: string

    /**
     * 手机号
     */
    mobilePhoneNumber?: string

    /**
     * 微信号
     */
    weChatNumber?: string

    /**
     * 联系地址国家
     */
    addressCountry?: string

    /**
     * 联系地址省份
     */
    addressState?: string

    /**
     * 联系地址城市
     */
    addressCity?: string

    /**
     * 联系地址街道
     */
    addressStreet?: string

    /**
     * 联系地址邮政编码
     */
    addressPostalCode?: string

    /**
     * 公司
     */
    organization?: string

    /**
     * 职位
     */
    title?: string

    /**
     * 工作传真
     */
    workFaxNumber?: string

    /**
     * 工作电话
     */
    workPhoneNumber?: string

    /**
     * 公司电话
     */
    hostNumber?: string

    /**
     * 电子邮件
     */
    email?: string

    /**
     * 网站
     */
    url?: string

    /**
     * 工作地址国家
     */
    workAddressCountry?: string

    /**
     * 工作地址省份
     */
    workAddressState?: string

    /**
     * 工作地址城市
     */
    workAddressCity?: string

    /**
     * 工作地址街道
     */
    workAddressStreet?: string

    /**
     * 工作地址邮政编码
     */
    workAddressPostalCode?: string

    /**
     * 住宅传真
     */
    homeFaxNumber?: string

    /**
     * 住宅电话
     */
    homePhoneNumber?: string

    /**
     * 住宅地址国家
     */
    homeAddressCountry?: string

    /**
     * 住宅地址省份
     */
    homeAddressState?: string

    /**
     * 住宅地址城市
     */
    homeAddressCity?: string

    /**
     * 住宅地址街道
     */
    homeAddressStreet?: string

    /**
     * 住宅地址邮政编码
     */
    homeAddressPostalCode?: string

    /**
     * 接口调用成功
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
   * @since 1.2.0
   *
   * 调用后，用户可以选择将该表单以“新增联系人”或“添加到已有联系人”的方式，写入手机系统通讯录，完成手机通讯录联系人和联系方式的增加。
   *
   * **回调结果：**
   *
   *   回调类型  |  errMsg           |  说明                 
   * ------------|-------------------|-----------------------
   *   success   |  ok               |  添加成功             
   *   fail      |  fail cancel      |  用户取消操作         
   *   fail      |  fail ${detail}   |调用失败，detail 加上详细信息
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/phone-contact.html#wxaddphonecontactobject
   */
  function addPhoneContact(OBJECT: IWxAddPhoneContactObject): void
}
