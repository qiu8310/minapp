import {TplModifier} from '../..'

export default class extends TplModifier {
  modify($root: Cheerio) {
    let title = 'Bug & Tip'
    let $h4 = $root.find('h4').eq(1)
    this.assert($h4.text(), title)
    $h4.replaceWith(this.sectionTitle(title))
  }
}
