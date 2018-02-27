/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {ApiModifier, TemplateMeta} from '../..'

export default class extends ApiModifier {
  modify(): TemplateMeta[] {
    return [
      {type: 'merge', fromIndex: 6, toIndex: 5, prefixes: ['beacons[].']},
      {type: 'merge', fromIndex: 8, toIndex: 7, prefixes: ['beacons[].']},
    ]
  }
}
