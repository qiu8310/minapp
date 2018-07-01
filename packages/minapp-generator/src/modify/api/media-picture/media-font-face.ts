/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {ApiModifier, TemplateMeta} from '../..'

export default class extends ApiModifier {
  modify(): TemplateMeta[] {
    return [
        {type: 'update', index: 1, head: {col: 1, from: '值', to: '范围'}},
        {type: 'merge', fromIndex: 1, toIndex: 0, splice: [1, 0, 'String', '否'], prefixes: ['desc.']}
    ]
  }
}
