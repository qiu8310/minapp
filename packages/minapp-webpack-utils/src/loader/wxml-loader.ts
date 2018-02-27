import * as parser from '@minapp/wxml-parser'
const debug = require('debug')('minapp:webpack-utils:wxml-loader')

import {Loader} from './Loader'
import {map, STYLE_RESOURCE_REGEXP} from '../util'

const PATH_REGEXP = /^\.\.?\/\w[\w-\/\.\$!@]*$/ // 匹配是否是文件路径（需要以 / 或 ./ 或 ../ 开头）

@Loader.decorate
export default class WxmlLoader extends Loader {
  async run(content: string) {
    debug('FromFile: ' + this.fromFile)
    debug('ToFile: %o', this.toFile)
    // debug('FromContent: ' + content)

    let xml: parser.Document
    try {
      xml = parser.parse(content)
    } catch (e) {
      parser.logParserError(content, e)
      this.emitError(e)
      return ''
    }

    let assets = this.getNeedResolveAssets(xml.nodes)
    let requires: string[] = []

    if (assets.length) {
      debug('含有的静态资源：%o', assets.map(a => toString(a.node, a.attr)))
      await this.resolveAssets(assets, requires)
      debug('处理后的静态资源：%o', assets.map(a => toString(a.node, a.attr)))
    } else {
      debug('没有任何静态资源')
    }

    this.updateNode(xml.nodes)
    content = xml.toXML(this.minimize ? 0 : 2)
    // debug('ToContent: %o', content)
    if (this.hasContent(xml.nodes)) this.extract('.wxml', content)

    return this.toRequire(requires, 'webpack')
  }

  private hasContent(nodes: parser.Node[]) {
    return nodes.length && !nodes.every(n => n.is(parser.Node.TYPE.COMMENT))
  }

  /**
   * 1. bind:xxx 和 catch:xxx => bindxxx 和 catchxxx
   * 2.
   */
  private updateNode(nodes: parser.Node[]) {
    iterateTagNode(nodes, node => {
      node.attrs.forEach(attr => {
        if (/^(bind|catch):(\w+)$/.test(attr.name)) {
          attr.name = RegExp.$1 + RegExp.$2
        }
      })
    })
  }

  private getNeedResolveAssets(nodes: parser.Node[]): Asset[] {
    let assets: Asset[] = []
    iterateTagNode(nodes, node => {
      node.attrs.forEach(attr => {
        let src = attr.value
        // 如果剩下的是个空字符串，去掉
        if (!src || typeof src !== 'string') return

        // {{ }} 标签内不解析（不排队其中会有字符串）
        if (src.indexOf('{{') >= 0) return

        if (!this.shouleMakeRequire(src)) return

        if (attr.name === 'src') {
          // 这里的资源必须要存在
          assets.push({node, required: true, attr, src})
        } else if (attr.name === 'style') {
          // 这里可能含有 url() 函数，也需要存在
          if (STYLE_RESOURCE_REGEXP.test(src)) assets.push({node, required: true, attr, src: RegExp.$1})
        } else {
          // 其它标签判断是不是 url 路径的格式，是的话则尝试获取下
          if (PATH_REGEXP.test(src) && this.isStaticFile(src)) assets.push({node, attr, src})
        }
      })
    })
    return assets
  }

  /**
   * 1. emit 静态资源
   * 2. 将 import 和 include 标签中的 src 字段提取到 requires 中
   */
  private async resolveAssets(assets: Asset[], requires: string[]) {
    await map(assets, async ({src, required, attr, node}, index) => {
      let absFile = await this.tryResolve(src)
      if (!absFile) {
        if (required) {
          this.emitWarning(`${toString(node, attr)} 中的文件无法找到`)
        }
      } else {
        if (this.isStaticFile(absFile) && typeof attr.value === 'string') {
          attr.value = attr.value.replace(src, await this.loadStaticFile(absFile))
        } else if (node.name === 'import' || node.name === 'include') {
          requires.push(absFile)
        }
      }
    }, 5)
  }
}

function iterateTagNode(ns: parser.Node[], callback: (n: parser.TagNode) => void) {
  ns.forEach(n => {
    if (n.is(parser.Node.TYPE.TAG)) {
      callback(n)
      iterateTagNode(n.children, callback)
    }
  })
}


interface Asset {
  node: parser.TagNode
  attr: parser.TagNodeAttr
  src: string
  required?: boolean
}

function toString(node: parser.TagNode, attr: parser.TagNodeAttr) {
  return `<${node.name} ${attr.toXML()}>`
}
