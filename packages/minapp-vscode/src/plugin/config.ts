/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as vscode from 'vscode'
import * as path from 'path'

let listener = vscode.workspace.onDidChangeConfiguration(getConfig)

export interface Config {
  disableCustomComponentAutocomponent: boolean
  resolveRoots: string[]
  getResolveRoots: (uri: vscode.Uri) => string[]
}

export const config: Config = {
  disableCustomComponentAutocomponent: false,
  resolveRoots: [],
  getResolveRoots
}

function getResolveRoots(uri: vscode.Uri) {
  let root = vscode.workspace.getWorkspaceFolder(uri) as vscode.WorkspaceFolder
  return root ? config.resolveRoots.map(r => path.resolve(root.uri.fsPath, r)) : []
}

function getConfig() {
  const minapp = vscode.workspace.getConfiguration('minapp-vscode')
  config.disableCustomComponentAutocomponent = minapp.get('disableCustomComponentAutocomponent', false)
  config.resolveRoots = minapp.get('resolveRoots', ['src', 'node_modules'])
}

export function destroy() {
  listener.dispose()
}

getConfig()
