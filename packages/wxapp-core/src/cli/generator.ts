#!/usr/bin/env node
import * as cli from 'mora-scripts/libs/tty/cli'
import * as findup from 'mora-scripts/libs/fs/findup'
import * as rp from 'request-promise'
import * as async from 'async'
import * as path from 'path'
import * as fs from 'fs-extra'
import {matchAll, warn, EOL} from '../generator/base'
import {Node, rootNode, CnavasContext, PROMISABLE} from '../generator/layout/'
import {Generator} from '../generator/Generator'

const BASE_URL = 'https://mp.weixin.qq.com/debug/wxadoc/dev/api/'
const ROOT_DIR = path.dirname(findup.pkg(__dirname))
const GEN_DIR = path.join(ROOT_DIR, 'gen')

cli({
  usage: 'wxgen [options] [...files]',
  desc: '自动获取微信官网文档',
  version: require('../../package.json').version
})
.options({
  'f | force': '<boolean> 不使用缓存',
  'c | canvas': '<boolean> 使用 canvas 相关的文件',
  'nc | noCanvas': '<boolean> 不使用 canvas 相关的文件',
  'p | promise': '<boolean> 生成 wxp.d.ts 文件，需要先生成 wx.d.ts',
  'i | info': '<boolean> 显示 info 信息',
  'm | markdown': '<boolean> 生成 markdown',
})
.parse(async function(res) {
  let content: string = await rp(BASE_URL)
  let regexp = /<li class="[^"]*" data-level="([^"]*)" data-path="([^"]*)" data-name="([^"]*)">/g

  // 解析微信文档的导航，获取所有节点
  matchAll(content, regexp, mat => new Node(mat[1], mat[2], mat[3]))

  let last = 129
  let total = rootNode.leafNodes.length
  if (total !== last) warn(`文档数量更新了 ${total - last} 页！`)

  if (res.info) process.env.INFO = '1'

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
            fs.writeFileSync(path.join(ROOT_DIR, 'src', 'wxp', 'wxp.d.ts'), `// Generated at ${new Date().toLocaleDateString()}${EOL}export namespace wxp {${EOL}${tss.join(EOL)}${EOL}${CnavasContext.toTSString(1, true)}${EOL}}${EOL}`)
          } else {
            fs.writeFileSync(path.join(ROOT_DIR, 'src', 'wxp', 'promiable.ts'), `/* tslint:disable */${EOL}export const PROMIABLE: {FUNCS: string[], KLASS: {[name: string]: string[]}} = ${JSON.stringify(PROMISABLE)}${EOL}`)
            fs.writeFileSync(path.join(ROOT_DIR, 'typing', 'wx.d.ts'), `// Generated at ${new Date().toLocaleDateString()}${EOL}declare namespace wx {${EOL}${tss.join(EOL)}${EOL}${CnavasContext.toTSString(1)}${EOL}}${EOL}`)
          }
        }
      }
    }
  )
})

