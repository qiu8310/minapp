import * as base from '../base'
export {base}

export abstract class Struct {
  abstract toTSString(tabCount: number): string
  abstract toString(): string
  abstract clone(): Struct
}

import {Arg} from './Arg'

export function joinArgs(args: Arg[], tabCount: number) {
  return args.map(a => a.toTSString(tabCount)).join(', ')
}
export function joinDesc(desc: string[], tabCount: number) {
  if (!desc.length) return ''
  let lines = ['/**', ...desc.map(d => ` *${d.trim() ? ' ' + d : ''}`), ' */']
  return base.spacify(lines, tabCount).join(base.EOL) + base.EOL
}
export function cloneStructs<T>(structs: T[]): T[] {
  // @ts-ignore
  return structs.map(s => s.clone())
}
