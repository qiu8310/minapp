import {ApiModifier} from '../..'

export default class extends ApiModifier {
  modify($root: Cheerio) {
    $root.find('h2').each((i, el) => {
      let $el = this.$(el)
      $el.replaceWith(`<h3 id=${$el.attr('id')}>${$el.text()}</h3>`)
    })

    $root.find('table').eq(8).prev().html('<strong>success 参数说明</strong>')
  }
}
