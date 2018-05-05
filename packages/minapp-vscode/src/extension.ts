/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {ExtensionContext, languages} from 'vscode'

import LinkProvider from './plugin/LinkProvider'
import HoverProvider from './plugin/HoverProvider'
import WxmlFormatter from './plugin/WxmlFormatter'

import WxmlAutoCompletion from './plugin/WxmlAutoCompletion'
import PugAutoCompletion from './plugin/PugAutoCompletion'
import VueAutoCompletion from './plugin/VueAutoCompletion'

import ActiveTextEditorListener from './plugin/ActiveTextEditorListener'

import {config, configActivate, configDeactivate} from './plugin/lib/config'

export function activate(context: ExtensionContext) {
  configActivate()
  let formatter = new WxmlFormatter(config)
  let autoCompletionWxml = new WxmlAutoCompletion(config)
  let hoverProvider = new HoverProvider(config)
  let linkProvider = new LinkProvider(config)
  let autoCompletionPug = new PugAutoCompletion(config)
  let autoCompletionVue = new VueAutoCompletion(autoCompletionPug, autoCompletionWxml)

  context.subscriptions.push(
    // 给模板中的 脚本 添加特殊颜色
    new ActiveTextEditorListener(config),

    // hover 效果
    languages.registerHoverProvider(['wxml', 'wxml-pug', 'vue'], hoverProvider),

    // 添加 link
    languages.registerDocumentLinkProvider(['wxml', 'wxml-pug'], linkProvider),

    // 格式化
    languages.registerDocumentFormattingEditProvider('wxml', formatter),
    languages.registerDocumentRangeFormattingEditProvider('wxml', formatter),

    // 自动补全
    languages.registerCompletionItemProvider('wxml', autoCompletionWxml, '<', ' ', ':', '@', '.', '-'),
    languages.registerCompletionItemProvider('wxml-pug', autoCompletionPug, '\n', ' ', ':', '@', '.', '-'),
    languages.registerCompletionItemProvider('vue', autoCompletionVue, '<', ' ', ':', '@', '.', '-', '\n')
  )
}

export function deactivate() {
  configDeactivate()
}

