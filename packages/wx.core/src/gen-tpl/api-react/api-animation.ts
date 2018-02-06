import {Template} from '../Template'

export default class extends Template {
  modify($root: Cheerio) {
    let $target = $root.find('#animation')
    $target.next().remove()

    $target.nextAll('p').each((i, p) => {
      let $p = this.$(p)
      $p.html(`<strong>animation ${$p.text()}:</strong>`)
    })

    $target.remove()
  }
}
