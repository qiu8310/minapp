import {formatTime} from '../../utils/util'
import {page, P} from '../../utils/P'

@page()
export class Log extends P<{logs: string[]}> {
  data = {
    logs: ['test']
  }
  onLoad() {
    console.log('onLoad running', this.app)
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log: string) => {
        return formatTime(new Date(log))
      })
    })
  }
}
