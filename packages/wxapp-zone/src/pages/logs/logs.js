import {formatTime} from '../../utils/util'

Page({
  data: {
    logs: []
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log) => {
        return formatTime(new Date(log))
      })
    })

    console.log({...this.data})
  }
})
