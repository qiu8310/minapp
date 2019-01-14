/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as path from 'path'

import {autocompleteTagName, autocompleteTagAttr, autocompleteSpecialTagAttr} from '../autocomplete'
import {components, Component, ComponentAttr} from '../dev'

const root = path.resolve(__dirname, 'fixtures', 'custom')
const fixture = (key: string) => path.resolve(root, key)

const WxmlConfig = {
  id: 'wxml',
  baseAttrs: [
    {name: 'id'},
    {name: 'class'},
    {name: 'style', desc: ['组件的内联样式']},
    {name: 'hidden', desc: ['组件是否隐藏']},
  ],
  event: {
    prefixes: ['bind:', 'catch:'],
    modifiers: [],
    attrs: [
      {name: 'touchstart'},
      {name: 'touchmove'},
      {name: 'touchcancel'},
      {name: 'touchend'},
      {name: 'tap'},
      {name: 'longpress', since: '1.5.0'},
      {name: 'longtap'},
      {name: 'transitionend'},
      {name: 'animationstart'},
      {name: 'animationiteration'},
      {name: 'animationend'},
    ],
  },
  custom: {
    'wx:': {
      modifiers: [],
      attrs: [
        {name: 'if', addBrace: true},
        {name: 'elif', addBrace: true},
        {name: 'else', boolean: true},
        {name: 'for', addBrace: true},
        {name: 'key'},
        {name: 'for-item'},
        {name: 'for-index'},
      ]
    }
  },
  components: [],
}

describe('autocompleteTagName', () => {
  test('should list all native tags', async () => {
    let tags = await autocompleteTagName(WxmlConfig)
    expect(tags.natives.length).toEqual(components.length)
    expect(tags.customs.length).toEqual(0)
  })

  test('should include local tags', async () => {
    let tags = await autocompleteTagName(WxmlConfig, {filename: fixture('using-comp.js')})
    expect(tags.customs.length).toEqual(3)
  })

})

describe('autocompleteTagAttr', () => {
  test('should include basic attrs and all native attrs', async () => {
    let attr = await autocompleteTagAttr('text', {}, WxmlConfig)
    let c = components.find(i => i.name === 'text') as Component
    // expect(attr.basics.length).toEqual(BASE_ATTRS.length)
    expect(attr.natives.length).toEqual(c.attrs && c.attrs.length)
  })

  test('should list all native exclude already exists', async () => {
    let attr = await autocompleteTagAttr('text', {id: '1', space: '2'}, WxmlConfig)
    let c = components.find(i => i.name === 'text') as Component
    expect(attr.basics.length).toEqual(WxmlConfig.baseAttrs.length - 1)
    expect(attr.natives.length).toEqual(c.attrs && c.attrs.length - 1)
  })

  test('should list all custom attrs', async () => {
    let attr = await autocompleteTagAttr('attr', {}, WxmlConfig, {filename: fixture('attr-page.json')})
    expect(attr.basics.length).toEqual(WxmlConfig.baseAttrs.length)
    expect(attr.natives.length).toEqual(2)
  })

  test('should list all custom exclude already exists', async () => {
    let attr = await autocompleteTagAttr('attr', {foo: '1', bindclick: ''}, WxmlConfig, {filename: fixture('attr-page.json')})
    expect(attr.natives.length).toEqual(0)
  })

  test('should list all attrs include subAttrs', async () => {
    let attr = await autocompleteTagAttr('picker', {}, WxmlConfig)
    expect(attr.natives.length).toBeGreaterThan(4)
  })

  test('should list specified subAttrs', async () => {
    let c = components.find(i => i.name === 'picker') as Component
    let mode = (c.attrs as ComponentAttr[]).find(a => a.name === 'mode') as ComponentAttr
    if (mode.subAttrs) {
      // @ts-ignore
      let sub = mode.subAttrs.find(s => s.equal === 'region').attrs
      let attr1 = await autocompleteTagAttr('picker', {mode: 'region'}, WxmlConfig)
      expect(attr1.natives.length).toEqual(sub.length)

      let attr2 = await autocompleteTagAttr('picker', {mode: 'region', [sub[0].name]: '1'}, WxmlConfig)
      expect(attr2.natives.length).toEqual(sub.length - 1)

    } else {
      throw new Error('not subAttrs')
    }
  })
})


describe('autocompleteSpecialTagAttr', () => {
  test('should autocomplete wx', async () => {
    let attr = await autocompleteSpecialTagAttr('wx:', 'view', {}, WxmlConfig)
    expect(attr.natives.length).toEqual(WxmlConfig.custom['wx:'].attrs.length)
  })

  test('should autocomplete bind/catch', async () => {
    let attr1 = await autocompleteSpecialTagAttr('bind:', 'view', {}, WxmlConfig)
    expect(attr1.natives.length).toEqual(WxmlConfig.event.attrs.length)

    let attr2 = await autocompleteSpecialTagAttr('catch:', 'view', {}, WxmlConfig)
    expect(attr2.natives.length).toEqual(WxmlConfig.event.attrs.length)
  })

  test('should autocomplete bind/catch exclude exists', async () => {
    let attr = await autocompleteSpecialTagAttr('bind:', 'view', {'bind:tap': true, 'bind:longtap': '1'}, WxmlConfig)
    expect(attr.natives.length).toEqual(WxmlConfig.event.attrs.length - 2)
  })

  test('should autocomplete bind/catch include native event', async () => {
    let attr1 = await autocompleteSpecialTagAttr('bind:', 'slider', {}, WxmlConfig)
    expect(attr1.customs.length === 0)

    let attr2 = await autocompleteTagAttr('slider', {}, WxmlConfig)
    let bindAttr2 = attr2.natives.filter(n => n.attr.name.startsWith('bind')).map(n => n.attr)
    let names = bindAttr2.map(c => c.name)
    expect(names.length).toBeGreaterThan(1)
  })

  test('should autocomplete bind/catch include custom native event', async () => {
    let attr1 = await autocompleteSpecialTagAttr('bind:', 'attr', {}, WxmlConfig, {filename: fixture('attr-page.json')})
    expect(attr1.customs.length).toEqual(0)

    let attr2 = await autocompleteSpecialTagAttr('bind:', 'attr', {bindclick: true}, WxmlConfig, {filename: fixture('attr-page.json')})
    expect(attr2.customs.length).toEqual(0)
  })
})
