/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

/**
 * 从 minapp-example-ts 和 minapp-example-ts 中提取出源代码来
 */
import * as fs from 'fs-extra'
import * as info from 'mora-scripts/libs/sys/info'
import * as isWin from 'mora-scripts/libs/sys/isWin'
import * as DotProp from 'mora-scripts/libs/lang/DotProp'
import * as path from 'path'
import {walkDirectory} from './helper'
import {Answers} from './questions'

const ROOT_DIR = path.resolve(__dirname, '..')
const PKGS_DIR = path.resolve(ROOT_DIR, '..')
const TEMPLATE_DIR = path.join(ROOT_DIR, 'template')
const COMMON_DIR = path.join(ROOT_DIR, 'common')

const SOURCE_PROJECTS = fs.readdirSync(PKGS_DIR).filter(p => p.startsWith('minapp-example-'))

function internalMake() {
  SOURCE_PROJECTS.forEach(projectName => {
    let id = projectName.replace('minapp-', '')
    let projectFolder = path.join(PKGS_DIR, projectName)
    let distProjectFolder = path.join(TEMPLATE_DIR, id)

    // 所有的 common 文件夹
    let project = id.indexOf('component') > 0 ? 'Component' : 'Application'
    let commons = /-js$/.test(id) ? ['base', 'js'] : ['base', 'ts']
    let isExistsInCommon = (relative: string) => commons.some(d => fs.existsSync(path.join(COMMON_DIR, project, d, relative)))

    info('初始化目录 ' + distProjectFolder)
    fs.ensureDirSync(distProjectFolder)
    fs.emptyDirSync(distProjectFolder)

    walkDirectory(projectFolder, (dir, name, file, stat) => {
      if (stat.isDirectory() && dir === projectFolder && name !== 'src' && name !== '.vscode' && name !== '.dtpl') return false
      if (name === 'package-lock.json') return false

      let relative = path.relative(projectFolder, file)
      let distFile = path.join(distProjectFolder, relative)

      if (stat.isFile() && !isExistsInCommon(relative + '.dtpl')) {
        console.log('  ' + relative)
        let buffer: string | Buffer = fs.readFileSync(file)
        if (name === 'package.json') {
          buffer = updatePackageJson(JSON.parse(buffer.toString()), id)
        } else if (name === 'project.config.json') {
          buffer = updateProjectConfigJson(JSON.parse(buffer.toString()))
        }

        fs.ensureDirSync(path.dirname(distFile))
        fs.writeFileSync(distFile + '.dtpl', buffer)
      }

      return true
    })
  })
}

function updatePackageJson(json: any, id: string): string {
  json.name = '${name}'
  json.description = '${description}'
  json.author = '${author}'

  delete json.publishConfig
  delete json.devDependencies['mora-common']
  if (/-js$/.test(id)) {
    delete json.devDependencies.tslib
  }
  if (/-core-/.test(id)) {
    delete json.dependencies['@minapp/component-toast']
  }

  json.scripts.dev = 'minapp dev'
  if (/-component-/.test(id)) {
    json.main = 'dist/${name}.js'
    json.scripts.build = 'minapp build --pretty' // 组件中图片会使用原路径
  } else {
    json.scripts.build = 'minapp build --publicPath http://your.static.server/'
  }
  return stringify(json)
}

function updateProjectConfigJson(json: any): string {
  json.appid = '${appid}'
  json.projectname = '${name}'
  json.description = '${description}'
  return stringify(json)
}

if (!module.parent) internalMake()

export function make(toDir: string, data: Answers) {
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
          if (data.hasOwnProperty(key)) return data[key]
          return raw
        })

        // windows 用户需要安装 awesome-typescript-loader
        if (name === 'package.json.dtpl' && isWin && data.language === 'TypeScript') {
          content = reviseJSON(content, {'devDependencies.awesome-typescript-loader': '^3.4.1'})
        }
      }

      if (data.type === 'Component' && /^test\.\w+\.dtpl$/.test(name)) {
        toFile = toFile.replace(/test(\.\w+\.dtpl)$/, (r, suffix) => data.name + suffix)
      }

      fs.writeFileSync(toFile.replace(/\.dtpl$/, '').replace(/\.css$/, '.' + data.style), content)
    }
  }
}

function stringify(obj: any) {
  return JSON.stringify(obj, null, 2)
}

function reviseJSON(content: string, map: {[path: string]: any}): string {
  let dp = new DotProp(JSON.parse(content))
  Object.keys(map).forEach(k => dp.set(k, map[k]))
  return stringify(dp.data)
}
