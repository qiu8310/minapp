/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {autorun, IReactionDisposer, toJS} from 'mobx'
import {toObject} from 'mora-common/util/object'
import {Base} from './Base'
import {Store} from './Store'
import {BaseApp} from './BaseApp'
import {warn, mixin} from './util'

export interface PagifyOptions {
  /** 指定要注入的 mixin */
  mixins?: Page.Options[]
  /** 是否自动监听全局 store 的变化，默认为 true */
  observe?: boolean
  /** 将 store 中的对象映射到当前组件的 data 中，不指定则全部会映射 */
  mapStoreToData?: (storeData: any) => any
}

/**
 * 将一个继承了 BasePage 的类转化成 小程序 Page 的调用
 * @param {(false | ((storeData: any) => any))} [mapStoreToData] - 是否要注入 store 中的数据，或者返回指定要注入的数据
 */
export function pagify<D, S extends Store, A extends BaseApp<S>>(options: PagifyOptions = {}) {
  return function(SomePage: new() => BasePage<D, S, A>) {
    let obj: Page.Options = toObject(new SomePage())
    let app = getApp() as BaseApp<S>

    obj.store = app.store || {}

    if (!app.store) {
      warn(`用 appify 函数时没有提供 store，需要提供；或者将 pagify 中 observe 属性指定为 false`)
      warnWhenGetStore(obj, '无 store，详情查看之前的警告', obj)
    // @ts-ignore
    } else if (!app.store.__MOBX__) {
      warn(`用 appify 函数时提供的 store 没有继承 @minapp/mobx 中的 Store 类`)
      warnWhenGetStore(obj, 'store 没有继承 @minapp/mobx 中的 Store 类，修改 store 中的值无法触发组件自动更新', obj)
    } else if (options.observe !== false) {
      inject(obj, options.mapStoreToData)
    }

    if (options.mixins && options.mixins.length) {
      mixin(obj, options.mixins)
    }

    Page(obj)
  }
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
  get app(): A {
    return getApp() as A
  }
}

function warnWhenGetStore(obj: any, ...args: any[]) {
  Object.defineProperty(obj, 'store', {
    configurable: true,
    enumerable: true,
    writable: false,
    get() {
      warn(...args)
      return obj.store
    }
  })
}

function inject(obj: Page.Options, mapStoreToData?: (storeData: any) => any) {
  let dispose: IReactionDisposer

  mixin(obj, {
    onLoad() {
      dispose = autorun(() => {
        let data = toJS(obj.store) as any
        if (data.__MOBX__) {
          delete data.constructor
          delete data.__MOBX__
        }
        if (typeof mapStoreToData === 'function') data = mapStoreToData(data)
        this.setData(data)
      })
      dispose.onError(e => console.error(e))
    },
    onUnload() {
      if (dispose) dispose()
    }
  })
}
