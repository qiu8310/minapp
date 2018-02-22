import {base} from './_'
import {Type, ObjectType, ArrayObjectType, FunctionType} from './Type'
import {Arg} from './Arg'

const {klassCase, TAB} = base

export function extractNS(name: string, desc: string[], type: ObjectType | FunctionType) {
  let types: string[] = []
  let needExtracts: Array<{name: string, desc: string[], type: ObjectType | FunctionType}> = []

  pushDesc(types, desc)
  if (type instanceof ArrayObjectType) {
    types.push(`type ${name} = ${name}Item[]`)
    types.push(...extractNS(name + 'Item', [], new ObjectType(type.definitions)))
  } else if (type instanceof ObjectType) {
    let ds = type.definitions
    if (!ds.length) {
      types.push(`type ${name} = {}`)
    } else {
      types.push(`type ${name} = {`)
      ds.forEach(d => {
        types.push(...d.doc.map(l => TAB + l))
        let newName: string
        if (canTypeExtract(d.type)) {
          newName = name + 'Prop' + klassCase(d.name)
          needExtracts.push({name: newName, desc: d.desc, type: d.type})
        } else {
          newName = d.type.toTSString(0)
        }
        types.push(`${TAB}${d.name}${d.readonly ? '' : '?'}: ${newName}`)
      })
      types.push('}')
    }
  } else {
    let returns = name + 'Return'
    if (canTypeExtract(type.returns)) {
      needExtracts.push({name: returns, desc: [], type: type.returns})
    } else {
      returns = type.returns.toTSString(0)
    }

    let shouldAppendIndex = type.args.length > 1
    let args = type.args.map((a, i) => {
      let arg = name + 'Param' + (shouldAppendIndex ? i : '')
      if (canTypeExtract(a.type)) {
        needExtracts.push({name: arg, desc: [], type: a.type})
      } else {
        arg = a.type.toTSString(0)
      }
      return `${a.name}${a.optional ? '?' : ''}: ${arg}`
    }).join(', ')

    types.push(`type ${name} = (${args}) => ${returns}`)
  }

  needExtracts.forEach(ne => types.push(...extractNS(ne.name, ne.desc, ne.type)))

  return types
}

export function extractNSFuncToNamespace(parentNamespace: string, namespace: string, args: Arg[], returns: Type, tabCount: number, promise: boolean) {
  let shouldAppendIndex = args.length > 1
  let rows: string[] = []
  let rtns: string | undefined
  let prefix = (parentNamespace ? parentNamespace + '.' : '') + namespace

  let argstr = args.map((a, i) => {
    if (canTypeExtract(a.type)) {
      let name = 'Param' + (shouldAppendIndex ? i : '')

      if (promise && a.type instanceof ObjectType) {
        let successArgType = a.type.getSuccessFirstArgType()
        a.type.removePromisableKey()
        if (canTypeExtract(successArgType)) {
          rows.push(...extractNS('Promised', [], successArgType))
          rtns = prefix + '.Promised'
        } else {
          rtns = `Promise<${successArgType.toTSString(0)}>`
        }
      }
      rows.push(...extractNS(name, [], a.type))
      let optional = a.optional
      if (promise && !optional && a.type instanceof ObjectType) {
        // type 可能变成一个空对象，promise 条件下空对象后就变成 optional（promise 会自动注入一个对象）
        optional = !a.type.definitions.length || a.type.definitions.every(d => !d.required)
      }
      return `${a.name}${optional ? '?' : ''}: ${prefix}.${name}`
    } else {
      return a.toTSString(tabCount)
    }
  }).join(', ')

  if (!rtns) { // rtns 可能是从 args[0] 中抽取出来，转化成 Promise 的接口
    if (canTypeExtract(returns)) {
      rows.push(...extractNS('Return', [], returns))
      rtns = `${prefix}.Return`
    } else {
      rtns = returns.toTSString(0)
    }
  }

  if (rows.length) {
    rows = rows.map(r => TAB + r)
    rows.unshift(`namespace ${namespace} {`)
    rows.push(`}`)
  }

  return {
    rows,
    args: argstr,
    rtns
  }
}

export function canTypeExtract(t: Type): t is ObjectType | FunctionType {
  return t instanceof ObjectType || t instanceof FunctionType
}

function pushDesc(arr: string[], desc: string[]) {
  if (!desc.length) return
  arr.push('/**')
  desc.forEach(d => arr.push(` *${d.trim() ? ' ' : ''}${d.trim()}`))
  arr.push(' */')
}
