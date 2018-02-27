/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {observable} from 'mobx'

export class Store {
  // @ts-ignore
  @observable private __MOBX__ = true // mobx autorun 中需要有取值的操作，才会触发监听
}
