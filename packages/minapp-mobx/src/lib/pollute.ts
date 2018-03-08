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

export function pollute(obj: any, options: PolluteOptions) {
  let app = getApp() as any

  if (options.observe !== false) {
    observe(obj, options.mapStoreToData)
  }

  obj.store = app.store || {}
  return obj
}

function observe(obj: Page.Options, mapStoreToData?: (storeData: any) => any) {
  let dispose: IReactionDisposer

  core.util.mixin(obj, {
    onLoad() {
      dispose = autorun(() => {
        let data = toJS(obj.store) as any
        if (data.__MOBX__) {
          delete data.constructor
          delete data.__MOBX__
        }
        if (typeof mapStoreToData === 'function') data = mapStoreToData(data)
        this.setDataSync(data)
      })
      dispose.onError(e => console.error(e))
    },
    onUnload() {
      if (dispose) dispose()
    }
  })
}
