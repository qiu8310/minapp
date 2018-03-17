/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {
  Position, CancellationToken, CompletionItemProvider,
  TextDocument, CompletionItem, CompletionContext,
  CompletionItemKind, SnippetString, MarkdownString, Range
} from 'vscode'

import {
  TagItem, TagAttrItem,
  autocompleteTagAttrValue, autocompleteTagAttr,
  autocompleteTagName, autocompleteSpecialTagAttr, ComponentAttr
} from '@minapp/common'

import {getTagAtPosition} from './getTagAtPosition'
import {inTemplate, getCustomOptions} from './helper'
import {Config} from './config'

const TRIGGERS = ['wx', 'bind', 'catch'].map(k => {
  let item = new CompletionItem(k, CompletionItemKind.Field)
  item.sortText = 'z'
  item.documentation = new MarkdownString('输入此字段再输入 "**:**" 字符可以再次触发自动补全')
  return item
})

const VUE_BIND_OPERATORS = ['sync']
const VUE_EVENT_OPERATORS = ['default', 'user', 'stop']

export default class implements CompletionItemProvider {
  constructor(public config: Config) {}

  provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): Promise<CompletionItem[]> {
    if (!inTemplate(document, position)) return [] as any

    switch (context.triggerCharacter) {
      case '<': return this.createComponentSnippetItems(document, position)
      case ' ': return this.createComponentAttributeSnippetItems(document, position)
      case ':':
      case '@':
      case '.':
        return this.createSpecialAttributeSnippetItems(document, position)
      default: return [] as any
    }
  }

  getCustomOptions(doc: TextDocument) {
    return getCustomOptions(this.config, doc)
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
  async createComponentAttributeSnippetItems(doc: TextDocument, pos: Position, prefixChar?: string) {
    let tag = getTagAtPosition(doc, pos)
    if (!tag) return []
    if (tag.isOnAttrValue && tag.attrName) {
      let attrValue = tag.attrs[tag.attrName]
      if (tag.attrName === 'class') {
        // TODO: 样式自动补全
      } else if (typeof attrValue === 'string' && attrValue.trim() === '') {
        let values = await autocompleteTagAttrValue(tag.name, tag.attrName, this.getCustomOptions(doc))
        if (!values.length) return []
        let range = doc.getWordRangeAtPosition(pos, /['"]\s*['"]/)
        if (range) {
          range = new Range(
            new Position(range.start.line, range.start.character + 1),
            new Position(range.end.line, range.end.character - 1)
          )
        }
        return values.map(v => {
          let it = new CompletionItem(v.value, CompletionItemKind.Value)
          it.documentation = new MarkdownString(v.markdown)
          it.range = range
          return it
        })
      }
      return []
    } else {
      let res = await autocompleteTagAttr(tag.name, tag.attrs, this.getCustomOptions(doc))
      let triggers: CompletionItem[] = []

      let {natives, basics} = res

      if (doc.languageId === 'wxml') {
        triggers = TRIGGERS
      } else {
        triggers = prefixChar ? [] : TRIGGERS.slice(0, 1)
        natives = natives.filter(n => !isEventAttr(n.attr))
      }

      return [
        ...natives.map(a => renderTagAttr(a, 'a')),
        ...basics.map(a => renderTagAttr(a, 'b')), // 基本属性放最后
        ...triggers
      ]
    }
  }

  /**
   * wxml:
   *    wx:
   *    bind:
   *    catch:
   *
   * vue:
   *    :
   *    @
   *    :xxx.sync
   *    @xxx.default, @xxx.user, @xxx.stop
   */
  async createSpecialAttributeSnippetItems(doc: TextDocument, pos: Position) {
    let range = doc.languageId === 'wxml'
      ? doc.getWordRangeAtPosition(pos, /\b(wx|bind|catch):/)
      : (doc.getWordRangeAtPosition(pos, /\s[:@]([\w\.]+\.)?/) || doc.getWordRangeAtPosition(pos, /\bwx:/))

    if (range) {
      let text = doc.getText(range).trim()

      // text is ":" or "@"
      if (text === ':') return this.createComponentAttributeSnippetItems(doc, pos, text)
      let operators = text[0] === ':' ? VUE_BIND_OPERATORS : text[0] === '@' && text.length > 1 ? VUE_EVENT_OPERATORS : []
      if (operators.length) {
        return operators.map(o => new CompletionItem(o, CompletionItemKind.Constant))
      }

      let tag = getTagAtPosition(doc, pos)
      if (!tag) return []

      text = text === '@' ? 'bind' : text.replace(/:$/, '') // 去掉后面的 ":"
      let res = await autocompleteSpecialTagAttr(text as 'wx', tag.name, tag.attrs, this.getCustomOptions(doc))

      let kind = text === 'wx' ? CompletionItemKind.Field : CompletionItemKind.Event
      return [
        ...res.customs.map(c => renderTagAttr(c, 'a', kind)),
        ...res.natives.map(c => renderTagAttr(c, 'b', kind))
      ]
    }
    return []
  }
}

function setDefault(index: number, defaultValue: any) {
  if (!isDefaultValueValid(defaultValue)) return '${' + index + '}'
  if (typeof defaultValue === 'boolean' || defaultValue === 'true' || defaultValue === 'false') {
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

function renderTagAttr(tagAttr: TagAttrItem, sortText: string, kind?: CompletionItemKind) {
  let a = tagAttr.attr
  let item = new CompletionItem(a.name, kind === undefined ? CompletionItemKind.Field : kind)
  let defaultValue = a.defaultValue
  if (!isDefaultValueValid(defaultValue)) {
    defaultValue = a.enum && a.enum[0].value
  }

  let value = a.addBrace
    ? '{{\${1}}}'
    : setDefault(1, defaultValue)
  item.insertText = new SnippetString(`${a.name}="${value}"$0`)
  item.documentation = new MarkdownString(tagAttr.markdown)
  item.sortText = sortText
  return item
}

function isDefaultValueValid(defaultValue: any) {
  return defaultValue !== undefined && defaultValue !== ''
}

function isEventAttr(attr: ComponentAttr) {
  return attr.name.startsWith('bind') || attr.name.startsWith('catch')
}
