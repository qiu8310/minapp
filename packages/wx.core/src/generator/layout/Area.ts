import {Generator, Func, Klass, CnavasContext, info, warn, Definition, Arg, Type, ObjectType, WX_FUNC_REGEXP, EOL, FunctionType, TemplateFunctionMeta} from './_'
import {Section} from './Section'
import {Page} from './Page'

export class AreaZone {
  desc: string[]
  sections: Section[]

  constructor(public g: Generator, public area: Area, $zone: Cheerio) {
    let desc = g.markdownElement($zone.children('.desc')).trim()
    this.desc = desc ? desc.split(/\r?\n/) : []
    this.sections = $zone.children('.section').toArray().map(s => new Section(g, area, g.$(s)))
  }
}

export class Area {
  title: string
  constructor(public g: Generator, public page: Page, public $area: Cheerio) {
    this.title = $area.data('title')
  }

  toString() {
    return `<Area ${this.title}>`
  }

  getExamples() {
    let {$} = this.g
    return this.$area.find('code[class^=lang]').toArray().map(el => {
      let $el = $(el)
      let code = $el.text()
      let lang = $el.attr('class').replace(/^lang-/, '')

      // 将 code 中的 /* */ 结构替换成 //
      code = code.replace(/\/\*([\s\S]*?)\*\//g, (raw, content: string) => {
        return content
                .split(/\r?\n/)
                .map(l => l.replace(/^(\s*)\*/, '$1//')).join(EOL)
      }).trim()

      // 清除 section
      let $section = $el.closest('.section') // 有可能是 .desc 中的 code，所以会找不到 $section
      let title = $section.data('title') || '示例'
      if ($section.length && $section.find('table').length === 0) $section.remove()
      else $el.closest('pre').remove()
      return {code, lang, title}
    })
  }
  pushExamples(desc: string[], examples: Array<{code: string, lang: string, title: string}>) {
    examples.forEach(exp => {
      desc.push(...getBlock(exp.title, []))
      desc.push('    ```' + exp.lang, ...exp.code.split(/\r?\n/).map(l => l ? '    ' + l : l), '    ```')
    })
  }
}

export class ApiArea extends Area {
  name: string
  klassInfo?: {klassName: string, instanceName: string}
  klass?: Klass
  func: Func

  get meta(): TemplateFunctionMeta {
    return this.g.getTplMeta(this.name)
  }

  constructor(g: Generator, page: Page, $area: Cheerio) {
    super(g, page, $area)
    WX_FUNC_REGEXP.test(this.title)

    let name = this.name = RegExp.$1
    let raw = RegExp.$2.trim()
    let rawargs = (this.meta.args || (raw ? raw.split(/\s*,\s*/) : []))
                  .map(arg => {
                    let optional = arg === 'this'
                    if (arg.startsWith('[') && arg.endsWith(']')) {
                      arg = arg.substr(1, arg.length - 2)
                      optional = true
                    }
                    return new Arg(arg === 'this' ? 'instance' : arg, new Type('any'), optional)
                  })

    this.klassInfo = this.parseName(name)
    // 一定要先于 AreaZone 执行，因为 getExamples 可能会清除某些 section
    let examples = this.getExamples()

    let body = new AreaZone(g, this, g.$($area.children('.body')))
    let foot = new AreaZone(g, this, g.$($area.children('.return')))

    let args = this.initBody([], body, rawargs)
    let returns = this.initFoot([], foot)

    let desc = [...body.desc, ...foot.desc]
    this.pushExamples(desc, examples)
    let id = this.$area.attr('id')
    if (id) desc.push(`@see ${this.g.nodeUrl}#${id}`)

    this.func = new Func('wx', name, args, this.klass && returns.name === 'void' ? new Type(this.klass.name) : returns, desc)
  }

  toTSString(tabCount: number, promise: boolean) {
    return this.func.toTSString(tabCount, promise) + (this.klass ? EOL + this.klass.toTSString(tabCount, promise) : '')
  }

  private initBody(processedSections: Section[], body: AreaZone, rawargs: Arg[]): Arg[] {
    let args: Arg[]
    // 一个表格可能表示所有的函数的参数： https://mp.weixin.qq.com/debug/wxadoc/dev/api/analysis-report.html
    let argsSection = body.sections.find(s => s.hasDefinitions && s.definitions.length === rawargs.length && s.definitions.every((d, i) => d.name.toLowerCase() === rawargs[i].name.toLowerCase()))
    if (argsSection) {
      processedSections.push(argsSection)
      args = argsSection.definitions.map(d => new Arg(d.name, d.type))
    } else {
      args = rawargs.map(arg => {
        let newarg = arg.clone()
        let argSection = body.sections.find(s => !!s.key && s.key.toLowerCase() === arg.name.toLowerCase() && !s.isEmpty)
        if (argSection) {
          if (argSection.hasDefinitions) {
            processedSections.push(argSection)
            newarg.type = new ObjectType(argSection.definitions)
          } else {
            warn(`${argSection} 应该是个 DefinitionTable`)
          }
        }
        return newarg
      })
    }
    this.appendDesc(processedSections, body)
    return args
  }
  private initFoot(processedSections: Section[], foot: AreaZone): Type {
    // 处理尾部
    let rtnType: Type
    let rtnSection = foot.sections.find(s => s.hasDefinitions)
    if (rtnSection) {
      processedSections.push(rtnSection)
      rtnType = new ObjectType(rtnSection.definitions);
      (rtnType as ObjectType).setDefaultRequired()
    } else {
      rtnType = new Type('void')
    }
    // 用户配置的优先级最大
    // if (this.returnClass) this.returns = this.returnClass.name
    let returns = this.meta.returns
    if (returns) rtnType = new Type(returns)
    this.appendDesc(processedSections, foot)

    return rtnType
  }

  private appendDesc(processed: Section[], target: AreaZone) {
    let definitions: Definition[] = processed.reduce((ds, s) => [...ds, ...(s.definitions || [])], [] as any)
    let definition: Definition | undefined
    for (let s of target.sections) {
      if (processed.indexOf(s) >= 0 || s.isEmpty) continue
      definition = this.findDefinitionByName(definitions, s.key)
      if (!s.hasDefinitions) {
        if (s.title.toLowerCase() === 'bug & tip') {
          target.desc.push(...s.desc())
        } else if (definition) {
          definition.desc.push(...s.desc())
        } else {
          target.desc.push(...s.desc())
        }
      } else {
        if (definition) {
          if (definition.type instanceof FunctionType) {
            // 属于参数中的一个函数，如
            // wx.xx({success: () => any}) 中的 success
            let arg0 = definition.type.args[0]
            let name0 = arg0 && arg0.name ? arg0.name : 'arg0'
            let dg = new ObjectType(s.definitions)
            dg.setDefaultRequired() // 参数默认是一定返回的
            definition.type.args[0] = new Arg(name0, dg)
            definition.desc.push(...s.desc())
          } else if (definition.type.name === 'string') {
            // 微信文档中很多需要将一个对象 JSON.stringify
            // 所以它原本其实是个 Object 的，所以需要强制获取 desc
            definition.desc.push(...s.desc(true))
          } else {
            warn(`不支持 ${definition} 的 type=${definition.type}，无法注入 ${s} 模块`)
          }
        } else {
          if (this.klassInfo && s.key === this.klassInfo.instanceName) {
            if (!this.klass) this.klass = new Klass(this.klassInfo.klassName, s.hasDefinitions ? s.definitions : [], s.desc())
            else if (s.hasDefinitions) this.klass.definitions.push(...s.definitions)
            else warn(`${s} 无任何用途，需要 modify`)
          } else {
            let titles = ['其他方法的 OBJECT 参数列表', '所有方法的 OBJECT 参数列表']
            if (this.klass && titles.indexOf(s.title) >= 0 && s.hasDefinitions) {
              this.klass.definitions.forEach(d => {
                if (d.type instanceof FunctionType && d.type.args[0].name.toUpperCase() === 'OBJECT' && !(d.type.args[0].type instanceof ObjectType)) {
                  d.type.args[0].type = new ObjectType(s.definitions)
                }
              })
            } else {
              warn(`${s} 无任何用途，需要 modify`)
            }
          }
        }
        definitions = [...s.definitions, ...definitions] // 扩充查找范围，一定要创建新数组
      }
    }
  }

  /** 根据名称判断应该返回一个对象 */
  private parseName(name: string) {
    if (/^(?:get(\w+Manager)|create(\w+))$/.test(name)) {
      let klassName = RegExp.$1 || RegExp.$2
      let instanceName = klassName[0].toLowerCase() + klassName.slice(1)
      return {klassName, instanceName}
    }
    return
  }

  /** 在 definitions 递归查找匹配的名称 */
  private findDefinitionByName(definitions: Definition[], name: string | undefined): Definition | undefined {
    if (!name) return
    for (let defition of definitions) {
      if (defition.name === name) return defition
      if (defition.type instanceof ObjectType) {
        let d = this.findDefinitionByName(defition.type.definitions, name)
        if (d) return d
      }
    }
    return
  }
}

export class RestArea extends Area {
  klass?: Klass
  constructor(g: Generator, page: Page, $area: Cheerio) {
    super(g, page, $area)
    if (g.node.normilizedFile === 'socket-task') {
      let zone = new AreaZone(g, this, $area)
      this.klass = this.parseKlass('SocketTask', zone)
    } else if (g.node.isCanvas) {
      let name = this.title === 'restore' ? 'restore' : /^canvasContext\.(\w+)$/.test(this.title) ? RegExp.$1 : ''
      if (!name) {
        info(`no process canvas ${this}`)
      } else {
        let examples = this.getExamples() // 要先于 AreaZone 执行
        let {desc, sections} = new AreaZone(g, this, $area)
        let type = new FunctionType([], new Type('void'))

        for (let sec of sections) {
          if (sec.isEmpty || sec.title === '例子') continue
          if (sec.hasDefinitions) {
            type.args = sec.definitions.map(d => new Arg(d.name, d.type))
            desc.push(...sec.desc(true))
          } else {
            desc.push(...sec.desc())
          }
        }
        this.pushExamples(desc, examples)
        let def = new Definition(name, type, {desc, extras: []})

        if (name === 'draw') {
          type.args.forEach(a => a.optional = true)
        } else if (name === 'drawImage') {
          /*
            drawImage(dx, dy)
            drawImage(dx, dy, dWidth, dHeight)
            drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) 从 1.9.0 起支持
          */
          let allArgs = type.args;
          ['dx, dy', 'dx, dy, dWidth, dHeight', 'sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight'].forEach((raw, i) => {
            let args = raw.split(', ').map(key => allArgs.find(a => a.name === key) || new Arg(key, new Type('any')))
            if (i === 2) {
              type.args = args
            } else {
              let newdef = def.clone();
              (newdef.type as FunctionType).args = args
              CnavasContext.definitions.push(newdef)
            }
          })
        }
        CnavasContext.definitions.push(def)
      }
    } else {
      info(`no process ${this}`)
    }
  }

  toTSString(tabCount: number, promise: boolean) {
    if (this.klass) return this.klass.toTSString(tabCount, promise)
    return ''
  }

  private parseKlass(klassName: string, zone: AreaZone) {
    let {desc, sections} = zone
    let definitions: Definition[] = []

    let lastDef: Definition | undefined
    let fnRegExp = new RegExp(klassName + '\\.(\\w+)\\((\\w*)\\)')
    for (let sec of sections) {
      if (sec.isEmpty) continue
      if (fnRegExp.test(sec.title)) {
        let name = RegExp.$1
        let argstr = RegExp.$2.trim()
        let args = argstr ? argstr.split(/\s*,\s*/) : []

        let type = new FunctionType(args.map(a => new Arg(a, new Type('any'))), new Type('void'))
        let def = new Definition(name, type)
        def.name = name
        def.desc = sec.desc()
        lastDef = def
        definitions.push(def)
      } else if (lastDef && lastDef.type instanceof FunctionType && lastDef.type.args[0] && lastDef.type.args[0].name === sec.key && sec.hasDefinitions) {
        lastDef.type.args[0].type = new ObjectType(sec.definitions)
      } else {
        warn(`无法处理 ${this} 中的 ${sec}`)
      }
    }

    return new Klass(klassName, definitions, desc)
  }
}

function getBlock(title: string, lines: string | string[]) {
  let rows = typeof lines === 'string' ? lines.split(/\r?\n/) : lines
  return ['', `**${title}：**`, '', ...rows]
}
