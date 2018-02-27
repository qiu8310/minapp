#!/usr/bin/env node

import {error, clog} from 'mora-scripts/libs/sys/'
import * as cli from 'mora-scripts/libs/tty/cli'
import {EOL} from 'os'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as inquirer from 'inquirer'
const validateProjectName = require('validate-npm-package-name')
const pkg = require('../package.json')

import {Compiler} from '@minapp/compiler'
import {getGitUser} from './helper'
import {make} from './make'

require('update-notifier')({pkg}).notify()

const version = pkg.version

let commonOpts = {
  srcDir: '<string> 指定 源代码 目录      {{"src"}}',
  distDir: '<string> 指定 编译后代码 目录  {{"dist"}}',
}

cli({
  usage: 'minapp [options] <command> [commandOptions]',
  version
}).commands({
  init: {
    desc: '在指定的文件夹中初始化一个 minapp 项目',
    conf: { usage: 'cli init <folder>' },
    cmd: res => initProject(res._)
  },
  // inject: {
  //   desc: '自动获取所有 pages，并注入到 app.json 中',
  //   cmd: injectCmd
  // },
  dev: {
    desc: '启动开发服务器，实时编译小程序源代码, __ENV__="development"',
    conf: {version},
    options: {
      ...commonOpts,
      'host': '<string> 指定本地服务器 host {{"localhost"}}',
      'port': '<string> 指定本地服务器 port {{"8080"}}',
      'm | minimize': '<boolean> 开启代码压缩，类似于 production 环境，但 __ENV__ 仍然是 development',
    },
    cmd: res => compile('dev', res)
  },
  build: {
    desc: '将小程序源代码编译成可发布的代码, __ENV__="production"',
    conf: {version},
    options: {
      ...commonOpts,
      'p | publicPath': '<string> 指定静态资源的 publicPath（参考 webpack 的 output.publicPath 配置）',
      'w | watch': '<boolean> 开启 watch (没有运行服务器，wxss 中的静态资源可能会无法访问）',
    },
    cmd: res => compile('build', res)
  }
}).parse((res, self) => self.help())


/**
 * 初始化一个项目
 */
function initProject(folders: string[]) {
  if (folders.length === 0) return error('请指定要创建的项目所在的目录')
  if (folders.length > 1) return error('不能同时创建项目在多个目录中')
  let dir = folders[0]
  let absDir = path.resolve(dir)

  if (fs.existsSync(dir) && !fs.statSync(dir).isDirectory()) return error(`指定的文件 ${dir} 不是一个有效的目录`)

  fs.ensureDirSync(dir)
  if (fs.readdirSync(dir).length) return error(`文件夹 ${dir} 下已经有文件了，请指定一个空文件夹或不存在的文件夹`)

  inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Project language',
      choices: ['TypeScript', 'JavaScript'],
      default: 0
    },
    {
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: path.basename(absDir),
      validate: (answer) => {
        let result = validateProjectName(answer)
        if (result.validForNewPackages) return true
        let message = [...(result.warnings || []), ...(result.errors || [])]
        return message.join('; ')
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Project description',
      default: 'A wonderful miniapp project'
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
      message: 'Wexin app id'
    }
  ]).then(answers => {
    make(answers.language === 'TypeScript' ? 'ts' : 'js', absDir, answers)

    console.log(
      `${EOL}  ${answers.language} 项目 ${answers.name} 创建完成${EOL}`
      + `===============================================${EOL}${EOL}`
      + `  请运行下面两条命令来安装依赖:${EOL}${EOL}`
      + `    ${code('cd ' + dir)}${EOL}`
      + `    ${code('npm install')} 或 ${code('yarn install')}${EOL}${EOL}${EOL}`
      + `    ${clog.format('%cHave a good time !', 'magenta')} ${EOL}`
    )
  })
}

function code(str: string) {
  return clog.format('%c' + str, 'yellow')
}

function compile(type: string, opts: any) {
  if (type === 'dev') {
    let {host, port, minimize} = opts
    let server: any = {host, port}
    return new Compiler(opts.srcDir, opts.distDir, {server, minimize, production: false})
  } else {
    let {watch, publicPath} = opts
    return new Compiler(opts.srcDir, opts.distDir, {watch, publicPath, production: true})
  }
}

