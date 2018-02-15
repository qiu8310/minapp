import * as postcss from 'postcss'
import {Loader} from './inc'

const PX_REGEXP = /\b((\d*\.)?\d+)px\b/g

export default function(loader: Loader) {
  return (root: postcss.Root, result: postcss.Result) => {
    root.walkDecls(decl => {
      let val = decl.value
      if (decl.value.indexOf('px') > 0) {
        val = val.replace(PX_REGEXP, '$1rpx')
      }
      if (val !== decl.value) {
        decl.value = val
      }
    })
  }
}
