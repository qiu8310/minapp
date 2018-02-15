import * as rp from 'request-promise'
import * as async from 'async'
import * as path from 'path'
import * as fs from 'fs-extra'
import {matchAll, warn, EOL} from '../generator/base'
import {Node, rootNode, CnavasContext, PROMISABLE, setPromisable} from '../generator/layout/'
import {Generator} from '../generator/Generator'

import * as C from './config'

export default async function(res: any) {
  let content: string = await rp(C.URL.BASE_API)
  let regexp = /<li class="[^"]*" data-level="([^"]*)" data-path="([^"]*)" data-name="([^"]*)">/g

  // 解析微信文档的导航，获取所有节点
  matchAll(content, regexp, mat => new Node(mat[1], mat[2], mat[3]))

  let last = 129
  let total = rootNode.leafNodes.length
  if (total !== last) warn(`API 文档数量更新了 ${total - last} 页！`)

  if (res.promise) { // 确保要先在非 promise 模式下运行，并生成 PRE_PROMISABLE 文件
    process.env.PROMISE = '1'
    setPromisable(require(C.OUTPUT.PRE_PROMISABLE))
  }

  if (res.info) process.env.INFO = '1' // 输出 info 函数的内容
  if (res._.length === 1) process.env.WRITE_PARSED_HTML = '1' // 如果输入只有一个文件，一般是调试模式，生成一个临时的 html 文件

  async.reduce(
    res._.length
      ? rootNode.leafNodes.filter(n => res._.indexOf(n.normilizedFile) >= 0)
      : rootNode.leafNodes.filter(n => res.canvas ? n.isCanvas : res.noCanvas ? !n.isCanvas : true),

    [] as string[],

    async (memo, node, done) => {
      let nodeUrl = C.URL.BASE_API + node.file

      let cacheFile = path.join(C.DIR.GEN_API, '.cache', node.topNode.normilizedFile, node.normilizedFile + '.html')
      fs.ensureDirSync(path.dirname(cacheFile))
      let noCache = res.force || !fs.existsSync(cacheFile)
      let nodeSource = noCache ? (await rp(nodeUrl)) : fs.readFileSync(cacheFile).toString()
      if (noCache) fs.writeFileSync(cacheFile, nodeSource)

      new Generator(node, nodeUrl, nodeSource, C.DIR.GEN_API)
        .exec(res.markdown, res.promise)
        .then((str) => done(undefined, str && memo ? [...memo, str] : (memo || [])))
        .catch((e: any) => done(e))
    },

    (err, tss: any) => {
      if (err) return console.log(err)
      if (!res.markdown) {
        if (!res._.length && !res.noCanvas) {
          fs.writeFileSync(path.join(C.DIR.GEN_API, 'api-react', 'canvas-context.d.ts'), 'export ' + CnavasContext.toTSString(0))
        }
        if (!res._.length && !res.canvas && !res.noCanvas) {
          if (res.promise) {
            fs.writeFileSync(C.OUTPUT.PROMISABLE, JSON.stringify(PROMISABLE, null, 2))
            fs.writeFileSync(C.OUTPUT.WXP, `// Generated at ${new Date().toLocaleDateString()}${EOL}export namespace wxp {${EOL}${tss.join(EOL)}${EOL}${CnavasContext.toTSString(1, true)}${EOL}}${EOL}`)
          } else {
            fs.writeFileSync(C.OUTPUT.PRE_PROMISABLE, JSON.stringify(PROMISABLE, null, 2))
            fs.writeFileSync(C.OUTPUT.WX, `// Generated at ${new Date().toLocaleDateString()}${EOL}declare namespace wx {${EOL}${tss.join(EOL)}${EOL}${CnavasContext.toTSString(1)}${EOL}}${EOL}`)
          }
        }
      }
    }
  )
}
