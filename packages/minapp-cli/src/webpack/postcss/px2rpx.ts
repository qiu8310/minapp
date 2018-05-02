/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as postcss from 'postcss'

interface Map {
  [key: string]: {rate: number, unit: string}
}

export function px2rpx(transformMap: {[key: string]: string} = {px: 'rpx'}) {
  let keys = Object.keys(transformMap)
  if (!keys.length) throw new Error(`postcss-px2rpx config error, nothing to transform`)

  let rateUnitRegExp = /^([\.\d]+)(\w+)$/
  let map: Map = keys.reduce((res, key) => {
    let rate: number = 1
    let unit: string = transformMap[key]
    if (rateUnitRegExp.test(unit)) {
      rate = parseFloat(RegExp.$1)
      unit = RegExp.$2
    }
    res[key] = {rate, unit}
    return res
  }, {} as Map)

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

  function replacer(r: string, num: string, key: string) {
    return parseFloat(num) * map[key].rate + map[key].unit
  }
}
