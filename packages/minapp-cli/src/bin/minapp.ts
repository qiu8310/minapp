#!/usr/bin/env node

/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as cli from 'mora-scripts/libs/tty/cli'
import {clearCommand, clearOptions} from './minapp-clear'
import {initCommand, initOptions} from './minapp-init'
import {devCommand, devOptions} from './minapp-dev'
import {buildCommand, buildOptions} from './minapp-build'
import {attrsCommand, attrsOptions} from './minapp-attrs'

const pkg = require('../../package.json')
require('update-notifier')({pkg}).notify()
const version = false

cli({
  usage: 'minapp <command> [options]',
  version: pkg.version
}).commands({
  'clear': {
    cmd: clearCommand,
    conf: {version, usage: 'minapp clear [...directories]'},
    desc: 'clear directories',
    options: clearOptions
  },
  'init': {
    cmd: initCommand,
    conf: {version, usage: 'minapp init <folder>'},
    desc: 'init a project',
    options:
    initOptions
  },
  'dev': {
    cmd: devCommand,
    conf: {version},
    desc: 'develop a preject, will inject a global variable: __ENV__="development"',
    options: devOptions
  },
  'build': {
    cmd: buildCommand,
    conf: {version},
    desc: 'build a preject, will inject a global variable: __ENV__="production"',
    options: buildOptions
  },
  'attrs | component-attrs': {
    cmd: attrsCommand,
    conf: {version},
    desc: 'generate component attributes description to component json file',
    options: attrsOptions
  },
}).parse((res, cli) => cli.help())
