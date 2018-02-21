import {toObject} from 'mora-common/util/object'

import {Base} from './Base'

export function pagify(opts?: any) {
  return function(Klass: typeof BasePage) {
    Page(toObject(new Klass()))
  } as any
}

export interface BasePage<D = any, A = any> extends Page, Page.BaseOptions {
  setData(data: Partial<D>): any
}

export class BasePage<D = any, A = any> extends Base {
  data: Readonly<D> = {} as any // 初始化一个空对象

  /**
   * 获取 App 实例，即微信原生函数 getApp() 返回的对象
   *
   * @readonly
   */
  get app(): A {
    return getApp() as any
  }
}

