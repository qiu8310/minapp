/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {CustomOptions, getJson} from './custom'
import {components, getComponentMarkdown, getComponentAttrMarkdown, Component, ComponentAttr, CustomAttr, BASE_ATTRS, CTRL_ATTRS, EVENT_ATTRS} from './dev/'

export interface TagItem {
  component: Component
  markdown: string
}

export interface TagAttrItem {
  attr: CustomAttr
  markdown: string
}

// 优先级
// customs > natives > basics

/**
 * 自动补全支持的所有的 tag
 * @param {CustomOptions} co 用于解析自定义组件的配置
 */
export async function autocompleteTagName(co?: CustomOptions) {
  let natives: TagItem[] = components.map(mapComponent)
  let json = co ? await getJson(co) : null
  let customs: TagItem[] = json && json.usingComponents ? json.usingComponents.map(mapComponent) : []

  return {
    customs,
    natives
  }
}

/**
 * 自动补全 tag 上的属性
 *
 * @export
 * @param {string} tagName 当前 tag 的名称
 * @param {{[key: string]: string}} attrs 当前已经写了的属性的集合
 * @param {CustomOptions} co 用于解析自定义组件的配置
 */
export async function autocompleteTagAttr(tagName: string, tagAttrs: {[key: string]: string | boolean}, co?: CustomOptions) {
  let attrs = await getNativeAvailableAttrs(tagName, tagAttrs, co)
  return {
    basics: BASE_ATTRS.filter(a => tagAttrs[a.name] == null).map(mapComponentAttr) as TagAttrItem[],
    natives: attrs.map(mapComponentAttr) as TagAttrItem[]
  }
}

export async function autocompleteSpecialTagAttr(prefix: 'wx' | 'bind' | 'catch', tagName: string, tagAttrs: {[key: string]: string | boolean}, co?: CustomOptions) {
  let customs: TagAttrItem[] = []
  let natives: TagAttrItem[] = []

  if (prefix === 'wx') {
    natives = CTRL_ATTRS.map(mapComponentAttr)
  } else if (prefix === 'bind' || prefix === 'catch') {
    let filter = (a: ComponentAttr) => tagAttrs[prefix + a.name] == null && tagAttrs[prefix + ':' + a.name] == null
    customs = (await getNativeAvailableAttrs(tagName, tagAttrs, co))
                  .filter(a => a.name.startsWith(prefix))
                  .map(a => ({...a, name: a.name.substr(prefix.length)})) // 去除 bind/catch 前缀
                  .filter(filter)
                  .map(mapComponentAttr)
    natives = EVENT_ATTRS.filter(filter).map(mapComponentAttr)
  }
  return {customs, natives}
}

function mapComponent(component: Component) {
  return {component, markdown: getComponentMarkdown(component)}
}

function mapComponentAttr(attr: ComponentAttr) {
  return {attr, markdown: getComponentAttrMarkdown(attr)}
}

async function getNativeAvailableAttrs(tagName: string, tagAttrs: {[key: string]: string | boolean}, co?: CustomOptions) {
  let comp = components.find(c => c.name === tagName)
  let attrs: ComponentAttr[] = []

  if (comp) {
    attrs = getAvailableAttrs(comp, tagAttrs)
  } else {
    let json = co && (await getJson(co))
    let customs = json && json.usingComponents
    comp = customs && customs.find(c => c.name === tagName)
    if (comp) attrs = getAvailableAttrs(comp, tagAttrs)
  }
  return attrs
}

function getAvailableAttrs(comp: Component, tagAttrs: {[key: string]: string | boolean}): ComponentAttr[] {
  let attrs = comp.attrs || []
  let results = attrs.filter(a => tagAttrs[a.name] == null); // 先取出没有写的属性
  // 如果没写的属性中有 subAttrs，则要把它们全取出来
  [...results].forEach(a => {
    if (a.subAttrs) {
      a.subAttrs.forEach(s => {
        s.attrs.forEach(suba => {
          if (results.every(_ => _.name !== suba.name)) results.push(suba) // 去重
        })
      })
    }
  })

  // 写了的属性需要找出 subAttrs
  attrs.filter(a => tagAttrs[a.name] != null && a.subAttrs && a.subAttrs.length)
    .forEach(a => {
      let sub = (a.subAttrs || []).find(s => s.equal === tagAttrs[a.name])
      if (sub) results.push(...sub.attrs.filter(sa => tagAttrs[sa.name] == null))
    })

  return results
}

