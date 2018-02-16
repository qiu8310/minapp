import {
  Generator, warn, TABLE_REST_FIELD_MAP, TYPE_MAP, PROMISABLE_KEYS,
  Definition, DefinitionOptions, Type, ObjectType, ArrayObjectType, FunctionType, Arg
} from './_'
import {Section} from './Section'

export class Table {
  rows: string[][]
  definitions: Definition[]
  map: {[name: string]: Definition} = {}

  constructor(public g: Generator, public section: Section, public $table: Cheerio, public head: string[], public body: string[][]) {
    this.rows = [this.head, ...this.body]
    let parsedHead = this.parseHead(head)

    this.definitions = this.parseEntities(body.map(row => this.createEntity(head, parsedHead, row)))
    let map = this.map = this.definitions.reduce((m, d) => {
      m[d.name] = d
      return m
    }, {} as any)

    if (this.promisable) {
      if (map.success.type.args.length === 0) map.success.type.args = [new Arg('res', new Type('any'))]
      if (map.fail.type.args.length === 0) map.fail.type.args = [new Arg('err', new Type('any'))]
    }
  }

  get promisable() {
    return PROMISABLE_KEYS.every(key => this.map[key] && this.map[key].type instanceof FunctionType)
  }


  private parseHead(head: string[]) {
    let newHead: typeof head = ['name']
    let ignoreWarn = this.$table.hasClass('ignoreHeadWarn')
    for (let zh of head.slice(1)) {
      let en = TABLE_REST_FIELD_MAP[zh]
      if (en && newHead.indexOf(en) >= 0) {
        if (!ignoreWarn) warn(`thead 中参数 <${zh}> 和其它字段重复了，${head.join('|')}`)
        en = `extra:${zh}`
      } else if (!en) {
        if (!ignoreWarn) warn(`thead 中的参数 <${zh}> 无法解析成英文名，${head.join('|')}`)
        en = `extra:${zh}`
      }
      newHead.push(en)
    }
    return newHead
  }

  private createEntity(originalHead: string[], parsedHead: string[], row: string[]) {
    let def: DefinitionOptions = {extras: [], desc: []}
    let name: string = ''
    let type = new Type('any')
    let args: Arg[] | undefined
    let extraPrefix = 'extra:'

    parsedHead.forEach((key, i) => {
      let val: string = row[i] || '' // 有的 table 中的 tbody.tr 中的 td 数量和 thead 中的 th 数量不一样

      if (i === 0) {
        // 预先在 [xx] 前面加上 . 符号，方便后期处理
        // 如 data.data.poi_list[i].poi_id => data.data.poi_list.[i].poi_id
        name = val.replace(/(\[\w*\])/, '.$1')
      } else if (key === 'type') {
        type.name = val.toLowerCase().split(/\s*\/\s*/).map(t => {
          // 文档 https://mp.weixin.qq.com/debug/wxadoc/dev/api/canvas/add-color-stop.html 中
          // 有个 type = "Number(0-1)" 的字段
          if (/^(\w+)\((\w+-\w+)\)$/.test(t)) {
            t = RegExp.$1
            def.range = RegExp.$2
          }
          if (!TYPE_MAP.hasOwnProperty(t)) {
            warn(`字段 <${val}> 中的 type: ${t} 没有定义`)
            return t
          }
          return TYPE_MAP[t]
        }).join(' | ')
      } else if (key === 'required' || key === 'readonly') {
        if (['是', '否'].indexOf(val) < 0) warn(`布尔值 ${key} 只支持 "是" 或者 "否"，当下提供的是 <${val}>`)
        def[key] = val === '是'
      } else if (key.indexOf(extraPrefix) === 0) {
        def.extras.push({key: key.substr(extraPrefix.length), value: val})
      } else if (key === 'args') {
        if (val && val !== '无') args = val.replace(/^\(\s*|\s*\)$/g, '').split(/\s*,\s*/).map(a => {
          let [n, t = 'any'] = a.split(/\s*:\s*/)
          let o = false
          if (/^\[(\w+)\]$/.test(n)) {
            n = RegExp.$1
            o = true
          }
          return new Arg(n, new Type(t), o)
        })
      } else if (key === 'desc') {
        if (val) def.desc = val.split(/\r?\n/)
      } else {
        def[key as 'range'] = val
      }
    })

    // 去掉 since 中的链接
    if (def.since && /^\[([\d\.]+)\]/.test(def.since)) def.since = RegExp.$1
    try {
      if (def.defaultValue) def.defaultValue = JSON.parse(def.defaultValue) + ''
    } catch (e) {}

    if (originalHead[0] === '方法' || args || type.name === 'function') {
      type = new FunctionType(args || [], new Type('any'))
    }

    return new Definition(name, type, def)
  }

  /**
   * table 中可能存在这样的定义：
   *
   * animation.timingFunc： string
   * animation.duration: number
   *
   * 需要将 上面两个 合并 到一个字段 animation 上
   *
   * 也有这种：
   * data.data.poi_list[i].poi_id             => 会在 Definition.create 中被预转化成 data.data.poi_list.[i].poi_id
   * data.data.poi_list[i].qualification_num  => 会在 Definition.create 中被预转化成 data.data.poi_list.[i].qualification_num
   */
  private parseEntities(entities: Definition[]): Definition[] {
    let subEntities = entities.filter(e => e.name.includes('.')).sort(sortDefinitionsByNameParts)
    entities = entities.filter(e => !e.name.includes('.'))

    for (let se of subEntities) {
      let group = new ObjectType(entities)
      let keys = se.name.split('.')
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        let isLastKey = keys.length - 1 === i

        if (isLastKey) {
          se.name = key
          group.definitions.push(se)
        } else {
          let entity = group.definitions.find(r => r.name === key)
          if (!entity) {
            entity = new Definition(key, new Type('any'))
            group.definitions.push(entity)
          }

          let isArray = !!(keys[i + 1] && /^\[\w*\]$/.test(keys[i + 1]))
          if (isArray) i++

          if (!(entity.type instanceof ObjectType)) entity.type = isArray ? new ArrayObjectType([]) : new ObjectType([])
          group = entity.type as ObjectType
        }
      }

    }

    return entities
  }
}

function sortDefinitionsByNameParts(a: Definition, b: Definition) {
  return a.name.split('.').length - b.name.split('.').length
}

