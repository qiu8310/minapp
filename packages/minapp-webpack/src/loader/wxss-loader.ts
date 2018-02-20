// import * as loaderUtils from 'loader-utils'
import {Loader} from './Loader'
import {replace, STYLE_RESOURCE_REGEXP} from '../util'
import * as tracker from 'debug'
const debug = tracker('minapp:wxml-loader')

@Loader.decorate
export default class WxssLoader extends Loader {
  async run(content: string) {
    debug('FromFile: ' + this.fromFile)
    debug('ToFile: %o', this.toFile)

    this.extract('.wxss', await replace(content, STYLE_RESOURCE_REGEXP, async (mat) => {
      let [raw, request] = mat

      if (!this.shouleMakeRequire(request)) return raw

      let url = await this.loadStaticFile(request)
      debug(`reqplace ${request} => ${url}`)
      return raw.replace(request, url)
    }))

    return '' // css 都可以用此 loader 处理完，没什么可以让 webpack 效劳的了
  }
}
