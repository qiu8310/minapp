/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {Generator} from '../../generator/Generator'
import * as config from '../../generator/base/config'
import {info, warn, error} from '../../generator/base/'

export const MODIFIER_ASSERT_ERROR = 'MODIFIER_ASSERT_ERROR'

import {CodeMeta} from './interface'

export class Modifier {
  config = config

  // @ts-ignore
  $: CheerioStatic
  // @ts-ignore
  $root: Cheerio

  constructor(public g: Generator) {}

  /**
   * 处理 html 源码（此时没有 $ 和 $root 对象）
   *
   * 要插入 table 时， cheerio 操作好像不 work
   */
  normalizeHtml(html: string): string {
    return html
  }

  init($: CheerioStatic, $root: Cheerio) {
    this.$ = $
    this.$root = $root
  }

  /**
   *
   * Generator.levelify 之前的 Generator.normalize 中调用
   *
   * 可以用于修证文档中的一些 bug
   */
  normalize($root: Cheerio) {
    this.normalizeHeads()
  }

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
      componentNoAttrs: [
        // 'movable-area',
        // 'cover-view',
        'picker-view-column',
      ],
      func: {
        canIUse: {returns: 'boolean'},
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
      this.warn(`模板文件 ${this.g.basename}.ts: ${message || '需要更新'}`)
      throw new Error(MODIFIER_ASSERT_ERROR)
    }
  }

  protected makeTable(head: string[], body: string[][]) {
    let thead = `<tr>${head.map(k => '<th>' + k + '</th>').join('')}</tr>`
    let tbody = body.map(row => '<tr>' + row.map(k => `<td>${k}</td>`).join('') + '</tr>').join('')
    return `<table><thead>${thead}</thead><tbody>${tbody}</tbody></table>`
  }

  private normalizeHeads() {
    let heads = ['示例代码：']

    // 将 "示例代码：" 这类的纯 p 字段设置成小标题
    this.$root.children('p').toArray().forEach(p => {
      let children = p.childNodes
      let textNode = children[0]
      if (children.length === 1 && textNode && textNode.type === 'text') {
        let title = textNode.data || ''
        if (heads.indexOf(title) >= 0) {
          this.$(p).html(`<strong>${title}</strong>`)
        }
      }
    })
  }
}
