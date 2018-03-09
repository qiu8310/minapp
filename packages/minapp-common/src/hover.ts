/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {CustomOptions, getCustomComponents} from './custom'
import {components, getComponentMarkdown, getComponentAttrMarkdown, ComponentAttr} from './dev'

export async function hoverComponentMarkdown(tag: string, co?: CustomOptions) {
  let comp = await getComponent(tag, co)
  return comp ? getComponentMarkdown(comp) : undefined
}

export async function hoverComponentAttrMarkdown(tag: string, name: string, co?: CustomOptions) {
  let comp = await getComponent(tag, co)
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

async function getComponent(tag: string, co?: CustomOptions) {
  let comp = components.find(c => c.name === tag)
  if (!comp) {
    comp = (await getCustomComponents(co)).find(c => c.name === tag)
  }
  return comp
}
