import {Struct, cloneStructs, base, joinDesc} from './_'
import {Definition} from './Definition'
import {FunctionType, ObjectType} from './Type'

const {EOL, TAB} = base

export class Klass extends Struct {
  constructor(public name: string, public definitions: Definition[], public desc: string[]) {
    super()
  }

  /**
   * @param promise  暂时不支持
   */
  toTSString(tabCount: number, promise?: boolean) {
    this.definitions.forEach(d => d.setDefaultRequired())
    let spaces = TAB.repeat(tabCount)

    // let definitions = promise ? this.definitions.filter(d => !isDefinitionPromisable(d)) : this.definitions

    return joinDesc(this.desc, tabCount) + [
      `${spaces}class ${this.name} {`,
      ...this.definitions.map(d => d.toTSString(tabCount + 1, true)),
      `${spaces}}`
    ].join(EOL)
  }

  getPromisableMethods() {
    return this.definitions.filter(isDefinitionPromisable).map(def => def.name)
  }

  toString() {
    return `<Klass ${this.name}>`
  }

  clone() {
    return new Klass(this.name, cloneStructs(this.definitions), [...this.desc])
  }
}

function isDefinitionPromisable(def: Definition) {
  if (def.type instanceof FunctionType && def.type.args.length === 1) {
    let arg = def.type.args[0]
    return arg.type instanceof ObjectType && arg.type.hasPromisableKeys()
  }
  return false
}
