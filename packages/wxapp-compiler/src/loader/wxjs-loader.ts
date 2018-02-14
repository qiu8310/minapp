import * as webpack from 'webpack'
import * as path from 'path'
import {getDataFromLoaderContext} from '../hack-webpack'
import {findup} from 'mora-scripts/libs/fs/'

const REQUIRE_REGEXP = /require\((['"])([^'"]*)\1\)/g
const COMMENT_REGEXP = /\/\*[\s\S]*?\*\/\r?\n?|\/\/.*\r?\n?/g

export default async function(this: webpack.loader.LoaderContext, content: string, sourceMap?: string | Buffer) {
  let {srcDir, distDir, modulesDir, entryName} = getDataFromLoaderContext(this)

  let srcFile = this.resourcePath
  let isFileInSrcDir = (f: string) => f.indexOf(srcDir) === 0 && modulesDir.indexOf(f) < 0

  // 注意1：node_modules 中可能有 link 文件夹
  // 注意2：可以引入 node_modules 中的子 node_modules 中的文件
  let getRelativeFile = (f: string) => isFileInSrcDir(f) ? path.relative(srcDir, f) :
    f.indexOf(distDir) === 0 ? path.relative(distDir, f) :
    f.indexOf(modulesDir) === 0 ? path.join('npm', path.relative(modulesDir, f)) :
    path.join('npm', getProjectRelativePath(f))

  // 入口文件，不做任何处理
  if (path.basename(srcFile) === entryName) return content

  const requiresMap = await resolveRequires(this, getRequires(stripJsComment(content))) // 获取 requires 前要先去除注释再去取 require
  let returns: string[] = []
  let emitFile = getRelativeFile(srcFile).replace(/\.\w+$/, '.js')
  let emitContent = content.replace(REQUIRE_REGEXP, (raw, quote, key) => {
    let originTargetFile = requiresMap[key]
    if (!originTargetFile) return raw // 有可能是注释中的 require，不做任何处理
    returns.push(originTargetFile) // 使用绝对路径，避免重复 resolve

    if (isFileInSrcDir(originTargetFile)) {
      return raw
    } else {
      let targetFile = getRelativeFile(originTargetFile)
      let emitDir = path.dirname(path.join(distDir, emitFile))

      let relativeTargetFile = path.relative(emitDir, path.join(distDir, targetFile)) // 相对于引用文件的路径
      if (relativeTargetFile[0] !== '.') relativeTargetFile = `.${path.sep}${relativeTargetFile}`
      return `require(${quote}${relativeTargetFile}${quote})`
    }
  })

  this.emitFile(emitFile, emitContent, null)
  return returns.map(r => `require("${r}");`).join('\n')
}

/** 获取一个文件相对于它的项目根目录的路径 */
function getProjectRelativePath(file: string) {
  try {
    let root = path.dirname(findup.pkg(path.dirname(file)))
    return path.relative(path.dirname(root), file)
  } catch (e) {
    throw new Error(`文件 ${file} 不在任何项目下`)
  }
}

/** 解析 require 的绝对路径 */
async function resolveRequires(ctx: webpack.loader.LoaderContext, requires: string[]) {
  return new Promise<{[key: string]: string}>((resolve, reject) => {
    let count = requires.length
    let map: any = {}

    let check = () => count === 0 && resolve(map)

    check()
    requires.forEach(rq => ctx.resolve(ctx.context, rq, (err, result) => {
      if (err) {
        reject(err)
      } else {
        map[rq] = result
        count--
        check()
      }
    }))
  })
}

/** 获取一段 js 脚本中的所有 require 语句 */
function getRequires(code: string) {
  let mat: RegExpExecArray | null
  let res: string[] = []
  /* tslint:disable: no-conditional-assignment */
  while ((mat = REQUIRE_REGEXP.exec(code))) {
    res.push(mat[2])
  }
  return res
}

function stripJsComment(code: string): string {
  return code.replace(COMMENT_REGEXP, '')
}
