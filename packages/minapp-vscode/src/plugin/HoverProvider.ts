/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {HoverProvider, TextDocument, Position, CancellationToken, Hover, MarkdownString} from 'vscode'
import { hoverComponentAttrMarkdown, hoverComponentMarkdown } from '@minapp/common'
import {Tag} from './lib/getTagAtPosition'
import {getTagAtPosition as getWxmlTag} from './lib/getTagAtPositionForWxml'
import {getTagAtPosition as getPugTag} from './lib/getTagAtPositionForPug'
import {Config} from './lib/config'
import {getLanguage, getCustomOptions, getLangForVue} from './lib/helper'

export default class implements HoverProvider {
  constructor(public config: Config) {}

  async provideHover(document: TextDocument, position: Position, token: CancellationToken) {
    let lang = document.languageId
    if (lang === 'vue') {
      lang = getLangForVue(document, position) as string
      if (!lang) return null
    }

    let language = getLanguage(document, position)
    if (!language) return null

    let getTagAtPosition = /pug/.test(lang) ? getPugTag : getWxmlTag
    let tag = getTagAtPosition(document, position) as Tag
    if (!tag) return null

    let co = getCustomOptions(this.config, document)

    let markdown: string | undefined
    if (tag.isOnTagName) {
      markdown = await hoverComponentMarkdown(tag.name, language, co)
    } else if (!tag.isOnTagName && tag.posWord && !(/^(wx|bind|catch):/.test(tag.posWord))) {
      markdown = await hoverComponentAttrMarkdown(tag.name, tag.posWord, language, co)
    }

    return markdown ? new Hover(new MarkdownString(markdown)) : null
  }
}
