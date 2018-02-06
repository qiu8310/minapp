import {Template, TemplateModify} from '../Template'

export default class extends Template {

  modify(): TemplateModify[] {
    return []
  }

  normalizeAfterLevelify($root: Cheerio) {
    let $table = $root.find('[data-title="wx.getStorageInfo(OBJECT)"] [data-title="success返回参数说明"] table')
    let $target = $root.find('[data-title="wx.getStorageInfoSync"] .return')
    this.assert($table.length === 1)
    this.assert($target.length === 1)

    $target.append(this.levelifiedSection(this.config.RETURN_SECTION_TITLES[0], $table.clone()))
  }
}
