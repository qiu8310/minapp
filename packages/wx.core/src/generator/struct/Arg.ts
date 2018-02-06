import {Struct} from './_'
import {Type, ObjectType, FunctionType} from './Type'

export class Arg extends Struct {
  // @ts-ignore
  private internalType: Type
  constructor(public name: string, type: Type, public optional: boolean = false) {
    super()
    this.type = type
  }

  set type(t: Type) {
    if (this.name.toLowerCase() === 'callback' && t instanceof ObjectType) {
      t.setDefaultRequired()
      this.internalType = new FunctionType([new Arg('res', t)], new Type('any'))
    } else {
      this.internalType = t
    }
  }

  get type() {
    return this.internalType
  }

  toTSString(tabCount: number) {
    let label = this.name + (this.optional ? '?' : '') + ':'
    let typestr = this.type.toTSString(tabCount)

    return `${label} ${this.type instanceof FunctionType ? '(' + typestr + ')' : typestr}`
  }

  toString() {
    return `<Arg ${this.name}>`
  }

  clone() {
    return new Arg(this.name, this.type.clone(), this.optional)
  }
}
