import { CompletionItemProvider, TextDocument, Position, CancellationToken, CompletionContext, CompletionItem } from 'vscode'
import PugAutoCompletion from './PugAutoCompletion'
import WxmlAutoCompletion from './WxmlAutoCompletion'
import {getLangForVue} from './lib/helper'

export default class implements CompletionItemProvider {
  constructor(public pug: PugAutoCompletion, public wxml: WxmlAutoCompletion) {}
  provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): CompletionItem[] | (Promise<CompletionItem[]>) {
    let lang = getLangForVue(document, position)
    if (lang === 'pug') {
      return this.pug.provideCompletionItems(document, position, token, context)
    } else if (lang && /mpvue|wxml/.test(lang)) {
      return this.wxml.provideCompletionItems(document, position, token, context)
    }
    return []
  }
}
