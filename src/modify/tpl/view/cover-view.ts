import {TplModifier} from '../..'

export default class extends TplModifier {
  modify($root: Cheerio) {
    let $table = $root.find('table').eq(0)
    this.assert($table.find('tbody td').eq(0).text() === '无')
    $table.remove()
  }
}
