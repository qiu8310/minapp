/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as path from 'path'
import * as fs from 'fs-extra'
import {EOL} from 'os'
import {sys, cli} from './base'
import {questions, Answers} from '../base/questions'
import {code, walkDirectory} from '../base/helper'

const ROOT_DIR = path.resolve(__dirname, '..', '..')
const TEMPLATE_DIR = path.join(ROOT_DIR, 'template')

export const initOptions: cli.Options = {

}

/**
 * 初始化一个小程序项目
 * @param res 命令行的参数（由 cli 脚本生成）
 */
export function initCommand(this: cli.Constructor, res: cli.Response) {
  let folders = res._

  if (folders.length === 0) return this.error(`Please specify the initial directory`)
  if (folders.length > 1) return this.error(`You can only specify one directory`)
  let dir = folders[0]
  let absDir = path.resolve(dir)

  if (fs.existsSync(dir)) {
    if (!fs.statSync(dir).isDirectory()) return this.error(`Target "${dir}" is not a valid directory`)
    if (fs.readdirSync(dir).length) return this.error(`Directory "${dir}" already has files in it, please use an empty directory or not exist directory`)
  }

  questions(absDir).then((answers) => {
    fs.ensureDirSync(absDir)

    make(absDir, answers)

    let installs: string[] = []
    if (answers.style === 'less') installs.push('less', 'less-loader')
    else if (answers.style === 'scss') installs.push('node-sass', 'sass-loader')

    let extraInstall = installs.length ? ` && npm install --save-dev ${installs.join(' ')}` : ''

    console.log(
      `${EOL}  ${answers.language} ${answers.type} ${answers.name} initialize successfully${EOL}`
      + `=====================================================================${EOL}${EOL}`
      + `  You can run next two commands to continue:${EOL}${EOL}`
      + `    ${code('cd ' + dir)}${EOL}`
      + `    ${code('npm install' + extraInstall)}${EOL}${EOL}${EOL}`
      + `    ${sys.clog.format('%cHave a good time !', 'magenta')} ${EOL}`
    )
  })
}


function make(toDir: string, data: Answers) {
  let language = data.language === 'TypeScript' ? 'ts' : 'js'
  let id = data.type === 'Application'
    ? `example-${data.state === 'Mobx' ? 'mobx' : 'core'}-${language}`
    : `example-component-${language}`

  let fromDirs = [
    path.join(ROOT_DIR, 'common', data.type, 'base'),
    path.join(ROOT_DIR, 'common', data.type, language),
    path.join(TEMPLATE_DIR, id)
  ]

  fromDirs.forEach(fromDir => walkDirectory(fromDir, makeWalkCallback(fromDir, toDir, data)))
}

function makeWalkCallback(fromDir: string, toDir: string, data: Answers) {
  return (dir: string, name: string, fromFile: string, stat: fs.Stats) => {
    let relative = path.relative(fromDir, fromFile)
    let toFile = path.join(toDir, relative)

    if (stat.isDirectory()) {
      fs.ensureDirSync(toFile)
    } else if (stat.isFile()) {
      let content: string | Buffer = fs.readFileSync(fromFile)

      if (['package.json.dtpl', 'project.config.json.dtpl', 'dtpl.js.dtpl', 'minapp.json.dtpl'].indexOf(name) >= 0) {
        content = content.toString().replace(/\$\{(\w+)\}/g, (raw, key) => {
          // @ts-ignore
          if (data.hasOwnProperty(key)) return data[key]
          return raw
        })
      }

      if (data.type === 'Component' && /^test\.\w+\.dtpl$/.test(name)) {
        toFile = toFile.replace(/test(\.\w+\.dtpl)$/, (r, suffix) => data.name + suffix)
      }

      fs.writeFileSync(toFile.replace(/\.dtpl$/, '').replace(/\.css$/, '.' + data.style), content)
    }
  }
}
