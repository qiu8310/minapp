import m from '@minapp/mobx'
import {MyStore} from './MyStore'
import {MyApp} from './MyApp'

export class MyPage<D = any> extends m.Page<D, MyStore, MyApp> {

}
