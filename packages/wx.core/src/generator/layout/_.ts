export * from '../base/'
export {Generator} from '../Generator'
export * from '../struct/'
import {Klass} from '../struct'

export const CnavasContext = new Klass('CanvasContext', [], [])
export const PROMISABLE: {
  FUNCS: string[]
  KLASS: {[klassName: string]: string[]}
} = {
  FUNCS: [],
  KLASS: {}
}
