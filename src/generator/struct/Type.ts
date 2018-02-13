import {Definition} from './Definition'
import {Arg} from './Arg'
import {Struct, base, joinArgs, cloneStructs} from './_'

const {EOL, TAB, PROMISABLE_KEYS} = base

export class Type extends Struct {
  static MAP: any = {
    ArrayObject: 'any[]',
    Object: 'any'
  }
  constructor(public name: string) {
    super()
  }

  toTSString(tabCount: number) {
    return this.name.split(/\s*\|\s*/).map(n => Type.MAP[n] || n).join(' | ')
  }

  toString() {
    return `<Type ${this.name}>`
  }

  clone() {
    return new Type(this.name)
  }
}

export class FunctionType extends Type {
  constructor(public args: Arg[], public returns: Type) {
    super('function')
  }

  /**
   * @param method  是否是 klass 中的方法
   */
  toTSString(tabCount: number, isKlassMethod?: boolean) {
    return `(${joinArgs(this.args, tabCount)})${isKlassMethod ? ':' : ' =>'} ${this.returns.toTSString(tabCount)}`
  }
  clone() {
    return new FunctionType(cloneStructs(this.args), this.returns.clone())
  }
}

export class ObjectType extends Type {
  constructor(public definitions: Definition[]) {
    super('Object')
  }

  setDefaultRequired() {
    this.definitions.forEach(d => d.setDefaultRequired())
  }

  getSuccessFirstArgType() {
    let success = this.definitions.find(d => d.name === 'success' && (d.type instanceof FunctionType)) as Definition
    return (success.type as FunctionType).args[0].type
  }

  removePromisableKey() {
    this.definitions = this.definitions.filter(d => PROMISABLE_KEYS.indexOf(d.name) < 0 || !(d.type instanceof FunctionType))
  }

  hasPromisableKeys() {
    return PROMISABLE_KEYS.every(k => {
      let def = this.definitions.find(d => d.name === k)
      return def ? def.type instanceof FunctionType : false
    })
  }

  toTSString(tabCount: number) {
    if (!this.definitions.length) return '{}'
    return [
      '{',
      this.definitions.map(d => d.toTSString(tabCount + 1)).join(EOL + EOL),
      TAB.repeat(tabCount) + '}'
    ].join(EOL)
  }

  clone() {
    return new ObjectType(cloneStructs(this.definitions))
  }
}

export class ArrayObjectType extends ObjectType {
  constructor(public definitions: Definition[]) {
    super(definitions)
    this.name = 'ArrayObject'
  }

  toTSString(tabCount: number) {
    return 'Array<' + super.toTSString(tabCount) + '>'
  }

  clone() {
    return new ArrayObjectType(cloneStructs(this.definitions))
  }
}
