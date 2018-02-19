import {ParserError} from './parser'
import * as clog from 'mora-scripts/libs/sys/clog'

const ELLIPSE = ' ... '

export function logParserError(source: string, e: ParserError) {
  let eol = '\n'
  let gap = 3 // 取错误后的前后三行
  let truncateSize = 80
  let prevs = source.substring(0, e.index).split(eol)
  let rests = source.substr(e.index).split(eol)

  let p1 = prevs.pop() as string
  let p2 = rests.shift() as string
  let char = p2[0]
  p2 = p2.slice(1)

  let errLineNumber = prevs.length
  let lines = [...prevs, p1 + char + p2, ...rests]

  lines.forEach((l, i) => {
    if (i === errLineNumber) {
      let redChar = clog.format('%c%s%c', 'red', char, 'reset')
      if (l.length > truncateSize) {
        l = truncate(p1, truncateSize * .5, 'left')
          + redChar
          + truncate(p2, truncateSize * .5, 'right')
      } else {
        l = p1 + redChar + p2
      }

      clog(`%c  Line ${i}: %c%s`, 'bold', 'reset', l)
      clog(`%c          ${e.message}`, 'bold.red')
    } else if (Math.abs(i - errLineNumber) <= gap) {
      clog(`%c  Line ${i}: %c%s`, 'bold', 'gray', truncate(l, truncateSize))
    }
  })
}

function truncate(str: string, size: number, type?: 'left' | 'right') {
  if (str.length <= size) return str

  let el = ELLIPSE.length
  str = type === 'left' ? str.slice(el - size) : str.substr(0, size - el)
  return type === 'left'
    ? ELLIPSE + str.slice(el - size)
    : str.substr(0, size - el) + ELLIPSE
}

