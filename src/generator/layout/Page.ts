import {Generator, EOL} from './_'
import {ApiArea, RestArea, ComponentArea} from './Area'

export class Page {
  apis: ApiArea[]
  comps: ComponentArea[] = []
  rests: RestArea[] = []

  constructor(public g: Generator, public $root: Cheerio, public promise: boolean) {
    this.apis = $root.children('.api').toArray().map(el => new ApiArea(g, this, g.$(el)))
    let rests = $root.children('.rest').toArray()

    if (this.g.key === 'api') {
      this.rests = rests.map(el => new RestArea(g, this, g.$(el)))
      this.initPromisable()
    } else {
      this.comps = rests.map(el => new ComponentArea(g, this, g.$(el)))
    }
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
    this.g.COLLECT.TPL.COMPONENTS.push(...this.comps.map(c => c.component))
    return ''
  }

  toString() {
    return `<Page ${this.g.nodeUrl}>`
  }
}
