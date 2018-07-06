/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/
import { TextDocument, Position, Range } from 'vscode'
import { Config } from './config'
import {Languages, LanguageConfig} from './language'

// <template lang="wxml/pug/wxml-pug" minapp="native/wepy/mpvue"> ；默认 minapp="mpvue"
const vueTemplateMinappStartTag = /^\s*<template\b[^>]*(?:minapp)=['"](native|wepy|mpvue)['"][^>]*>/
const vueTemplateLangStartTag = /^\s*<template\b[^>]*(?:x?lang)=['"]([\w-]+)['"][^>]*>/
const vueTemplateEndTag = /<\/template>\s*$/

export function getLanguage(doc: TextDocument, pos: Position): undefined | LanguageConfig {
  let minapp: undefined | keyof Languages
  if (doc.languageId === 'wxml' || doc.languageId === 'wxml-pug') {
    minapp = 'native'
  } else {
    doc.getText().split(/\r?\n/).some((text, i) => {
      if (!minapp && vueTemplateMinappStartTag.test(text)) minapp = RegExp.$1.replace(/['"]/g, '')
      if (i === pos.line) return true
      if (minapp && vueTemplateEndTag.test(text)) minapp = undefined
      return false
    })
    if (!minapp) minapp = 'mpvue'
  }

  return minapp && Languages[minapp] ? Languages[minapp] : undefined
}

export function getLangForVue(doc: TextDocument, pos: Position) {
  let lang: string | undefined
  doc.getText().split(/\r?\n/).some((text, i) => {
    if (!lang && vueTemplateLangStartTag.test(text)) lang = RegExp.$1.replace(/['"]/g, '')
    if (i === pos.line) return true
    if (lang && vueTemplateEndTag.test(text)) lang = undefined
    return false
  })
  return lang
}

export function getCustomOptions(config: Config, document: TextDocument) {
  return config.disableCustomComponentAutocomponent || document.languageId !== 'wxml'
    ? undefined
    : {filename: document.fileName, resolves: config.getResolveRoots(document)}
}

export function getTextAtPosition(doc: TextDocument, pos: Position, charRegExp: RegExp) {
  let line = doc.lineAt(pos.line).text
  let mid = pos.character - 1
  if (!(charRegExp.test(line[mid]))) return
  let str = line[mid]

  let i = mid
  while (++i < line.length) {
    if (charRegExp.test(line[i])) str += line[i]
    else break
  }

  i = mid
  while (--i >= 0) {
    if (charRegExp.test(line[i])) str = line[i] + str
    else break
  }
  return str
}

export function getLastChar(doc: TextDocument, pos: Position) {
  return doc.getText(new Range(new Position(pos.line, pos.character - 1), pos))
}
