/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {Generator, warn, markdown, TABLE_FIRST_FILED_NAMES, Definition} from './_'
import {Area} from './Area'
import {Table} from './Table'

export class Section {
  public title: string
  // public $table: Cheerio
  public key?: string
  public table?: Table
  public hasDefinitions: boolean

  get html() {
    return this.$section.html() || ''
  }

  get definitions(): Definition[] {
    if (this.table) {
      return this.table.definitions
    } else {
      throw new Error(`${this} 没有 table，无法获取 definitions`)
    }
  }

  constructor(public g: Generator, public area: Area, public $section: Cheerio) {
    this.title = $section.data('title') || ''

    /* 标题中的 key 是找到 section 与 section 之间的关系的关键 */
    // 如果是 "xxx 上的 yyy" 的形式，则优先取 yyy
    if (/^([\w\-]+)\s*上的.+?\b([\w\-]+)/.test(this.title)) this.key = RegExp.$2
    else if (/([\w\-]+)/.test(this.title)) this.key = RegExp.$1

    let $table = $section.find('table')
    if ($table.length > 1) {
      warn(`${this} 不应该含有多于两个 table`)
    } else if ($table.length === 1) {
      let {head, body} = g.getTableData($table)

      if (TABLE_FIRST_FILED_NAMES.indexOf(head[0]) >= 0) {
        this.table = new Table(g, this, $table, head, body)
      }
    }

    this.hasDefinitions = !!this.table
  }

  toString() {
    return `Section<${this.title}>`
  }

  get isEmpty() {
    let children = this.$section.children()
    return !children.length || children.length === 1 && ['无'].indexOf(this.g.$(children[0]).text().trim()) >= 0
  }

  /**
   * @param force 即使有 table，也输出 markdown 的 table
   */
  desc(force?: boolean) {
    if (this.isEmpty) {
      return []
    } else if (force || !this.table) {
      return getBlock(this.title, this.g.markdownElement(this.$section).split(/\r?\n/))
    } else {
      this.table.$table.remove()
      let md = markdown(this.html).trim()
      return md ? ['', ...md.split(/\r?\n/)] : []
    }
  }
}

function getBlock(title: string, lines: string | string[]) {
  let rows = typeof lines === 'string' ? lines.split(/\r?\n/) : lines
  return ['', `**${title}：**`, '', ...rows]
}
