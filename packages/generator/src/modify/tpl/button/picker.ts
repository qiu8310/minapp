import {TplModifier} from '../..'

export default class extends TplModifier {
  normalizeHtml(html: string) {
    let table = this.makeTable(
      ['属性', '类型', '默认值', '说明'],
      [['mode', 'string', 'selector', '选择器的类型']]
    )
    let search = '<h4 id="picker">picker</h4>'
    this.assert(html.includes(search))
    return html.replace(search, search + table)
  }

  modify($root: Cheerio) {
    $root.find('table').toArray().slice(1).forEach(table => {
      let $head = this.$(table).prev()
      $head.replaceWith(`<h5>${$head.text()}</h5>`)
    })
  }
}
