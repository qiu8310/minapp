/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

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

      let absFile = await this.resolve(request)
      if (this.shouldResolve(absFile)) {
        let url = await this.loadStaticFile(absFile, request)

        debug(`replace ${request} => ${url}`)
        return raw.replace(request, url)
      }

      return raw
    })

    if (emitContent.trim()) this.extract('.wxss', emitContent)

    return '' // css 都可以用此 loader 处理完，没什么可以让 webpack 效劳的了
  }
}
