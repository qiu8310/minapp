import {Generator} from '../generator/Generator'
import * as config from '../generator/base/config'
import {info, warn, error} from '../generator/base/'

export const MODIFIER_ASSERT_ERROR = 'MODIFIER_ASSERT_ERROR'

import {CodeMeta} from './interface'

export class Modifier {
  config = config
  $root: Cheerio
  $: CheerioStatic

  constructor(public g: Generator) {
    this.$root = g.$root
    this.$ = g.$
  }

  /**
   *
   * Generator.levelify 之前的 Generator.normalize 中调用
   *
   * 可以用于修证文档中的一些 bug
   */
  normalize($root: Cheerio) {}

  /**
   * Generator.levelify 之后调用
   *
   * 可以用于修证文档中的一些 bug
   */
  normalizeAfterLevelify($root: Cheerio) {}

  /**
   * 在 Generator 中可能会需要修改的一些东西
   */
  get meta(): CodeMeta {
    return {
      func: {
        getStorageSync: {returns: 'any | undefined'},
        connectSocket: {returns: 'SocketTask'},
        createCanvasContext: {args: ['canvasId', '[componentInstance]'], returns: 'CanvasContext'}
      }
    }
  }

  info = (...args: any[]) => info(...args)
  warn = (...args: any[]) => warn(...args)
  error = (...args: any[]) => error(...args)

  /**
   * 修改文档是，最好先验证下修改前的字段是否是你预计的，以免微信更新了文档还去修改
   */
  assert(ok: any, message?: string) {
    if (!ok) {
      this.warn(message || `模板文件 ${this.g.basename}.ts 需要更新`)
      throw new Error(MODIFIER_ASSERT_ERROR)
    }
  }
}
