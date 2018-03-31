/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {CustomOptions, getCustomComponents} from './custom'
import {components, getComponentMarkdown, getComponentAttrMarkdown, ComponentAttr, LanguageConfig} from './dev'

export async function hoverComponentMarkdown(tag: string, lc: LanguageConfig, co?: CustomOptions) {
  let comp = await getComponent(tag, lc, co)
  return comp ? getComponentMarkdown(comp) : undefined
}

export async function hoverComponentAttrMarkdown(tag: string, name: string, lc: LanguageConfig, co?: CustomOptions) {
  let comp = await getComponent(tag, lc, co)
  if (!comp) return
  let attrs = comp.attrs || []

  let attr: ComponentAttr | undefined
  attrs.find(a => {
    if (a.name === name) {
      attr = a
    } else if (a.subAttrs) {
      a.subAttrs.some(s => s.attrs.some(sa => {
        if (sa.name === name) {
          attr = a
        }
        return !!attr
      }))
    }
    return !!attr
  })

  return attr ? getComponentAttrMarkdown(attr) : undefined
}

async function getComponent(tagName: string, lc: LanguageConfig, co?: CustomOptions) {
  let comp = [...lc.components, ...components].find(c => c.name === tagName)
  if (!comp) {
    comp = (await getCustomComponents(co)).find(c => c.name === tagName)
  }
  return comp
}
