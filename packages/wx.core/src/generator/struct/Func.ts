import {Struct, cloneStructs, base, joinDesc} from './_'
import {Arg} from './Arg'
import {Type, ObjectType} from './Type'

const {klassCase, TAB, EOL} = base

export class Func extends Struct {
  constructor(public namespace: string, public name: string, public args: Arg[], public returns: Type, public desc: string[]) {
    super()
  }

  toTSString(tabCount: number, promise?: boolean) {
    if (promise && !this.promisable) promise = false

    let returns: string | undefined
    let declares: string[] = []
    let prefix = klassCase('I', this.namespace, this.name)
    let appendIndex = this.args.length > 1
    let argstr = this.args.map((a, i) => {
      if (a.type instanceof ObjectType) {
        let interfaceName = klassCase(prefix, a.name) + (appendIndex ? 'Param' + i : '')
        returns = extractObjectType(declares, interfaceName, a.type, tabCount, promise)
        // type 可能变成一个空对象，promise 条件下空对象后就变成 optional（promise 会自动注入一个对象）
        let optional = a.optional
        if (promise && !optional) optional = !a.type.definitions.length || a.type.definitions.every(d => !d.required)

        return new Arg(a.name, new Type(interfaceName), optional).toTSString(tabCount)
      } else {
        return a.toTSString(tabCount)
      }
    }).join(', ')

    if (!returns) { // 没有 Promise 才处理真正的 return
      if (this.returns instanceof ObjectType) {
        returns = klassCase(prefix, 'return')
        extractObjectType(declares, returns, this.returns, tabCount)
      } else {
        returns = this.returns.toTSString(tabCount)
      }
    }

    declares.push(`${joinDesc(this.desc, tabCount)}${TAB.repeat(tabCount)}function ${this.name}(${argstr}): ${returns}`)
    return declares.join(EOL)
  }

  get promisable(): boolean {
    if (this.args.length === 1) {
      let type = this.args[0].type
      return (type instanceof ObjectType) && type.hasPromisableKeys()
    }
    return false
  }

  toString() {
    return `<Func ${this.namespace}.${this.name}>`
  }
  clone() {
    return new Func(this.namespace, this.name, cloneStructs(this.args), this.returns.clone(), [...this.desc])
  }
}

function extractObjectType(declares: string[], interfaceName: string, type: ObjectType, tabCount: number, promise?: boolean) {
  let spaces = TAB.repeat(tabCount)
  let promised: string | undefined
  if (promise) {
    let successArgType = type.getSuccessFirstArgType()
    type.removePromisableKey()
    promised = `Promise<${successArgType.toTSString(tabCount)}>`
  }
  declares.push(`${spaces}type ${interfaceName} = ${type.toTSString(tabCount)}`)
  return promised
}

