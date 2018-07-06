/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {
  CompletionItem, CompletionItemKind, SnippetString,
  MarkdownString, TextDocument, Position, Range, workspace
} from 'vscode'

import {
  TagItem, TagAttrItem, autocompleteSpecialTagAttr,
  autocompleteTagAttr, autocompleteTagAttrValue, autocompleteTagName
} from '@minapp/common'

import {EOL} from 'os'

import {Config} from './lib/config'
import {getCustomOptions, getTextAtPosition} from './lib/helper'
import {LanguageConfig} from './lib/language'
import {getTagAtPosition} from './lib/getTagAtPosition'
import * as s from './res/snippets'

export default abstract class AutoCompletion {
  abstract id: 'wxml' | 'wxml-pug'
  abstract getTagAtPosition: getTagAtPosition

  get isPug() {
    return this.id === 'wxml-pug'
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
    let allAttrs = c.attrs || []
    let attrs = allAttrs
      .filter(a => a.required || a.subAttrs)
      .map((a, i) => (isPug ? '' : ' ') + `${a.name}=${attrQuote}${this.setDefault(i + 1, a.defaultValue)}${attrQuote}`)

    let extraSpace = ''
    // 如果自动补全中没有属性，并且此组件有额外属性，则触发自动属性补全
    if (!attrs.length && allAttrs.length) {
      item.command = autoSuggestCommand()
      extraSpace = ' '
    }

    let len = attrs.length + 1
    let snippet: string
    if (isPug) {
      snippet = `${c.name}(${attrs.join(' ')}\${${len}})\${0}`
    } else {
      if (this.config.selfCloseTags.indexOf(c.name) >= 0) {
        snippet = `${c.name}${attrs.join('')}${extraSpace}\${${len}} />\${0}`
      } else {
        snippet = `${c.name}${attrs.join('')}${extraSpace}\${${len}}>\${0}</${c.name}>`
      }
    }
    item.insertText = new SnippetString(snippet)
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

      // 是否有可选值，如果有可选值则触发命令的自动补全
      let values = a.enum ? a.enum : a.subAttrs ? a.subAttrs.map(sa => ({value: sa.equal})) : []
      if (values.length) {
        value = '\${1}'
        item.command = autoSuggestCommand()
      }

      item.insertText = new SnippetString(`${a.name}=${attrQuote}${value}${attrQuote}$0`)
    }

    item.documentation = new MarkdownString(tagAttr.markdown)
    item.sortText = sortText
    return item
  }

  renderSnippet(doc: TextDocument, name: string, snippet: s.Snippet, sortText: string) {
    let item = new CompletionItem(name + ' snippet', CompletionItemKind.Snippet)

    let eol = workspace.getConfiguration('files', doc.uri).get('eol', EOL)
    let body = Array.isArray(snippet.body) ? snippet.body.join(eol) : snippet.body
    if (!this.isPug && body[0] === '<') body = body.substr(1) // 去除触发符号
    item.insertText = new SnippetString(body)
    item.documentation = new MarkdownString(snippet.markdown || snippet.description)
    item.sortText = sortText
    return item
  }

  private setDefault(index: number, defaultValue: any) {
    if (!this.isDefaultValueValid(defaultValue)) return '${' + index + '}'
    if (typeof defaultValue === 'boolean' || defaultValue === 'true' || defaultValue === 'false') {
      return `{{\${${index}|true,false|}}}`
    } else {
      return `\${${index}:${defaultValue.replace(/['"]/g, '')}}`
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
    let filter = (key: string) => key && (!prefix || prefix.split('').every(c => key.includes(c)))
    let fileterComponent = (t: TagItem) => filter(t.component.name)

    let items = [
      ...res.customs.filter(fileterComponent).map(t => this.renderTag(t, 'a')), // 自定义的组件放在前面
      ...res.natives.filter(fileterComponent).map(t => this.renderTag(t, 'c'))
    ]

    // 添加 Snippet
    let userSnippets = this.config.snippets
    let allSnippets: s.Snippets = (this.isPug ? {...s.PugSnippets, ...userSnippets.pug} : {...s.WxmlSnippets, ...userSnippets.wxml})
    items.push(...Object.keys(allSnippets)
      .filter(k => filter(k))
      .map(k => {
        let snippet = allSnippets[k]
        if (!snippet.description) {
          let ck = k.split(' ')[0] // 取出名称中的第一段即可
          let found = res.natives.find(it => it.component.name === (ck || k))
          if (found) snippet.markdown = found.markdown
        }
        return this.renderSnippet(doc, k, allSnippets[k], 'b')
      })
    )

    if (prefix) {
      items.forEach(it => {
        it.range = new Range(new Position(pos.line, pos.character - prefix.length), pos)
      })
    }

    return items
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
      let noBasics = lc.noBasicAttrsComponents || []

      if (noBasics.indexOf(tag.name) < 0) {
        triggers = [...Object.keys(lc.custom), ...lc.event.prefixes]
          .filter(k => k.length > 1)
          .map(k => {
            // let str = k.substr(0, k.length - 1)
            // let trigger = k[k.length - 1]
            // let item = new CompletionItem(str, CompletionItemKind.Constant)
            let item = new CompletionItem(k, CompletionItemKind.Constant)
            item.sortText = 'z'
            item.command = autoSuggestCommand()
            // item.documentation = new MarkdownString(`输入此字段再输入 "**${trigger}**" 字符可以再次触发自动补全`)
            return item
          })
      }

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

function autoSuggestCommand() {
  return {
    command: 'editor.action.triggerSuggest',
    title: 'triggerSuggest'
  }
}
