/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as webpack from 'webpack'
import * as path from 'path'

import {Env} from '../../config/env'

// less 会缓存 import 的文件，需要在每次编译完清除缓存
export class RemoveLessCache {
  less: any
  constructor(public env: Env) {
    try {
      this.less = require(path.join(this.env.modulesDir, 'less'))
    } catch (e) {}
  }
  apply(compiler: webpack.Compiler) {
    compiler.hooks.done.tap('RemoveLessCache', () => {
      try {
        if (this.less) {
          this.less.environment.fileManagers[0].contents = {};
        }
      } catch (e) {}
    })
  }
}
