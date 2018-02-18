import {Loader, map, EOL} from './inc/'
import * as parser from 'xml-parser'
import * as tracker from 'debug'
const debug = tracker('minapp:loader:wxml')

const PATH_REGEXP = /^\.\.?\/\w[\w-\/\.\$!@]*$/ // 匹配是否是文件路径（需要以 / 或 ./ 或 ../ 开头）
const STYLE_URL_REGEXP = /url\(\s*['"]?([^"'\)]+)["']?\s*\)/g

@Loader.decorate
export default class WxmlLoader extends Loader {
  async run(content: string) {
    debug('FromFile: ' + this.fromFile)
    // debug('FromContent: ' + content)

    // 行首有注释会导致解析失败，所以先把注释去掉
    let xml = parser(content.replace(/<!--[\s\S]*?-->/g, ''))
    let assets = this.getNeedResolveAssets(xml)

    if (assets.length) {
      debug('含有的静态资源：%o', assets.map(a => toString(a.node, a.key)))
      await this.resolveAssets(assets)
      debug('处理后的静态资源：%o', assets.map(a => toString(a.node, a.key)))
    } else {
      debug('没有任何静态资源')
    }

    content = xmlToHtml(xml, this.minimize)
    debug('ToFile: %o', this.toFile)
    debug('ToContent: %o', content)
    this.emit(this.emitFile, content)
    return ''
  }

  private getNeedResolveAssets(xml: parser.Document): Asset[] {
    if (!xml.root) return []
    return collectAssets(xml.root, node => {
      let assets: Asset[] = []
      Object.keys(node.attributes).forEach(key => {
        let src = node.attributes[key].trim()
        // 如果剩下的是个空字符串，去掉
        if (!src) return

        // 如果是以 \w+: 或 // 开头的文件 ，则忽略，如 http://xxx.com/jq.js, //xxx.com/jq.js, javascript:;
        if (/^(?:\w+:|\/\/)/.test(src)) return

        // {{ }} 标签内不解析（不排队其中会有字符串）
        if (src.indexOf('{{') >= 0) return

        if (key === 'src') {
          // 这里的资源必须要存在
          assets.push({node, required: true, key, src})
        } else if (key === 'style') {
          // 这里可能含有 url() 函数，也需要存在
          if (STYLE_URL_REGEXP.test(src)) assets.push({node, required: true, key, src: RegExp.$1})
        } else {
          // 其它标签判断是不是 url 路径的格式，是的话则尝试获取下
          if (PATH_REGEXP.test(src) && this.isStaticFile(src)) assets.push({node, key, src})
        }
      })
      return assets
    })
  }

  private async resolveAssets(assets: Asset[]) {
    await map(assets, async ({src, required, key, node}, index) => {
      let absFile = await this.tryResolve(src)
      if (!absFile) {
        if (required) this.emitWarning(`${toString(node, key)} 中的文件无法找到`)
      } else {
        if (this.isStaticFile(absFile)) {
          let url = await this.loadStaticFile(absFile)
          node.attributes[key] = node.attributes[key].replace(src, url)
        }
      }
    }, 5)
  }
}


interface Asset {
  node: parser.Node
  key: string
  src: string
  required?: boolean
}
function collectAssets(node: parser.Node, callback: (node: parser.Node) => Asset[]) {
  let assets = callback(node)
  node.children.forEach(n => assets.push(...collectAssets(n, callback)))
  return assets
}

function toString(node: parser.Node, attrKey: string) {
  return `<${node.name} ${attrKey}="${node.attributes[attrKey]}">`
}

function xmlToHtml(xml: parser.Document, minimize: boolean) {
  return xml.root ? nodeToHtml(xml.root, minimize) : ''
}

function nodeToHtml(node: parser.Node, minimize: boolean, prefix = ''): string {
  let {name, attributes, children} = node
  let attr = Object.keys(attributes).map(k => `${k}="${attributes[k]}"`).join(' ')

  let e = minimize ? '' : EOL
  let p = minimize ? '' : prefix
  return [
    `${p}<${name}${attr ? ' ' + attr : ''}>`,
    ...children.map(c => nodeToHtml(c, minimize, prefix + '  ')),
    `${p}</${name}>`
  ].join(e)
}
