/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {toObject} from 'mora-common/util/object'
import {Base} from './Base'
import {Store} from './Store'

export function appify<S extends Store>(store: S) {
  return function(SomeApp: new() => BaseApp<S>) {
    let obj = toObject(new SomeApp())
    obj.store = store
    App(obj)
  }
}

export interface BaseApp<S extends Store> extends App, App.BaseOptions {

}

export class BaseApp<S extends Store> extends Base {
  // @ts-ignore
  readonly store: S
}

