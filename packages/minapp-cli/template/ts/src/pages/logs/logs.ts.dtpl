import * as formatDate from 'mora-scripts/libs/lang/formatDate'
import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage<{logs: string[]}> {
  data = {
    logs: ['test']
  }
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log: string) => {
        return formatDate(new Date(log), 'yyyy-mm-dd HH:ii:ss')
      })
    })
  }
}
