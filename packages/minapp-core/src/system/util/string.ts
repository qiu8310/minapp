/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

/**
 * 将 str 转化成 camelCase
 */
export function camelCase(str: string) {
  return str.replace(/[-_](\w)/, (r, k: string) => k.toUpperCase())
}
