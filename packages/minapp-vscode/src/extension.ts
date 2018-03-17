/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as vscode from 'vscode'

import WxmlAutoCompletion from './plugin/WxmlAutoCompletion'
import WxmlHoverProvider from './plugin/WxmlHoverProvider'
import {config, destroy} from './plugin/config'

export function activate(context: vscode.ExtensionContext) {
  let selector = ['wxml', 'vue']
  let autoCompletion = new WxmlAutoCompletion(config)
  let hoverProvider = new WxmlHoverProvider(config)
  // console.log('minapp-vscode is active!')
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(selector, autoCompletion, '<', ' ', ':', '@', '.'),
    vscode.languages.registerHoverProvider(selector, hoverProvider)
  )

  return {
    autoCompletion, hoverProvider
  }
}

export function deactivate() {
  destroy()
}

