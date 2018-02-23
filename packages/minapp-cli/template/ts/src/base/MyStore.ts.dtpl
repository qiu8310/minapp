import {Store} from '@minapp/mobx'
import {observable} from 'mobx'

export class MyStore extends Store {
  // 这里的值会被注入到 page 的 data 中，所以不要有 undefined
  // 主要是小程序 setData() 中不能有 undefined，出现 undefined 不会对 data 中的原数据有影响，所以小程序开发工具会发出警告
  @observable userInfo: null | wx.getUserInfo.ParamPropSuccessParamPropUserInfo = null
}
