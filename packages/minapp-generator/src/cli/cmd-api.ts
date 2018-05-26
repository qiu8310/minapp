/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

// import * as rp from 'request-promise'
import * as async from 'async'
import * as path from 'path'
import * as fs from 'fs-extra'

import * as C from './config'
import {COLLECT} from './collect'
import {rootNode, warn, EOL} from '../generator'

export default async function(res: any, nodeIterator: any) {
  const EXPECT = 145
  const DATA = COLLECT.API
  if (rootNode.leafNodes.length !== EXPECT) warn(`API 文档数量更新了 ${rootNode.leafNodes.length - EXPECT} 页！`)

  // 确保要先在非 promise 模式下运行，并生成 PRE_PROMISABLE 文件
  if (res.promise) DATA.PROMISABLE = require(C.OUTPUT.PRE_PROMISABLE)

  let nodes = rootNode.leafNodes.filter(n => !(/\.md$/.test(n.file)))

  async.reduce(
    res._.length
      ? nodes.filter(n => res._.indexOf(n.normilizedFile) >= 0)
      : nodes.filter(n => res.canvas ? n.isCanvas : res.noCanvas ? !n.isCanvas : true),

    [] as string[],

    nodeIterator,

    (err, tss: any) => {
      if (err) return console.log(err)
      if (!res.markdown) {
        if (!res._.length && !res.noCanvas) {
          fs.writeFileSync(path.join(C.DIR.GEN_API, 'api-react', 'canvas-context.d.ts'), 'export ' + DATA.CnavasContext.toTSString(0))
        }
        if (!res._.length && !res.canvas && !res.noCanvas) {
          if (res.promise) {
            fs.writeFileSync(C.OUTPUT.PROMISABLE, JSON.stringify(DATA.PROMISABLE, null, 2))
            fs.writeFileSync(C.OUTPUT.WXP, `// Generated at ${new Date().toLocaleDateString()}${EOL}export namespace wxp {${EOL}${tss.join(EOL)}${EOL}${DATA.CnavasContext.toTSString(1, true)}${EOL}}${EOL}`)
          } else {
            fs.writeFileSync(C.OUTPUT.PRE_PROMISABLE, JSON.stringify(DATA.PROMISABLE, null, 2))
            fs.writeFileSync(C.OUTPUT.WX, `// Generated at ${new Date().toLocaleDateString()}${EOL}declare namespace wx {${EOL}${tss.join(EOL)}${EOL}${DATA.CnavasContext.toTSString(1)}${EOL}}${EOL}`)
          }
        }
      }
    }
  )
}
