/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import { Modifier } from './Modifier'
import { isSectionHead } from '../../generator/base/'
import { TemplateMeta } from './interface'

export class ApiModifier extends Modifier {
  modify($root: Cheerio): TemplateMeta[] | void {
    return []
  }

  normalize($root: Cheerio) {
    super.normalize($root)

    let modifies = this.modify($root) || []
    if (!modifies.length) return

    let tables = $root.find('table').toArray()
    let $ = this.$

    for (let m of modifies) {
      if (m.type === 'merge') {
        let $fromTable = $(tables[m.fromIndex])
        let $toTable = $(tables[m.toIndex])
        let $target = $toTable.find('tbody')

        let { body } = this.g.getTableData($fromTable)
        let { prefixes, suffixes, splice } = m
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
        let { head, body } = this.g.getTableData($table)
        if (m.head) {
          this.assert(head[m.head.col] === m.head.from)
          $table.find('thead th').eq(m.head.col).text(m.head.to)
        }
        if (m.body) {
          this.assert(body[m.body.row][m.body.col] === m.body.from)
          $table.find('tbody tr').eq(m.body.row).find('td').eq(m.body.col).text(m.body.to)
        }
        // 增加、删除或者修改列
        if (m.col) {
          let { splice, rows, head: title } = m.col
          // 判断微信文档是否增加了参数或者已经增加了当前字段
          this.assert(body.length === rows.length || head.indexOf(title) === -1)
          head.splice.apply(head, splice.concat(title))
          let $ths = head.map(r => `<th>${r}</th>`)
          $table.find('thead').html(`<tr>${$ths.join('')}</tr>`)

          let $body = body.map((row, idx) => {
            row.splice.apply(row, splice.concat(rows[idx] || ''))
            return `<tr>${row.map(r => `<td>${r}</td>`).join('')}</tr>`
          })
          $table.find('tbody').html($body.join(''))
        }
      } else if (m.type === 'ignoreHeadWarn') {
        let $table = $(tables[m.index])
        this.assert($table.find('thead th').eq(m.col).text() === m.from)
        $table.addClass('ignoreHeadWarn')
      } else if (m.type === 'tableTitleUpdate') {
        let $head = $(tables[m.index]).prev()
        this.assert($head.text() === m.from, `表格的标题不等于 ${m.from}`)
        if (/^(strong|h\d)$/.test($head.get(0).tagName)) $head.text(m.to)
        else $head.html(`<strong>${m.to}</strong>`)
      }
    }
  }

  // 给模板文件用的辅助性函数
  protected sectionTitle(title: string) {
    return this.$(`<h5>${title}：</h5>`)
  }

  protected levelifiedSection(title: string, elements: Cheerio) {
    let $section = this.$(`<div class="section" data-title="${title}"></div>`)
    $section.append(elements)
    return $section
  }
}
