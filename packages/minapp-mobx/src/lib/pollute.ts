/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {toObject} from 'mora-common/util/object'
import {warn, mixin} from '../base'
import {IReactionDisposer, toJS, autorun} from 'mobx'

export interface PolluteOptions {
  /** 指定要注入的 mixin */
  mixins?: any[]
  /** 是否自动监听全局 store 的变化，默认为 true */
  observe?: boolean
  /** 将 store 中的对象映射到当前组件的 data 中，不指定则全部会映射 */
  mapStoreToData?: (storeData: any) => any
}

export function pollute(Klass: any, options: PolluteOptions) {
  let obj: Page.Options = toObject(new Klass())
  let app = getApp() as any

  if (!app.store) {
    warn(`用 appify 函数时没有提供 store，需要提供；或者将 %o 装饰器中的 observe 属性指定为 false`, Klass)
    warnWhenGetStore(obj, '无 store，详情查看之前的警告', obj)
  // @ts-ignore
  } else if (!app.store.__MOBX__) {
    warn(`用 appify 函数时提供的 store 没有继承 @minapp/mobx 中的 Store 类`)
    warnWhenGetStore(obj, 'store 没有继承 @minapp/mobx 中的 Store 类，修改 store 中的值无法触发组件自动更新', obj)
  } else if (options.observe !== false) {
    observe(obj, options.mapStoreToData)
  }

  if (options.mixins && options.mixins.length) {
    mixin(obj, options.mixins)
  }

  obj.app = app
  obj.store = app.store || {}

  return obj
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

function observe(obj: Page.Options, mapStoreToData?: (storeData: any) => any) {
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
