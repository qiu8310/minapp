#!/usr/bin/env node
import * as cli from 'mora-scripts/libs/tty/cli'

import apiCmd from './cmd-api'

cli({
  usage: 'wxgen [options] [...files]',
  desc: '自动获取微信官网文档',
  version: require('../../package.json').version
})
.commands({
  api: {
    desc: '解析微信小程序 api 文档',
    options: {
      'f | force': '<boolean> 不使用缓存',
      'c | canvas': '<boolean> 使用 canvas 相关的文件',
      'nc | noCanvas': '<boolean> 不使用 canvas 相关的文件',
      'p | promise': '<boolean> 生成 wxp.d.ts 文件，需要先生成 wx.d.ts',
      'i | info': '<boolean> 显示 info 信息',
      'm | markdown': '<boolean> 生成 markdown',
    },
    cmd: apiCmd
  }
})
.parse(function(res) { this.help() })

