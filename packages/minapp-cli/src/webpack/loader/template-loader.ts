/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as htmlparser from 'htmlparser2'
import serializer, { Element } from './serializer'
const debug = require('debug')('minapp:cli:template-loader')
import * as webpack from 'webpack'

import {Loader} from './Loader'
import {map, STYLE_RESOURCE_REGEXP} from '../util'

const PATH_REGEXP = /^\.\.?\/\w[\w-\/\.\$!@]*$/ // 匹配是否是文件路径（需要以 / 或 ./ 或 ../ 开头）

@Loader.decorate
export default class TemplateLoader extends Loader {
  private ext: string

  constructor(public lc: webpack.loader.LoaderContext) {
    super(lc);

    this.ext = '';
  }

  async run(content: string) {
    if (this.options.target === 'weixin') {
      this.ext = '.wxml'
    } else if (this.options.target === 'alipay') {
      this.ext = '.axml'
    } else {
      throw new Error('target is not supported yet')
    }

    debug('FromFile: ' + this.fromFile)
    debug('ToFile: %o', this.toFile)
    // debug('FromContent: ' + content)

    this.lc.cacheable()
    // @ts-ignore
    let ast = htmlparser.parseDOM(content, {xmlMode: true});

    let assets = this.getNeedResolveAssets(ast)
    let requires: string[] = []

    if (assets.length) {
      debug('include static assets: %o', assets.map((a: Asset) => toString(a.node, a.attr)))
      await this.resolveAssets(assets, requires)
      debug('resolved static assets: %o', assets.map((a: Asset) => toString(a.node, a.attr)))
    } else {
      debug('no static assets')
    }

    this.updateNode(ast)

    let userOpts = this.options.format || {}
    let reserveTags = ['text', 'button']
    content = serializer(ast, {
        xmlMode: true,
        minimize: this.minimize,
        reserveTags,
        ...userOpts
      })

    debug('ToContent: %o', content)
    this.extract(this.ext, content)

    return this.toRequire(requires)
  }

  /**
   * 1. bind:xxx 和 catch:xxx => bindxxx 和 catchxxx
   * 2. 将 aaa.sync="bbb" xxx.sync="yyy" => aaa="{{bbb}}" xxx="{{yyy}}" minappsync="aaa=bbb&xxx=yyy"
   */
  private updateNode(nodes: Element[]) {
    iterateTagNode(nodes, node => {
      let minappsync: string[] = []
      Object.keys(node.attribs).forEach((name: any) => {
        let value = node.attribs[name];
        let attr = {name, value};
        if (/^(bind|catch):(\w+)$/.test(name)) {
          attr.name = RegExp.$1 + RegExp.$2
        } else if (name.endsWith('.sync') && typeof value === 'string') {
          name = name.substr(0, name.length - 5)
          value = stripBrackets(value)
          minappsync.push(`${name}=${value}`)

          attr.name = name
          attr.value = `{{${value}}}`
        }
        node.attribs[attr.name] = attr.value;
      })

      if (minappsync.length) {
        node.attribs['minappsync'] = minappsync.join('&');
        node.attribs['bindminappsyncupdate'] = 'minappsyncupdate';
      }
    })
  }

  private getNeedResolveAssets(nodes: Element[]) {
    let assets: Asset[] = [];
    iterateTagNode(nodes, node => {
      Object.keys(node.attribs).forEach((name: any) => {
        let value = node.attribs[name]
        let src = value
        let attr = {name, value}
        // 如果剩下的是个空字符串，去掉
        if (!src || typeof src !== 'string') return

        // {{ }} 标签内不解析（不排队其中会有字符串）
        if (src.indexOf('{{') >= 0) return

        if (!this.shouleMakeResolveRequest(src)) return

        if (name === 'src') {
          // 这里的资源必须要存在
          assets.push({node, required: true, attr, src})
        } else if (name === 'style') {
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
        if (this.shouleMakeRequireFile(absFile)) {
          if (this.isStaticFile(absFile) && typeof attr.value === 'string') {
            attr.value = attr.value.replace(src, await this.loadStaticFile(absFile, src, false))
          } else if (node.name === 'import' || node.name === 'include') {
            attr.value = this.getExtractRequirePath(absFile, this.ext)
            requires.push(absFile)
          } else {
            // 可能是 .wxs 文件
            attr.value = this.getExtractRequirePath(absFile)
            requires.push(absFile)
          }
          node.attribs[attr.name] = attr.value;
        }
      }
    }, 5)
  }
}

function iterateTagNode(ns: Element[], callback: (n: any) => void) {
  if (!ns) {
    return;
  }
  ns.forEach((n: any) => {
    if (n.type === 'tag') {
      callback(n);
      iterateTagNode(n.children, callback);
    }
  })
}

function toString(node: Element, attr: Attr) {
  return `<${node.name} ${attr.name}="${attr.value}">`
}

/**
 * 去除 str 中的 {{ }} 符号
 */
function stripBrackets(str: string) {
  return str.startsWith('{{') && str.endsWith('}}')
    ? str.substr(2, str.length - 4).trim()
    : str
}

interface Attr {
  name: string,
  value: string
}

interface Asset {
  node: Element
  attr: Attr
  src: string
  required?: boolean
}