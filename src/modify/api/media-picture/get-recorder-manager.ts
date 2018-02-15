import {ApiModifier} from '../..'

export default class extends ApiModifier {
  normalize($root: Cheerio) {
    super.normalize($root)
    let $target = $root.find('table').eq(2).prev()
    let title = $target.text()
    $target.replaceWith(this.sectionTitle(title))
  }
}
