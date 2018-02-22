import {Struct, cloneStructs, base, joinDesc} from './_'
import {Arg} from './Arg'
import {Type, ObjectType} from './Type'
import {extractNSFuncToNamespace} from './helper'

const {klassCase, TAB, EOL} = base

export class Func extends Struct {
  constructor(public namespace: string, public name: string, public args: Arg[], public returns: Type, public desc: string[]) {
    super()
  }

  // private extractArgsAndRtnsToNamespace(tabCount: number, promise?: boolean) {
  //   let rows: string[] = []
  //   let shouldAppendIndex = this.args.length > 1
  //   let rtns: string | undefined

  //   let args = this.args.map((a, i) => {
  //     if (canTypeExtract(a.type)) {
  //       let name = 'Param' + (shouldAppendIndex ? i : '')

  //       if (promise && a.type instanceof ObjectType) {
  //         let successArgType = a.type.getSuccessFirstArgType()
  //         a.type.removePromisableKey()
  //         if (canTypeExtract(successArgType)) {
  //           rows.push(...extractNS('Promised', [], successArgType))
  //           rtns = this.name + '.Promised'
  //         } else {
  //           rtns = `Promise<${successArgType.toTSString(0)}>`
  //         }
  //       }
  //       rows.push(...extractNS(name, [], a.type))
  //       let optional = a.optional
  //       if (promise && !optional && a.type instanceof ObjectType) {
  //         // type 可能变成一个空对象，promise 条件下空对象后就变成 optional（promise 会自动注入一个对象）
  //         optional = !a.type.definitions.length || a.type.definitions.every(d => !d.required)
  //       }
  //       return `${a.name}${optional ? '?' : ''}: ${this.name}.${name}`
  //     } else {
  //       return a.toTSString(tabCount)
  //     }
  //   }).join(', ')

  //   if (!rtns) { // rtns 可能是从 args[0] 中抽取出来，转化成 Promise 的接口
  //     if (canTypeExtract(this.returns)) {
  //       rows.push(...extractNS('Return', [], this.returns))
  //       rtns = `${this.name}.Return`
  //     } else {
  //       rtns = this.returns.toTSString(0)
  //     }
  //   }

  //   if (rows.length) {
  //     rows = rows.map(r => TAB + r)
  //     rows.unshift(`namespace ${this.name} {`)
  //     rows.push(`}`)
  //   }

  //   return {
  //     rows,
  //     args,
  //     rtns
  //   }
  // }

  toTSString(tabCount: number, promise: boolean = false) {
    if (promise && !this.promisable) promise = false
    let {rows, args, rtns} = extractNSFuncToNamespace('', this.name, this.args, this.returns, tabCount, promise)

    let prefix = TAB.repeat(tabCount)
    let fn = `${prefix}function ${this.name}(${args}): ${rtns}`
    return [...rows.map(r => prefix + r), joinDesc(this.desc, tabCount) + fn + EOL].join(EOL)
  }

  oldToTSString(tabCount: number, promise?: boolean) {
    if (promise && !this.promisable) promise = false

    let returns: string | undefined
    let declares: string[] = []
    let prefix = klassCase('I', this.namespace, this.name)
    let appendIndex = this.args.length > 1
    let argstr = this.args.map((a, i) => {
      if (a.type instanceof ObjectType) {
        let interfaceName = klassCase(prefix, a.name) + (appendIndex ? 'Param' + i : '')
        // 如果是 promise，需要从第一个 Arg 中抽取出返回值
        returns = extractObjectType(declares, interfaceName, a.type, tabCount, promise)
        // TODO:（下面两行比较重要）type 可能变成一个空对象，promise 条件下空对象后就变成 optional（promise 会自动注入一个对象）
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
    console.log(declares.join(EOL))
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
