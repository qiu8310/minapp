import {formatTime} from '../../utils/util'

Page({
  data: {
    logs: []
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log: any) => {
        return formatTime(new Date(log))
      })
    })
  }
})
