import {base} from './_'
import {Type, ObjectType, ArrayObjectType, FunctionType} from './Type'

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
    if (!ds.length) types.push(`type ${name} = {}`)

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

export function canTypeExtract(t: Type): t is ObjectType | FunctionType {
  return t instanceof ObjectType || t instanceof FunctionType
}

function pushDesc(arr: string[], desc: string[]) {
  if (!desc.length) return
  arr.push('/**')
  desc.forEach(d => arr.push(` *${d.trim() ? ' ' : ''}${d.trim()}`))
  arr.push(' */')
}
