/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {Loader} from './Loader'
import * as postcss from 'postcss'
import {readFile, replace, base64EncodeBuffer} from '../util'
import {promisify} from 'mora-common/util/promisify'
const debug = require('debug')('minapp:cli:wxss-loader')
const mime = require('mime')
const sizeOf = promisify(require('image-size'))
const loaderUtils = require('loader-utils')

const process: {
  [key: string]: (loader: Loader, ...args: string[]) => Promise<string>
} = {
  // url: async (loader, [imageFile], collect) => {
  //   let src = await loader.loadStaticFile(imageFile)
  //   return `url(${src})`
  // },
  async data(loader, imageFile) {
    let mediaType = mime.getType(imageFile)
    let buffer = await readFile(imageFile)
    return `url(${base64EncodeBuffer(buffer, mediaType)})`
  },
  async width(loader, imageFile, disableAutoRatio) {
    let meta = await sizeOf(imageFile)
    return getImageMetaField(meta, 'width', loader, imageFile, disableAutoRatio)
  },
  async height(loader, imageFile, disableAutoRatio) {
    let meta = await sizeOf(imageFile)
    return getImageMetaField(meta, 'height', loader, imageFile, disableAutoRatio)
  },
  async size(loader, imageFile, disableAutoRatio) {
    let meta = await sizeOf(imageFile)
    let width = getImageMetaField(meta, 'width', loader, imageFile, disableAutoRatio)
    let height = getImageMetaField(meta, 'height', loader, imageFile, disableAutoRatio)
    return width + ' ' + height
  },
}

const PROCESS_REGEXP = new RegExp(`(${Object.keys(process).join('|')})\\(([^\\)]+)\\)`)
const PROCESS_REGEXP_GLOBAL = new RegExp(`(${Object.keys(process).join('|')})\\(([^\\)]+)\\)`, 'g')

@Loader.decorate
export default class PostcssLoader extends Loader {
  async run(content: string) {
    debug('FromFile: ' + this.fromFile)
    debug('ToFile: %o', this.toFile)

    this.lc.cacheable()

    const opts = loaderUtils.getOptions(this.lc) || {}
    const plugins = opts.plugins || []

    return postcss([
      this.assets as any,
      ...plugins
    ]).process(content, {from: this.fromFile}).then(res => res.css)
  }

  assets = (root: postcss.Root, result: postcss.Result) => {
    let promises: Array<Promise<any>> = []
    root.walkDecls(decl => {
      if (PROCESS_REGEXP.test(decl.value)) {
        promises.push(parseDecl(decl, this))
      }
    })
    return Promise.all(promises).catch(e => this.emitError(e))
  }
}

async function parseDecl(decl: postcss.Declaration, loader: Loader) {
  let newval = await replace(decl.value, PROCESS_REGEXP_GLOBAL, async (match) => {
    let key = match[1]
    let args = match[2].split(',').map(a => unquote(a))

    if (process[key] && loader.shouleMakeResolveRequest(args[0])) {
      // 第一个参数都是图片
      let absFile = await loader.resolve(args[0])
      if (loader.shouleMakeRequireFile(absFile)) {
        args[0] = absFile
        loader.addDependency(args[0])
        return await process[key](loader, ...args)
      }
    }
    return match[0]
  })
  if (newval && decl.value !== newval) decl.value = newval
}

function unquote(str: string) {
  str = str.trim()
  let len = str.length
  if (str[0] === str[len - 1] && ['"', '\''].indexOf(str[0]) >= 0) return str.substr(1, len - 2)
  return str
}

function getImageMetaField(meta: {width?: number, height?: number}, key: 'width' | 'height', loader: Loader, imageFile: string, disableAutoRatio?: string) {
  let val = meta[key]
  if (val == null) {
    loader.emitError(new Error(`Can't get ${key} from image ${imageFile}`))
  } else if ((!disableAutoRatio || disableAutoRatio === 'false') && /@(\d+)x\.\w+$/.test(imageFile)) {
    let ratio = parseInt(RegExp.$1, 10)
    val = Number((val / ratio).toFixed(5))
  }
  return (val || 0) + 'px'
}
