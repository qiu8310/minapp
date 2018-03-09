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
import * as path from 'path'
import {walkDirectory} from './helper'

const ROOT_DIR = path.resolve(__dirname, '..')
const PKGS_DIR = path.resolve(ROOT_DIR, '..')
const TEMPLATE_DIR = path.join(ROOT_DIR, 'template')

const SOURCE_PROJECTS = fs.readdirSync(PKGS_DIR).filter(p => p.startsWith('minapp-example-'))
const SOURCE_COMPONENTS = fs.readdirSync(PKGS_DIR).filter(p => p.startsWith('minapp-component-'))

function internalMake() {
  [...SOURCE_COMPONENTS, ...SOURCE_PROJECTS].forEach(projectName => {
    let id = projectName.replace('minapp-', '')
    let projectFolder = path.join(PKGS_DIR, projectName)
    let distProjectFolder = path.join(TEMPLATE_DIR, id)
    let commonProjectFolder = path.join(TEMPLATE_DIR, 'example-common')

    info('初始化目录 ' + distProjectFolder)
    fs.ensureDirSync(distProjectFolder)
    fs.emptyDirSync(distProjectFolder)

    walkDirectory(projectFolder, (dir, name, file, stat) => {
      if (stat.isDirectory() && dir === projectFolder && name !== 'src' && name !== '.vscode' && name !== '.dtpl') return false
      if (name === 'package-lock.json') return false

      let relative = path.relative(projectFolder, file)
      let distFile = path.join(distProjectFolder, relative)

      if (stat.isDirectory()) {
        fs.ensureDirSync(distFile)
      } else if (stat.isFile() && !fs.existsSync(path.join(commonProjectFolder, relative + '.dtpl'))) {
        console.log('  ' + relative)
        let buffer: string | Buffer = fs.readFileSync(file)
        if (name === 'package.json') {
          buffer = updatePackageJson(JSON.parse(buffer.toString()), id)
        } else if (name === 'project.config.json') {
          buffer = updateProjectConfigJson(JSON.parse(buffer.toString()))
        }
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
  json.scripts.dev = 'minapp dev'
  json.scripts.build = 'minapp build --publicPath http://your.static.server/'
  delete json.publishConfig
  delete json.devDependencies['mora-common']
  if (/-js$/.test(id)) {
    delete json.devDependencies.tslib
  }
  if (/-core-/.test(id)) {
    delete json.dependencies['@minapp/component-toast']
  }
  return stringify(json)
}

function updateProjectConfigJson(json: any): string {
  json.appid = '${appid}'
  json.projectname = '${name}'
  json.description = '${description}'
  return stringify(json)
}
function stringify(obj: any) {
  return JSON.stringify(obj, null, 2)
}

if (!module.parent) internalMake()

function reviseJSON(content: string, key: string, output: string) {
  let json = JSON.parse(content)
  json[key] = output
  return JSON.stringify(json, null, 2)
}

export function make(id: string, toDir: string, data: any) {
  let fromDir = path.join(TEMPLATE_DIR, id.toLowerCase())
  walkDirectory(fromDir, (dir, name, fromFile, stat) => {
    let relative = path.relative(fromDir, fromFile)
    let toFile = path.join(toDir, relative)

    if (stat.isDirectory()) {
      fs.ensureDirSync(toFile)
    } else if (stat.isFile()) {
      let content: string | Buffer = fs.readFileSync(fromFile)

      if (name === 'package.json.dtpl' || name === 'project.config.json.dtpl') {
        content = content.toString().replace(/\$\{(\w+)\}/g, (raw, key) => {
          if (data.hasOwnProperty(key)) return data[key]
          return raw
        })

        // windows 用户需要安装 awesome-typescript-loader
        if (name === 'package.json.dtpl' && isWin && data.language === 'TypeScript') {
          content = reviseJSON(content, 'devDependencies', '^3.4.1')
        }

        if (name === 'package.json.dtpl' && data.type !== 'Project') {
          content = reviseJSON(content, 'main', `dist/${data.name}.js`)
        }
      }

      if (name === 'minapp.json.dtpl') {
        content = reviseJSON(content.toString(), 'component', `src/${data.name}`)
      }

      fs.writeFileSync(toFile.replace(/demo/, data.name).replace(/\.dtpl$/, ''), content)
    }
  })
}
