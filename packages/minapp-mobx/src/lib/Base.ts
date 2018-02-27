/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import wxp from '@minapp/core'

export abstract class Base {
  /**
   * 获取全局对象 wx 的 promise 版本
   *
   * @example
   *
   * ```ts
   * // 而用 wx 只能在参数中加上 success/fail/complete 函数
   * wxp.uploadFile({...})
   *    .then(rtn => {})
   *    .catch(e => {})
   *    .finally(() => {})  // 这个是扩展的一个 promise 属性
   * ```
   * @readonly
   */
  get wxp() {
    return wxp
  }
}
