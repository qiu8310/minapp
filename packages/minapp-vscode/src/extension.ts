/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {ExtensionContext, languages} from 'vscode'

import WxmlAutoCompletion from './plugin/WxmlAutoCompletion'
import WxmlHoverProvider from './plugin/WxmlHoverProvider'
import WxmlFormatter from './plugin/WxmlFormatter'
import {config, configActivate, configDeactivate} from './plugin/config'

export function activate(context: ExtensionContext) {
  configActivate()

  let selector = ['wxml', 'vue']
  let formatter = new WxmlFormatter()
  let autoCompletion = new WxmlAutoCompletion(config)
  let hoverProvider = new WxmlHoverProvider(config)

  // console.log('minapp-vscode is active!')
  context.subscriptions.push(
    languages.registerHoverProvider(selector, hoverProvider),
    languages.registerCompletionItemProvider(selector, autoCompletion, '<', ' ', ':', '@', '.'),
    // languages.registerOnTypeFormattingEditProvider('wxml', formatter, '\n', '\t', 'a'),
    languages.registerDocumentFormattingEditProvider('wxml', formatter),
    languages.registerDocumentRangeFormattingEditProvider('wxml', formatter)
  )

  return {
    autoCompletion, hoverProvider
  }
}

export function deactivate() {
  configDeactivate()
}

