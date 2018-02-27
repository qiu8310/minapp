/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {
  Struct,
  Type, ObjectType, ArrayObjectType, FunctionType,
  Arg, Definition, Func, Klass
} from '../index'


let dStr: Definition

let tVoid: Type
let tAny: Type
let tObj: ObjectType
let tArrObj: ArrayObjectType

let tFn: FunctionType

let aStr: Arg
let aObj: Arg


beforeAll(() => {
  dStr = new Definition('str', new Type('string'))

  tVoid = new Type('void')
  tAny = new Type('any')
  tObj = new ObjectType([dStr])
  tArrObj = new ArrayObjectType([dStr])

  aStr = new Arg('str', new Type('string'))
  aObj = new Arg('obj', tObj)

  tFn = new FunctionType([aStr], tVoid)
})
describe('Type', () => {
  test('basic', () => {
    ts(tVoid, 0, 'void')
    ts(tAny, 0, 'any')
  })

  test('object type', () => {
    ts(new ObjectType([]), 0, '{}')

    ts(tObj, 2, `{
      /**
       * str
       */
      str?: string
    }`)
    ts(tObj, 3, `{
        /**
         * str
         */
        str?: string
      }`)
  })

  test('array object type', () => {
    ts(new ArrayObjectType([]), 10, 'Array<{}>')
    ts(tArrObj, 2, `Array<{
      /**
       * str
       */
      str?: string
    }>`)
  })

  test('function type', () => {
    ts(tFn, 2, `(str: string) => void`)
  })
})

describe('Arg', () => {
  test('string arg', () => {
    ts(aStr, 2, 'str: string')
  })
  test('ojbect arg', () => {
    ts(aObj, 2, `obj: {
      /**
       * str
       */
      str?: string
    }`)
  })
})

describe('Func', () => {
  test('basic', () => {
    ts(new Func('wx', 'bb', [aStr], tVoid, []), 0, `function bb(str: string): void\n`)
  })
  test('extract arg', () => {
    ts(new Func('wx', 'bb', [aObj], tVoid, []), 2, `    namespace bb {
      type Param = {
        /**
         * str
         */
        str?: string
      }
    }
    function bb(obj: bb.Param): void\n`)
  })
  test('extract return', () => {
    ts(new Func('wx', 'bb', [], tObj, []), 2, `    namespace bb {
      type Return = {
        /**
         * str
         */
        str?: string
      }
    }
    function bb(): bb.Return\n`)
  })
})

describe('Klass', () => {
  test('basic', () => {
    ts(new Klass('Wo', [], ['test', ' ', ' line 2']), 3, `      /**
       * test
       *
       *  line 2
       */
      class Wo {
      }`)
  })
})

function ts(struct: Struct, tabCount: number, expected: string) {
  return expect(struct.toTSString(tabCount)).toBe(expected)
}
