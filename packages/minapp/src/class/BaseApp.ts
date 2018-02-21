// import {toObject} from 'mora-common/util/object'
import {iterateInheritedPrototype} from 'mora-common/util/iterateInheritedPrototype'
import {Base} from './Base'

export function appify(opts?: any) {
  return function(Klass: typeof BaseApp) {
    console.log(toObject(new Klass()))
    App(toObject(new Klass()))
  } as any
}

export interface BaseApp<D = any> extends App, App.BaseOptions {

}

export class BaseApp<D = any> extends Base {
  globalData: D = {} as any // 初始化为空对象
}


export interface IClassInstanceToObjectOptions {
  /**
   * 将所有的对象中的函数绑定到指定的对象上
   *
   * **注意：对象中的箭头函数无法重新绑定**
   */
  bindTo?: any

  /**
   * 要排除的键名
   *
   * 默认： ['constructor']
   */
  excludes?: string[]

  /**
   * 递归遍历到的终点对象或class(不会遍历终点对象上的属性)
   *
   * 默认： Object
   */
  till?: any
}

/**
 *
 * 将一个可能包含原型链的对象扁平化成单个对象
 *
 * 如，现有这样的类的继承关系 A -> B -> C，当创建一个实例 a = new A() 时
 *
 * a 实例会存有 B、C 的原型链，使用此函数 newa = toObject(a) 之后，
 * newa 就会变成一个 PlainObject，但它有 A、B、C 上的所有属性和方法，
 * 当然不包括静态属性或方法
 *
 * 注意：用此方法的话，尽量避免在类中使用胖函数，胖函数的 this 死死的绑定
 * 在原对象中，无法重新绑定
 */
export function toObject(something: any, options: IClassInstanceToObjectOptions = {}): {[key: string]: any} {
  let obj = {}
  if (!isObject(something)) return obj

  let excludes = options.excludes || ['constructor']

  iterateInheritedPrototype((proto) => {
    Object.getOwnPropertyNames(proto).forEach(key => {
      if (excludes.indexOf(key) >= 0) return
      if (obj.hasOwnProperty(key)) return
      let desc = Object.getOwnPropertyDescriptor(proto, key) as PropertyDescriptor

      let fnKeys = ['get', 'set', 'value'] as Array<'get'>
      fnKeys.forEach((k) => {
        if (typeof desc[k] === 'function') {
          let oldFn = desc[k] as any
          desc[k] = function(...args: any[]) {
            return oldFn.apply(options.hasOwnProperty('bindTo') ? options.bindTo : this, args)
          }
        }
      })
      Object.defineProperty(obj, key, desc)
    })
  }, something, options.till || Object, false)

  return obj
}

/**
 * 判断 something 是不是一个 JS Object (从 mora-script 中取过来的)
 *
 * 除了 null, 及字面量，其它一般都是 Object，包括 函数
 */
export function isObject(something: any) {
  let type = typeof something
  return something !== null && (type === 'function' || type === 'object')
}
