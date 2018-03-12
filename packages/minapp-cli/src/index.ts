#!/usr/bin/env node

import {error, clog, warn} from 'mora-scripts/libs/sys/'
import * as cli from 'mora-scripts/libs/tty/cli'
import * as DotProp from 'mora-scripts/libs/lang/DotProp'

import {EOL} from 'os'
import * as fs from 'fs-extra'
import * as path from 'path'

import {Compiler} from '@minapp/compiler'
import {parseAttrs} from '@minapp/common/dist/parseAttrs'
import {questions} from './questions'

const pkg = require('../package.json')

import {getMinappConfig, getComponentJson} from './helper'
import {make} from './make'

require('update-notifier')({pkg}).notify()

const version = pkg.version

let commonOpts = {
  srcDir: '<string> specify code source directory    {{"src"}}',
  distDir: '<string> specify build files directory   {{"dist"}}',
}

cli({
  usage: 'minapp <command> [options]',
  version
}).commands({
  'init': {
    desc: 'init a project',
    conf: { usage: 'cli init <folder>' },
    cmd: res => init(res._)
  },
  'dev': {
    desc: 'develop a preject, will inject a global variable: __ENV__="development"',
    conf: {version},
    options: {
      ...commonOpts,
      'host': '<string> server host  {{"localhost"}}',
      'port': '<string> server port  {{"8080"}}',
      'm | minimize': '<boolean> minimize source files',
    },
    cmd: res => compile('dev', res)
  },
  'build': {
    desc: 'build a project, will inject a global variable: __ENV__="production"',
    conf: {version},
    options: {
      ...commonOpts,
      'pretty': '<boolean> do not minimize source code',
      'p | publicPath': '<string> static file\'s publicPath, just like `output.publicPath` in webpack',
      'w | watch': '<boolean> watch mode, without webpack-dev-server',
    },
    cmd: res => compile('build', res)
  },
  'attrs | component-attrs': {
    desc: 'generate component attributes description to component json file',
    conf: {version},
    options: {},
    cmd: componentJson
  }
}).parse((res, self) => self.help())


/**
 * 初始化一个项目
 */
function init(folders: string[]) {
  if (folders.length === 0) return error(`Please specify the initial directory`)
  if (folders.length > 1) return error(`You can only specify one directory`)
  let dir = folders[0]
  let absDir = path.resolve(dir)

  if (fs.existsSync(dir)) {
    if (!fs.statSync(dir).isDirectory()) return error(`Target "${dir}" is not a valid directory`)
    if (fs.readdirSync(dir).length) return error(`Directory "${dir}" already has files in it, please use an empty directory or not exist directory`)
  }

  questions(absDir).then((answers) => {
    fs.ensureDirSync(absDir)
    make(absDir, answers)

    console.log(
      `${EOL}  ${answers.language} ${answers.type} ${answers.name} initialize successfully${EOL}`
      + `=====================================================================${EOL}${EOL}`
      + `  You can run next two commands to continue:${EOL}${EOL}`
      + `    ${code('cd ' + dir)}${EOL}`
      + `    ${code('npm install')} or ${code('yarn install')}${EOL}${EOL}${EOL}`
      + `    ${clog.format('%cHave a good time !', 'magenta')} ${EOL}`
    )
  })
}

function code(str: string) {
  return clog.format('%c' + str, 'yellow')
}

function compile(type: string, opts: cli.Response) {
  let minapp = getMinappConfig()

  if (type === 'dev') {
    let {host, port, minimize} = opts

    if (minapp.component) { // 组件开发不需要 server
      return new Compiler(opts.srcDir, opts.distDir, {watch: true, minimize, production: false, minapp})
    } else {
      let server: any = minapp && minapp.compiler && minapp.compiler.devServer || {}
      if (opts.userDefined.host || !server.host) server.host = host || 'localhost'
      if (opts.userDefined.port || !server.port) server.port = port || '8080'

      return new Compiler(opts.srcDir, opts.distDir, {server, minimize, production: false, minapp})
    }
  } else {
    let {watch, publicPath, pretty} = opts
    if (minapp.component) { // 判断有没有添加组件描述
      let {jsonFile, json} = getComponentJson(minapp.component)
      if (!json.minapp || !json.minapp.component || Object.keys(json.minapp.component).length === 0) {
        warn(`No "minapp.component" filed in component json file ${jsonFile}`)
        warn('For a better develop experience, you should add description about you component in "minapp.component" field')
        warn('And you can try to use command "minapp component-attrs" to automate add component attrs description.')
      }
    }
    return new Compiler(opts.srcDir, opts.distDir, {watch, publicPath, minimize: !pretty, production: true, minapp})
  }
}

function componentJson(res: any) {
  let minapp = getMinappConfig()
  if (!minapp.component) return error('Not component develop environment')

  let {jsonFile, jsFile, jsContent, json} = getComponentJson(minapp.component)
  if (!jsonFile || !json || !jsFile || !jsContent) return error('Can not found any component files')
  let attrs = parseAttrs(jsContent)
  if (!attrs.length) return warn('Not found any component attrs in ' + jsFile)

  DotProp.set(json, 'minapp.component.attrs', attrs)
  console.log(`write component attrs: `)
  console.log(JSON.stringify(attrs, null, 2))
  fs.writeFileSync(jsonFile, JSON.stringify(json, null, 2))
}
