/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {HoverProvider, TextDocument, Position, CancellationToken, Hover, MarkdownString} from 'vscode'
import { hoverComponentAttrMarkdown, hoverComponentMarkdown } from '@minapp/common'
import {getTagAtPosition, Tag} from './getTagAtPosition'
import {Config} from './config'

export default class implements HoverProvider {
  constructor(public config: Config) {}

  async provideHover(document: TextDocument, position: Position, token: CancellationToken) {
    let tag = getTagAtPosition(document, position) as Tag
    if (!tag) return null

    let co = this.config.disableCustomComponentAutocomponent
      ? undefined
      : {filename: document.fileName, resolves: this.config.getResolveRoots(document.uri)}

    let markdown: string | undefined
    if (tag.isOnTagName) {
      markdown = await hoverComponentMarkdown(tag.name, co)
    } else if (!tag.isOnTagName && tag.posWord && !(/^(wx|bind|catch):/.test(tag.posWord))) {
      markdown = await hoverComponentAttrMarkdown(tag.name, tag.posWord, co)
    }

    return markdown ? new Hover(new MarkdownString(markdown)) : null
  }
}
