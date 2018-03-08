/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {Base} from './Base'
import {BaseApp} from './BaseApp'
import {Location} from '../feat/Location'

import {PolluteOptions, pollute} from '../util'

export interface PagifyOptions extends PolluteOptions {
  /** 指定要注入的 mixin */
  mixins?: Page.Options[]
}

export interface BasePage<D, A extends BaseApp> extends Page, Page.BaseOptions {
  setData(data: Partial<D>, callback?: () => void): void
}

export class BasePage<D, A extends BaseApp> extends Base<D> {
  /**
   * 当前 Page 的变量，类似于 React 中的 state，
   * 不能直接修改里面的值，可以通过 setData 来修改
   */
  readonly data: Readonly<D> = {} as any // 初始化一个空对象

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
}

/**
 * 将一个继承了 BasePage 的类转化成 小程序 Page 的调用
 */
export function pagify<D, A extends BaseApp>(options: PagifyOptions = {}, polluteObj?: (obj: any) => void) {
  return function(SomePage: new() => BasePage<D, A>) {
    let obj = pollute(SomePage, options, polluteObj)
    Page(obj)
  }
}
