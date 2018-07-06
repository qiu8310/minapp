/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {ExtensionContext, languages, workspace} from 'vscode'

import LinkProvider from './plugin/LinkProvider'
import HoverProvider from './plugin/HoverProvider'
import WxmlFormatter from './plugin/WxmlFormatter'

import WxmlAutoCompletion from './plugin/WxmlAutoCompletion'
import PugAutoCompletion from './plugin/PugAutoCompletion'
import VueAutoCompletion from './plugin/VueAutoCompletion'
import WxmlDocumentHighlight from './plugin/WxmlDocumentHighlight'

import ActiveTextEditorListener from './plugin/ActiveTextEditorListener'

import {config, configActivate, configDeactivate} from './plugin/lib/config'

export function activate(context: ExtensionContext) {
  // console.log('minapp-vscode is active!')
  configActivate()

  if (!config.disableAutoConfig) {
    autoConfig()
  }

  let formatter = new WxmlFormatter(config)
  let autoCompletionWxml = new WxmlAutoCompletion(config)
  let hoverProvider = new HoverProvider(config)
  let linkProvider = new LinkProvider(config)
  let autoCompletionPug = new PugAutoCompletion(config)
  let autoCompletionVue = new VueAutoCompletion(autoCompletionPug, autoCompletionWxml)
  let documentHighlight  = new WxmlDocumentHighlight(config)

  context.subscriptions.push(
    // 给模板中的 脚本 添加特殊颜色
    new ActiveTextEditorListener(config),

    // hover 效果
    languages.registerHoverProvider(['wxml', 'wxml-pug', 'vue'], hoverProvider),

    // 添加 link
    languages.registerDocumentLinkProvider(['wxml', 'wxml-pug'], linkProvider),

    // 高亮匹配的标签
    languages.registerDocumentHighlightProvider('wxml', documentHighlight),

    // 格式化
    languages.registerDocumentFormattingEditProvider('wxml', formatter),
    languages.registerDocumentRangeFormattingEditProvider('wxml', formatter),

    // 自动补全
    languages.registerCompletionItemProvider('wxml', autoCompletionWxml, '<', ' ', ':', '@', '.', '-', '"', '\''),
    languages.registerCompletionItemProvider('wxml-pug', autoCompletionPug, '\n', ' ', '(', ':', '@', '.', '-', '"', '\''),
    // trigger 需要是上两者的和
    languages.registerCompletionItemProvider('vue', autoCompletionVue, '<', ' ', ':', '@', '.', '-', '\n', '(', '"', '\'')
  )
}

export function deactivate() {
  configDeactivate()
}

function autoConfig() {
  let c = workspace.getConfiguration()
  const updates: Array<{key: string, map: any}> = [
    {
      key: 'files.associations',
      map: {
        '*.cjson': 'jsonc',
        '*.wxss': 'css',
        '*.wxs': 'javascript'
      }
    },
    {
      key: 'emmet.includeLanguages',
      map: {
        wxml: 'html'
      }
    }
  ]

  updates.forEach(({key, map}) => {
    let oldMap = c.get(key, {}) as any
    let appendMap: any = {}
    Object.keys(map).forEach(k => {
      if (!(oldMap.hasOwnProperty(k))) appendMap[k] = map[k]
    })
    if (Object.keys(appendMap).length) {
      c.update(key, {...oldMap, ...appendMap}, true)
    }
  })

  c.update('minapp-vscode.disableAutoConfig', true, true)
}
