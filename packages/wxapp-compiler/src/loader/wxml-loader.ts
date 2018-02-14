import * as webpack from 'webpack'
import * as path from 'path'
import {getDataFromLoaderContext} from '../hack-webpack'

export default function(this: webpack.loader.LoaderContext, content: string, sourceMap?: string | Buffer) {
  let {srcDir} = getDataFromLoaderContext(this)
  let relativeFile = path.relative(srcDir, this.resourcePath)

  this.emitFile(relativeFile, content, null)
  return `/* ${this.resourcePath} */`
}
