import {
  Position, CancellationToken, CompletionItemProvider,
  TextDocument, CompletionItem, CompletionContext,
  CompletionItemKind, SnippetString, MarkdownString
} from 'vscode'

import {components, getComponentMarkdown, getComponentAttrMarkdown} from '../dev/components'
import {getTagAtPosition, Tag} from './getTagAtPosition'
import { ComponentAttr, Component } from '../dev/Component'

import {BASE_ATTRS, EVENT_ATTRS, CTRL_ATTRS} from '@minapp/common'

export default class implements CompletionItemProvider {
  provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): CompletionItem[] {
    switch (context.triggerCharacter) {
      case '<': return this.createComponentSnippetItems()
      case ' ': return this.createComponentAttributeSnippetItems(document, position)
      case ':': return this.createSpecialAttributeSnippetItems(document, position)
      default: return []
    }
  }

  /**
   * 创建组件名称的自动补全
   */
  createComponentSnippetItems(prefix = ''): CompletionItem[] {
    return components
      .filter(c => !prefix || c.name.startsWith(prefix))
      .map(c => {
        let item = new CompletionItem(c.name, CompletionItemKind.Module)

        let attrs = (c.attrs || [])
          .filter(a => a.required || a.subAttrs)
          .map((a, i) => ` ${a.name}="${setDefault(i + 1, a.defaultValue)}"`)
        let len = attrs.length + 1
        item.insertText = new SnippetString(`<${c.name}${attrs.join('')}\${${len}}>\${0}</${c.name}>`.substr(prefix.length + 1))
        item.documentation = new MarkdownString(getComponentMarkdown(c))
        return item
      })
  }

  /**
   * 创建组件属性的自动补全
   */
  createComponentAttributeSnippetItems(doc: TextDocument, pos: Position): CompletionItem[] {
    let tag = getTagAtPosition(doc, pos)
    if (!tag) return []
    if (tag.isOnAttrValue) {
      if (tag.posWord === 'class') {
        // TODO: 样式自动补全
      }
      return []
    } else {
      return [...BASE_ATTRS, ...this.getAvailableAttrs(tag)]
        .map(r => getAttrCompletionItem(r as any))
    }
  }

  /**
   * 生成 wx:, bind:, catch: 的自动补全
   */
  createSpecialAttributeSnippetItems(doc: TextDocument, pos: Position): CompletionItem[] {
    let range = doc.getWordRangeAtPosition(pos, /\b(wx|bind|catch):/)
    if (range) {
      let text = doc.getText(range)
      if (text === 'wx:') return CTRL_ATTRS.map(a => getAttrCompletionItem(a as any))
      else return EVENT_ATTRS.map(a => getAttrCompletionItem(a as any))
    }
    return []
  }

  private getAvailableAttrs(tag: Tag): ComponentAttr[] {
    let comp = findComponentByName(tag.name) as Component
    if (!comp) return []
    let results = comp.attrs.filter(a => !tag.attrs[a.name]); // 先取出没有写的属性

    // 如果没写的属性中有 subAttrs，则要把它们全取出来
    [...results].forEach(a => {
      if (a.subAttrs) {
        a.subAttrs.forEach(s => {
          s.attrs.forEach(suba => {
            if (results.every(_ => _.name !== suba.name)) results.push(suba) // 去重
          })
        })
      }
    })

    // 写了的属性需要找出 subAttrs
    Object.keys(tag.attrs).forEach(key => {
      comp.attrs.forEach(a => {
        if (a.subAttrs && a.name === key) {
          let sub = a.subAttrs.find(s => s.equal === tag.attrs[key])
          if (sub) results.push(...sub.attrs)
        }
      })
    })

    return results
  }
}

function getAttrCompletionItem(a: ComponentAttr & {addBrace: boolean}) {
  let item = new CompletionItem(a.name, CompletionItemKind.Field)
  let value = a.addBrace
    ? '{{\${1}}}'
    : setDefault(1, a.defaultValue || a.enum && a.enum[0].value)
  item.insertText = new SnippetString(`${a.name}="${value}"$0`)
  item.documentation = new MarkdownString(getComponentAttrMarkdown(a))
  return item
}

function setDefault(index: number, defaultValue: any) {
  if (!defaultValue) return '${' + index + '}'
  if (/^\d+$/.test(defaultValue) || defaultValue === 'true' || defaultValue === 'false') {
    return `{{\${${index}|${defaultValue}|}}}`
  } else {
    return `\${${index}|${defaultValue}|}`
  }
}

function findComponentByName(name: string) {
  return components.find(c => c.name === name)
}
