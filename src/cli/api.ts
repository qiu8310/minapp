import * as findup from 'mora-scripts/libs/fs/findup'
import * as rp from 'request-promise'
import * as async from 'async'
import * as path from 'path'
import * as fs from 'fs-extra'
import {matchAll, warn, EOL} from '../generator/base'
import {Node, rootNode, CnavasContext, PROMISABLE, setPromisable} from '../generator/layout/'
import {Generator} from '../generator/Generator'

const BASE_URL = 'https://mp.weixin.qq.com/debug/wxadoc/dev/api/'
const ROOT_DIR = path.dirname(findup.pkg(__dirname))
const GEN_DIR = path.join(ROOT_DIR, 'gen')

export default async function(res: any) {
  let content: string = await rp(BASE_URL)
  let regexp = /<li class="[^"]*" data-level="([^"]*)" data-path="([^"]*)" data-name="([^"]*)">/g

  // 解析微信文档的导航，获取所有节点
  matchAll(content, regexp, mat => new Node(mat[1], mat[2], mat[3]))

  let last = 129
  let total = rootNode.leafNodes.length
  if (total !== last) warn(`文档数量更新了 ${total - last} 页！`)

  if (res.promise) {
    process.env.PROMISE = '1'
    setPromisable(require('../../gen/pre-promisable.json'))
  }
  if (res.info) process.env.INFO = '1'
  if (res._.length === 1) process.env.WRITE_PARSED_HTML = '1'

  async.reduce(
    res._.length
      ? rootNode.leafNodes.filter(n => res._.indexOf(n.normilizedFile) >= 0)
      : rootNode.leafNodes.filter(n => res.canvas ? n.isCanvas : res.noCanvas ? !n.isCanvas : true),

    [] as string[],

    async (memo, node, done) => {
      let nodeUrl = BASE_URL + node.file

      let cacheFile = path.join(GEN_DIR, '.cache', node.topNode.normilizedFile, node.normilizedFile + '.html')
      fs.ensureDirSync(path.dirname(cacheFile))
      let noCache = res.force || !fs.existsSync(cacheFile)
      let nodeSource = noCache ? (await rp(nodeUrl)) : fs.readFileSync(cacheFile).toString()
      if (noCache) fs.writeFileSync(cacheFile, nodeSource)

      new Generator(node, nodeUrl, nodeSource, GEN_DIR)
        .exec(res.markdown, res.promise)
        .then((str) => done(undefined, str && memo ? [...memo, str] : (memo || [])))
        .catch((e: any) => done(e))
    },

    (err, tss: any) => {
      if (err) return console.log(err)
      if (!res.markdown) {
        if (!res._.length && !res.noCanvas) {
          fs.writeFileSync(path.join(GEN_DIR, 'api-react', 'canvas-context.d.ts'), 'export ' + CnavasContext.toTSString(0))
        }
        if (!res._.length && !res.canvas && !res.noCanvas) {
          if (res.promise) {
            fs.writeFileSync(path.join(GEN_DIR, 'promisable.json'), JSON.stringify(PROMISABLE, null, 2))
            fs.writeFileSync(path.join(GEN_DIR, 'wxp.d.ts'), `// Generated at ${new Date().toLocaleDateString()}${EOL}export namespace wxp {${EOL}${tss.join(EOL)}${EOL}${CnavasContext.toTSString(1, true)}${EOL}}${EOL}`)
          } else {
            fs.writeFileSync(path.join(GEN_DIR, 'pre-promisable.json'), JSON.stringify(PROMISABLE, null, 2))
            fs.writeFileSync(path.join(GEN_DIR, 'wx.d.ts'), `// Generated at ${new Date().toLocaleDateString()}${EOL}declare namespace wx {${EOL}${tss.join(EOL)}${EOL}${CnavasContext.toTSString(1)}${EOL}}${EOL}`)
          }
        }
      }
    }
  )
}
