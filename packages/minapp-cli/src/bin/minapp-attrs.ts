/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as fs from 'fs-extra'
import {sys, cli} from './base'
import {getComponentJson} from '../base/helper'
import {parseAttrs} from '@minapp/common/dist/parseAttrs'
import * as DotProp from 'mora-scripts/libs/lang/DotProp'

export const attrsOptions: cli.Options = {

}

/**
 * @param res 命令行的参数（由 cli 脚本生成）
 */
export function attrsCommand(res: cli.Response) {
  let minapp = require('../config/env').env.minapp
  if (!minapp.component) return sys.error('Not component develop environment')

  let {jsonFile, jsFile, jsContent, json} = getComponentJson(minapp.component)
  if (!jsonFile || !json || !jsFile || !jsContent) return sys.error('Can not found any component files')
  let attrs = parseAttrs(jsContent)
  if (!attrs.length) return sys.warn('Not found any component attrs in ' + jsFile)

  DotProp.set(json, 'minapp.component.attrs', attrs)
  console.log(`write component attrs: `)
  console.log(JSON.stringify(attrs, null, 2))
  fs.writeFileSync(jsonFile, JSON.stringify(json, null, 2))
}
