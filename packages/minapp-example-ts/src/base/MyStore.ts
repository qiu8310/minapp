import m from '@minapp/mobx'
import {observable} from 'mobx'

export class MyStore extends m.Store {
  @observable userInfo?: wx.getUserInfo.ParamPropSuccessParamPropUserInfo
}
