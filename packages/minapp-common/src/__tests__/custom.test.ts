/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as path from 'path'
import {getJson, JsonConfig} from '../custom'

const root = path.resolve(__dirname, 'fixtures', 'custom')
const fixture = (key: string) => path.resolve(root, key)

describe('basic', () => {
  test('should have no json', async () => {
    expect(await getJsonByFixture('no.js')).toBeUndefined()
  })
  test('should have component', async () => {
    expect(await getJsonByFixture('comp.js')).toEqual({component: {desc: ['test desc']}, usingComponents: []})
  })
  test('should have usingComponents', async () => {
    let json = await getJsonByFixture('using-comp.cjson') as JsonConfig
    expect(json.component).toBeUndefined()
    expect(json.usingComponents).toHaveLength(3)
    expect(json.usingComponents).toContainEqual({ name: 'no' })
    expect(json.usingComponents).toContainEqual({ name: 'xx' })
    expect(json.usingComponents).toContainEqual({ name: 'comp', desc: ['test desc'] })
  })
})

describe('complex', () => {
  test('should not die when circle usingComponents', async () => {
    let json1 = await getJsonByFixture('circle1.json') as JsonConfig
    let json2 = await getJsonByFixture('circle2.json') as JsonConfig
    expect(json1).toEqual({ usingComponents: [ { name: 'circle2' } ] })
    expect(json2).toEqual({ usingComponents: [ { name: 'circle1' } ] })
  })

  test('should support alias and resolves', async () => {
    let json = await getJsonByFixture('alias.json', [path.dirname(root)]) as JsonConfig
    expect(json.component).toBeUndefined()
    expect(json.usingComponents).toHaveLength(3)
    expect(json.usingComponents).toContainEqual({ name: 'comp3' })
    expect(json.usingComponents).toContainEqual({ name: 'comp2', desc: ['this is test'] })
    expect(json.usingComponents).toContainEqual({ name: 'comp', desc: ['test desc'] })
  })
})


function getJsonByFixture(key: string, resolves: string[] = []) {
  return getJson({filename: fixture(key), resolves})
}
