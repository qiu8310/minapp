#!/usr/bin/env node

import * as cli from 'mora-scripts/libs/tty/cli'
import {Compiler} from '../Compiler'

cli({
  usage: 'minapp [options] [arguments]',
  version: require('../../package.json').version,
  desc: '编译微信小程序代码'
})
.options({
  'srcDir': {
    type: 'string',
    defaultValue: 'src',
    desc: '指定 src 目录，默认为 src'
  },
  'distDir': {
    type: 'string',
    defaultValue: 'dist',
    desc: '指定 dist 目录，默认为 dist'
  },
  'w | watch': '<boolean> 开启 watch 模式',
  'p | production': '<boolean> 编译成生产环境的代码（主要会开启压缩）',
  'publicPath': '<string> 静态文件的地址前缀',
  's | serve | server': '<boolean> 是否启动一个本地服务器（默认为 false，如果指定了下面三个选项中的一个，则默认会打开）',
  'contentBase': '<string> 本地服务器的根目录',
  'host': '<string> 指定本地服务器 host，默认为 localhost',
  'port': '<string> 指定本地服务器 port，默认为 8080'
})
.parse(function(res) {
  let {watch = false, production = false, publicPath, host, port, contentBase, serve} = res

  let server
  if (serve || (host || port || contentBase)) {
    server = removeNullProps({host, port, contentBase})
  }
  return new Compiler(res.srcDir, res.distDir, {watch, publicPath, production, server})
})

function removeNullProps(obj: any) {
  let rtn: any = {}
  Object.keys(obj).forEach(k => {
    if (obj[k] != null) rtn[k] = obj[k]
  })
  return rtn
}
