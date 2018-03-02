/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/
// import * as fs from 'fs'
// const JSON5 = require('json5')

export function define(appJsonFile: string) {
  // let data = JSON5.parse(fs.readFileSync(appJsonFile).toString())
  // let tabs: Array<{pagePath: string, text: string}> = data.tabBar && data.tabBar.list || []

  // 这样写进去的数据不会随着文件的更新而更新
  return {
    // __APP_JSON_PAGE__: JSON.stringify(data.pages),
    // __APP_JSON_TAB_BAR_LIST__: JSON.stringify(tabs.map(t => t.pagePath))
  }
}
