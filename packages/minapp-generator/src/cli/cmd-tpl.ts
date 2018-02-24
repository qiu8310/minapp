import {warn, rootNode, Type, Component, ComponentAttr} from '../generator/'
import * as async from 'async'
import * as fs from 'fs-extra'
import {COLLECT} from './collect'
import {OUTPUT} from './config'

const custom = [
  {name: 'slot', attrs: [{name: 'name'}], desc: '用于承载组件使用者提供的wxml结构', link: 'https://mp.weixin.qq.com/debug/wxadoc/dev/framework/custom-component/wxml-wxss.html#%E7%BB%84%E4%BB%B6wxml%E7%9A%84slot'},
  {name: 'template', attrs: [{name: 'name'}, {name: 'is'}, {name: 'data', type: 'any'}], link: 'https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/template.html'},
  {name: 'block', link: 'https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/conditional.html#block-wxif'},
  {name: 'import', attrs: [{name: 'src'}], desc: 'import 有作用域的概念，即只会 import 目标文件中定义的 template，而不会 import 目标文件 import 的 template', link: 'https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/import.html#import'},
  {name: 'include', attrs: [{name: 'src'}], desc: 'include 可以将目标文件除了 <template/> <wxs/> 外的整个代码引入，相当于是拷贝到 include 位置', link: 'https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/import.html#include'},
]

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

      custom.forEach(c => {
        if (cps.find(cp => cp.name === c.name)) {
          warn(c.name + ' 已经在官方文档中集成了，无需自定义')
        } else {
          let cp = new Component(c.name, c.link)
          if (c.desc) cp.desc = [c.desc]
          if (c.attrs) cp.attrs = (c.attrs as any).map((a: any) => new ComponentAttr(a.name, new Type(a.type || 'string'), []))
          cps.push(cp)
        }
      })

      fs.writeFileSync(OUTPUT.DETAIL_COMPONENTS, JSON.stringify(cps.map(c => c.toJSON())))
      fs.writeFileSync(OUTPUT.COMPONENTS, JSON.stringify(cps.map(c => c.toJSON(['examples'])), null, 2))
    }
  )
}
