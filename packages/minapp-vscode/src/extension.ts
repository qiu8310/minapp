/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as vscode from 'vscode'

import WxmlAutoCompletion from './plugin/WxmlAutoCompletion'
import WxmlHoverProvider from './plugin/WxmlHoverProvider'

export function activate(context: vscode.ExtensionContext) {
    let selector = 'wxml'
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(selector, new WxmlAutoCompletion(), '<', ' ', ':'),
        vscode.languages.registerHoverProvider(selector, new WxmlHoverProvider())
    )
}

export function deactivate() {
}
