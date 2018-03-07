/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {parseAttrs} from '../parseAttrs'

describe('single line', () => {
  test('should parse basic single line', () => {
    expect(parseAttrs(`class {
      properties = {foo: Number, bar: String}
    }
    `)).toEqual([
      {name: 'foo', type: {name: 'number'}},
      {name: 'bar', type: {name: 'string'}},
    ])
  })

  test('should parse complex single line', () => {
    expect(parseAttrs(`  properties: {foo: Number, bar: {type: String, others: {type: Number}}}`)).toEqual([
      {name: 'foo', type: {name: 'number'}},
      {name: 'bar', type: {name: 'string'}},
    ])
  })

  test('should parse single line with doc', () => {
    expect(parseAttrs(`  properties: {/** 这是 foo 的描述 */foo: Number}`)).toEqual([
      {name: 'foo', type: {name: 'number'}, desc: ['这是 foo 的描述']}
    ])
  })
})

describe('multiple lines', () => {
  test('should parse basic multiple lines', () => {
    expect(parseAttrs(`
    class {
      properties = {
        foo: Number,
        bar: String
      }
    }
    `)).toEqual([
      {name: 'foo', type: {name: 'number'}},
      {name: 'bar', type: {name: 'string'}},
    ])
  })

  test('should parse complex multiple lines', () => {
    expect(parseAttrs(`
      properties = {
        foo: Number,
        bar: {
          type: String,
          value: '123',
          others: {
            type: Number
          },
          fn: () => {
            return String
          }
        }
      }
    `)).toEqual([
      {name: 'foo', type: {name: 'number'}},
      {name: 'bar', type: {name: 'string'}, defaultValue: '123'},
    ])
  })

  test('should parse multiple lines with desc', () => {
    expect(parseAttrs(`
      properties = {
        /** 这是 foo 的描述 */
        foo: Number,
        /**
         * 这是 bar 的描述
         * 第一行
         *
         * 这是第二行
         *
         * @required
         * @type string
         * @default 12
         *
         * @ 后面的全不要了
         */
        bar: Number
      }
    `)).toEqual([
      {name: 'foo', type: {name: 'number'}, desc: ['这是 foo 的描述']},
      {name: 'bar', type: {name: 'string'}, desc: ['这是 bar 的描述第一行', '这是第二行'], required: true, defaultValue: 12},
    ])
  })
})
