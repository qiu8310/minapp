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
  store: S
}

