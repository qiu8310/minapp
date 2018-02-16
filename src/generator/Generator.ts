import * as cheerio from 'cheerio'
import * as path from 'path'
import * as url from 'url'
import * as fs from 'fs-extra'
import {Modifier, MODIFIER_ASSERT_ERROR, FunctionCodeMeta} from '../modify'
import {Node, Page} from './layout/'
import {markdownTable, EOL, markdown, normalizeTableRows, isSectionHead, RETURN_SECTION_TITLES, WX_FUNC_REGEXP, SINCE_TEST_REGEXP} from './base/'
import {COLLECT} from '../cli/collect'

export class Generator {
  COLLECT: COLLECT = COLLECT
  basename: string
  $root: Cheerio
  $: CheerioStatic
  modifier: Modifier

  constructor(public key: string, public node: Node, public nodeUrl: string, nodeSource: string, public genDir: string) {
    this.basename = path.join(this.node.topNode.normilizedFile, this.node.normilizedFile)

    try {
      let modifyFile = path.resolve(__dirname, `../modify/${key}/`, this.basename + '.js')
      this.modifier = new (require(modifyFile).default)(this)
    } catch (e) {
      this.modifier = new Modifier(this)
    }

    this.$ = cheerio.load(this.modifier.normalizeHtml(nodeSource))
    this.$root = this.$('.markdown-section')

    console.log(`parsing: ${this.basename} ${nodeUrl}`)
    if (this.$root.length !== 1) throw new Error(`文件没有文档区，无法解析`)

    this.modifier.init(this.$, this.$root)
    this.normalize()
  }

  getFuncModifyMeta(name: string): FunctionCodeMeta {
    return this.modifier.meta.func[name] || {}
  }

  /**
   * 获取 element 下某个 tagName 下的字符串，组成一个字符串数组
   *
   * @example
   *
   * getTexts(tr, 'td') => string[]
   */
  getTexts(element: CheerioElement | Cheerio, tagName?: string) {
    let $el = this.$(element)
    if (tagName) $el = $el.find(tagName)
    return $el.toArray().map(el => {
      let $e = this.$(el)
      let ns = el.childNodes
      // 如果文本当作 markdown 处理会出现异常
      return ns.length === 1 && ns[0].type === 'text' ? $e.text() : markdown($e.html())
    })
  }

  getTableData(table: CheerioElement | Cheerio) {
    let $table = this.$(table)
    let head = this.getTexts($table.find('thead th'))
    let body = $table.find('tbody tr').toArray().map(row => this.getTexts(row, 'td'))

    body = normalizeTableRows(body, head.length)
    return {head, body}
  }

  tableToDesc(table: CheerioElement | Cheerio, head?: string) {
    let {body} = this.getTableData(table)
    let desc = '{' + body.map(r => `${r[0]} => "${r[1]}"`).join('; ') + '}'
    return (head ? head + ': ' : '') + desc
  }

  markdownElement(element: CheerioElement | Cheerio): string {
    let $element = this.$(element)
    let tables = $element.find('table').toArray().map((table, order) => {
      let $table = this.$(table)
      let {head, body} = this.getTableData($table)
      $table.replaceWith(`{table:${order}}`)
      return [head, ...body]
    })
    return markdown($element.html() || '').replace(/\{table:(\d+)\}/g, (_: string, i: string) => markdownTable(tables[parseInt(i, 10)]).join(EOL))
  }

  async exec(isMakeMarkdown: boolean, promise: boolean) {
    if (isMakeMarkdown) return this.makeMarkdown()
    else if (this.key === 'api') return this.makeTS(promise)
    else return this.makeJSON()
  }

  private makeJSON() {
    this.levelify('h4')
    let page = new Page(this, this.$root, false)
    return page.toJSONString()
  }

  private makeTS(promise: boolean) {
    if (this.node.isCanvas) this.levelify('h1')
    else this.levelify('h3')

    let page = new Page(this, this.$root, promise)
    let ts = page.toTSString(1)
    if (ts) ts = ts.replace(SINCE_TEST_REGEXP, (raw, since) => '@since ' + since)
    if (promise) return ts // promise 不需要生成单个文件

    if (ts) {
      this.write(`// ${this.nodeUrl}${EOL}${EOL}export namespace wx {${EOL + ts + EOL}}${EOL}`, this.basename + '.d.ts')
    } else {
      this.unwrite(this.basename + '.d.ts')
    }
    return ts
  }

  private makeMarkdown() {
    this.write(`<!-- ${this.nodeUrl} -->${EOL}${EOL}${this.markdownElement(this.$root)}${EOL}`, this.basename + '.md')
    return ''
  }

  private write(distContent: string, filename: string) {
    let distFile = path.join(this.genDir, filename)
    if (!fs.existsSync(distFile) || fs.readFileSync(distFile).toString() !== distContent) {
      fs.ensureDirSync(path.dirname(distFile))
      fs.writeFileSync(distFile, distContent)
      console.log(`更新文件 ${this.nodeUrl} => ${distFile}${EOL}`)
    }
  }
  private unwrite(filename: string) {
    let distFile = path.join(this.genDir, filename)
    if (fs.existsSync(distFile)) {
      console.log(`删除文件 ${this.nodeUrl} => ${distFile}${EOL}`)
      fs.removeSync(distFile)
    }
  }

  private normalize() {
    // 使用绝对路径
    this.$root.find('a[href]').toArray().forEach(a => {
      let $a = this.$(a)
      let href = $a.attr('href')
      if (!(/^\w+\:/.test(href))) $a.attr('href', url.resolve(this.nodeUrl, href))
    })

    try {
      this.modifier.normalize(this.$root)
    } catch (e) {
      if (e.message !== MODIFIER_ASSERT_ERROR) throw e
    }
  }

  /**
   * 将页面层级化，化成如下层级结构
   *  Top
   *    Area
   *      Section
   *
   *  div.api[data-title=wx.xxx]
   *    div.body
   *      div.desc
   *      div.section[data-title=xxx]
   *      div.section[data-title=xxx]
   *      ...
   *    div.return
   *      div.desc  // 做了调整，此下面内容一直为空，主要是以前 desc 中可能含有 table，完全就是一个 section
   *      div.section[data-title=xxx]
   *      div.section[data-title=xxx]
   *      ...
   *
   *  data.rest[data-title=xxx]
   *    div.desc
   *    div.section[data-title=xxx]
   */
  private levelify(head1Selector: string | (($el: Cheerio) => boolean), head2Selector: string | (($el: Cheerio) => boolean) = isSectionHead) {
    const {$root, $} = this
    const els = $root.children().toArray()
    const isHead1 = typeof head1Selector === 'string' ? ($el: Cheerio) => $el.is(head1Selector) : head1Selector
    const isHead2 = typeof head2Selector === 'string' ? ($el: Cheerio) => $el.is(head2Selector) : head2Selector

    let $top: Cheerio | undefined
    let $body: Cheerio | undefined
    let $return: Cheerio | undefined
    let $ref: Cheerio | undefined

    for (let i = 0; i < els.length; i++) {
      let el = els[i]
      let $el = $(el)
      let text = $el.text().trim().replace(/[:：]$/, '')

      let addTitle = ($to: Cheerio, title: string) => {
        $to.data('title', title)
        $to.attr('data-title', title)
        return $to
      }
      let append = ($container: Cheerio, $to: Cheerio, isDesc: boolean) => {
        let $next = $(els[i + 1])
        while ($next.length && !isHead2($next)) {
          $container.append($next)
          i++
          $next = $(els[i + 1])
        }
        if (!isDesc || $container.children().length) $to.append($container)
      }
      let appendDesc = ($to: Cheerio) => append($('<div class="desc"></div>'), $to, true)
      let appendSection = ($to: Cheerio, title: string) => append(addTitle($('<div class="section"></div>'), title), $to, false)

      if (isHead1($el)) {
        // 将上一个 api 插入进来
        if ($top) $top.insertBefore($el)

        if (WX_FUNC_REGEXP.test(text)) {
          $top = addTitle($('<div class="api"></div>'), text)
          $top.attr('id', $el.attr('id') || '')
          $body = $('<div class="body"></div>')
          $return = $('<div class="return"></div>')
          $ref = $body
          $top.append($body)
          $top.append($return)

          appendDesc($ref)
        } else {
          $top = addTitle($('<div class="rest"></div>'), text)
          $body = undefined
          $return = undefined
          $ref = undefined
          appendDesc($top)
        }
        $el.remove()
      } else if ($top) {
        if (isHead2($el)) {
          if ($ref && $return && $body && RETURN_SECTION_TITLES.indexOf(text) >= 0) {
            $ref = $return
            appendSection($ref, text)
          } else {
            appendSection($ref || $top, text)
          }
          $el.remove()
        }
      } else {
        $el.remove()
      }
    }

    if ($top) $root.append($top)

    this.modifier.normalizeAfterLevelify($root)
    this.writeDebugHtml()
  }

  private writeDebugHtml() {
    if (process.env.WRITE_DEBUG_HTML) fs.writeFileSync('/tmp/ts.html', this.$root.html())
  }
}
