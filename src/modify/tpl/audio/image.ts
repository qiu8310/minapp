import {TplModifier} from '../..'

export default class extends TplModifier {
  modify($root: Cheerio) {
    let {$} = this.g
    let $origin = $root.find('[id=原图]')
    let origin = $origin.next().find('img').attr('src')

    let map: any = {}
    this.assert(origin, '原图标签应该存在')
    $origin.nextAll('h5').toArray().forEach(h5 => {
      let $h5 = $(h5)
      let key = $h5.text()
      let val = $h5.next().next().find('img').attr('src')
      this.assert(key && val, '处理的图片应该存在')
      map[key] = val
    })
    $origin.nextAll().remove()
    $origin.remove()

    $root.find('table').eq(1).find('tr').toArray().forEach((tr, i) => {
      let texts = this.g.getTexts(tr, 'th, td')
      let $tds = $(tr).find('th, td')
      let $last = $tds.last()
      if (i === 0) {
        this.assert(texts[0] === '模式')
      } else {
        $last.text(texts[0] + ': ' + texts[2])
        if (map[texts[1]]) $last.append(`<div>原图：<img src="${origin}" /> 处理后: <img src="${map[texts[1]]}" /></div>`)
      }
      $tds.first().remove()
    })
  }
}
