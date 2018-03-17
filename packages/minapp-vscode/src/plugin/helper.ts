/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/
import { TextDocument, Position } from 'vscode'
import { Config } from './config'

const vueTemplateStartTag = /^\s*<template\b[^>]*lang=('wxml'|"wxml")[^>]*>/
const vueTemplateEndTag = /<\/template>\s*$/

export function inTemplate(doc: TextDocument, pos: Position) {
  if (doc.languageId === 'wxml') return true
  let between = false
  return doc.getText().split(/\r?\n/).some((text, i) => {
    let inTpl = false
    if (!between && vueTemplateStartTag.test(text)) between = true
    inTpl = i === pos.line && between
    if (between && vueTemplateEndTag.test(text)) between = false
    return inTpl
  })
}

export function getCustomOptions(config: Config, document: TextDocument) {
  return config.disableCustomComponentAutocomponent || document.languageId !== 'wxml'
    ? undefined
    : {filename: document.fileName, resolves: config.getResolveRoots(document)}
}
