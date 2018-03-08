/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as vscode from 'vscode'

let listener = vscode.workspace.onDidChangeConfiguration(getConfig)

export interface Config {
  disableCustomComponentAutocomponent: boolean
  resolveRoots: string[]
}

export const config: Config = {
  disableCustomComponentAutocomponent: false,
  resolveRoots: []
}

function getConfig() {
  const minapp = vscode.workspace.getConfiguration('minapp-vscode')
  config.disableCustomComponentAutocomponent = minapp.get('disableCustomComponentAutocomponent', false)
  config.resolveRoots = minapp.get('resolveRoots', ['src', 'node_modules'])
}

export function destroy() {
  listener.dispose()
}
