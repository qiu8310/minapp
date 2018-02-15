import {Loader} from './inc/'

@Loader.decorate
export default class FileLoader extends Loader {
  run(content: string) {
    this.emit(this.emitFile, content)
    return `/* ${this.resourcePath} */`
  }
}
