/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author AlexStacker <lexusunx@gmail.com> (https://github.com/AlexStacker)
*******************************************************************/

import {ApiModifier, TemplateMeta} from '../..'

export default class extends ApiModifier {
  modify(): TemplateMeta[] {
    return [
      {type: 'update', index: 1, col: {splice: [1, 0], head: '类型', rows: ['String', 'number', 'number', 'number', 'number']}},
    ]
  }
}
