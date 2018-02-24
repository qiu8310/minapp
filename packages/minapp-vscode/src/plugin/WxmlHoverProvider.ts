import {HoverProvider, TextDocument, Position, CancellationToken, Hover, MarkdownString} from 'vscode'

import {components, getComponentMarkdown, getComponentAttrMarkdown} from '../dev/components'
import {getTagAtPosition, Tag} from './getTagAtPosition'
import { ComponentAttr } from '../dev/Component'

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
      comp.attrs.find(a => {
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
