/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {CustomOptions, getCustomComponents} from './custom'
import {
  components,
  Component, ComponentAttr, ComponentAttrValue, CustomAttr,
  getComponentMarkdown, getComponentAttrMarkdown, getComponentAttrValueMarkdown,
  LanguageConfig
} from './dev/'

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
export async function autocompleteTagName(lc: LanguageConfig, co?: CustomOptions) {
  let natives: TagItem[] = [...lc.components, ...components].map(mapComponent)
  let customs: TagItem[] = (await getCustomComponents(co)).map(mapComponent)

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
export async function autocompleteTagAttr(tagName: string, tagAttrs: {[key: string]: string | boolean}, lc: LanguageConfig, co?: CustomOptions) {
  let attrs = await getAvailableAttrs(tagName, tagAttrs, lc, co)

  // 属性不能是已经存在的，也不能是事件
  let filter = createComponentFilter(tagAttrs, false)

  let noBasics = lc.noBasicAttrsComponents && lc.noBasicAttrsComponents.indexOf(tagName) >= 0
  return {
    basics: noBasics ? [] : lc.baseAttrs.filter(filter).map(mapComponentAttr) as TagAttrItem[],
    natives: attrs.filter(filter).map(mapComponentAttr) as TagAttrItem[]
  }
}

/**
 * 自动补全指定的属性的值
 */
export async function autocompleteTagAttrValue(tagName: string, tagAttrName: string, lc: LanguageConfig, co?: CustomOptions) {
  let comp = await getComponent(tagName, lc, co)
  if (!comp || !comp.attrs) return []
  let attr = comp.attrs.find(a => a.name === tagAttrName)
  if (!attr) return []
  let values: ComponentAttrValue[] = attr.enum ? attr.enum : attr.subAttrs ? attr.subAttrs.map(s => ({value: s.equal})) : []

  return values.map(v => {
    return {
      value: v.value,
      markdown: getComponentAttrValueMarkdown(v)
    }
  })
}

export async function autocompleteSpecialTagAttr(prefix: string, tagName: string, tagAttrs: {[key: string]: string | boolean}, lc: LanguageConfig, co?: CustomOptions) {
  let customs: TagAttrItem[] = []
  let natives: TagAttrItem[] = []

  if (lc.custom.hasOwnProperty(prefix)) {
    natives = lc.custom[prefix].attrs
                  .filter(attr => tagAttrs[prefix + attr.name] == null)
                  .map(mapComponentAttr)
  } else if (lc.event.prefixes.indexOf(prefix) >= 0) {
    let filter = createComponentFilter(tagAttrs, true)
    customs = (await getAvailableAttrs(tagName, tagAttrs, lc, co))
                  .filter(filter)
                  .map(a => ({...a, name: a.name.replace(/^(bind|catch)/, '')} as ComponentAttr)) // 去除 bind/catch 前缀
                  .map(mapComponentAttr)
    natives = lc.event.attrs.filter(attr => tagAttrs[prefix + attr.name] == null).map(mapComponentAttr)
  }
  return {customs, natives}
}

function mapComponent(component: Component) {
  return {component, markdown: getComponentMarkdown(component)}
}

function mapComponentAttr(attr: ComponentAttr) {
  return {attr, markdown: getComponentAttrMarkdown(attr)} as TagAttrItem
}

function createComponentFilter(existsTagAttrs: {[key: string]: string | boolean}, event?: boolean) {
  return (attr: ComponentAttr) => {
    let isEvent = attr.name.startsWith('bind') || attr.name.startsWith('catch')
    return existsTagAttrs[attr.name] == null && (event == null || (event ? isEvent : !isEvent))
  }
}

async function getComponent(tagName: string, lc: LanguageConfig, co?: CustomOptions) {
  let comp = [...lc.components, ...components].find(c => c.name === tagName)
  if (!comp) {
    comp = (await getCustomComponents(co)).find(c => c.name === tagName)
  }
  return comp
}

async function getAvailableAttrs(tagName: string, tagAttrs: {[key: string]: string | boolean}, lc: LanguageConfig, co?: CustomOptions) {
  let comp = await getComponent(tagName, lc, co)
  return comp ? getAvailableAttrsFromComponent(comp, tagAttrs) : []
}

function getAvailableAttrsFromComponent(comp: Component, tagAttrs: {[key: string]: string | boolean}): ComponentAttr[] {
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

