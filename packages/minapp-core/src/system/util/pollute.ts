/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {toObject} from './object'
import {mixin} from './mixin'

export interface PolluteOptions {
  /** 指定要注入的 mixin */
  mixins?: any[]
}

export function pollute(Klass: any, options: PolluteOptions, callback?: (obj: any) => void) {
  let obj: Page.Options = toObject(new Klass())
  let app = getApp() as any

  if (options.mixins && options.mixins.length) {
    mixin(obj, options.mixins)
  }

  obj.app = app

  if (callback) callback(obj)
  return obj
}
