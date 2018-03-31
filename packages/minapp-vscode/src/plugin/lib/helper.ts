/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/
import { TextDocument, Position } from 'vscode'
import { Config } from './config'
import {Languages, LanguageConfig} from './language'

const vueTemplateStartTag = /^\s*<template\b[^>]*(?:lang|minapp)=('wxml'|"wxml"|'wepy'|"wepy"|'mpvue'|"mpvue")[^>]*>/
const vueTemplateEndTag = /<\/template>\s*$/

export function getLanguage(doc: TextDocument, pos: Position): undefined | LanguageConfig {
  let language: undefined | keyof Languages
  if (doc.languageId === 'wxml') {
    language = 'wxml'
  } else {
    doc.getText().split(/\r?\n/).some((text, i) => {
      if (!language && vueTemplateStartTag.test(text)) language = RegExp.$1.replace(/['"]/g, '')
      if (i === pos.line) return true
      if (language && vueTemplateEndTag.test(text)) language = undefined
      return false
    })
  }

  return language && Languages[language] ? Languages[language] : undefined
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
