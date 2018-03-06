/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {HoverProvider, TextDocument, Position, CancellationToken, Hover, MarkdownString} from 'vscode'

import {
  components, getComponentMarkdown, getComponentAttrMarkdown,
  ComponentAttr
} from '@minapp/common/dist/dev/'
import {getTagAtPosition, Tag} from './getTagAtPosition'

export default class implements HoverProvider {
  provideHover(document: TextDocument, position: Position, token: CancellationToken) {
    let tag = getTagAtPosition(document, position) as Tag
    if (!tag) return null

    let comp = components.find(c => c.name === tag.name)
    let attr: ComponentAttr | undefined
    if (!comp) return null

    if (tag.isOnTagName) {
      return new Hover(new MarkdownString(getComponentMarkdown(comp)))
    }

    if (!tag.isOnTagName && tag.posWord && !(/^(wx|bind|catch):/.test(tag.posWord))) {
      (comp.attrs || []).find(a => {
        if (a.name === tag.posWord) {
          attr = a
        } else if (a.subAttrs) {
          a.subAttrs.some(s => s.attrs.some(sa => {
            if (sa.name === tag.posWord) {
              attr = a
            }
            return !!attr
          }))
        }
        return !!attr
      })
    }

    return attr ? new Hover(new MarkdownString(getComponentAttrMarkdown(attr))) : null
  }
}
