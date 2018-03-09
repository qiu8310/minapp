#!/usr/bin/env node

import {error, clog, warn} from 'mora-scripts/libs/sys/'
import * as cli from 'mora-scripts/libs/tty/cli'

import {EOL} from 'os'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as inquirer from 'inquirer'
import {Compiler} from '@minapp/compiler'
import {parseAttrs} from '@minapp/common/dist/parseAttrs'
const validateProjectName = require('validate-npm-package-name')
const pkg = require('../package.json')

import {getGitUser, getMinappConfig, getComponentJson, getStateType} from './helper'
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
    desc: 'init a project|component',
    conf: { usage: 'cli init <folder>' },
    cmd: res => init(res._)
  },
  'dev': {
    desc: 'develop a preject, will inject a global variable: __ENV__="development"',
    conf: {version},
    options: {
      ...commonOpts,
      'host': '<string> server host {{"localhost"}}',
      'port': '<string> server port {{"8080"}}',
      'm | minimize': '<boolean> minimize source files',
    },
    cmd: res => compile('dev', res)
  },
  'build': {
    desc: 'build a project, will inject a global variable: __ENV__="production"',
    conf: {version},
    options: {
      ...commonOpts,
      'p | publicPath': '<string> static file\'s publicPath, just like `output.publicPath` in webpack',
      'w | watch': '<boolean> watch mode, without webpack-dev-server',
    },
    cmd: res => compile('build', res)
  },
  'cj | component-json': {
    desc: 'generate component autocomplete information to json file',
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

  if (fs.existsSync(dir) && !fs.statSync(dir).isDirectory()) return error(`Target "${dir}" not a valid directory`)

  fs.ensureDirSync(dir)
  if (fs.readdirSync(dir).length) return error(`Directory "${dir}" already has files in it, please use an empty directory or not exist directory`)

  inquirer.prompt(optionsFactory(absDir)).then(answers => {
    make(`${answers.type}-${getStateType[answers.state || 'None']}-${answers.language === 'TypeScript' ? 'ts' : 'js'}`, absDir, answers)

    console.log(
      `${EOL}  ${answers.language} ${answers.type} ${answers.name} initialize successfully${EOL}`
      + `===============================================${EOL}${EOL}`
      + `  You can run next two commands to continue:${EOL}${EOL}`
      + `    ${code('cd ' + dir)}${EOL}`
      + `    ${code('npm install')} or ${code('yarn install')}${EOL}${EOL}${EOL}`
      + `    ${clog.format('%cHave a good time !', 'magenta')} ${EOL}`
    )
  })
}

function optionsFactory(absDir: string) {
  const options = [
    {
      type: 'list',
      name: 'language',
      message: 'Project language',
      choices: ['TypeScript', 'JavaScript'],
      default: 0
    }, 
    {
      type: 'list',
      name: 'type',
      message: 'Init type',
      choices: ['Project', 'Component'],
      default: 0
    },
    {
      type: 'input',
      name: 'name',
      message: (answers: any) => `${answers.type} name`,
      default: path.basename(absDir),
      validate: (answer: any) => {
        let result = validateProjectName(answer)
        if (result.validForNewPackages) return true
        let message = [...(result.warnings || []), ...(result.errors || [])]
        return message.join('; ')
      }
    },
    {
      type: 'list',
      name: 'state',
      message: 'State Management',
      choices: ['None', 'Mobx'],
      default: 1,
      when: (answers: any) => {
        return answers.type === 'Project'
      }
    },
    {
      type: 'input',
      name: 'description',
      message: (answers: any) => `${answers.type} description`,
      default: (answers: any) => `A wonderful miniapp ${answers.type}`
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author',
      default: getGitUser()
    },
    {
      type: 'input',
      name: 'appid',
      message: 'Wexin app id',
      when: (answers: any) => {
        return answers.type === 'Project'
      }
    }
  ];
  return options;
}

function code(str: string) {
  return clog.format('%c' + str, 'yellow')
}

function compile(type: string, opts: any) {
  let minapp = getMinappConfig()

  if (type === 'dev') {
    let {host, port, minimize} = opts
    let server: any = {host, port}

    if (minapp.component) { // 组件开发不需要 server
      return new Compiler(opts.srcDir, opts.distDir, {watch: true, minimize, production: false, minapp})
    }
    return new Compiler(opts.srcDir, opts.distDir, {server, minimize, production: false, minapp})
  } else {
    let {watch, publicPath} = opts
    if (minapp.component) { // 判断有没有添加组件描述
      let {file, json} = getComponentJson(minapp.component)
      if (!json.minapp || !json.minapp.component || Object.keys(json.minapp.component).length === 0) {
        warn(`组件配置 ${file} 中没有指定 minapp.component 字段`)
        warn('为了给使用者更好的体验，建议添加此组件的相关描述在 minapp.component 字段中')
        warn('你可以使用命令 minapp component-json 尝试自动添加')
      }
    }
    return new Compiler(opts.srcDir, opts.distDir, {watch, publicPath, production: true, minapp})
  }
}

function componentJson(res: any) {
  let minapp = getMinappConfig()
  if (!minapp.component) return error('当前不是组件开发环境')

  let {file, jsContent, json} = getComponentJson(minapp.component)
  if (!file || !json || !jsContent) return error('找不到组件对应的 json 文件')
  let attrs = parseAttrs(jsContent)
  if (!attrs.length) return warn('没有检测到任何属性')
  if (!json.minapp) json.minapp = {}
  if (!json.minapp.component) json.minapp.component = {}
  json.minapp.component.attrs = attrs

  console.log(`写入 attrs: `)
  console.log(JSON.stringify(attrs, null, 2))
  fs.writeFileSync(file, JSON.stringify(json, null, 2))
}
