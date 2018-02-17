#!/usr/bin/env node

import * as cli from 'mora-scripts/libs/tty/cli'
import {Compiler} from '../Compiler'

const baseOptions: any = {
  srcDir: {type: 'string', desc: '指定 src 目录，默认为 src', defaultValue: 'src'},
  distDir: {type: 'string', desc: '指定 dist 目录，默认为 dist', defaultValue: 'dist'}
}

cli({
  usage: 'wx build/watch [options] [arguments]',
  version: require('../../package.json').version
})
.commands({
  build: {
    desc: '编译 srcDir 中的文件到 distDir',
    options: baseOptions,
    async cmd(res) {
      return new Compiler(res.srcDir, res.distDir)
    }
  },
  watch: {
    desc: 'watch 模式的 build',
    options: baseOptions,
    async cmd(res) {
      return new Compiler(res.srcDir, res.distDir, {watch: true})
    }
  }
})
.parse(function() {
  this.help()
})
