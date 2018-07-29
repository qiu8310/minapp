/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as core from '@minapp/core/system'
import {IReactionDisposer, toJS, autorun} from 'mobx'

export interface PolluteOptions {
  /** 是否自动监听全局 store 的变化，默认为 true */
  observe?: boolean
  /** 将 store 中的对象映射到当前组件的 data 中，不指定则全部会映射 */
  mapStoreToData?: (storeData: any) => any
}

export function pollute(obj: any, init: string, destroy: string, options: PolluteOptions) {
  let app = getApp() as any

  if (options.observe !== false) {
    observe(obj, init, destroy, options.mapStoreToData)
  }

  obj.store = app.store || {}
  return obj
}

function observe(obj: Page.Options, init: string, destroy: string, mapStoreToData?: (storeData: any) => any) {
  let dispose: IReactionDisposer

  let mixin: any = {}
  mixin[init] = function() {
    dispose = autorun(() => {
      let data: any
      if (typeof mapStoreToData === 'function') {
        data = mapStoreToData(obj.store)
      } else {
        data = toJS(obj.store) as any
        if (data.__MOBX__) {
          delete data.constructor
          delete data.__MOBX__
        }
      }
      this.setDataSmart(data)
    })
    // @ts-ignore mobx 4 没有 onError 了，放在 autorun 配置中，但 4 之前 autorun 有个 scope 配置
    if (dispose.onError) dispose.onError(e => console.error(e))
  }
  mixin[destroy] = function() {
    if (dispose) dispose()
  }

  core.util.mixin(obj, mixin)
}
