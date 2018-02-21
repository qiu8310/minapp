import m from 'minapp'
import {formatTime} from 'utils/util'

@m.pagify()
export default class extends m.Page {
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

