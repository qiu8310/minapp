declare namespace Page {
  interface OnShareAppMessageParam {
    /**
     * 转发事件来源。button：页面内转发按钮；menu：右上角转发菜单
     * @since 1.2.4
     */
    from: string
    /**
     * 如果 from 值是 button，则 target 是触发这次转发事件的 button，否则为 undefined
     * @since 1.2.4
     */
    target?: any
  }

  interface OnShareAppMessageReturn {
    /** 默认为当前小程序名称 */
    title?: string
    /** 默认为当前页面 path ，必须是以 / 开头的完整路径 */
    path?: string
    /**
     * 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
     * @since 1.5.0
     */
    imageUrl?: string
  }

  interface BaseOptions {
    /**
     * 生命周期函数--监听页面加载
     *
     * 一个页面只会调用一次，可以在 onLoad 中获取打开当前页面所调用的 query 参数。
     */
    onLoad?(param: any): any

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload?(): any

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady?(): any

    /**
     * 生命周期函数--监听页面显示
     */
    onShow?(): any

    /**
     * 生命周期函数--监听页面隐藏
     *
     * 当navigateTo或底部tab切换时调用。
     */
    onHide?(): any

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     *
     * 需要在app.json的window选项中或页面配置中开启enablePullDownRefresh。
     * 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
     */
    onPullDownRefresh?(param: any): any

    /**
     * 页面上拉触底事件的处理函数
     *
     * 可以在app.json的window选项中或页面配置中设置触发距离onReachBottomDistance。
     * 在触发距离内滑动期间，本事件只会被触发一次。
     */
    onReachBottom?(param: any): any

    /**
     * 页面滚动触发事件的处理函数
     */
    onPageScroll?(event: {scrollTop: number, [key: string]: any}): any

    /**
     * 用户点击右上角分享
     *
     * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/share.html
     */
    onShareAppMessage?(param: OnShareAppMessageParam): OnShareAppMessageReturn

    /**
     * 调起 App 失败时会调用，
     *
     * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/launchApp.html
     */
    launchAppError?(err: any): any

    /**
     * 获取微信用户绑定的手机号，需先调用login接口。
     * 因为需要用户主动触发才能发起获取手机号接口，所以该功能不由 API 来调用，需用 <button> 组件的点击来触发。
     * 注意：目前该接口针对非个人开发者，且完成了认证的小程序开放。需谨慎使用，若用户举报较多或被发现在不必要场景下使用，微信有权永久回收该小程序的该接口权限。
     *
     * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/getPhoneNumber.html
     */
    getPhoneNumber?(err: {detail: any}): any

    /**
     * 当前是 tab 页时，点击 tab 时触发
     *
     * @since 1.9.0
     *
     * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-tabbar.html#ontabitemtap
     */
    onTabItemTap?(item: any): any
  }

  interface Options extends BaseOptions {
    /**
     * 页面的初始数据
     */
    data?: {[key: string]: any}


    /**
     * 其它函数或属性
     */
    [key: string]: any
  }
}

interface Page extends Component {
  setData(data: any, callback?: any): void
}

interface PageConstructor {
  new(): Page
  (options: Page.Options): Page
}
declare var Page: PageConstructor

declare var getCurrentPages: () => any[]
