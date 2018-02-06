import {Generator} from '../generator/Generator'
import * as config from '../generator/base/config'
import {info, warn, error, isSectionHead} from '../generator/base/'

export const TEMPLATE_ASSERT_ERROR = 'TEMPLATE_ASSERT_ERROR'

export interface TemplateTableMergeModify {
  type: 'merge'
  toIndex: number
  fromIndex: number

  /** 删除表格和前后的数据，默认为 true */
  remove?: boolean

  /** 在指定列上添加前缀 */
  prefixes?: string[]
  /** 在指定列上添加后缀 */
  suffixes?: string[]

  /** 添加或删除列（会先执行 prefix 和 suffix） */
  splice?: any[]
}

export interface TemplateTableUpdateModify {
  type: 'update'
  index: number
  head?: {
    col: number
    from: string
    to: string
  }
  body?: {
    row: number
    col: number
    from: string
    to: string
  }
}

export interface TemplateTableIgnoreHeadWarn {
  type: 'ignoreHeadWarn',
  index: number
  col: number
  from: string
}

export declare type TemplateModify = TemplateTableMergeModify | TemplateTableUpdateModify | TemplateTableIgnoreHeadWarn

export interface TemplateFunctionMeta {
  returns?: string
  args?: string[]
}

export class Template {
  config = config
  $root: Cheerio
  $: CheerioStatic

  constructor(public g: Generator) {
    this.$root = g.$root
    this.$ = g.$
  }

  info = (...args: any[]) => info(...args)
  warn = (...args: any[]) => warn(...args)
  error = (...args: any[]) => error(...args)
  assert(ok: any, message?: string) {
    if (!ok) {
      this.warn(message || `模板文件 ${this.g.basename}.ts 需要更新`)
      throw new Error(TEMPLATE_ASSERT_ERROR)
    }
  }

  sectionTitle(title: string) {
    return this.$(`<h4>${title}：</h4>`)
  }

  get meta(): {[fnKey: string]: TemplateFunctionMeta} {
    return {
      getStorageSync: {returns: 'any | undefined'},
      connectSocket: {returns: 'SocketTask'},
      createCanvasContext: {args: ['canvasId', '[componentInstance]'], returns: 'CanvasContext'}
    }
  }

  modify($root: Cheerio): TemplateModify[] | void {
    return []
  }

  /**
   * 修证文档中的一些 bug
   *
   * 在没 levelify 之前调用，如果需要 levelify 执行之后调用可以使用 normalizeAfterLevelify
   *
   * 在 Parser.normalize 中调用
   */
  normalize($root: Cheerio) {
    let modifies = this.modify($root) || []
    if (!modifies.length) return

    let tables = $root.find('table').toArray()
    let $ = this.$

    for (let m of modifies) {
      if (m.type === 'merge') {
        let $fromTable = $(tables[m.fromIndex])
        let $target = $(tables[m.toIndex]).find('tbody')

        let {body} = this.g.getTableData($fromTable)
        let {prefixes, suffixes, splice} = m
        body.forEach(row => {
          if (prefixes) prefixes.forEach((prefix, i) => row[i] = prefix + row[i])
          if (suffixes) suffixes.forEach((suffix, i) => row[i] = row[i] + suffix)
          if (splice) row.splice.apply(row, splice)

          let tds = row.map(r => `<td>${r}</td>`)
          $target.append(`<tr>${tds.join('')}</tr>`)
        })

        // 清除整个 fromTable section
        if (m.remove !== false) {
          let prev = $fromTable.prev()
          while (prev.length && !isSectionHead(prev)) {
            prev.remove()
            prev = $fromTable.prev()
          }
          if (isSectionHead(prev)) prev.remove()
          let next = $fromTable.next()
          while (next.length && !isSectionHead(next)) {
            next.remove()
            next = $fromTable.next()
          }
          $fromTable.remove()
        }
      } else if (m.type === 'update') {
        let $table = $(tables[m.index])
        let {head, body} = this.g.getTableData($table)
        if (m.head) {
          this.assert(head[m.head.col] === m.head.from)
          $table.find('thead th').eq(m.head.col).text(m.head.to)
        }
        if (m.body) {
          this.assert(body[m.body.row][m.body.col] === m.body.from)
          $table.find('tbody tr').eq(m.body.row).find('td').eq(m.body.col).text(m.body.to)
        }
      } else if (m.type === 'ignoreHeadWarn') {
        let $table = $(tables[m.index])
        this.assert($table.find('thead th').eq(m.col).text() === m.from)
        $table.addClass('ignoreHeadWarn')
      }
    }
  }

  normalizeAfterLevelify($root: Cheerio) {}


  levelifiedSection(title: string, elements: Cheerio) {
    let $section = this.$(`<div class="section" data-title="${title}"></div>`)
    $section.append(elements)
    return $section
  }
}
