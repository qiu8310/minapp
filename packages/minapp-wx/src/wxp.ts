/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

/// <reference path="../typing/app.d.ts" />
/// <reference path="../typing/behavior.d.ts" />
/// <reference path="../typing/component.d.ts" />
/// <reference path="../typing/page.d.ts" />
/// <reference path="../typing/wx.d.ts" />

import './polyfill'

const PROMISABLE: {FUNCS: string[], KLASS: {[name: string]: string[]}} = {FUNCS: [], KLASS: {}}
const wxp: any = {}

Object.getOwnPropertyNames(wx).forEach(key => {
  let desc = Object.getOwnPropertyDescriptor(wx, key)
  if (desc) {
    if (PROMISABLE.FUNCS.indexOf(key) >= 0) {
      Object.defineProperty(wxp, key, {
        configurable: desc.configurable,
        enumerable: desc.enumerable,
        get() {
          // @ts-ignore
          return wxpromisify(wx[key], wx)
        }
      })
    } else {
      Object.defineProperty(wxp, key, desc)
    }
  }
})

function wxpromisify<T>(func: (...args: any[]) => any, context?: any, callbackIndex = 0): ((...args: any[]) => Promise<T>) {
  return (...args: any[]) => new Promise((resolve, reject) => {
    let {success, fail, complete, ...arg} = (args[callbackIndex] || {}) as any

    args[callbackIndex] = {
      ...arg,
      success: (res: any) => {
        resolve(res)
        if (success) success(res)
      },
      fail: (err: any) => {
        reject(err)
        if (fail) fail(err)
      },
      complete
    }

    func.call(context, ...args)
  })
}

export default wxp
