/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as path from 'path'
import {Loader} from './Loader'
import {replace, STYLE_RESOURCE_REGEXP} from '../util'
const debug = require('debug')('minapp:webpack-utils:wxss-loader')

@Loader.decorate
export default class WxssLoader extends Loader {
  async run(content: string) {
    debug('FromFile: ' + this.fromFile)
    debug('ToFile: %o', this.toFile)

    let emitContent = await replace(content, STYLE_RESOURCE_REGEXP, async (mat) => {
      let [raw, request] = mat

      if (!this.shouleMakeRequire(request)) return raw

      let url = await this.loadStaticFile(request)

      if (this.minimize && !(/^(\w+?:)\/\//.test(url)) && this.mode !== 'component') {
        this.emitWarning(`你的样式文件 ${path.relative(this.srcDir, this.fromFile)} 使用了本地的静态资源！请在 minapp dev 模式下运行，或者在 minapp build 模式下指定 --publicPath`)
      }

      debug(`replace ${request} => ${url}`)
      return raw.replace(request, url)
    })

    if (emitContent.trim()) this.extract('.wxss', emitContent)

    return '' // css 都可以用此 loader 处理完，没什么可以让 webpack 效劳的了
  }
}
