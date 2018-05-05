/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {Loader} from './Loader'
import {replace, STYLE_RESOURCE_REGEXP, CSS_IMPORT_REGEXP} from '../util'
const debug = require('debug')('minapp:cli:wxss-loader')

@Loader.decorate
export default class WxssLoader extends Loader {
  async run(content: string) {
    debug('FromFile: ' + this.fromFile)
    debug('ToFile: %o', this.toFile)

    this.lc.cacheable()

    let emitContent = await replace(content, STYLE_RESOURCE_REGEXP, async (mat) => {
      let [raw, request] = mat

      if (!this.shouleMakeResolveRequest(request)) return raw

      let absFile = await this.resolve(request)
      if (this.shouleMakeRequireFile(absFile)) {
        let url = await this.loadStaticFile(absFile, request)

        debug(`replace ${request} => ${url}`)
        return raw.replace(request, url)
      }

      return raw
    })

    let requires: string[] = []
    emitContent = await replace(emitContent, CSS_IMPORT_REGEXP, async (mat) => {
      let [raw, request] = mat
      let absFile = await this.resolve(request)
      if (this.shouleMakeRequireFile(absFile)) {
        this.addDependency(absFile)
        requires.push(absFile)
        return `@import "${this.getExtractRequirePath(absFile, '.wxss')}"`
      }
      return raw
    }, 0)

    if (emitContent.trim()) {
      if (this.minimize) {
        const CleanCSS = require('clean-css')
        let res = new CleanCSS().minify(emitContent)
        if (res.errors.length) this.emitError(new Error(JSON.stringify(res.errors)))
        if (res.warnings.length) this.emitWarning(new Error(JSON.stringify(res.warnings)))
        emitContent = res.styles
      }
      this.extract('.wxss', emitContent)
    }
    return this.toRequire(requires)
  }

}
