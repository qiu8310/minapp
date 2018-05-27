var path = require('path');

module.exports = function (source) {
  return {
    templates: [
      {
        // 当在 pages 目录下新建一个文件夹时，向这个文件夹内注入 .dtpl/page 下的文件
        matches: function () { return source.isDirectory && /^pages?$/.test(source.basicData.dirName); },
        name: './page',
        inject: function () {
          let {rawModuleName, dirName, dirPath} = source.basicData
          let page = [dirName, rawModuleName, rawModuleName].join('/')

          // 向 app.json 和 base/MyApp.ts 中注入内容
          let appJson = path.resolve(dirPath, '..', 'app.cjson')
          let MyAppTs = path.resolve(dirPath, '..', 'base', 'MyApp.ts')

          return [
            { file: appJson, data: { page: "\"" + page + "\"," }, tags: 'loose', append: true },
            { file: MyAppTs, data: { pagesMap: camelCase(rawModuleName) + ": Url" }, tags: 'loose', append: true },
          ]
        }
      },
      {
        // 当在 components 目录下新建一个文件夹时，向这个文件夹内注入 .dtpl/component 下的文件
        matches: function () { return source.isDirectory && /^components?$/.test(source.basicData.dirName); },
        name: './component/'
      }
    ],
    globalData: {
      dollar: '$',
      style: 'css'
    }
  }
}

function camelCase(str) { return str.replace(/[-_](\w)/g, camelCaseReplacer) }
function camelCaseReplacer(r, k) { return k.toUpperCase() }
