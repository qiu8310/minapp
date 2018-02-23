import {Location, BaseApp} from '@minapp/mobx'
import {MyStore} from './MyStore'

const PAGES = require('../app.cjson?pages') // 获取 app.cjson 中的 pages 字段
const TAB_BAR_LIST: undefined | Array<{pagePath: string, text: string}> = require('../app.cjson?tabBar.list')

let homePage: Location
let pageMap = getLocationMap()

export class MyApp extends BaseApp<MyStore> {
  homePage = homePage
  page: {
    /*
      ！注意：INJECT_START 到 INJECT_END 之间的文件是自动注入的，请不要随意修改

      注入规则写在 .dtpl 文件夹中的 dtpl.ts 或 dtpl.js 文件中
      是利用 vscode 插件 dot-template-vscode 来达到注入功能的

      触发条件是：每次在 src/pages 目录下新建一个空文件夹时
    */

    /*# INJECT_START {"key": "pagesMap", "append": true} #*/
    index: Location
    logs: Location
    /*# INJECT_END #*/
  } = pageMap
}

function getLocationMap() {
  let tabBarPage: any = {}
  let locationMap: {[key: string]: Location} = {}
  if (TAB_BAR_LIST) TAB_BAR_LIST.forEach(tab => tabBarPage[tab.pagePath] = true)

  return PAGES.reduce((map: any, page: string) => {
    // 需要驼峰形式的名字
    let camelPageName = (page.split('/').pop() as string).replace(/[-_](\w)/, (r, k: string) => k.toUpperCase())

    if (map.hasOwnProperty(camelPageName)) {
      console.warn(`${map[camelPageName]} 和 ${page} 的键名 ${camelPageName} 重复了，只能保留一个，请注意修改！`)
    }

    let location = new Location((page[0] !== '/' ? '/' : '') + page, tabBarPage[page])

    if (!homePage) homePage = location
    map[camelPageName] = location
    return map
  }, locationMap)
}
