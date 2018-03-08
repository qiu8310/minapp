/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/
import {BaseApp} from './BaseApp'
import {PolluteOptions, pollute, isPlainObject} from '../util'

// 将 on 开头的生命周期函数转变成非 on 开头的
let RAW_LIFE_CYCLES = ['Created', 'Attached', 'Ready', 'Moved', 'Detached']
let ON_LIFE_CYCLES = RAW_LIFE_CYCLES.map(k => 'on' + k)
let NATIVE_LIFE_CYCLES = RAW_LIFE_CYCLES.map(k => k.toLowerCase())

// @ts-ignore
export interface BaseComponent<D, A extends BaseApp> extends Component, Component.Options {
  /**
   * 建议使用组件的 setDataSync 方法
   *
   * 两者用法一样，但 setDataSync 支持数据双向绑定
   */
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

export class BaseComponent<D, A extends BaseApp> {
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
  getApp() {
    return getApp() as A
  }

  /**
   * 对 setData 的封装，不过它更新的 data 可以支持数据双向绑定
   *
   * @memberof BaseComponent
   */
  setDataSync(data: Partial<D>, callback?: () => void) {
    let origin: any = this.data
    let {minappsync} = origin
    if (!minappsync) return this.setData(data, callback)

    let mixedData: any = data
    let parentData: any = {}
    minappsync.split('&').forEach((pair: string) => {
      let [key, parentKey] = pair.split('=')
      if (mixedData[key] !== undefined) {
        parentData[parentKey] = mixedData[key]
        delete mixedData[key]
      }
    })

    let count = 0
    let done = () => {
      count++
      if (count >= 2 && callback) callback()
    }
    if (Object.keys(mixedData).length) {
      this.setData(mixedData, done)
    } else {
      count++
    }
    if (Object.keys(parentData).length) {
      parentData.minappdone = done
      this.triggerEvent('minappsyncupdate', parentData, {})
    } else {
      count++
    }
  }

  // @ts-ignore
  // 双向绑定用于更新父组件的数据
  private minappsyncupdate(e) {
    let {minappdone, ...data} = e.detail
    this.setDataSync(data, minappdone)
  }
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
    if (!obj.methods) obj.methods = {} as any
    Object.getOwnPropertyNames(obj).forEach(k => {
      let desc = Object.getOwnPropertyDescriptor(obj, k)
      if (!desc) return
      if (ON_LIFE_CYCLES.indexOf(k) >= 0) {
        Object.defineProperty(obj, k.substr(2).toLowerCase(), desc)
        delete obj[k]
      } else if (NATIVE_LIFE_CYCLES.indexOf(k) < 0 && (typeof desc.value === 'function')) {
        Object.defineProperty(obj.methods, k, desc)
        delete obj[k]
      }
    })

    Component(obj)
  }
}

function injectObserver(obj: any, key: string, propOption: any) {
  let oldObserver = propOption.observer
  propOption.observer = function(newValue: any, oldValue: any) {
    this.onPropUpdate(key, newValue, oldValue)
    // obj.methods.onPropUpdate.call(this, key, newValue, oldValue)
    if (typeof oldObserver === 'function') oldObserver.apply(this, arguments)
  }
}
