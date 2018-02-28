/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {toObject} from 'mora-common/util/object'
import {Base} from './Base'
import {Store} from './Store'
import {warn, camelCase} from '../base'

import {TAB_PAGES, PAGES} from '../feat/data'
import {Url} from '../feat/Url'

export function appify<S extends Store>(store: S) {
  return function(SomeApp: new() => BaseApp<S>) {
    let obj = toObject(new SomeApp())
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
  readonly $home: Url
  readonly $url: {[key: string]: Url}

  constructor() {
    super()

    let $home: Url
    let $url: {[key: string]: Url} = {}

    PAGES.forEach(page => {
      // 需要驼峰形式的名字
      let camelPageName = camelCase(page.split('/').pop() as string)

      // 判重
      if ($url.hasOwnProperty(camelPageName)) {
        warn(`app.$url 中 ${$url[camelPageName]} 和 ${page} 的键名 ${camelPageName} 重复了，只能保留一个，请注意修改！`)
      }

      // url 需要以 / 开头
      let url = new Url('/' + page, TAB_PAGES.indexOf(page) >= 0)

      if (!$home) $home = url // $home 是 PAGES 中的第一个 url
      $url[camelPageName] = url
    })

    // @ts-ignore
    this.$home = $home
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

