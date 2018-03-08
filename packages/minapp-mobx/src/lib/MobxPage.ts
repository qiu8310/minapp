/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as core from '@minapp/core/system'
import {MobxStore} from './MobxStore'
import {MobxApp} from './MobxApp'
import {PolluteOptions, pollute} from './pollute'

export interface PagifyOptions extends PolluteOptions, core.PagifyOptions {
}

/**
 * 将一个继承了 BasePage 的类转化成 小程序 Page 的调用
 */
export function pagify<D, S extends MobxStore, A extends MobxApp<S>>(options: PagifyOptions = {}) {
  return core.pagify<D, A>(options, (obj) => {
    pollute(obj, options)
  })
}


export class MobxPage<D, S extends MobxStore, A extends MobxApp<S>> extends core.BasePage<D, A> {
  /**
   * app.store 的别名
   */
  // @ts-ignore
  readonly store: S
}
