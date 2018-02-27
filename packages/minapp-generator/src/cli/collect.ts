/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import {Klass, Component} from '../generator/struct'

export interface COLLECT {
  API: {
    CnavasContext: Klass
    PROMISABLE: {
      FUNCS: string[]
      KLASS: {[klassName: string]: string[]}
    }
  },
  TPL: {
    COMPONENTS: Component[]
  }
}

export const COLLECT: COLLECT = {
  API: {
    CnavasContext: new Klass('CanvasContext', [], []),
    PROMISABLE: {
      FUNCS: [],
      KLASS: {}
    }
  },
  TPL: {
    COMPONENTS: []
  }
}
