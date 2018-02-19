import {Loader, map} from './inc/'
import {parse, Node, TagNode, TagNodeAttr} from './xml-parser'
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
    let node = parse(content.replace(/<!--[\s\S]*?-->/g, ''))
    let assets = this.getNeedResolveAssets(node)

    if (assets.length) {
      debug('含有的静态资源：%o', assets.map(a => toString(a.node, a.attr)))
      await this.resolveAssets(assets)
      debug('处理后的静态资源：%o', assets.map(a => toString(a.node, a.attr)))
    } else {
      debug('没有任何静态资源')
    }

    content = node.toHTML(this.minimize ? 0 : 2)
    debug('ToFile: %o', this.toFile)
    debug('ToContent: %o', content)
    this.emit(this.emitFile, content)
    return ''
  }

  private getNeedResolveAssets(root: Node): Asset[] {
    return root.iterateTagNode(node => {
      let assets: Asset[] = []
      node.attrs.forEach(attr => {
        let src = attr.value
        // 如果剩下的是个空字符串，去掉
        if (!src) return

        // 如果是以 \w+: 或 // 开头的文件 ，则忽略，如 http://xxx.com/jq.js, //xxx.com/jq.js, javascript:;
        if (/^(?:\w+:|\/\/)/.test(src)) return

        // {{ }} 标签内不解析（不排队其中会有字符串）
        if (src.indexOf('{{') >= 0) return

        if (attr.name === 'src') {
          // 这里的资源必须要存在
          assets.push({node, required: true, attr, src})
        } else if (attr.name === 'style') {
          // 这里可能含有 url() 函数，也需要存在
          if (STYLE_URL_REGEXP.test(src)) assets.push({node, required: true, attr, src: RegExp.$1})
        } else {
          // 其它标签判断是不是 url 路径的格式，是的话则尝试获取下
          if (PATH_REGEXP.test(src) && this.isStaticFile(src)) assets.push({node, attr, src})
        }
      })
      return assets
    })
  }

  private async resolveAssets(assets: Asset[]) {
    await map(assets, async ({src, required, attr, node}, index) => {
      let absFile = await this.tryResolve(src)
      if (!absFile) {
        if (required) {
          this.emitWarning(`${toString(node, attr)} 中的文件无法找到`)
        }
      } else {
        if (this.isStaticFile(absFile)) {
          attr.value = attr.value.replace(src, await this.loadStaticFile(absFile))
        }
      }
    }, 5)
  }
}


interface Asset {
  node: TagNode
  attr: TagNodeAttr
  src: string
  required?: boolean
}

function toString(node: TagNode, attr: TagNodeAttr) {
  return `<${node.name} ${attr.toHTML()}>`
}
