import {Generator, EOL} from './_'
import {ApiArea, RestArea} from './Area'

export class Page {
  apis: ApiArea[]
  rests: RestArea[]

  constructor(public g: Generator, public $root: Cheerio, public promise: boolean) {
    this.apis = $root.children('.api').toArray().map(el => new ApiArea(g, this, g.$(el)))
    this.rests = $root.children('.rest').toArray().map(el => new RestArea(g, this, g.$(el)))

    if (this.g.key === 'api') this.initPromisable()
  }

  initPromisable() {
    const DATA = this.g.COLLECT.API
    if (!this.promise) {
      this.rests.forEach(rest => {
        if (rest.klass) {
          let promisiableMethods = rest.klass.getPromisableMethods()
          if (promisiableMethods.length) DATA.PROMISABLE.KLASS[rest.klass.name] = promisiableMethods
        }
      })
      this.apis.forEach(api => {
        if (api.func.promisable) DATA.PROMISABLE.FUNCS.push(api.func.name)
      })
    } else {
      this.apis.forEach(api => {
        let klass = DATA.PROMISABLE.KLASS[api.func.returns.name]
        if (klass) klass.unshift(api.func.name)
      })
    }
  }


  toTSString(tabCount: number) {
    return [
      ...this.apis.map(a =>  a.toTSString(tabCount, this.promise)),
      ...this.rests.map(r => r.toTSString(tabCount, this.promise))
    ].filter(s => !!s).join(EOL)
  }

  toJSONString() {
    return this.rests.map(r => r.toJSONString()).join(EOL)
  }

  toString() {
    return `<Page ${this.g.nodeUrl}>`
  }
}
