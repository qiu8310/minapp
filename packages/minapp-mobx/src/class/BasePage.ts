import {autorun, IReactionDisposer, toJS} from 'mobx'
import {toObject} from 'mora-common/util/object'
import {Base} from './Base'
import {Store} from './Store'
import {BaseApp} from './BaseApp'

export function pagify<D, S extends Store, A extends BaseApp<S>>(mapStoreToData?: (storeData: any) => any) {
  return function(SomePage: new() => BasePage<D, S, A>) {
    let obj: Page.Options = toObject(new SomePage())
    let app = getApp() as BaseApp<S>
    if (!app.store) {
      console.warn(`app 实例中没有注入 store，page 实例无法监听`)
      console.warn(`请使用 m.appify(store) 来注入 store 到 app 中`)
    } else {
      let _onLoad = obj.onLoad
      let _onUnload = obj.onUnload
      let dispose: IReactionDisposer

      let baseDesc: PropertyDescriptor = {configurable: true, enumerable: true, writable: true}
      obj.store = app.store

      Object.defineProperties(obj, {
        onLoad: {...baseDesc, value(...args: any[]) {
          dispose = autorun(() => {
            let data = toJS(app.store) as any
            if (data.__MOBX__) {
              delete data.constructor
              delete data.__MOBX__
            }
            if (typeof mapStoreToData === 'function') data = mapStoreToData(data)
            this.setData(data)
          })
          if (_onLoad) _onLoad.apply(this, args)
        }},
        onUnload: {...baseDesc, value(...args: any[]) {
          dispose.onError(e => console.error(e))
          if (_onUnload) _onUnload.apply(this, args)
        }}
      })
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
  data: Readonly<D> = {} as any // 初始化一个空对象

  /**
   * app.store 的别名
   */
  // @ts-ignore
  store: S

  /**
   * 获取 App 实例，即微信原生函数 getApp() 返回的对象
   */
  get app(): A {
    return getApp() as A
  }
}
