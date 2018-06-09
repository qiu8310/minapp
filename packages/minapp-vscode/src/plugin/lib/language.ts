/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {CustomAttr, LanguageConfig} from '@minapp/common/dist/dev/config'

const EVENT_ATTRS: CustomAttr[] = [
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
]
export {LanguageConfig}
export interface Languages {
  [language: string]: LanguageConfig
}
export const Languages: Languages = {
  native: {
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
      attrs: EVENT_ATTRS,
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
    components: [
      {
        name: 'wxs',
        desc: ['模板中的 wxs 模块'],
        docLink: 'https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/01wxs-module.html',
        attrs: [
          {name: 'src'},
          {name: 'module'},
        ]
      }
    ],
    noBasicAttrsComponents: ['wxs', 'template']
  },
  wepy: {
    id: 'wepy',
    baseAttrs: [
      {name: 'id'},
      {name: 'class'},
      {name: 'style', desc: ['组件的内联样式']},
      {name: 'hidden', desc: ['组件是否隐藏']},
    ],
    event: {
      prefixes: ['@'],
      modifiers: ['user', 'stop', 'default'],
      attrs: EVENT_ATTRS,
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
    components: [
      {
        name: 'repeat',
        desc: ['类似于通过wx:for循环渲染原生的wxml标签'],
        docLink: 'https://tencent.github.io/wepy/document.html#/?id=%E7%BB%84%E4%BB%B6%E7%9A%84%E5%BE%AA%E7%8E%AF%E6%B8%B2%E6%9F%93',
        attrs: [
          // @ts-ignore
          {name: 'for', addBrace: true},
          {name: 'key'},
          {name: 'index'},
          {name: 'item'}
        ]
      }
    ],
    noBasicAttrsComponents: ['repeat']
  },
  mpvue: {
    id: 'mpvue',
    baseAttrs: [
      {name: 'id'},
      {name: 'class'},
      {name: 'style', desc: ['组件的内联样式']},
      {name: 'key', desc: ['Offer a way for you to say, “These two elements are completely separate - don’t re-use them.']},
    ],
    event: {
      modifiers: ['stop', 'prevent', 'capture', 'self', 'once', 'passive'],
      prefixes: ['@'],
      attrs: EVENT_ATTRS,
    },
    custom: {
      ':': {
        modifiers: ['sync'],
        attrs: [
          {name: 'class'},
          {name: 'style'},
        ],
      },
      'v-': {
        modifiers: [],
        attrs: [
          {name: 'if'},
          {name: 'else-if'},
          {name: 'else'},
          {name: 'show'},
          {name: 'for'},
          {name: 'modal'},
          {name: 'once', boolean: true},
          {name: 'html', boolean: true},
        ],
      }
    },
    components: [],
    noBasicAttrsComponents: []
  }
}
