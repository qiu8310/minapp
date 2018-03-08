/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import wxp from '../../index'

export interface Base<D> {
  setData(data: Partial<D>, callback?: () => void): void
}

export abstract class Base<D> {
  // @ts-ignore
  readonly data: D

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
      // @ts-ignore Page 是最顶层的组件，不可能出现此语句
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

  /**
   * 获取全局对象 wx 的 promise 版本
   */
  get wxp() {
    return wxp
  }
}
