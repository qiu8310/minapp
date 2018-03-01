/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

// 这些变量是通过 webpack 的 DefinePlugin 导入的
/**
 * process.env.NODE_ENV 中的值
 *
 * 如果没有指定则默认为 "developemnt"
 *
 * 如果编译时带了 -p 选项，则此值一定是 "production"
 */
declare var __ENV__: 'developemnt' | 'production' | 'test' | string

/** app.json 中的 tabBar.list 中的 pagePath 列表 */
declare var __APP_JSON_TAB_BAR_LIST__: string[]

/** app.json 中的 pages 列表 */
declare var __APP_JSON_PAGE__: string[]


