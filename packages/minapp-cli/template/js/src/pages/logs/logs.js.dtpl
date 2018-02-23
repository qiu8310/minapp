import {wxp, BasePage, pagify} from '@minapp/mobx'
import {formatTime} from 'utils/util'

@pagify()
export default class extends BasePage {
  data = {
    logs: []
  }
  onLoad() {
    let logs = wxp.getStorageSync('logs') || []
    console.log(logs)
    this.setData({
      logs: logs.map(log => formatTime(new Date(log)))
    })
  }
}

