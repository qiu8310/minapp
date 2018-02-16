import {Modifier} from './Modifier'
import {isSectionHead} from '../../generator/base/'
import {TemplateMeta} from './interface'

export class ApiModifier extends Modifier {
  modify($root: Cheerio): TemplateMeta[] | void {
    return []
  }

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
