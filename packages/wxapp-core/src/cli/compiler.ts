#!/usr/bin/env node

import * as cli from 'mora-scripts/libs/tty/cli'
import * as shell from 'mora-scripts/libs/tty/shell'
import * as findup from 'mora-scripts/libs/fs/findup'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as chokidar from 'chokidar'

const requireResolve = require('require-resolve')
const tsc = path.resolve(__dirname, '../../node_modules/.bin/tsc')


const baseOptions: any = {
  srcDir: {type: 'string', desc: '指定 src 目录，默认为 src', defaultValue: 'src'},
  distDir: {type: 'string', desc: '指定 dist 目录，默认为 dist', defaultValue: 'dist'}
}
function resolveBaseOptions(this: any, res: any) {
  let srcDir = path.resolve(res.srcDir)
  let distDir = path.resolve(res.distDir)
  if (!fs.existsSync(srcDir)) return this.error(`srcDir<${srcDir}> 不存在`)
  if (!fs.existsSync(distDir)) return this.error(`distDir<${distDir}> 不存在`)
  return {srcDir, distDir}
}

cli({
  usage: 'wx command [options] [arguments]',
  version: require('../../package.json').version
})
.commands({
  build: {
    desc: '编译 srcDir 中的文件到 distDir',
    options: baseOptions,
    async cmd(res) {
      let {srcDir, distDir} = resolveBaseOptions.call(this, res)
      await build(srcDir, distDir)
    }
  },
  watch: {
    desc: 'watch 模式的 build',
    options: baseOptions,
    async cmd(res) {
      let {srcDir, distDir} = resolveBaseOptions.call(this, res)
      await build(srcDir, distDir)

      // 获取到 lerna 下的 packages 下的所有 package
      let rootDir = path.dirname(findup.pkg(srcDir))
      let cwd = process.cwd()
      let nodeModulesDir = path.join(rootDir, 'node_modules')
      let packages = fs.readdirSync(path.dirname(rootDir))
      let modules = fs.readdirSync(nodeModulesDir).filter(m => packages.indexOf(m) >= 0)

      // 监听所有 lerna 下的项目
      let watches = [srcDir, ...modules.map(m => path.join(nodeModulesDir, m))]
      let tid: any
      chokidar.watch(watches, {ignoreInitial: true, cwd: rootDir, followSymlinks: true})
        .on('all', async (e, filepath) => {
          if (e !== 'change' && e !== 'add') return
          clearTimeout(tid)
          tid = setTimeout(() => build(srcDir, distDir), 500)
        })
        .on('ready', () => console.log(`Watches: \r\n  ${watches.map(w => path.relative(cwd, w)).join('\r\n  ')}\r\n`))
    }
  }
})
.parse(function() {
  this.help()
})

function walk(dir: string): string[] {
  return fs.readdirSync(dir).reduce((files, name) => {
    let fullPath = path.join(dir, name)
    let stats = fs.statSync(fullPath)

    if (stats.isFile()) files.push(fullPath)
    else if (stats.isDirectory()) files.push(...walk(fullPath))
    return files
  }, [] as string[])
}

function emptyDir(distDir: string) {
  fs.ensureDirSync(distDir)
  fs.emptyDirSync(distDir)
}

function copy(srcFile: string, srcDir: string, distDir: string) {
  let distFile = distDir + srcFile.substr(srcDir.length)
  fs.ensureDirSync(path.dirname(distFile))
  fs.copyFileSync(srcFile, distFile)
  return distFile
}

/** 将 dist 目录下的 js 文件中的 require 解析成本地引用 */
function resolve(distDir: string, fromFile: string, cache: any) {
  if (cache[fromFile]) return
  cache[fromFile] = true

  let content = fs.readFileSync(fromFile).toString()
  let relocate = (filepath: string) =>
    filepath.indexOf('/node_modules/') >= 0
      ? path.join(distDir, filepath.replace(/.*\/node_modules\//, 'npm/'))
      : filepath

  if (content.indexOf('require') < 0) return
  let newContent = content.replace(/require\((['"])([^'"]*?)\1\)/g, (raw, quote, requirePath) => {
    let src = requireResolve(requirePath, fromFile).src
    if (src.indexOf('/node_modules/') >= 0) {
      // 将 node_modules 目录下的文件移动到 dist/npm 下
      let target = relocate(src)
      let relative = path.relative(path.dirname(relocate(fromFile)), target)

      fs.ensureDirSync(path.dirname(target))
      fs.copyFileSync(src, target)

      resolve(distDir, src, cache)
      return `require(${quote}${relative.replace(/\.js$/, '')}${quote})`
    } else {
      return raw
    }
  })

  let toFile = relocate(fromFile)
  if (newContent !== content || fromFile !== toFile) fs.writeFileSync(toFile, newContent)
}

function resolveDir(distDir: string) {
  walk(distDir).filter(f => f.endsWith('.js')).forEach(f => resolve(distDir, f, {}))
}

async function buildTypescript(distDir: string) {
  await shell.promise(`${tsc} --outDir ${distDir}`)
}

function removeJsonScheme(file: string) {
  let json = fs.readJsonSync(file)
  if (json.$schema) {
    delete json.$schema
    fs.writeFileSync(file, JSON.stringify(json, null, 2))
  }
}

async function build(srcDir: string, distDir: string) {
  emptyDir(distDir)

  await buildTypescript(distDir)
  // 1. 将 src 目录下的所有非 ts 文件 copy 到 dist 目录下，要保证 src 和 dist 两个目录都存在
  walk(srcDir).filter(f => !f.endsWith('.ts')).forEach(srcFile => copy(srcFile, srcDir, distDir))

  // 2. 将 dist 目录下的 js 文件中的 require 解析成本地引用
  resolveDir(distDir)

  // 3. 去除 app.json, page.json, component.json 中的 $schema 字段
  walk(distDir).filter(f => f.endsWith('.json')).forEach(removeJsonScheme)

  console.log('\r\nBuild successfully! \r\n')
}
