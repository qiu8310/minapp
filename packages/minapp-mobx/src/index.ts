import wxp from '@minapp/core'
import {BasePage, pagify} from './class/BasePage'
import {BaseApp, appify} from './class/BaseApp'
import {Store} from './class/Store'

export default {
  wxp,
  appify,
  App: BaseApp,
  pagify,
  Page: BasePage,
  Store
}
