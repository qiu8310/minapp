import {warn, rootNode, Type, Component, ComponentAttr} from '../generator/'
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

      if (!cps.find(cp => cp.name === 'slot')) {
        let cp = new Component('slot', 'https://mp.weixin.qq.com/debug/wxadoc/dev/framework/custom-component/wxml-wxss.html#%E7%BB%84%E4%BB%B6wxml%E7%9A%84slot')
        cp.desc = ['用于承载组件使用者提供的wxml结构']
        cp.attrs = [new ComponentAttr('name', new Type('string'), ['区分不同的组件的 wxml'])]
        cps.push(cp)
      } else {
        warn('slot 已经在官方文档中集成了，无需自定义')
      }

      fs.writeFileSync(OUTPUT.DETAIL_COMPONENTS, JSON.stringify(cps.map(c => c.toJSON())))
      fs.writeFileSync(OUTPUT.COMPONENTS, JSON.stringify(cps.map(c => c.toJSON(['examples'])), null, 2))
    }
  )
}
