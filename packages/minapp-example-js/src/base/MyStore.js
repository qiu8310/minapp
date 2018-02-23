import {Store} from '@minapp/mobx'
import {observable} from 'mobx'

export class MyStore extends Store {
  @observable userInfo = null
}
