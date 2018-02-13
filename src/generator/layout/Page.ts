import {Generator, EOL, PROMISABLE} from './_'
import {ApiArea, RestArea} from './Area'

export class Page {
  apis: ApiArea[]
  rests: RestArea[]

  constructor(public g: Generator, public $root: Cheerio, public promise: boolean) {
    this.apis = $root.children('.api').toArray().map(el => new ApiArea(g, this, g.$(el)))
    this.rests = $root.children('.rest').toArray().map(el => new RestArea(g, this, g.$(el)))

    if (!process.env.PROMISE) {
      this.rests.forEach(rest => {
        if (rest.klass) {
          let promisiableMethods = rest.klass.getPromisableMethods()
          if (promisiableMethods.length) PROMISABLE.KLASS[rest.klass.name] = promisiableMethods
        }
      })
      this.apis.forEach(api => {
        if (api.func.promisable) PROMISABLE.FUNCS.push(api.func.name)
      })
    } else {
      this.apis.forEach(api => {
        let klass = PROMISABLE.KLASS[api.func.returns.name]
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

  toString() {
    return `<Page ${this.g.nodeUrl}>`
  }
}
