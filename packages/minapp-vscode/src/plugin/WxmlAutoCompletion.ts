/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {
  Position, CancellationToken, CompletionItemProvider,
  TextDocument, CompletionItem, CompletionContext,
  CompletionItemKind, SnippetString, MarkdownString
} from 'vscode'

import {autocompleteTagName, autocompleteTagAttr, TagItem, TagAttrItem, autocompleteSpecialTagAttr} from '@minapp/common'
import {getTagAtPosition} from './getTagAtPosition'
import {Config} from './config'

const TRIGGERS = ['wx', 'bind', 'catch'].map(k => {
  let item = new CompletionItem(k, CompletionItemKind.Field)
  item.sortText = 'z'
  item.documentation = new MarkdownString('输入此字段再输入 "**:**" 字符可以再次触发自动补全')
  return item
})

export default class implements CompletionItemProvider {
  constructor(public config: Config) {}

  provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): Promise<CompletionItem[]> {
    switch (context.triggerCharacter) {
      case '<': return this.createComponentSnippetItems(document, position)
      case ' ': return this.createComponentAttributeSnippetItems(document, position)
      case ':': return this.createSpecialAttributeSnippetItems(document, position)
      default: return [] as any
    }
  }

  getCustomOptions(doc: TextDocument) {
    return this.config.disableCustomComponentAutocomponent
      ? undefined
      : {filename: doc.fileName, resolves: this.config.getResolveRoots(doc.uri)}
  }

  /**
   * 创建组件名称的自动补全
   */
  async createComponentSnippetItems(doc: TextDocument, pos: Position) {
    let res = await autocompleteTagName(this.getCustomOptions(doc))
    return [
      ...res.customs.map(t => renderTag(t, 'a')), // 自定义的组件放在前面
      ...res.natives.map(t => renderTag(t, 'b'))
    ]
  }

  /**
   * 创建组件属性的自动补全
   */
  async createComponentAttributeSnippetItems(doc: TextDocument, pos: Position) {
    let tag = getTagAtPosition(doc, pos)
    if (!tag) return []
    if (tag.isOnAttrValue) {
      if (tag.posWord === 'class') {
        // TODO: 样式自动补全
      }
      return []
    } else {
      let res = await autocompleteTagAttr(tag.name, tag.attrs, this.getCustomOptions(doc))
      return [
        ...res.natives.map(a => renderTagAttr(a, 'a')),
        ...res.basics.map(a => renderTagAttr(a, 'b')), // 基本属性放最后
        ...TRIGGERS
      ]
    }
  }

  /**
   * 生成 wx:, bind:, catch: 的自动补全
   */
  async createSpecialAttributeSnippetItems(doc: TextDocument, pos: Position) {
    let range = doc.getWordRangeAtPosition(pos, /\b(wx|bind|catch):/)
    if (range) {
      let text = doc.getText(range)
      let tag = getTagAtPosition(doc, pos)
      if (!tag) return []

      text = text.substr(0, text.length - 1) // 去掉后面的 ":"
      let res = await autocompleteSpecialTagAttr(text as 'wx', tag.name, tag.attrs, this.getCustomOptions(doc))

      return [
        ...res.customs.map(c => renderTagAttr(c, 'a')),
        ...res.natives.map(c => renderTagAttr(c, 'b'))
      ]
    }
    return []
  }
}

function setDefault(index: number, defaultValue: any) {
  if (!defaultValue) return '${' + index + '}'
  if (/^\d+$/.test(defaultValue) || defaultValue === 'true' || defaultValue === 'false') {
    return `{{\${${index}|${defaultValue}|}}}`
  } else {
    return `\${${index}|${defaultValue}|}`
  }
}

function renderTag(tag: TagItem, sortText: string) {
  let c = tag.component
  let item = new CompletionItem(c.name, CompletionItemKind.Module)

  let attrs = (c.attrs || [])
    .filter(a => a.required || a.subAttrs)
    .map((a, i) => ` ${a.name}="${setDefault(i + 1, a.defaultValue)}"`)
  let len = attrs.length + 1
  item.insertText = new SnippetString(`${c.name}${attrs.join('')}\${${len}}>\${0}</${c.name}>`)
  item.documentation = new MarkdownString(tag.markdown)
  item.sortText = sortText
  return item
}

function renderTagAttr(tagAttr: TagAttrItem, sortText: string) {
  let a = tagAttr.attr
  let item = new CompletionItem(a.name, CompletionItemKind.Field)
  let value = a.addBrace
    ? '{{\${1}}}'
    : setDefault(1, a.defaultValue || a.enum && a.enum[0].value)
  item.insertText = new SnippetString(`${a.name}="${value}"$0`)
  item.documentation = new MarkdownString(tagAttr.markdown)
  item.sortText = sortText
  return item
}
