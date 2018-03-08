/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/
import {Base} from './Base'
import {BaseApp} from './BaseApp'
import {PolluteOptions, pollute, isPlainObject} from '../util'

// 将 on 开头的生命周期函数转变成非 on 开头的
let RAW_LIFE_CYCLES = ['Created', 'Attached', 'Ready', 'Moved', 'Detached']
let ON_LIFE_CYCLES = RAW_LIFE_CYCLES.map(k => 'on' + k)
let NATIVE_LIFE_CYCLES = RAW_LIFE_CYCLES.map(k => k.toLowerCase())

// @ts-ignore
export interface BaseComponent<D, A extends BaseApp> extends Component, Component.Options {
  setData(data: Partial<D>, callback?: () => void): void

  /** 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData */
  onCreated?(): any
  /** 组件生命周期函数，在组件实例进入页面节点树时执行 */
  onAttached?(): any
  /** 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ） */
  onReady?(): any
  /** 组件生命周期函数，在组件实例被移动到节点树另一个位置时执行 */
  onMoved?(): any
  /** 组件生命周期函数，在组件实例被从页面节点树移除时执行 */
  onDetached?(): any

  /**
   * 组件属性更新时会调用此函数
   *
   * **注意：外部组件传值变化，或内部组件 setData 改变 prop 都会触发此函数**
   *
   * @param {string} prop 属性名
   * @param {*} newValue 新属性值
   * @param {*} oldValue 旧属性值
   * @memberof BaseComponent
   */
  onPropUpdate?(prop: string, newValue: any, oldValue: any): any
}

export class BaseComponent<D, A extends BaseApp> extends Base<D> {
  /**
   * 组件的内部数据
   *
   * 和 properties 一同用于组件的模版渲染
   */
  // @ts-ignore
  readonly data: D

  /**
   * 获取 App 实例，即微信原生函数 getApp() 返回的对象
   */
  // @ts-ignore
  readonly app: A
}

export interface ComifyOptions extends PolluteOptions {
  /** 指定要注入的 mixin */
  mixins?: Component.Options[]
}

/**
 * 将一个继承了 BaseComponent 的类转化成 小程序 Component 的调用
 */
export function comify<D, A extends BaseApp>(options: ComifyOptions = {}, polluteObj?: (obj: any) => void) {
  return function(SomeComponent: new() => BaseComponent<D, A>) {
    let obj = pollute(SomeComponent, options, polluteObj) as BaseComponent<D, A>

    if (obj.properties) {
      Object.keys(obj.properties).forEach(k => {
        // @ts-ignore
        let opt: any = obj.properties[k]
        if (!isPlainObject(opt)) {
          opt = {type: opt}
        }
        // @ts-ignore
        obj.properties[k] = opt
        if (obj.onPropUpdate) injectObserver(obj, k, opt)
      })
      obj.properties.minappsync = {type: String}
    }

    // 处理自定义的方法和生命周期函数
    if (!obj.methods) obj.methods = {}
    Object.keys(obj).forEach(k => {
      let v = obj[k]
      if (ON_LIFE_CYCLES.indexOf(k) >= 0) {
        delete obj[k]
        obj[k.substr(2).toLowerCase()] = v
      } else if (NATIVE_LIFE_CYCLES.indexOf(k) < 0) {
        // @ts-ignore
        obj.methods[k] = v
      }
    })

    Component(obj)
  }
}

function injectObserver(obj: any, key: string, propOption: any) {
  let oldObserver = propOption.observer
  propOption.observer = function(newValue: any, oldValue: any) {
    obj.onPropUpdate.call(this, key, newValue, oldValue)
    if (typeof oldObserver === 'function') oldObserver.apply(this, arguments)
  }
}
