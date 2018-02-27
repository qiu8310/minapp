/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import * as _ from 'types-dot-template'

export default function(s: _.Source): _.IDtplConfig {
  return {
    templates: [
      {
        name: './file/modify-api.ts.dtpl',
        matches: () => s.basicData.dirPath.indexOf('/modify/api/') >= 0
      },
      {
        name: './file/modify-tpl.ts.dtpl',
        matches: () => s.basicData.dirPath.indexOf('/modify/tpl/') >= 0
      },
      {
        name: './file/new.dtpl',
        matches: () => s.basicData.fileExt === '.ts' || s.basicData.fileExt === '.js'
      }
    ],
    globalData: {}
  }
}
