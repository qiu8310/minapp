import m from '@minapp/mobx'
import {observable} from 'mobx'

export class MyStore extends m.Store {
  @observable userInfo?: {
    nickName: string
    avatarUrl: string
    gender: string
    city: string
    province: string
    country: string
    language: string
  }
}
