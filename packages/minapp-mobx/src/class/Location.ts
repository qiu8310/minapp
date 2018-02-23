
export type LocationRawSearch = string | {[key: string]: string | number | undefined}
export class Location {
  constructor(public url: string, public isTabBar: boolean = false) {
  }

  /**
   * 跳转当前 url 所指定的页面
   *
   * 注意：当页面是 tabBar 中的页面是，不能带参数
   */
  go(searchOrQuery?: LocationRawSearch) {
    let {url} = this
    if (this.isTabBar) {
      if (searchOrQuery) {
        console.warn(`${this.url} 是 tabBar 页面，不能带参数，已自动忽略`)
      }
      wx.switchTab({url})
    } else {
      wx.navigateTo({url: url + getSearchFromRaw(searchOrQuery)})
    }
  }

  /**
   * 重定向到当前 url 所指定的页面
   *
   * 注意：当页面是 tabBar 时，无法使用此函数
   */
  redirect(searchOrQuery?: LocationRawSearch) {
    if (this.isTabBar) {
      console.error(`${this.url} 是 tabBar 页面，不能使用此 redirect，不过你可以使用 reload 来重新加载`)
      console.error(`详情查看： https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-navigate.html#tip`)
    } else {
      wx.redirectTo({url: this.url + getSearchFromRaw(searchOrQuery)})
    }
  }

  /**
   * 关闭所有页面，打开到应用内的某个页面
   *
   * @since 1.1.0
   */
  reload(searchOrQuery?: LocationRawSearch) {
    if (this.isTabBar && searchOrQuery) {
      console.warn(`${this.url} 是 tabBar 页面，不能带参数，已自动忽略`)
      searchOrQuery = ''
    }
    wx.reLaunch({url: this.url + getSearchFromRaw(searchOrQuery)})
  }
}

function getSearchFromRaw(searchOrQuery?: LocationRawSearch) {
  if (!searchOrQuery) return ''
  let search = ''
  if (typeof searchOrQuery === 'string') {
    search += searchOrQuery
  } else {
    search = Object.keys(searchOrQuery).map(k => `${encodeURIComponent(k)}=${encodeURIComponent((searchOrQuery[k] || '') + '')}`).join('&')
  }
  if (search && search[0] !== '?') search = '?' + search
  return search
}
