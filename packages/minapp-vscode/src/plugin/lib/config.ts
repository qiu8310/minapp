/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as vscode from 'vscode'
import * as path from 'path'

let listener: vscode.Disposable

export interface Config {
  formatMaxLineCharacters: number,
  disableCustomComponentAutocomponent: boolean
  resolveRoots: string[]
  linkAttributeNames: string[]
  getResolveRoots: (doc: vscode.TextDocument) => string[]
}

export const config: Config = {
  formatMaxLineCharacters: 100,
  disableCustomComponentAutocomponent: false,
  resolveRoots: [],
  getResolveRoots,
  linkAttributeNames: [],
}

function getResolveRoots(doc: vscode.TextDocument) {
  let root = vscode.workspace.getWorkspaceFolder(doc.uri) as vscode.WorkspaceFolder
  return root ? config.resolveRoots.map(r => path.resolve(root.uri.fsPath, r)) : []
}

function getConfig() {
  const minapp = vscode.workspace.getConfiguration('minapp-vscode')
  config.disableCustomComponentAutocomponent = minapp.get('disableCustomComponentAutocomponent', false)
  config.resolveRoots = minapp.get('resolveRoots', ['src', 'node_modules'])
  config.linkAttributeNames = minapp.get('linkAttributeNames', ['src'])
  config.formatMaxLineCharacters = minapp.get('formatMaxLineCharacters', 100)
}

export function configActivate() {
  listener = vscode.workspace.onDidChangeConfiguration(getConfig)
  getConfig()
}

export function configDeactivate() {
  listener.dispose()
}
