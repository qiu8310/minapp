/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {Loader} from './Loader'
import * as pug from 'pug'

@Loader.decorate
export default class JsonLoader extends Loader {
  async run(content: string) {
    this.lc.cacheable()
    return pug.render(content, {pretty: true, filename: this.fromFile, basedir: this.srcDir})
  }
}
