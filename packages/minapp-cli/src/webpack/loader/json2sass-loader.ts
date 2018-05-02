/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/
const fs = require('fs')
const path = require('path')
import {Loader} from './Loader'

@Loader.decorate
export default class JsonLoader extends Loader {
  async run(content: string) {
    if (!this.lc.query.path) return content

    this.lc.cacheable()
    let contentPath = path.resolve(this.lc.query.path)
    this.lc.addDependency(contentPath)
    let obj = JSON.parse(fs.readFileSync(contentPath, 'utf8'))

    let sass = json2sass(obj)
    return sass ? sass + '\n' + content : content
  }
}

function json2sass(obj: any, indent?: number) {
  // Make object root properties into sass variables
  let sass = ''
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      sass += '$' + key + ': ' + JSON.stringify(obj[key], null, indent) + ';\n'
    }
  }
  if (!sass) return sass

  // Store string values (so they remain unaffected)
  let storedStrings: any[] = []
  sass = sass.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, function(str) {
    let id = '___JTS' + storedStrings.length
    storedStrings.push({id, value: str})
    return id
  })

  // Convert js lists and objects into sass lists and maps
  sass = sass.replace(/[{[]/g, '(').replace(/[}\]]/g, ')')

  // Put string values back (now that we're done converting)
  storedStrings.forEach(function(str) {
    str.value = str.value.replace(/["']/g, '')
    sass = sass.replace(str.id, str.value)
  })

  return sass
}
