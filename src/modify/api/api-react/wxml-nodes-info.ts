import {ApiModifier, TemplateMeta} from '../..'

export default class extends ApiModifier {
  modify($root: Cheerio): TemplateMeta[] {
    // h3 换成 h4
    $root.find('h3').toArray().forEach(h3 => {
      let $el = this.$(h3)
      $el.replaceWith(`<h4>${$el.text()}</h4>`)
    })

    // h2 换成 h3
    let $h2 = $root.find('h2').eq(0)
    let title = 'wx.createSelectorQuery()'
    this.assert($h2.text().trim() === title)

    $h2.replaceWith(`<h3>${title}</h3>`)

    // 修改 table
    let $td = $root.find('table').eq(0).find('tbody tr').eq(0).find('td').eq(1)
    this.assert($td.text().trim() === 'object Component')
    $td.text('component')
    return []
  }
}
