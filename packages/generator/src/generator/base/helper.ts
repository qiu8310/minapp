import * as xlog from 'mora-scripts/libs/sys/xlog'
import * as warn from 'mora-scripts/libs/sys/warn'
import * as rawinfo from 'mora-scripts/libs/sys/info'
import * as error from 'mora-scripts/libs/sys/error'
import * as assert from 'assert'
import * as _ from 'lodash'
import {TAB} from './config'

const interMarkdown = new (require('turndown'))()
const markdown = (html: string | null | undefined): string => interMarkdown.turndown(html || '')

export {EOL} from 'os'
export {warn, error, assert, markdown}

export function info(...args: any[]) {
  if (process.env.INFO) rawinfo(...args)
}

/**
 * 匹配所有出现的情况， regexp 需要带 g 的标识
 */
export function matchAll(content: string, regexp: RegExp, cb: (mat: RegExpMatchArray) => void) {
  let mat: RegExpMatchArray | null = regexp.exec(content)
  let result: string[][] = []

  while (mat) {
    cb(mat)
    mat = regexp.exec(content)
  }
  return result
}


/**
 * 生成一个 markdown 的表格
 */
export function markdownTable(rows: string[][]): string[] {
  let sampleRow = rows[0]
  let columnNum = sampleRow.length
  rows.splice(1, 0, sampleRow.map(r => '')) // 加入一个空行，用于区分表头和表尾

  let rowNum = rows.length
  let columnMaxWidths = new Array(columnNum)
  for (let i = 0; i < columnNum; i++) {
    columnMaxWidths[i] = Math.max(...rows.map(r => r[i].length)) + 3
  }

  let lines = []
  for (let i = 0; i < rowNum; i++) {
    let line = ''
    let padChar = i === 1 ? '-' : ' '
    for (let j = 0; j < columnNum; j++) {
      line += xlog.align(rows[i][j], '2.' + columnMaxWidths[j], {rightPad: padChar, leftPad: padChar})
        + (j === columnNum - 1 ? '' : '|')
    }
    lines.push(line)
  }
  return lines
}

/**
 * 确保表格的列数一致
 */
export function normalizeTableRows(rows: string[][], columns: number): string[][] {
  return rows.map(row => {
    row = row.slice(0, columns)
    let i = 0
    while (i++ < columns - row.length) row.push('')
    // 换行符会导致无法生成 markdownTable
    return row.map(cell => cell ? cell.replace('\n', ' ') : '')
  })
}

/**
 * 是否是表头元素
 */
export function isSectionHead($el: Cheerio) {
  let el = $el.get(0)
  let text = $el.text().trim()
  let isHeadText = text.endsWith('：') || text.endsWith(':') || $el.next().is('table')
  return /^h\d$/.test(el.tagName)
    || el.tagName === 'strong' && isHeadText
    || el.tagName === 'p' && el.childNodes.length === 1 && el.firstChild.tagName === 'strong' && isHeadText
}

export function spacify(lines: string[], tabCount: number) {
  let spaces = TAB.repeat(tabCount)
  return lines.map(l => spaces + l)
}

export function copy<T>(from: any, to: T, fields: string[]) {
  fields.forEach(f => {
    // @ts-ignore
    if (from.hasOwnProperty(f)) to[f] = from[f]
  })
  return to
}

export function klassCase(...keys: string[]) {
  return _.upperFirst(_.camelCase(keys.join('_')))
}

export function kebabCase(...keys: string[]) {
  return _.kebabCase(keys.join('_'))
}
