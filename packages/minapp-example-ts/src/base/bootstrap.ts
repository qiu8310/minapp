import m from 'minapp'
import {GlobalData} from './GlobalData'

const PAGES = require('../app.cjson?pages') // 获取 app.cjson 中的 pages 字段

export class BaseApp extends m.App<GlobalData> {
  indexPage: string = PAGES[0]
  pagesMap: {
    /*
      ！注意：INJECT_START 到 INJECT_END 之间的文件是自动注入的，请不要随意修改

      注入规则写在 .dtpl 文件夹中的 dtpl.ts 或 dtpl.js 文件中
      是利用 vscode 插件 dot-template-vscode 来达到注入功能的

      触发条件是：每次在 src/pages 目录下新建一个空文件夹时
    */

    /*# INJECT_START {"key": "pagesMap", "append": true} #*/
    index: string
    logs: string
    test: string
    /*# INJECT_END #*/
  } = getPagesMap()
}

export class BasePage<D = any> extends m.Page<D, BaseApp> {}

export const wxp = m.wxp
export const pagify = m.pagify
export const appify = m.appify

// 不同风格的导出，满足各类人土
export default {wxp, pagify, appify, Page: BasePage, App: BaseApp}

function getPagesMap() {
  return PAGES.reduce((pagesMap: any, page: string) => {
    // 需要驼峰形式的名字
    let camelPageName = (page.split('/').pop() as string).replace(/[-_](\w)/, (r, k: string) => k.toUpperCase())

    if (pagesMap.hasOwnProperty(camelPageName)) {
      console.warn(`${pagesMap[camelPageName]} 和 ${page} 的键名 ${camelPageName} 重复了，只能保留一个，请注意修改！`)
    }
    pagesMap[camelPageName] = '/' + page // 使用绝对路径
    return pagesMap
  }, {} as any)
}
