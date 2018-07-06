/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {parse} from '../parser'

debugger
let xml = parse(`
<wxs module="lotteryFn">

function test() {
  return {
    CREATED: '1',
    REWARDED: '2',
  }
}

</wxs>
`)

console.log(xml.toXML({
  prefix: '',
  eol: '\n',
  preferSpaces: true,
  tabSize: 2,
  maxLineCharacters: 100,
  removeComment: false
}))
