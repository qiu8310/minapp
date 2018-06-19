/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author AlexStacker <lexusunx@gmail.com> (https://github.com/AlexStacker)
*******************************************************************/

import {ApiModifier, TemplateMeta} from '../..'

export default class extends ApiModifier {
  modify(): TemplateMeta[] {
    return [
    //   {type: 'update', index: 1, head: { col:0, from: '参数', to: '属性'}},
      {type: 'update', index: 1, col: {splice: [1, 0], head: '类型', rows: ['Number', 'Number', 'Number', 'Number', 'String']}},
      {type: 'update', index: 1, col: {splice: [2, 0], head: '必填', rows: ['是', '是', '是', '是', '是']}}
    ]
  }
}
