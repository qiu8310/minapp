import {rootNode} from '../generator/layout/'
import {warn} from '../generator/base'
import * as async from 'async'

export default async function(res: any, nodeIterator: any) {
  const EXPECT = 31
  if (rootNode.leafNodes.length !== EXPECT) warn(`组件文档数量更新了 ${rootNode.leafNodes.length - EXPECT} 页！`)

  async.reduce(
    res._.length
      ? rootNode.leafNodes.filter(n => res._.indexOf(n.normilizedFile) >= 0)
      : rootNode.leafNodes,

    [] as string[],

    nodeIterator,

    (err, tss: any) => {
      console.log(err, tss)
    }
  )
}
