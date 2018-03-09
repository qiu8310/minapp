/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {MobxStore} from '@minapp/mobx'
import {observable} from 'mobx'

export class MyStore extends MobxStore {
  /**
   * 注意：
   *  小程序 setData({key: value}) 中，如果 value 为 undefined，小程序会报错（主要 undefined 时，小程序不会更新原来存储在 key 中的值）
   *  而 start 中的值会被注入到 page 的 data 中，所以不要有 undefined
   *
   *  另外，函数相关的 ts 定义都存储在 wx.[同名函数] 的 namespace 中，如下面的 ParamPropSuccessParamPropUserInfo
   */
  @observable userInfo = null
}
