/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as fs from 'fs-extra'
import * as path from 'path'
import * as webpack from 'webpack'

import {Env} from '../../config/env'

export class WriteFile {
  constructor(public env: Env) {}
  apply(compiler: webpack.Compiler) {
    compiler.hooks.afterEmit.tapPromise('WriteFile', async (compilation: webpack.compilation.Compilation) => {
      Object.keys(compilation.assets).forEach(key => {
        let file = path.join(this.env.distDir, key)
        fs.ensureDirSync(path.dirname(file))
        fs.writeFileSync(file, compilation.assets[key].source())
      })
    })
  }
}

