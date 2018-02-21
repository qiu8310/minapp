import * as _ from 'types-dot-template'
import * as path from 'path'
import * as fs from 'fs'

export default function(s: _.Source): _.IDtplConfig {
  return {
    templates: [
      {
        name: './component',
        matches: () => s.isDirectory && /^components?$/.test(s.basicData.dirName)
      },
      {
        name: './page',
        matches: () => s.isDirectory && /^pages?$/.test(s.basicData.dirName),
        inject: () => {
          let key = s.basicData.moduleName
          let {rawModuleName, dirName, dirPath} = s.basicData
          let page = [dirName, rawModuleName, rawModuleName].join('/')

          let appJson = path.resolve(dirPath, '..', 'app.cjson')
          let bootstrap = path.resolve(dirPath, '..', 'base', 'bootstrap.ts')

          if (!fs.existsSync(appJson)) s.app.error(`${appJson} 不存在`)
          if (!fs.existsSync(bootstrap)) s.app.error(`${bootstrap} 不存在`)

          return [
            {file: appJson, data: {page: `"${page}",`}, tags: 'loose'},
            {file: bootstrap, data: {pagesMap: `${rawModuleName}: string`}, tags: 'loose'},
          ]
        }
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
