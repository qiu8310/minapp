import {TplModifier, TemplateMeta} from '../..'

export default class extends TplModifier {
  modify($root: Cheerio): TemplateMeta[] {
    let $table = $root.find('table').eq(0)
    let {head} = this.g.getTableData($table)
    this.assert(head[0] === '一级类目' && head[1] === '二级类目' && head.length === 2)
    $table.replaceWith(`<p>${this.g.tableToDesc($table)}</p>`)

    return [
      {type: 'tableTitleUpdate', index: 1, from: '状态码', to: 'bindstatechange __描述__ code'},
      {type: 'tableTitleUpdate', index: 2, from: '网络状态数据', to: 'bindnetstatus __描述__ info'},
    ]
  }
}
