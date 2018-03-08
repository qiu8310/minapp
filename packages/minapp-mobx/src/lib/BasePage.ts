/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {Base} from './Base'
import {Store} from './Store'
import {BaseApp} from './BaseApp'
// import {warn, mixin} from './util'
import {PolluteOptions, pollute} from './pollute'

import {Location} from '../feat/Location'

export interface PagifyOptions extends PolluteOptions {
  /** 指定要注入的 mixin */
  mixins?: Page.Options[]
}


export interface BasePage<D, S extends Store, A extends BaseApp<S>> extends Page, Page.BaseOptions {
  setData(data: Partial<D>, callback?: () => void): void
}

export class BasePage<D, S extends Store, A extends BaseApp<S>> extends Base {
  /**
   * 当前 Page 的变量，类似于 React 中的 state，
   * 不能直接修改里面的值，可以通过 setData 来修改
   */
  readonly data: Readonly<D> = {} as any // 初始化一个空对象

  /**
   * app.store 的别名
   */
  // @ts-ignore
  readonly store: S

  /**
   * 获取 App 实例，即微信原生函数 getApp() 返回的对象
   */
  // @ts-ignore
  readonly app: A

  /**
   * 获取当前 page 的 location 相关信息，包括当前 pathname 和 query 参数
   */
  getLocation() {
    return new Location()
  }

  /**
   * 对 setData 的封装，不过它更新的 data 可以支持数据双向绑定
   *
   * @memberof BaseComponent
   */
  setDataSync(data: Partial<D>, callback?: () => void) {
    this.setData(data, callback)
  }

  // @ts-ignore
  // 双向绑定用于更新父组件的数据
  private minappsyncupdate(e) {
    let {minappdone, ...data} = e.detail
    this.setData(data, minappdone)
  }
}

/**
 * 将一个继承了 BasePage 的类转化成 小程序 Page 的调用
 */
export function pagify<D, S extends Store, A extends BaseApp<S>>(options: PagifyOptions = {}) {
  return function(SomePage: new() => BasePage<D, S, A>) {
    let obj = pollute(SomePage, options)
    Page(obj)
  }
}
