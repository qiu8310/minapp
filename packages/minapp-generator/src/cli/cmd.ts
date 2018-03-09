#!/usr/bin/env node

import * as cli from 'mora-scripts/libs/tty/cli'
import * as rp from 'request-promise'
import * as path from 'path'
import * as fs from 'fs-extra'

import * as C from './config'
import apiCmd from './cmd-api'
import tplCmd from './cmd-tpl'
import {matchAll, Node, Generator} from '../generator'

const commonOpts: any = {
  'i | info': '<boolean> 显示 info 信息',
  'f | force': '<boolean> 不使用缓存',
  'm | markdown': '<boolean> 生成 markdown',
}

cli({
  usage: 'wg [options] [...files]',
  desc: '自动获取微信官网文档',
  version: require('../../package.json').version
})
.commands({
  api: {
    desc: '解析微信小程序 api 文档',
    options: {
      ...commonOpts,
      'c | canvas': '<boolean> 使用 canvas 相关的文件',
      'nc | noCanvas': '<boolean> 不使用 canvas 相关的文件',
      'p | promise': '<boolean> 生成 wxp.d.ts 文件，需要先生成 wx.d.ts',
    },
    cmd: wrapCmd('api', apiCmd)
  },
  tpl: {
    desc: '解析微信小程序组件文档',
    options: {
      ...commonOpts,
      's | start': '<string> 起点 文档 （包含）',
      'e | end':   '<string> 结束点 文档（不包含）'
    },
    cmd: wrapCmd('tpl', tplCmd)
  }
})
.parse(function(res) { this.help() })


// 通用的一些处理
function wrapCmd(key: string, cmd: ((res: any, iterator: any) => any)) {
  return async function(this: any, res: any) {
    // 输出 info 函数的内容
    if (res.info) process.env.INFO = '1'

    // 如果输入只有一个文件，一般是调试模式，生成一个临时的 html 文件
    if (res._.length === 1) process.env.WRITE_DEBUG_HTML = '1'

    const content: string = await rp(key === 'api' ? C.URL.BASE_API : C.URL.BASE_TPL)
    let regexp = /<li class="[^"]*" data-level="([^"]*)" data-path="([^"]*)" data-name="([^"]*)">/g

    // 解析微信文档的导航，获取所有节点
    matchAll(content, regexp, mat => new Node(mat[1], mat[2], mat[3]))

    try {
      await cmd.call(this, res, makeNodeReduceIterator(res, key))
    } catch (e) {
      console.error(e)
    }
  }
}

function makeNodeReduceIterator(res: any, key: string) {
  let baseUrl = key === 'api' ? C.URL.BASE_API : C.URL.BASE_TPL
  let genDir = key === 'api' ? C.DIR.GEN_API : C.DIR.GEN_TPL

  return async (allResult: undefined | string[], node: Node, done: any) => {
    let nodeUrl = baseUrl + node.file

    let cacheFile = path.join(genDir, '.cache', node.topNode.normilizedFile, node.normilizedFile + '.html')
    fs.ensureDirSync(path.dirname(cacheFile))
    let noCache = res.force || !fs.existsSync(cacheFile)

    try { // new Generator 是同步的，其中可能报错
      let nodeSource = noCache ? (await rp(nodeUrl)) : fs.readFileSync(cacheFile).toString()
      if (noCache) fs.writeFileSync(cacheFile, nodeSource)

      new Generator(key, node, nodeUrl, nodeSource, genDir)
        .exec(res.markdown, res.promise)
        .then((str) => {
          if (!allResult) allResult = []
          if (str) allResult.push(str)
          done(undefined, allResult)
        })
        .catch((e: any) => done(e))
    } catch (e) {
      console.log(e)
    }
  }
}
