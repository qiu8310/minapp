import {Klass} from '../generator/struct'

export interface COLLECT {
  API: {
    CnavasContext: Klass
    PROMISABLE: {
      FUNCS: string[]
      KLASS: {[klassName: string]: string[]}
    }
  },
  TPL: {

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
  TPL: {}
}
