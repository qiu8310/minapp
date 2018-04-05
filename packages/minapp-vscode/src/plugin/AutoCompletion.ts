/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {
  CompletionItem, CompletionItemKind, SnippetString,
  MarkdownString, TextDocument, Position, Range
} from 'vscode'

import {
  TagItem, TagAttrItem, autocompleteSpecialTagAttr,
  autocompleteTagAttr, autocompleteTagAttrValue, autocompleteTagName
} from '@minapp/common'

import {Config} from './lib/config'
import {getCustomOptions, getTextAtPosition} from './lib/helper'
import {LanguageConfig} from './lib/language'
import {getTagAtPosition} from './lib/getTagAtPosition'

export default abstract class AutoCompletion {
  abstract id: string
  abstract getTagAtPosition: getTagAtPosition

  get isPug() {
    return this.id === 'pug'
  }
  get attrQuote() {
    return this.isPug ? '\'' : '"'
  }

  constructor(public config: Config) {}

  getCustomOptions(doc: TextDocument) {
    return getCustomOptions(this.config, doc)
  }

  renderTag(tag: TagItem, sortText: string) {
    let c = tag.component
    let item = new CompletionItem(c.name, CompletionItemKind.Module)

    let {attrQuote, isPug} = this
    let attrs = (c.attrs || [])
      .filter(a => a.required || a.subAttrs)
      .map((a, i) => (isPug ? '' : ' ') + `${a.name}=${attrQuote}${this.setDefault(i + 1, a.defaultValue)}${attrQuote}`)

    let len = attrs.length + 1
    if (isPug) {
      item.insertText = new SnippetString(`${c.name}(${attrs.join(' ')}\${${len}})\${0}`)
    } else {
      item.insertText = new SnippetString(`${c.name}${attrs.join('')}\${${len}}>\${0}</${c.name}>`)
    }
    item.documentation = new MarkdownString(tag.markdown)
    item.sortText = sortText
    return item
  }

  renderTagAttr(tagAttr: TagAttrItem, sortText: string, kind?: CompletionItemKind) {
    let a = tagAttr.attr
    let item = new CompletionItem(a.name, kind === undefined ? CompletionItemKind.Field : kind)
    let defaultValue = a.defaultValue
    if (!this.isDefaultValueValid(defaultValue)) {
      defaultValue = a.enum && a.enum[0].value
    }

    let {attrQuote, isPug} = this

    if (a.boolean) {
      item.insertText = new SnippetString(isPug && defaultValue === 'false' ? `${a.name}=false` : a.name)
    } else {
      let value = a.addBrace
        ? '{{\${1}}}'
        : this.setDefault(1, defaultValue)
      item.insertText = new SnippetString(`${a.name}=${attrQuote}${value}${attrQuote}$0`)
    }

    item.documentation = new MarkdownString(tagAttr.markdown)
    item.sortText = sortText
    return item
  }

  private setDefault(index: number, defaultValue: any) {
    if (!this.isDefaultValueValid(defaultValue)) return '${' + index + '}'
    if (typeof defaultValue === 'boolean' || defaultValue === 'true' || defaultValue === 'false') {
      return `{{\${${index}|${defaultValue}|}}}`
    } else {
      return `\${${index}|${defaultValue.replace(/['"]/g, '')}|}`
    }
  }

  private isDefaultValueValid(defaultValue: any) {
    return defaultValue !== undefined && defaultValue !== ''
  }

  /**
   * 创建组件名称的自动补全
   */
  async createComponentSnippetItems(lc: LanguageConfig, doc: TextDocument, pos: Position, prefix?: string) {
    let res = await autocompleteTagName(lc, this.getCustomOptions(doc))
    let filter = (t: TagItem) => !prefix || t.component.name.startsWith(prefix)
    return [
      ...res.customs.filter(filter).map(t => this.renderTag(t, 'a')), // 自定义的组件放在前面
      ...res.natives.filter(filter).map(t => this.renderTag(t, 'b'))
    ]
  }

  /**
   * 创建组件属性的自动补全
   */
  async createComponentAttributeSnippetItems(lc: LanguageConfig, doc: TextDocument, pos: Position) {
    let tag = this.getTagAtPosition(doc, pos)
    if (!tag) return []
    if (tag.isOnAttrValue && tag.attrName) {
      let attrValue = tag.attrs[tag.attrName]
      if (tag.attrName === 'class') {
        // TODO: 样式自动补全
      } else if (typeof attrValue === 'string' && attrValue.trim() === '') {
        let values = await autocompleteTagAttrValue(tag.name, tag.attrName, lc, this.getCustomOptions(doc))
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
      let res = await autocompleteTagAttr(tag.name, tag.attrs, lc, this.getCustomOptions(doc))
      let triggers: CompletionItem[] = []

      let {natives, basics} = res

      triggers = [...Object.keys(lc.custom), ...lc.event.prefixes]
        .filter(k => k.length > 1)
        .map(k => {
          let str = k.substr(0, k.length - 1)
          let trigger = k[k.length - 1]
          let item = new CompletionItem(str, CompletionItemKind.Constant)
          item.sortText = 'z'
          item.documentation = new MarkdownString(`输入此字段再输入 "**${trigger}**" 字符可以再次触发自动补全`)
          return item
        })

      return [
        ...natives.map(a => this.renderTagAttr(a, 'a')),
        ...basics.map(a => this.renderTagAttr(a, 'b')), // 基本属性放最后
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
  async createSpecialAttributeSnippetItems(lc: LanguageConfig, doc: TextDocument, pos: Position) {
    let prefix = getTextAtPosition(doc, pos, /[:@\w\d\.-]/) as string
    if (!prefix) return []

    let tag = this.getTagAtPosition(doc, pos)
    if (!tag) return []
    let isEventPrefix = lc.event.prefixes.indexOf(prefix) >= 0

    // 非 Event，也非其它自定义的属性
    if (!isEventPrefix && !lc.custom.hasOwnProperty(prefix)) {
      // modifiers
      let modifiers: string[] = []
      if (prefix[prefix.length - 1] === '.') {
        if (lc.event.prefixes.some(p => prefix.startsWith(p))) {
          modifiers = lc.event.modifiers
        } else {
          let customPrefix = Object.keys(lc.custom).find(p => prefix.startsWith(p))
          if (customPrefix) modifiers = lc.custom[customPrefix].modifiers
        }
      }

      return modifiers.map(m => new CompletionItem(m, CompletionItemKind.Constant))
    }

    let res = await autocompleteSpecialTagAttr(prefix, tag.name, tag.attrs, lc, this.getCustomOptions(doc))
    let kind = isEventPrefix ? CompletionItemKind.Event : CompletionItemKind.Field

    return [
      ...res.customs.map(c => this.renderTagAttr(c, 'a', kind)),
      ...res.natives.map(c => this.renderTagAttr(c, 'b', kind))
    ]
  }
}
