/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as path from 'path'
import {getCustomComponents, Component} from '../custom'

const root = path.resolve(__dirname, 'fixtures', 'custom')
const fixture = (key: string) => path.resolve(root, key)

describe('basic', () => {
  test('should have no json', async () => {
    expect(await getComponents('no.js')).toEqual([])
  })
  test('should have component', async () => {
    expect(await getComponents('comp.js')).toEqual([])
  })
  test('should have usingComponents', async () => {
    let comps = await getComponents('using-comp.cjson')
    expect(comps).toHaveLength(3)
    expect(comps).toContainEqual({ name: 'no' })
    expect(comps).toContainEqual({ name: 'xx' })
    expect(comps).toContainEqual({ name: 'comp', desc: ['test desc'] })
  })
})

describe('complex', () => {
  test('should not die when circle usingComponents', async () => {
    let json1 = await getComponents('circle1.json')
    let json2 = await getComponents('circle2.json')
    expect(json1).toEqual([ { name: 'circle2' } ])
    expect(json2).toEqual([ { name: 'circle1' } ])
  })

  test('should support alias and resolves', async () => {
    let comps = await getComponents('alias.json', [path.dirname(root)])
    expect(comps).toHaveLength(3)
    expect(comps).toContainEqual({ name: 'comp3' })
    expect(comps).toContainEqual({ name: 'comp2', desc: ['this is test'] })
    expect(comps).toContainEqual({ name: 'comp', desc: ['test desc'] })
  })
})


function getComponents(key: string, resolves: string[] = []): Promise<Component[]> {
  return getCustomComponents({filename: fixture(key), resolves})
}
