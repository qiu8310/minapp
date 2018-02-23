import * as fs from 'fs-extra'
import * as path from 'path'
import {execSync} from 'child_process'

export function walkDirectory(dir: string, cb: (dir: string, name: string, file: string, stat: fs.Stats) => boolean | void | undefined) {
  fs.readdirSync(dir).forEach(name => {
    let file = path.join(dir, name)
    let stat = fs.statSync(file)

    if (false !== cb(dir, name, file, stat)) {
      if (stat.isDirectory()) {
        walkDirectory(file, cb)
      }
    }
  })
}

export function getGitUser() {
  let name = tryExecCmdSync('git config --get user.name', '').trim()
  let email = tryExecCmdSync('git config --get user.email', '').trim()
  if (email) email = `<${email}>`
  return `${name}${email}`
}

function tryExecCmdSync(cmd: string, fallback: string): string
function tryExecCmdSync(cmd: string, fallback?: string): undefined | string {
  try {
    return execSync(cmd).toString()
  } catch (e) {
    return fallback
  }
}
