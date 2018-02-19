export function page(opts?: any) {
  return function(PageClass: typeof P) {
    let i = new PageClass()
    let obj = {
      data: i.data,
      onLoad: i.onLoad
    }
    Object.defineProperty(obj, 'app', {
      enumerable: true,
      get() {
        return i.app
      }
    })
    Page(obj)
  } as any
}

export class P<D = any> {
  // @ts-ignore
  data: D

  get app() {
    return getApp()
  }

  constructor() {
  }

  onLoad() {}
  setData(obj: any) {}
}
