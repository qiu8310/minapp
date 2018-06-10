/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

// import * as path from 'path'
import {Loader} from './Loader'
import {parse} from './js-loader'

const debug = require('debug')('minapp:cli:wxs-loader')


@Loader.decorate
export default class WxsLoader extends Loader {
  // @ts-ignore
  async run(content: string) {
    debug('FromFile: ' + this.fromFile)
    debug('ToFile: %o', this.toFile)

    this.lc.cacheable()

    return await parse(this, debug, content, '.wxs')
  }
}
