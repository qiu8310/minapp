/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

let warn: (...args: any[]) => void

if (__ENV__ === 'production') {
  warn = (...args: any[]) => {}
} else {
  warn = (...args: any[]) => console.warn(...args)
}

export {warn}
