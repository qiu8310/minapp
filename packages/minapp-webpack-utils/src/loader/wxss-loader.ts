import * as path from 'path'
import {Loader} from './Loader'
import {replace, STYLE_RESOURCE_REGEXP} from '../util'
const debug = require('debug')('minapp:webpack-utils:wxss-loader')

@Loader.decorate
export default class WxssLoader extends Loader {
  async run(content: string) {
    debug('FromFile: ' + this.fromFile)
    debug('ToFile: %o', this.toFile)

    this.extract('.wxss', await replace(content, STYLE_RESOURCE_REGEXP, async (mat) => {
      let [raw, request] = mat

      if (!this.shouleMakeRequire(request)) return raw

      let url = await this.loadStaticFile(request)

      if (this.minimize && !(/^(\w+?:)\/\//.test(url))) {
        this.emitWarning(`你的样式文件 ${path.relative(this.srcDir, this.fromFile)} 使用了本地的静态资源！请在 minapp dev 模式下运行，或者在 minapp build 模式下指定 --publicPath`)
      }

      debug(`reqplace ${request} => ${url}`)
      return raw.replace(request, url)
    }))

    return '' // css 都可以用此 loader 处理完，没什么可以让 webpack 效劳的了
  }
}
