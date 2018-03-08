/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as path from 'path'

import {autocompleteTagName, autocompleteTagAttr, autocompleteSpecialTagAttr} from '../autocomplete'
import {components, BASE_ATTRS, CTRL_ATTRS, EVENT_ATTRS, Component, ComponentAttr} from '../dev'

const root = path.resolve(__dirname, 'fixtures', 'custom')
const fixture = (key: string) => path.resolve(root, key)

describe('autocompleteTagName', () => {
  test('should list all native tags', async () => {
    let tags = await autocompleteTagName()
    expect(tags.natives.length).toEqual(components.length)
    expect(tags.customs.length).toEqual(0)
  })

  test('should include local tags', async () => {
    let tags = await autocompleteTagName({filename: fixture('using-comp.js')})
    expect(tags.customs.length).toEqual(3)
  })

})

describe('autocompleteTagAttr', () => {
  test('should include basic attrs and all native attrs', async () => {
    let attr = await autocompleteTagAttr('text', {})
    let c = components.find(i => i.name === 'text') as Component
    expect(attr.basics.length).toEqual(BASE_ATTRS.length)
    expect(attr.natives.length).toEqual(c.attrs && c.attrs.length)
  })

  test('should list all native exclude already exists', async () => {
    let attr = await autocompleteTagAttr('text', {id: '1', space: '2'})
    let c = components.find(i => i.name === 'text') as Component
    expect(attr.basics.length).toEqual(BASE_ATTRS.length - 1)
    expect(attr.natives.length).toEqual(c.attrs && c.attrs.length - 1)
  })

  test('should list all custom attrs', async () => {
    let attr = await autocompleteTagAttr('attr', {}, {filename: fixture('attr-page.json')})
    expect(attr.basics.length).toEqual(BASE_ATTRS.length)
    expect(attr.natives.length).toEqual(2)
  })

  test('should list all custom exclude already exists', async () => {
    let attr = await autocompleteTagAttr('attr', {foo: '1'}, {filename: fixture('attr-page.json')})
    expect(attr.natives.length).toEqual(1)
  })

  test('should list all attrs include subAttrs', async () => {
    let attr = await autocompleteTagAttr('picker', {})
    expect(attr.natives.length).toBeGreaterThan(4)
  })

  test('should list specified subAttrs', async () => {
    let c = components.find(i => i.name === 'picker') as Component
    let mode = (c.attrs as ComponentAttr[]).find(a => a.name === 'mode') as ComponentAttr
    if (mode.subAttrs) {
      // @ts-ignore
      let sub = mode.subAttrs.find(s => s.equal === 'region').attrs

      let attr1 = await autocompleteTagAttr('picker', {mode: 'region'})
      expect(attr1.natives.length).toEqual(sub.length)

      let attr2 = await autocompleteTagAttr('picker', {mode: 'region', [sub[0].name]: '1'})
      expect(attr2.natives.length).toEqual(sub.length - 1)

    } else {
      throw new Error('not subAttrs')
    }
  })
})


describe('autocompleteSpecialTagAttr', () => {
  test('should autocomplete wx', async () => {
    let attr = await autocompleteSpecialTagAttr('wx', 'view', {})
    expect(attr.natives.length).toEqual(CTRL_ATTRS.length)
  })

  test('should autocomplete bind/catch', async () => {
    let attr1 = await autocompleteSpecialTagAttr('bind', 'view', {})
    expect(attr1.natives.length).toEqual(EVENT_ATTRS.length)

    let attr2 = await autocompleteSpecialTagAttr('catch', 'view', {})
    expect(attr2.natives.length).toEqual(EVENT_ATTRS.length)
  })

  test('should autocomplete bind/catch exclude exists', async () => {
    let attr = await autocompleteSpecialTagAttr('bind', 'view', {'bind:tap': true, 'bindlongtap': '1'})
    expect(attr.natives.length).toEqual(EVENT_ATTRS.length - 2)
  })

  test('should autocomplete bind/catch include native event', async () => {
    let attr1 = await autocompleteSpecialTagAttr('bind', 'slider', {})
    let names = attr1.customs.map(c => c.attr.name)
    expect(names.length).toBeGreaterThan(1)

    let attr2 = await autocompleteSpecialTagAttr('bind', 'slider', {['bind' + names[0]]: true})
    expect(attr2.customs.length).toEqual(names.length - 1)
  })

  test('should autocomplete bind/catch include custom native event', async () => {
    let attr1 = await autocompleteSpecialTagAttr('bind', 'attr', {}, {filename: fixture('attr-page.json')})
    expect(attr1.customs.length).toEqual(1)

    let attr2 = await autocompleteSpecialTagAttr('bind', 'attr', {bindclick: true}, {filename: fixture('attr-page.json')})
    expect(attr2.customs.length).toEqual(0)
  })
})
