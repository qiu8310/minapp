import * as _ from 'types-dot-template'

export default function(s: _.Source): _.IDtplConfig {
  return {
    templates: [
      {
        name: './component',
        matches: () => s.isDirectory && /^components?$/.test(s.basicData.dirName)
      },
      {
        name: './page',
        matches: () => s.isDirectory && /^pages?$/.test(s.basicData.dirName)
      },
      {
        name: './file/modify-api.ts.dtpl',
        matches: () => s.basicData.dirPath.indexOf('/modify/api/') >= 0
      },
      {
        name: './file/modify-tpl.ts.dtpl',
        matches: () => s.basicData.dirPath.indexOf('/modify/tpl/') >= 0
      }
    ],
    globalData: {}
  }
}
