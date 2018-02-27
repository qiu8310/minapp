/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as postcss from 'postcss'

export function px2rpx(transformMap: {[key: string]: string} = {px: 'rpx'}) {
  let keys = Object.keys(transformMap)
  if (!keys.length) throw new Error(`postcss-px2rpx 配置有误，请指定要互相转换的单位`)

  let reg = new RegExp(`\\b((?:\\d*\\.)?\\d+)(${keys.join('|')})\\b`, 'g')

  return (root: postcss.Root, result: postcss.Result) => {
    root.walkDecls(decl => {
      let val = decl.value
      val = val.replace(reg, replacer)
      if (val !== decl.value) {
        decl.value = val
      }
    })
  }

  function replacer(r: string, num: string, unit: string) {
    return num + transformMap[unit]
  }
}
