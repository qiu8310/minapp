/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

/**
 * process.env.NODE_ENV 中的值
 *
 * 如果没有指定则默认为 "developemnt"
 */
declare var __ENV__: 'developemnt' | 'production' | 'test' | string

/** process.env.NODE_ENV === 'developemnt' 时此值为 true，否则为 false  */
declare var __DEV__: boolean

/** process.env.NODE_ENV === 'production' 时此值为 true，否则为 false  */
declare var __PROD__: boolean


