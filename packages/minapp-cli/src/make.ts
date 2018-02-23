/**
 * 从 minapp-example-ts 和 minapp-example-ts 中提取出源代码来
 */
import * as fs from 'fs-extra'
import * as info from 'mora-scripts/libs/sys/info'
import * as path from 'path'
import {walkDirectory} from './helper'

const ROOT_DIR = path.resolve(__dirname, '..')
const TEMPLATE_DIR = path.join(ROOT_DIR, 'template')

const SOURCE_PROJECTS = ['minapp-example-ts', 'minapp-example-js']

function internalMake() {
  SOURCE_PROJECTS.forEach(projectName => {
    let id = projectName.replace(/^.*-(\w+)$/i, '$1')
    let projectFolder = path.resolve(ROOT_DIR, '..', projectName)
    let distProjectFolder = path.join(TEMPLATE_DIR, id)

    info('初始化目录 ' + distProjectFolder)
    fs.ensureDirSync(distProjectFolder)
    fs.emptyDirSync(distProjectFolder)

    walkDirectory(projectFolder, (dir, name, file, stat) => {
      if (stat.isDirectory() && dir === projectFolder && name !== 'src') return false
      if (name === 'package-lock.json') return false

      let relative = path.relative(projectFolder, file)
      let distFile = path.join(distProjectFolder, relative)

      console.log('  ' + relative)
      if (stat.isDirectory()) {
        fs.ensureDirSync(distFile)
      } else if (stat.isFile()) {
        let buffer: string | Buffer = fs.readFileSync(file)
        if (name === 'package.json') {
          buffer = updatePackageJson(JSON.parse(buffer.toString()), id as 'ts')
        } else if (name === 'project.config.json') {
          buffer = updateProjectConfigJson(JSON.parse(buffer.toString()))
        }
        fs.writeFileSync(distFile + '.dtpl', buffer)
      }

      return true
    })
  })
}

function updatePackageJson(json: any, id: 'js' | 'ts'): string {
  json.name = '${name}'
  json.description = '${description}'
  delete json.author
  delete json.publishConfig
  delete json.devDependencies['mora-common']
  if (id === 'js') {
    delete json.devDependencies.tslib
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

export function make(id: string, toDir: string, data: any) {
  let fromDir = path.join(TEMPLATE_DIR, id)
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
      }

      fs.writeFileSync(toFile.replace(/\.dtpl$/, ''), content)
    }
  })
}
