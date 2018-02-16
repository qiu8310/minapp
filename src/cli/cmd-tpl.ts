import {rootNode} from '../generator/layout/'
import {warn} from '../generator/base'
import * as async from 'async'
import * as fs from 'fs-extra'
import {COLLECT} from './collect'
import {OUTPUT} from './config'

export default async function(res: any, nodeIterator: any) {
  const EXPECT = 31
  if (rootNode.leafNodes.length !== EXPECT) warn(`组件文档数量更新了 ${rootNode.leafNodes.length - EXPECT} 页！`)

  let nodes = rootNode.leafNodes
  let startIndex = res.start ? nodes.findIndex(n => n.normilizedFile === res.start) : 0
  let endIndex = res.end ? nodes.findIndex(n => n.normilizedFile === res.end) : nodes.length

  nodes = nodes.filter((n, i) => {
    return i >= startIndex
      && i < endIndex
      && (!res._.length || res._.indexOf(n.normilizedFile) >= 0)
  })

  if (!nodes.length) warn('没有指定任何节点')

  async.reduce(nodes, [] as string[], nodeIterator,
    (err, tss: any) => {
      if (err) return console.log(err)
      if (nodes.length !== EXPECT) return
      let cps = COLLECT.TPL.COMPONENTS
      fs.writeFileSync(OUTPUT.DETAIL_COMPONENTS, JSON.stringify(cps.map(c => c.toJSON())))
      fs.writeFileSync(OUTPUT.COMPONENTS, JSON.stringify(cps.map(c => c.toJSON(['examples'])), null, 2))
    }
  )
}
