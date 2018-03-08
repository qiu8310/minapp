/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as core from '@minapp/core/system'

import {MobxStore} from './MobxStore'
import {MobxApp} from './MobxApp'

export interface ComifyOptions extends core.ComifyOptions {
}

/**
 * 将一个继承了 MobxComponent 的类转化成 小程序 Component 的调用
 */
export function comify<D, S extends MobxStore, A extends MobxApp<S>>(options: ComifyOptions = {}) {
  return core.comify<D, A>(options)
}


export class MobxComponent<D, S extends MobxStore, A extends MobxApp<S>> extends core.BaseComponent<D, A> {
  /**
   * 获取 app.store 对象
   */
  getStore() {
    return this.getApp().store
  }
}
