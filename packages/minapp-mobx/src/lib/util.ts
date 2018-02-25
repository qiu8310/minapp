import {isObject} from 'mora-common/util/object'

let warn: (...args: any[]) => void

if (__ENV__ === 'production') {
  warn = (...args: any[]) => {}
} else {
  warn = (...args: any[]) => console.warn(...args)
}

export {warn}


export function mixin(target: any, source: any[] | any) {
  let sources = Array.isArray(source) ? source : [source]

  sources.forEach(src => {
    if (!src || !isObject(src)) return
    Object.getOwnPropertyNames(src).forEach(name => {
      let srcDesc = Object.getOwnPropertyDescriptor(src, name) as PropertyDescriptor
      let distDesc = Object.getOwnPropertyDescriptor(target, name)

      if (!distDesc) {
        Object.defineProperty(target, name, srcDesc)
      } else {
        if (typeof distDesc.value === 'function' && typeof srcDesc.value === 'function') {
          Object.defineProperty(target, name, {
            ...distDesc,
            value() {
              srcDesc.value.apply(this, arguments);
              (distDesc as any).value.apply(this, arguments)
            }
          })
        } else {
          warn(`无法将 %o 对象 mixin 到 %o 对象中，%o 字段不都为函数`, src, target, name)
        }
      }
    })
  })
}

