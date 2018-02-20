import {toObject} from 'mora-common/util/object'

import {MBase} from './Base'

export function pagify(opts?: any) {
  return function(Klass: typeof MPage) {
    Page(toObject(new Klass()))
  } as any
}

export interface MPage<D = any, A = any> extends Page, Page.BaseOptions {
  setData(data: Partial<D>): any
}

export class MPage<D = any, A = any> extends MBase {
  data: D = {} as any // 初始化一个空对象

  private _cacheApp?: A
  /**
   * 获取 App 实例，即微信原生函数 getApp() 返回的对象
   *
   * @readonly
   */
  get app(): A {
    let app = this._cacheApp || getApp() as any
    if (!this._cacheApp) this._cacheApp = app
    return app
  }
}

