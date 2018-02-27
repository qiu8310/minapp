/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

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
