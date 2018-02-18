#!/usr/bin/env node

import * as cli from 'mora-scripts/libs/tty/cli'
import {Compiler} from '../Compiler'

cli({
  usage: 'minapp [options] [arguments]',
  version: require('../../package.json').version,
  desc: '编译微信小程序代码'
})
.options({
  's | srcDir': {
    type: 'string',
    defaultValue: 'src',
    desc: '指定 src 目录，默认为 src'
  },
  'd | distDir': {
    type: 'string',
    defaultValue: 'dist',
    desc: '指定 dist 目录，默认为 dist'
  },
  'w | watch': {
    type: 'boolean',
    desc: '开启 watch 模式'
  }
})
.parse(function(res) {
  return new Compiler(res.srcDir, res.distDir, {watch: !!res.watch})
})
