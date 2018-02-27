/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {Struct, cloneStructs, base, joinDesc} from './_'
import {Definition} from './Definition'
import {FunctionType, ObjectType, Type} from './Type'
import {extractNS, canTypeExtract, extractNSFuncToNamespace} from './helper'

const {EOL, TAB, klassCase} = base

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

    let rows: string[] = []
    let defines = this.definitions.map(d => {
      if (d.type instanceof FunctionType) {
        let rtn = extractNSFuncToNamespace(this.name, d.name, d.type.args, d.type.returns, tabCount, false)
        rows.push(...rtn.rows)
        let fn = new FunctionType([], new Type(rtn.rtns))
        fn.toTSString = () => `(${rtn.args}): ${rtn.rtns}`
        d = new Definition(d.name, fn, d)
      } else if (canTypeExtract(d.type)) {
        let name = klassCase(d.name)
        let refName = this.name + '.' + name
        rows.push(...extractNS(name, d.desc, d.type))
        d = new Definition(d.name, new Type(refName), d)
      }
      return d.toTSString(tabCount + 1, true)
    })

    if (rows.length) {
      rows = rows.map(r => TAB + r)
      rows.unshift(`namespace ${this.name} {`)
      rows.push(`}`)
    }

    return rows.map(r => spaces + r + EOL).join('') + joinDesc(this.desc, tabCount) + [
      `${spaces}class ${this.name} {`,
      ...defines,
      `${spaces}}`
    ].join(EOL)
  }

  /**
   * @param promise  暂时不支持
   */
  oldToTSString(tabCount: number, promise?: boolean) {
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
