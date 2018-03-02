/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {toObject} from 'mora-common/util/object'
import {Base} from './Base'
import {Store} from './Store'
import {warn, camelCase} from '../base'

// import {TAB_PAGES, PAGES} from '../feat/data'
import {Url} from '../feat/Url'

export interface AppifyOptions {
  pages: string[]
  tabBarList: Array<{pagePath: string, text: string}> | undefined
}

export function appify<S extends Store>(store: S, options: AppifyOptions) {
  return function(SomeApp: new() => BaseApp<S>) {
    let app = new SomeApp()
    // @ts-ignore
    app.__init$home$url(options.pages || [], options.tabBarList || [])
    let obj = toObject(app)
    obj.store = store
    App(obj)
  }
}

export interface BaseApp<S extends Store> extends App, App.BaseOptions {
}

export class BaseApp<S extends Store> extends Base {
  // @ts-ignore
  readonly store: S

  /**
   * 首页的 url，默认是 app.json 中的 pages 中的第一个页面的 Url
   */
  // @ts-ignore
  readonly $home: Url
  // @ts-ignore
  readonly $url: {[key: string]: Url}

  // @ts-ignore
  private __init$home$url(pages: string[] = [], tabBarList: Array<{pagePath: string, text: string}> = []) {
    let $home: Url
    let $url: {[key: string]: Url} = {}

    let tabPages = tabBarList.map(t => t.pagePath)
    pages.forEach(page => {
      // 需要驼峰形式的名字
      let camelPageName = camelCase(page.split('/').pop() as string)

      // 判重
      if ($url.hasOwnProperty(camelPageName)) {
        warn(`app.$url 中 ${$url[camelPageName]} 和 ${page} 的键名 ${camelPageName} 重复了，只能保留一个，请注意修改！`)
      }

      // url 需要以 / 开头
      let url = new Url('/' + page, tabPages.indexOf(page) >= 0)

      if (!$home) $home = url // $home 是 PAGES 中的第一个 url
      $url[camelPageName] = url
    })

    // @ts-ignore
    this.$home = $home
    // @ts-ignore
    this.$url = $url
  }

  /**
   * 返回上 1/N 级页面，通过 delta 指定要返回的层级，默认 1
   *
   * @param {number} [delta=1] 要返回的层级
   * @returns
   * @memberof BaseApp
   */
  $back(delta: number = 1) {
    return wx.navigateBack({delta})
  }
}

