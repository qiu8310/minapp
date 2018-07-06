/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {
  Position, CancellationToken, CompletionItemProvider,
  TextDocument, CompletionItem, CompletionContext
} from 'vscode'

import AutoCompletion from './AutoCompletion'

import {getTagAtPosition} from './lib/getTagAtPositionForWxml'
import {getLanguage, getLastChar} from './lib/helper'

export default class extends AutoCompletion implements CompletionItemProvider {
  id = 'wxml' as 'wxml'
  getTagAtPosition = getTagAtPosition

  provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): Promise<CompletionItem[]> {
    let language = getLanguage(document, position)
    if (!language) return [] as any

    let char = context.triggerCharacter || getLastChar(document, position)

    switch (char) {
      case '<': return this.createComponentSnippetItems(language, document, position)
      case '"':
      case '\'':
      case ' ': return this.createComponentAttributeSnippetItems(language, document, position)
      case ':': // 绑定变量 （也可以是原生小程序的控制语句或事件，如 wx:for, bind:tap）
      case '@': // 绑定事件
      case '-': // v-if
      case '.': // 变量或事件的修饰符
        return this.createSpecialAttributeSnippetItems(language, document, position)
      default:
        return [] as any
    }
  }
}
