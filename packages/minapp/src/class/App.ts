import {toObject} from 'mora-common/util/object'
import {MBase} from './Base'

export function appify(opts?: any) {
  return function(Klass: typeof MApp) {
    App(toObject(new Klass()))
  } as any
}

export interface MApp<D = any> extends App, App.BaseOptions {

}

export class MApp<D = any> extends MBase {
  globalData: D = {} as any // 初始化为空对象
}
