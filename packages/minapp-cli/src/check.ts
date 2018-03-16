/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {error} from 'mora-scripts/libs/sys/'

import * as findup from 'mora-scripts/libs/fs/findup'
import * as DotProp from 'mora-scripts/libs/lang/DotProp'

import {code} from './helper'

const PKGS = ['@minapp/core', '@minapp/mobx']

export function check() {
  let locakPkg: DotProp
  let cliVersion = require('../package.json').version
  let cliMajorVersion = getMajorVersion(cliVersion)

  try {
    locakPkg = new DotProp(require(findup.pkg()))
  } catch (e) {
    locakPkg = new DotProp({})
  }
  let dependencies = {...(locakPkg.get('devDependencies') || {}), ...(locakPkg.get('dependencies') || {})}
  let mismatch = false
  let keys = Object.keys(dependencies).filter(k => PKGS.indexOf(k) >= 0)
  let majors = keys.map(k => getMajorVersion(dependencies[k]))

  // 确保本地依赖的主版本一致
  if (majors.length >= 1 && majors.slice(1).some(m => m !== majors[0])) {
    error(`Local packages ${keys.map(k => k + '@' + dependencies[k]).join(', ')} major version not match`)
    error(`Please re-install they, and make sure they are equal`)
    return false
  }

  // 确保本地依赖和全局的 cli 的主版本一致
  keys.forEach((k, i) => {
    let localMajorVersion = majors[i]
    if (localMajorVersion !== cliMajorVersion) {
      mismatch = true
      if (localMajorVersion < cliMajorVersion) {
        error(`Local package ${k} version is ${dependencies[k]}, which is lower then global @minapp/cli@${cliVersion}`)
        error(`Please update local package ${k}, you can upgrade it by running ${code(`npm install ${k}@^${cliMajorVersion}.0.0`)}`)
        error('')
      } else {
        error(`Global package @minapp/cli@${cliVersion} is lower then local package ${k}@${dependencies[k]}`)
        error(`Please update globak package @minapp/cli, you can upgrade it by running ${code(`npm install -g @minapp/cli@^${localMajorVersion}.0.0`)}`)
        error('')
      }
    }
  })

  return !mismatch
}

function getMajorVersion(version: string) {
  return parseInt(version.split('.')[0].replace(/^\D+/, ''), 10)
}
