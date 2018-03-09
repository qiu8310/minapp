/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {MobxPage} from '@minapp/mobx'
import {MyStore} from './MyStore'
import {MyApp} from './MyApp'

export class MyPage<D = any> extends MobxPage<D, MyStore, MyApp> {

}
