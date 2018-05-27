/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {parse} from '../parser'
import {Node} from '../structs'
import * as path from 'path'
import * as fs from 'fs'
const fixture = (name: string) => path.resolve(__dirname, './fixtures/' + name)
const readFixture = (name: string) => fs.readFileSync(fixture(name)).toString()

describe('single root', () => {
  test('empty string', () => {
    expect(p('')).toEqual([])
    expect(p('  ')).toEqual([])
    expect(p(' \n\t ')).toEqual([])
  })
  test('root comment', () => {
    expect(p('<!-- a -->')).toEqual([{comment: 'a', start: 0, end: 10}])
    expect(p('<!-- --> \n')).toEqual([{comment: '', start: 0, end: 8}])
    expect(p('\n<!-- -->')).toEqual([{comment: '', start: 1, end: 9}])
    expect(p('<!--   -->')).toEqual([{comment: '', start: 0, end: 10}])
  })
  test('root text', () => {
    expect(p(' abc')).toEqual([{content: 'abc', start: 1, end: 4}])
  })
  test('root tag', () => {
    expect(p('<div > </div>')).toEqual([{attrs: [], children: [], name: 'div', contentStart: 6, contentEnd: 7, start: 0, end: 13}])
  })
  test('root self close tag', () => {
    expect(p('<div />')).toEqual([{attrs: [], children: [], name: 'div', selfClose: true, start: 0, end: 7}])
  })
})

describe('multiple root', () => {
  test('tag and comment', () => {
    expect(p('<!----><div></div>')).toEqual([
      {comment: '', start: 0, end: 7},
      {attrs: [], children: [], name: 'div', start: 7, end: 18, contentStart: 12, contentEnd: 12}
    ])
  })
  test('tag and comment and text', () => {
    expect(p('<i></i>abc<!--a-->')).toEqual([
      {attrs: [], children: [], name: 'i', start: 0, end: 7, contentStart: 3, contentEnd: 3},
      {content: 'abc', start: 7, end: 10},
      {comment: 'a', start: 10, end: 18}
    ])
  })
})

describe('simple error', () => {
  test('comment not end', () => {
    expect(() => {
      p('<!--   aksjfka kj kajsgjk')
    }).toThrow('comment node has no end tag')
  })
  test('tag attr parser error', () => {
    expect(() => {
      p('<div <')
    }).toThrow('node attribute syntax error')

    expect(() => {
      p('<div t=') // 不能只留等号
    }).toThrow('node attribute syntax error')
  })
  test('tag not close', () => {
    expect(() => {
      p('<div  ab tes="a"')
    }).toThrow('expect ">", bug got nothing')
  })
  test('tag not end', () => {
    expect(() => {
      p('<div>   askjfka kjkas gjd')
    }).toThrow('expect end tag "</div>", bug got nothing')
  })
  test('tag wrong end', () => {
    expect(() => {
      p('<div></tgf>')
    }).toThrow('expect end tag "</div>", bug got "</tgf>"')
  })
})

describe('complex node', () => {
  test('normal html', () => {
    expect(c('<div a="a" b><!-- ab -->test<i></i></div>')).toEqual([
      {name: 'div', attrs: {a: 'a', b: true}, children: [
        {comment: 'ab'},
        {content: 'test'},
        {name: 'i'}
      ]}
    ])
  })

  test('fixture b.xml', () => {
    expect(c(readFixture('b.xml'))).toEqual([
      {comment: 'b.xml'},
      {name: 'view', attrs: {class: 'container log-list'}, children: [
        {name: 'block', attrs: {'wx:for': '{{logs}}', 'wx:key': 'i', 'wx:for-item': 'log'}, children: [
          {name: 'text', attrs: {class: 'log-item'}, children: [
            {content: '{{index + 1}}. {{log}}'}
          ]}
        ]},
        {name: 'view', children: [
          {content: '1'},
          {name: 'text', children: [{content: '2'}]}
        ]}
      ]}
    ])
  })

  test('fixture a xml => json', () => {
    expect(c(readFixture('a.xml'))).toEqual(JSON.parse(readFixture('a.json')))
  })

  test('fixture b xml => json', () => {
    expect(c(readFixture('b.xml'))).toEqual(JSON.parse(readFixture('b.json')))
  })

  test('fixture a xml => json => xml', () => {
    let xml = readFixture('a.xml')
    expect(parse(xml).toXML({eol: '\n', preferSpaces: true, tabSize: 2}).trim()).toEqual(xml.trim())
  })

  test('fixture b xml => json => xml', () => {
    let xml = readFixture('b.xml')
    expect(parse(xml).toXML({eol: '\n', preferSpaces: true, tabSize: 2}).trim()).toEqual(xml.trim())
  })
})

describe('mustache in test', () => {
  test('basic', () => {
    expect(c('<div>{{index + 1}}. {{log}}</div>')).toEqual([{name: 'div', children: [{content: '{{index + 1}}. {{log}}'}]}])
  })
  test('include <', () => {
    expect(c('<div>{{a<b ? 1 : 2}} a</div>')).toEqual([{name: 'div', children: [{content: '{{a<b ? 1 : 2}} a'}]}])
  })
})

describe('big file', () => {
  test('it should parse big file', () => {
    let json = JSON.stringify(c(readFixture('big.wxml')), null, 2).trim()
    // fs.writeFileSync(fixture('big.json'), json)
    expect(json).toEqual(fs.readFileSync(fixture('big.json')).toString().trim())
  })
})

function p(xml: string) {
  return JSON.parse(JSON.stringify(parse(xml).nodes))
}

function c(xml: string) {
  return parse(xml).nodes.map(n => cut(n))
}

function cut(n: Node) {
  let obj: any = {}
  if (n.is(Node.TYPE.COMMENT)) {
    obj.comment = n.comment.trim()
  } else if (n.is(Node.TYPE.TEXT)) {
    obj.content = n.content
  } else if (n.is(Node.TYPE.TAG)) {
    obj.name = n.name
    if (n.attrs.length) obj.attrs = n.attrs.reduce((all, a) => {
      all[a.name] = a.value
      return all
    }, {} as any)
    if (n.children.length) obj.children = n.children.map(_ => cut(_))
  }
  return obj
}
