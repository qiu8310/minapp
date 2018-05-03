/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {BaseApp} from './BaseApp'
import {Location} from '../feat/Location'

import {PolluteOptions, pollute} from '../util'

export interface PagifyOptions extends PolluteOptions {
  /** 指定要注入的 mixin */
  mixins?: Page.Options[]

  /**
   * 在页面显示的时候才调用 setData，页面 hide 状态是不调用，将其数据缓存，等到页面显示再统一调用
   *
   * 默认为 true
   */
  lazySetData?: boolean
}

export interface BasePage<D, A extends BaseApp> extends Page, Page.BaseOptions {
  /**
   * 建议使用 Page 的 setDataSmart 方法
   *
   * 两者用法一样，但 setDataSmart 额外功能有：
   *  1. 支持数据双向绑定
   *  2. 优化性能，在页面隐藏状态时不更新，统一在页面显示的时候再更新（pagify 中可以指定选项 lazySetData 来禁用此功能）
   */
  setData(data: Partial<D>, callback?: () => void): void
}

export class BasePage<D, A extends BaseApp> {
  private $minappSetDataSyncStacks: any[] = []
  private $lazySetData: boolean = true

  /**
   * 当前页面是否显示
   */
  readonly $visiable: boolean = false

  /**
   * 当前 Page 的变量，类似于 React 中的 state，
   * 不能直接修改里面的值，可以通过 setData 来修改
   */
  readonly data: Readonly<D> = {} as any // 初始化一个空对象

  /**
   * 获取 App 实例，即微信原生函数 getApp() 返回的对象
   */
  // @ts-ignore
  readonly app: A

  /**
   * 获取当前 page 的 location 相关信息，包括当前 pathname 和 query 参数
   */
  getLocation() {
    return new Location()
  }

  /**
   * 对 setData 的封装，不过它更新的 data 可以支持数据双向绑定
   *
   * @memberof BaseComponent
   */
  setDataSmart(data: Partial<D>, callback?: () => void) {
    if (this.$visiable || !this.$lazySetData) {
      this.setData(data, callback)
    } else {
      this.$minappSetDataSyncStacks.push([data, callback])
    }
  }

  // @ts-ignore
  // 双向绑定用于更新父组件的数据
  private minappsyncupdate(e) {
    let {minappdone, ...data} = e.detail
    this.setDataSmart(data, minappdone)
  }
}

/**
 * 将一个继承了 BasePage 的类转化成 小程序 Page 的调用
 */
export function pagify<D, A extends BaseApp>(options: PagifyOptions = {}, polluteObj?: (obj: any) => void) {
  return function(SomePage: new() => BasePage<D, A>) {
    if (!options.mixins) options.mixins = []
    options.mixins.push({
      onShow() {
        if (this.$lazySetData && this.$minappSetDataSyncStacks && this.$minappSetDataSyncStacks.length) {
          let data: any = {}
          let callbacks: any[] = []
          this.$minappSetDataSyncStacks.forEach((it: any) => {
            data = {...data, ...it[0]}
            if (typeof it[1] === 'function') callbacks.push(it[1])
          })
          this.$minappSetDataSyncStacks.length = 0 // 清空队列

          this.setData(data, () => callbacks.forEach(cb => cb()))
        }
        this.$visiable = true
      },
      onHide() {
        this.$visiable = false
      }
    })
    let obj = pollute(SomePage, options, polluteObj)
    obj.$lazySetData = options.lazySetData === undefined ? true : !!options.lazySetData
    Page(obj)
  }
}
