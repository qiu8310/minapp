/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

// 这些变量是通过 webpack 的 DefinePlugin 导入的
/**
 * process.env.NODE_ENV 中的值
 *
 * 如果没有指定则默认为 "developemnt"
 */
declare var __ENV__: 'developemnt' | 'production' | 'test' | string



