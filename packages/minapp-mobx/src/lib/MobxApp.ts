/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as core from '@minapp/core/system'
import {MobxStore} from './MobxStore'

export interface AppifyOptions extends core.AppifyOptions {
}

export function appify<S extends MobxStore>(store: S, options: AppifyOptions) {
  return core.appify(options, (obj) => {
    // @ts-ignore
    if (!store || !store.__MOBX__) {
      core.util.warn(`用 appify 函数时提供的 store: %o 没有继承 @minapp/mobx 中的 MobxStore 类`, store)
    }

    obj.store = store
  })
}

export interface MobxApp<S extends MobxStore> extends core.BaseApp {
}

export class MobxApp<S extends MobxStore> extends core.BaseApp {
  // @ts-ignore
  readonly store: S
}

